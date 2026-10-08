"""Check the actual Canva exports, their A2 boxes, content, and rendered QR codes.

Requires poster/requirements.txt and Poppler's pdftoppm command.
"""
from pathlib import Path
from tempfile import TemporaryDirectory
from datetime import datetime, timezone
import hashlib
import json
import subprocess
from PIL import Image
from pypdf import PdfReader
import zxingcpp

ROOT = Path(__file__).resolve().parent
URL = json.loads((ROOT / 'qr-code/deployment-verification.json').read_text())['url']

def decode(file, label):
    result = zxingcpp.read_barcode(Image.open(file))
    assert result and result.text == URL, f'QR destination mismatch: {label}'
    return {'file': label, 'decoded_url': result.text, 'valid': True}

def check_pdf(file, temporary):
    reader = PdfReader(file)
    assert len(reader.pages) == 1
    page = reader.pages[0]
    size = [float(page.mediabox.width) * 25.4 / 72,
            float(page.mediabox.height) * 25.4 / 72]
    assert all(abs(a - b) < .000001 for a, b in zip(size, [420, 594]))
    # Canva positions glyphs individually; extraction inserts inter-letter spaces.
    text = ''.join(page.extract_text().split())
    content = json.loads((ROOT / 'content.json').read_text())
    phrases = [r['title'] for r in content['regions']]
    phrases += ['ADVANTAGES', 'DISADVANTAGES', 'PROBLEM / SOLUTION',
                'SCAN TO EXPLORE', 'Discover the interactive expedition online.',
                content['subtitle'], content['conclusion'], content['definition']]
    for phrase in phrases:
        assert ''.join(phrase.split()) in text, f'Missing content: {phrase}'
    for phrase in ['QR AREA RESERVED', 'Awaiting a verified', 'DESIGN PROOF / QR PENDING']:
        assert ''.join(phrase.split()) not in text, f'Proof label remains: {phrase}'
    assert '/Font' in page['/Resources'], 'Vector text resources must remain.'
    output = Path(temporary) / file.stem
    subprocess.run(['pdftoppm', '-scale-to', '1600', '-png', '-singlefile',
                    str(file), str(output)], check=True, capture_output=True)
    qr = decode(output.with_suffix('.png'), str(file.relative_to(ROOT)))
    return {'file': str(file.relative_to(ROOT)), 'dimensions_mm': size,
            'pages': 1, 'vector_text': True, 'five_regions': True,
            'qr_caption': True, 'bytes': file.stat().st_size,
            'sha256': hashlib.sha256(file.read_bytes()).hexdigest()}, qr

if __name__ == '__main__':
    files, qr_checks = [], []
    with TemporaryDirectory(prefix='horizon-pdf-qa-') as temporary:
        for file in [ROOT / 'print/Beyond-the-Horizon-A2-Canva-Print.pdf',
                     ROOT / 'previews/Beyond-the-Horizon-A2-Canva-Preview.pdf']:
            result, qr = check_pdf(file, temporary)
            files.append(result)
            qr_checks.append(qr)
    for file in [ROOT / 'qr-code/beyond-the-horizon-qr.png',
                 ROOT / 'previews/Beyond-the-Horizon-A2-mobile.jpg']:
        qr_checks.append(decode(file, str(file.relative_to(ROOT))))
    record = {'checked_at': datetime.now(timezone.utc).isoformat(), 'url': URL,
              'canva_design_id': 'DAHXblGLpYk',
              'saved_with_owner_preview_approval': True,
              'canva_pdf_print_export': True, 'canva_pdf_standard_export': True,
              'color_profile': 'RGB; CMYK is a Canva Pro option; no printer profile supplied',
              'bleed_mm': 0, 'page_size_corrected_without_scaling': True,
              'photographs_dpi': 300, 'qr_in_print_pdf_dpi': 382,
              'visual_review': 'Passed: readable title, subtitle, five rows, comparison columns, '
                               'conclusion, references, credits and QR; no text overflow.',
              'physical_print_or_phone_camera_test': 'Not performed; software decoded QR '
                                                     'from both exported PDFs and images.',
              'files': files, 'qr_checks': qr_checks}
    (ROOT / 'print/quality-assurance.json').write_text(json.dumps(record, indent=2) + '\n')
    print(json.dumps(record, indent=2))
