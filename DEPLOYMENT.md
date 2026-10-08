# Publication and exhibition release

Verified account: **Jonardi123**. Requested new repository: **beyond-the-horizon**.

## Verified public deployment

The owner explicitly approved public creation and publication on **8 October 2026**.

- Public repository: https://github.com/Jonardi123/beyond-the-horizon
- Verified Pages URL, returned by GitHub: https://jonardi123.github.io/beyond-the-horizon/
- Successful workflow: https://github.com/Jonardi123/beyond-the-horizon/actions/runs/37795890432
- Deployed application commit: `294e41c5d435df2b1afaa325a1de1f83fd8cb5d0`
- Production build and all five interaction tests passed locally and in GitHub Actions.
- Anonymous HTTP checks: website and all 37 cached local assets returned 200.
- Browser checks: map/content selection, quiz feedback, presentation keys and notes, close/return, narrow mobile layout, and offline-ready status passed.
- QR image and A2 layout PDF rendering both decode to the verified URL exactly.

Details and UTC timestamps are in `poster/qr-code/deployment-verification.json` and `qr-validation.json`. Physical iOS Safari and Android devices were not available; Chromium viewport checks do not claim physical-device testing.

The final Canva master was saved after the owner's explicit preview approval. PDF Print and PDF Standard exports are complete. Both passed exact A2 boundary checks, text/content checks, and decoding from rendered PDF pages. The PNG and mobile JPG also decode correctly. `poster/print/quality-assurance.json` records the results.

## Approved release procedure

1. Check that `Jonardi123/beyond-the-horizon` still does not exist, or inspect it before reusing it.
2. Create the public repository only after explicit approval.
3. Push the reviewed source to `main` with no credentials, generated caches, or Canva editing links.
4. Enable GitHub Pages with GitHub Actions as the build source.
5. Run the committed deployment workflow and inspect its result.
6. Read the exact `html_url` from GitHub Pages. Do not construct a successful URL from the username.
7. Request the URL anonymously, check linked scripts/styles/images/PDF, then inspect navigation, quiz, and mobile layouts in a browser.
8. Save `poster/qr-code/deployment-verification.json` with the exact URL, commit SHA, deployment ID, UTC time, and actual HTTP/browser results.
9. Generate and decode the real QR at level H. Decode it again from the final PDF.
10. Insert it in the existing editable Canva poster, remove the reserved-area/proof labels, show the updated proof, and obtain approval before committing Canva draft edits.
11. Export Canva PDF Print and a small preview. Inspect trim dimensions, resolution, text, and QR decoding. No QR poster is final until these checks pass.

The Canva design stays owner-private unless its audience is explicitly approved for a change. No collaborator invitation, public Canva share, print order, or paid service is part of this release.

## Print release

The delivered `poster/print/Beyond-the-Horizon-A2-Canva-Print.pdf` is the actual Canva **PDF Print** export with its page boundary normalized to exact A2. Canva rounds the preset to 1587 × 2245 px, so its untouched export measured 419.894 × 593.990 mm. The preflight adds only the missing navy edge area and exact A2 page boxes; text, photographs, and QR are not scaled. Untouched exports are preserved in each `originals/` folder.

Print photographs are 300 dpi, the QR is 382 dpi, and text remains vector. The file is RGB because Canva lists CMYK as a Pro option and no printer profile was supplied. No crop marks or bleed were added. The smaller Canva PDF Standard preview is about 1 MB. Physical device, camera, and paper-print checks were not available; those are separate from the successful software checks.
