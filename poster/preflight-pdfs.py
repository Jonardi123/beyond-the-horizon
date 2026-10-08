"""Normalize Canva's rounded pixel export to exact A2 without scaling its artwork.

Run from the repository root. Originals are preserved, and text, photographs,
and the square QR retain their original coordinates and resolution.
"""
from io import BytesIO
from pathlib import Path
import json
import shutil
from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.units import mm

ROOT = Path(__file__).resolve().parent
FILES = [
    ROOT / 'print/Beyond-the-Horizon-A2-Canva-Print.pdf',
    ROOT / 'previews/Beyond-the-Horizon-A2-Canva-Preview.pdf',
]

def preflight(destination):
    original = destination.parent / 'originals' / destination.name
    original.parent.mkdir(exist_ok=True)
    if not original.exists():
        shutil.copyfile(destination, original)
    reader = PdfReader(original)
    assert len(reader.pages) == 1, 'The exhibition poster must have one page.'
    page = reader.pages[0]
    before = [float(page.mediabox.width) * 25.4 / 72,
              float(page.mediabox.height) * 25.4 / 72]
    background = BytesIO()
    drawing = canvas.Canvas(background, pagesize=(420 * mm, 594 * mm))
    drawing.setFillColor(HexColor('#07121F'))
    drawing.rect(0, 0, 420 * mm, 594 * mm, fill=1, stroke=0)
    drawing.showPage()
    drawing.save()
    background.seek(0)
    result = PdfReader(background).pages[0]
    result.merge_page(page, over=True, expand=False)
    # ReportLab rounds its page numbers. Set the exact box with pypdf precision.
    for box in ['mediabox', 'cropbox', 'trimbox', 'bleedbox']:
        setattr(result, box, RectangleObject([0, 0, 420 * mm, 594 * mm]))
    writer = PdfWriter()
    writer.add_page(result)
    writer.add_metadata({key: str(value) for key, value in reader.metadata.items()
                         if isinstance(value, (str, int, float))})
    writer.add_metadata({'/Subject': 'Canva PDF export; A2 page boundary normalized '
                         'to exactly 420 x 594 mm without scaling content. '
                         'RGB; no added bleed.'})
    with destination.open('wb') as output:
        writer.write(output)
    checked = PdfReader(destination).pages[0]
    after = [float(checked.mediabox.width) * 25.4 / 72,
             float(checked.mediabox.height) * 25.4 / 72]
    assert all(abs(a - b) < 0.000001 for a, b in zip(after, [420, 594]))
    assert checked.extract_text() == page.extract_text(), 'Text must be preserved.'
    return {'file': str(destination.relative_to(ROOT)),
            'original': str(original.relative_to(ROOT)),
            'canva_export_mm': before, 'final_a2_mm': after,
            'scaled_content': False, 'color_profile': 'RGB', 'bleed_mm': 0,
            'bytes': destination.stat().st_size}

if __name__ == '__main__':
    record = {'files': [preflight(file) for file in FILES]}
    (ROOT / 'print/preflight.json').write_text(json.dumps(record, indent=2) + '\n')
    print(json.dumps(record, indent=2))
