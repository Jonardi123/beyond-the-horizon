"""Create an A2 design proof with real text layers; gate final QR export on a verified live URL.

This is a Canva preparation asset, not a claim that a Canva design exists.
Run from the repository root after installing poster/requirements.txt.
"""
from pathlib import Path
from io import BytesIO
from datetime import datetime, timezone
from urllib.request import urlopen, Request
from urllib.parse import urlparse
import argparse, base64, html, json, math
from PIL import Image, ImageOps
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor, Color
from reportlab.lib.utils import ImageReader
from reportlab.lib.units import mm

ROOT = Path(__file__).resolve().parent
CONTENT = json.loads((ROOT/'content.json').read_text())
LAYOUT = json.loads((ROOT/'layout.json').read_text())
W, H = 420, 594
NAVY, CARD, WHITE, MUTED, CYAN = '#07121F', '#102132', '#EDF4F8', '#B5C5D2', '#7ED5D7'
for name in ['SpaceGrotesk-Bold','SpaceGrotesk-Medium','DMSans-Regular','DMSans-Medium','CormorantGaramond-Italic']:
    pdfmetrics.registerFont(TTFont(name, ROOT/'fonts'/f'{name}.ttf'))

def wrap(value, font, size, width_mm):
    lines, line = [], ''
    for word in value.split():
        candidate = (line+' '+word).strip()
        if line and pdfmetrics.stringWidth(candidate,font,size) > width_mm*mm:
            lines.append(line); line = word
        else: line = candidate
    if line: lines.append(line)
    return lines

class Drawing:
    """One coordinate system, separate PDF text and SVG text/image/shape elements."""
    def __init__(self, filename):
        self.pdf = canvas.Canvas(str(filename), pagesize=(W*mm,H*mm), pageCompression=1)
        self.pdf.setTitle('Beyond the Horizon - A2 exhibition design proof')
        self.pdf.setAuthor('Beyond the Horizon - Grade 10 English project')
        self.svg = [f'<svg xmlns="http://www.w3.org/2000/svg" width="420mm" height="594mm" viewBox="0 0 420 594">', '<title>Beyond the Horizon - A2 design proof</title>']
        self.texts = []
    def rect(self, x,y,w,h,fill,stroke=None,width=.2):
        c=self.pdf;c.setFillColor(HexColor(fill));c.setLineWidth(width*mm)
        if stroke: c.setStrokeColor(HexColor(stroke))
        c.rect(x*mm,(H-y-h)*mm,w*mm,h*mm,fill=1,stroke=bool(stroke))
        self.svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" stroke="{stroke or "none"}" stroke-width="{width}"/>')
    def line(self,x1,y1,x2,y2,color,width=.2):
        c=self.pdf;c.setStrokeColor(HexColor(color));c.setLineWidth(width*mm);c.line(x1*mm,(H-y1)*mm,x2*mm,(H-y2)*mm)
        self.svg.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="{width}"/>')
    def text(self, value,x,y,font='DMSans-Regular',size=16,color=WHITE,tracking=0):
        c=self.pdf;c.setFillColor(HexColor(color));t=c.beginText(x*mm,(H-y)*mm);t.setFont(font,size);t.setCharSpace(tracking);t.textOut(value);c.drawText(t)
        family={'SpaceGrotesk-Bold':'Space Grotesk','SpaceGrotesk-Medium':'Space Grotesk','DMSans-Regular':'DM Sans','DMSans-Medium':'DM Sans','CormorantGaramond-Italic':'Cormorant Garamond'}[font]
        weight='700' if font.endswith('Bold') else '500' if font.endswith('Medium') else '400'
        style='italic' if 'Italic' in font else 'normal'
        self.svg.append(f'<text x="{x}" y="{y}" fill="{color}" font-family="{family}" font-size="{size/mm:.5f}" font-weight="{weight}" font-style="{style}" letter-spacing="{tracking/mm:.5f}">{html.escape(value)}</text>')
        self.texts.append({'text':value,'x_mm':x,'baseline_y_mm':y,'font':family,'size_pt':size,'weight':weight,'style':style,'color':color})
    def paragraph(self,value,x,y,width,size=16,leading_mm=6.6,font='DMSans-Regular',color=WHITE,max_lines=None):
        lines=wrap(value,font,size,width)
        if max_lines and len(lines)>max_lines: raise ValueError(f'Text overflow: {value} needs {len(lines)} lines, allowed {max_lines}')
        for i,line in enumerate(lines): self.text(line,x,y+i*leading_mm,font,size,color)
        return y+(len(lines)-1)*leading_mm
    def image(self, filename,x,y,w,h,position=(.5,.5)):
        image=Image.open(filename).convert('RGB')
        target=(round(w/25.4*300),round(h/25.4*300))
        # Crop to the photographic frame, preserving actual source resolution.
        ratio=w/h; iw,ih=image.size
        if iw/ih>ratio:
            crop_w=int(ih*ratio);left=int((iw-crop_w)*position[0]);image=image.crop((left,0,left+crop_w,ih))
        else:
            crop_h=int(iw/ratio);top=int((ih-crop_h)*position[1]);image=image.crop((0,top,iw,top+crop_h))
        image.thumbnail(target,Image.Resampling.LANCZOS)
        effective_dpi=min(image.width/(w/25.4),image.height/(h/25.4))
        if effective_dpi<290: raise ValueError(f'Photo resolution is too low: {filename.name}: {effective_dpi:.1f} DPI')
        b=BytesIO();image.save(b,format='JPEG',quality=94,subsampling=0);data=b.getvalue()
        self.pdf.drawImage(ImageReader(BytesIO(data)),x*mm,(H-y-h)*mm,w*mm,h*mm)
        self.svg.append(f'<image x="{x}" y="{y}" width="{w}" height="{h}" href="data:image/jpeg;base64,{base64.b64encode(data).decode()}"/>')
    def finish(self, filename):
        self.pdf.showPage();self.pdf.save();self.svg.append('</svg>')
        filename.with_suffix('.svg').write_text('\n'.join(self.svg))
        (ROOT/'text-elements.json').write_text(json.dumps(self.texts,indent=2)+'\n')

