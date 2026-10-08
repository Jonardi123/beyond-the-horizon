# Beyond the Horizon: Exploring the Unknown

A museum-inspired school exhibition about the benefits, risks, and responsibilities of exploration. Five environments connect a physical A2 poster with an interactive Grade 10 English website.

**Stack:** React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, and Lucide icons. The SVG world map uses Natural Earth geometry. Content, fonts, photographs, and map data are local; no API keys or paid map services are required.

## Exhibition status

The GitHub account has been verified as **Jonardi123**. The requested public repository is `Jonardi123/beyond-the-horizon`. The owner approved public creation, source upload, and GitHub Pages activation on 8 October 2026. Deployment verification is in progress. No Pages URL or QR code is represented as live until publication and validation finish.

The A2 design proof is in `poster/previews/`. An actual editable Canva design has also been created privately. The QR panel is reserved until the deployed website is verified. Canva links and editing transactions are kept out of the public source tree.

## Run locally

Requires Node.js **22.12 or later** and npm. The deployment workflow uses Node 24.

```bash
npm ci
npm run dev
```

Open **http://localhost:5173/beyond-the-horizon/**, or the Local URL printed by Vite. Keep the terminal running. On this computer, the existing project lives at:

```text
/home/jonard/Documents/Codex/2026-10-08/codex-project-beyond-the-horizon-an/outputs/beyond-the-horizon
```

## Build and verify

```bash
npm test
npm run build
npm run preview
```

Open **http://localhost:4173/beyond-the-horizon/**. The build type-checks the project, generates the 15-slide PDF with three reference/credit pages, compiles the website, prepares its offline cache, and checks that all HTML and cache asset paths remain within the configured base directory.

The five integration tests cover problem/solution cards, mixed quiz scoring and reset, slide navigation/notes/boundaries/exit, keyboard map selection, and comparison filtering.

## GitHub Pages

The Vite base defaults to **`/beyond-the-horizon/`**. Images, the downloadable PDF, the service worker, and offline navigation all respect this base. For a root-domain host, set `VITE_BASE_PATH=/` in the build environment.

The committed workflow `.github/workflows/deploy.yml`:

1. Checks out the approved `main` branch.
2. Installs exactly the locked npm dependencies.
3. Runs interaction tests and the production build.
4. Validates local asset paths.
5. Uploads only `dist` as the Pages artifact.
6. Deploys through the `github-pages` environment.

Use **Settings → Pages → Build and deployment → Source → GitHub Actions**. Normal changes to `main` trigger publication; documentation and poster-only changes do not rebuild the site. The workflow can also be started manually. Official actions are pinned to verified commit SHAs.

After publication, obtain the actual URL from GitHub's Pages/deployment result and check it anonymously in a browser before encoding it in a QR code. `DEPLOYMENT.md` records the approval and verification process.

## Mobile and classroom use

The layout supports narrow phone screens, touch controls, safe-area insets, and reduced-motion preferences. Smaller local photographs are selected on phones, including a lighter Earth hero. Touch screens avoid hover zoom and expensive blur effects. The layout and core navigation have been checked at 320 px and 390 px widths in Chromium. Physical iOS Safari and Android Chrome tests must be recorded separately; a viewport test is not a physical-device test.

Choose **Start presentation** for 15 slides, arrows, progress, slide selection, and a complete speaking script. Full screen is optional; the slide interface still works if a mobile browser does not support the Fullscreen API.

- Left/right or Page Up/Page Down: previous/next slide.
- Home/End: first/last slide.
- N: show/hide speaker notes.
- Escape: leave the presentation. A browser may first exit full screen.
- **Present this region** jumps to that region's slide.

The classroom quiz has five questions, immediate feedback, answer locking, a final score, review, and reset. Ambient sound is disabled by default and stops when the tab becomes hidden.

Use `SPEAKING_SCRIPT.md` to rehearse. A typical delivery takes about 8–10 minutes plus discussion or quiz. The website can download the script, print the slides, or include notes in a rehearsal handout.

