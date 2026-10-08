# QR destination gate

No QR code is supplied before GitHub Pages is publicly deployed and verified. The earlier owner-private Sites address must not be used for exhibition visitors.

After publication is approved:

1. Read the real Pages URL from the repository's Pages API/deployment result.
2. Confirm an anonymous HTTP request returns the website and browser QA succeeds.
3. Record that exact URL and validation time in `deployment-verification.json`.
4. Generate a standard QR code at error-correction level H, with a four-module quiet zone, using `python poster/build-poster.py --final`.
5. Decode the separate PNG and a rasterization of the exported poster. Both must match the live URL exactly.
6. Insert the QR as a separate element in the editable Canva design at 52 × 52 mm on white. Retain the complete quiet zone. Then export and validate Canva PDF Print.

The final poster must be withheld if any of these checks fail.