def hero_asset():
    """A photographic background layer; all title and subtitle text stays separate."""
    output=ROOT/'assets/hero-background.jpg'
    canvas_image=Image.new('RGB',(4961,1453),NAVY)
    source=Image.open(ROOT/'assets/earth.jpg').convert('RGB')
    earth=ImageOps.fit(source,(round(270/420*4961),1453),Image.Resampling.LANCZOS,centering=(.58,.50))
    canvas_image.paste(earth,(round(150/420*4961),0))
    mask=Image.new('L',canvas_image.size); pixels=mask.load()
    for x in range(canvas_image.width):
        location=x/4961*420
        opacity=255 if location<185 else int(255*max(0,min(1,(285-location)/100)))
        for y in range(canvas_image.height): pixels[x,y]=opacity
    canvas_image=Image.composite(Image.new('RGB',canvas_image.size,NAVY),canvas_image,mask)
    canvas_image.save(output,quality=95,subsampling=0)
    return output

def verified_qr():
    record_file=ROOT/'qr-code/deployment-verification.json'
    if not record_file.exists(): raise SystemExit('Final export withheld: no verified public deployment record.')
    record=json.loads(record_file.read_text());url=record['url'];parsed=urlparse(url)
    if parsed.scheme!='https' or parsed.hostname!='jonardi123.github.io' or parsed.path!='/beyond-the-horizon/' or parsed.query or parsed.fragment:
        raise SystemExit('The final QR destination must be the exact verified GitHub Pages URL.')
    if not record.get('browser_verified') or not record.get('anonymous_http_verified'):
        raise SystemExit('Final export withheld: browser and anonymous HTTP validation are required.')
    with urlopen(Request(url,headers={'User-Agent':'Beyond-the-Horizon-print-check'}),timeout=30) as response:
        body=response.read().decode('utf8')
        if response.status!=200 or 'Beyond the Horizon' not in body: raise SystemExit('The public site did not pass the current HTTP check.')
    import qrcode, qrcode.image.svg, zxingcpp
    qr=qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H,box_size=20,border=4)
    qr.add_data(url);qr.make(fit=True)
    png=ROOT/'qr-code/beyond-the-horizon-qr.png';qr.make_image(fill_color='black',back_color='white').save(png)
    qr.make_image(image_factory=qrcode.image.svg.SvgPathImage).save(ROOT/'qr-code/beyond-the-horizon-qr.svg')
    result=zxingcpp.read_barcode(Image.open(png))
    if not result or result.text!=url: raise SystemExit('Generated QR did not decode to the verified live URL.')
    (ROOT/'qr-code/qr-validation.json').write_text(json.dumps({'url':url,'error_correction':'H','quiet_zone_modules':4,'size_mm':52,'decoded_png':result.text,'checked_at':datetime.now(timezone.utc).isoformat()},indent=2)+'\n')
    return png,url