## Offline backup

After an online visit, wait for **Ready for offline visits** in the website footer. Its service worker caches local lessons, images, fonts, map geometry, and PDF for later use. External reference websites require internet access. Private/incognito browsers or browsers that clear site storage may remove the cache.

For a separate classroom copy that can run without internet access, prepare it once:

```bash
npm run build:classroom
```

This creates `classroom/` with root-relative asset paths and leaves the Pages build in `dist/`. Copy `classroom/` to the classroom computer and serve it with Python 3:

```bash
python3 -m http.server 4173 --directory classroom
```

On Windows, `py -m http.server 4173 --directory classroom` can be used instead. Open **http://localhost:4173/**. A local HTTP server is required; double-clicking an HTML file does not reliably load JavaScript modules. The standalone presentation PDF also works without a browser or server.

## A2 poster

```text
poster/
  assets/       Original-resolution photographs and source/license manifest
  fonts/        Matching local fonts with their SIL license files
  print/        Final print files after website and QR validation
  previews/     A2 design proof and smaller review assets
  qr-code/      Verified destination, QR files, and decoding checks
  content.json  Proofread English copy and primary references
  layout.json   Exact A2 size, margins, type, colors, and element positions
  build-poster.py
```

The poster has a **420 × 594 mm portrait** trim size and a 14 mm safe margin. Text is vector; photographs are checked for effective resolution in their frames. Five region rows distinguish advantages, disadvantages, and a response to the problem. The conclusion is balanced and distinguishes scientific research from recreation.

Install `poster/requirements.txt` in a Python virtual environment, then generate the review proof:

```bash
python poster/build-poster.py
```

`--final` is blocked without a deployment record that confirms anonymous HTTP access and browser validation. The final QR uses error correction H, a four-module white quiet zone, and a 52 mm square frame. PNG decoding and decoding from the exported poster must match the exact live URL.

The PDF/SVG files are Canva preparation assets. The final requested deliverable is the editable Canva project and its **PDF Print** export. Do not label an external PDF as a Canva export. For print, use A2, avoid flattening the editable master, and add crop marks/bleed only if requested by the printer. If the chosen printer supports CMYK and Canva offers it, use that workflow and inspect its proof for color shifts.

## Content and references

Research was checked on 8 October 2026. Facts cite NASA, NOAA, British Antarctic Survey, Smithsonian, Kew, National Park Service, Royal Geographical Society, and Norwegian Polar Institute. Full links and the claims they support are in the website's **Sources** section and the PDF reference appendix.

The project avoids invented statistics and unverified percentages. Comparison ratings are explicitly classroom discussion judgments, not measured data. Scientific exploration has a research purpose. Tourism and recreational mountaineering have different goals. Rainforest research must respect local communities and their existing knowledge.

See `IMAGE_CREDITS.md` and `poster/assets/credits.json` for image attribution and licenses. The Antarctic photo retains CC BY-SA 4.0; the rainforest photo retains CC BY 3.0. The rainforest photograph shows Queensland, not the Amazon. Apollo 17 imagery is captioned as 1972 even when shown alongside a different historical milestone.

## Edit the project

- `src/data.ts`: region content, sources, quiz, timeline, and speaking notes.
- `src/assets.ts`: deployment-safe public asset URLs and responsive image variants.
- `src/Exploration.tsx`: map, region details, timeline, and comparisons.
- `src/Presentation.tsx`: slide content, controls, and print layout.
- `src/styles.css`: theme, responsive layouts, atmosphere, and print styling.
- `scripts/build-pdf.mjs`: presentation PDF.
- `scripts/build-offline.mjs`: versioned offline cache under the Vite base.
- `poster/content.json` and `poster/layout.json`: exhibition poster content and layout.

Rebuild after changes so the website, PDF, and offline cache stay consistent. Keep secrets and authentication files out of this repository; `.gitignore` excludes them, build output, local caches, and Canva scratch data.
