# Beyond the Horizon — A2 exhibition poster

The editable Canva master was created from separate text, image, and graphic elements, refined in Canva, and saved after the owner's explicit approval. It contains all five exploration regions, advantages, disadvantages, problems/solutions, a balanced conclusion, source/photo credits, and a functional QR. The private owner edit link is supplied separately, not committed publicly.

## Use these final files

| File | Purpose |
| --- | --- |
| `print/Beyond-the-Horizon-A2-Canva-Print.pdf` | Final exact-A2 print file from Canva PDF Print, about 4.9 MB |
| `previews/Beyond-the-Horizon-A2-Canva-Preview.pdf` | Canva PDF Standard phone preview, about 1 MB |
| `previews/Beyond-the-Horizon-A2-mobile.jpg` | Small image preview for a phone |
| `previews/Beyond-the-Horizon-A2-poster.png` | Larger preview rendered from the final print PDF |
| `qr-code/beyond-the-horizon-qr.png` | Separate 980 × 980 px QR, black on white |
| `qr-code/beyond-the-horizon-qr.svg` | Scalable QR with a white quiet zone |
| `print/quality-assurance.json` | Dimensions, content, hashes, QR decoding results, and test limitations |
| `print/preflight.json` | Original export dimensions and exact-A2 correction record |

The files labeled `design-proof` and `layout` are preparation assets, not the final Canva export. Untouched Canva exports are archived in the `originals/` subfolders.

## Print settings

- A2 portrait: **420 × 594 mm**. Print at **100% / Actual size**.
- 300 dpi photographs, vector text, and a 382 dpi QR image.
- QR placement: **52 × 52 mm**, square, with four modules of white quiet zone; do not crop it.
- RGB PDF Print. Canva's CMYK option requires Pro, and no printer profile was supplied.
- No crop marks or added bleed. If a printer requests bleed or a particular color profile, prepare that version from the Canva master for that printer.
- Primary content has 14 mm side margins; small bottom source credits retain about 5 mm.

Canva's pixel-based A2 export measured 419.894 × 593.990 mm. The final files correct only the page boundary and extend the navy background into the tiny added edge. **No content was scaled**, so typography, photographs, and the square QR keep their original proportions. Both exported PDF pages, the QR PNG, and the mobile JPG decoded to the exact live URL.

## Website and references

Destination: **https://jonardi123.github.io/beyond-the-horizon/**

Website verification happened before QR generation. It passed an anonymous HTTP check, 37 local asset checks, and browser interaction checks. Full scientific sources and website photo credits are in **Our sources** online. Poster-specific image sources and licenses are in `assets/credits.json`; proofread copy and claim references are in `content.json`.

## Repeat preflight after editing

Requires Python 3, `poster/requirements.txt`, and Poppler's `pdftoppm`. Place fresh Canva Print and Standard exports at the paths in `preflight-pdfs.py`. Preserve them as the corresponding `originals/` files before normalizing; do not accidentally reuse an older original.

```bash
python poster/preflight-pdfs.py
python poster/verify-exports.py
```

The QR has error correction H. If the public URL changes, verify the new deployment, replace `qr-code/deployment-verification.json`, regenerate with `python poster/build-poster.py --final`, insert the new QR in Canva, and export/verify again. Changing a destination in a text file does not update a printed QR.

The print layout was visually checked for clipping and overflow. Software QR decoding passed. Physical iOS Safari, Android, phone-camera, and paper-print checks were not available during production.