def build(final=False):
    qr,url=verified_qr() if final else (None,None)
    filename=ROOT/('print/Beyond-the-Horizon-A2-layout.pdf' if final else 'previews/Beyond-the-Horizon-A2-design-proof.pdf')
    d=Drawing(filename);d.rect(0,0,W,H,NAVY);d.image(hero_asset(),0,0,420,123)
    d.text('ENGLISH / GRADE 10 / EXPLORATION',14,16,'SpaceGrotesk-Medium',10.5,CYAN,1.4)
    d.text('BEYOND THE',14,47,'SpaceGrotesk-Bold',81,WHITE,-2)
    d.text('HORIZON',14,80,'SpaceGrotesk-Bold',105,WHITE,-3)
    d.paragraph(CONTENT['subtitle'],14,98,260,18,7,'CormorantGaramond-Italic',CYAN,2)
    d.line(14,116,406,116,'#426275',.22)
    d.text(CONTENT['question'],14,123,'SpaceGrotesk-Medium',10.6,CYAN,.65)
    for i,r in enumerate(CONTENT['regions']):
        y=133+i*69.5
        d.rect(14,y,392,64,CARD)
        d.image(ROOT/'assets'/f'{r["id"]}.jpg',14,y,94,64,(.5,.58 if r['id']=='space' else .5))
        d.rect(14,y+57.2,94,6.8,'#091725')
        d.text(r['photo_caption'],17,y+61.5,'DMSans-Regular',7.5,WHITE)
        d.text(r['number'],118,y+15,'SpaceGrotesk-Medium',20,r['color'])
        d.text(r['title'],133,y+15,'SpaceGrotesk-Bold',22,WHITE)
        d.text(r['annotation'],118,y+22,'SpaceGrotesk-Medium',9.5,MUTED,.5)
        columns=[('ADVANTAGES','advantages','#A4DAB8'),('DISADVANTAGES','disadvantages','#E9BC98'),('PROBLEM / SOLUTION','solution',CYAN)]
        for j,(label,key,color) in enumerate(columns):
            x=118+j*100
            d.line(x,y+29,x+88,y+29,color,.4)
            d.text(label,x,y+34,'SpaceGrotesk-Medium',10.5,color,.45)
            d.paragraph(r[key],x,y+42,88,16,6.4,'DMSans-Regular',WHITE,3)
        d.text(r['note'],118,y+61,'DMSans-Regular',9.5,MUTED)
    d.line(14,488,406,488,'#426275',.25)
    d.text('OUR CONCLUSION',14,499,'SpaceGrotesk-Medium',10.5,CYAN,1)
    d.paragraph(CONTENT['conclusion'],14,511,298,18,8,'DMSans-Medium',WHITE,4)
    d.paragraph(CONTENT['definition'],14,552,296,10.5,4.6,'DMSans-Regular',MUTED,2)
    d.text('STAY CURIOUS / PLAN CAREFULLY / RESPECT NATURE',14,571,'SpaceGrotesk-Medium',10,CYAN,.5)
    d.rect(330,495,76,82,'#FFFFFF')
    d.text(CONTENT['cta'],337,505,'SpaceGrotesk-Bold',15.5,NAVY)
    if qr:
        self_qr=Image.open(qr);b=BytesIO();self_qr.save(b,format='PNG')
        d.pdf.drawImage(ImageReader(BytesIO(b.getvalue())),342*mm,(H-511-52)*mm,52*mm,52*mm)
        d.svg.append(f'<image x="342" y="511" width="52" height="52" href="data:image/png;base64,{base64.b64encode(b.getvalue()).decode()}"/>')
    else:
        d.rect(342,511,52,52,'#F3F5F7','#CFD6DE',.2)
        d.text('QR AREA RESERVED',346,532,'SpaceGrotesk-Medium',9,NAVY)
        d.paragraph('Awaiting a verified public website URL.',347,541,42,9,4.4,'DMSans-Regular','#586B7C',2)
    d.paragraph(CONTENT['cta_caption'],335,569,66,9.5,4,'DMSans-Regular',NAVY,2)
    d.text('SOURCES: NASA / NOAA / BRITISH ANTARCTIC SURVEY / SMITHSONIAN / KEW / NPS / RGS',14,583,'DMSans-Regular',8,MUTED)
    d.text(CONTENT['credit'],14,589,'SpaceGrotesk-Medium',8,CYAN,.35)
    if not final: d.text('DESIGN PROOF / QR PENDING',317,589,'SpaceGrotesk-Medium',7.5,'#B8A5ED')
    d.finish(filename)
    print(f'A2 {"layout with verified QR" if final else "design proof"} saved: {filename}')
    print('Dimensions: 420 x 594 mm. Text is vector and individually editable in the PDF/SVG preparation files.')

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--final',action='store_true');args=parser.parse_args();build(args.final)
