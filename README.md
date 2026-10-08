# Beyond the Horizon: Exploring the Unknown

An interactive Grade 10 English project about responsible exploration. Built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Lucide icons. A local SVG map uses accurate Natural Earth geometry, so no online map tiles or API keys are needed.

## Start locally

Use Node.js **22.12 or later** (a current LTS release is recommended) and npm. From this project folder:

```bash
npm ci
npm run dev
```

Open the Local URL printed in the terminal (normally http://localhost:5173). The exact folder on this computer is:

```bash
cd /home/jonard/Documents/Codex/2026-10-08/codex-project-beyond-the-horizon-an/outputs/beyond-the-horizon
npm ci
npm run dev
```

The installation requires an internet connection once. All lesson content, map geometry, fonts, and photos are stored in the project and work without external services afterward. No credentials or API keys are needed.

## Production and classroom backup

```bash
npm run build
npm run preview
```

Open http://localhost:4173. The build generates a PDF with **15 slides plus three reference/credit pages** and a service worker that caches every local file. Wait for **“Ready for offline visits”** in the footer before relying on the hosted website offline. External source websites still need internet access.

The included `dist` folder is a ready-built copy. On a classroom computer with Python 3, serve it without installing Node or dependencies:

```bash
python3 -m http.server 4173 --directory dist
```

Open http://localhost:4173. Keep the terminal running. Use a local HTTP server rather than double-clicking `dist/index.html`, because browser security restricts JavaScript modules under `file://`.

You can also use `public/Beyond-the-Horizon.pdf` as a completely standalone presentation backup.

## Present

Choose **Start presentation** or **Presentation mode**. The website requests browser full screen; if the browser refuses it, the slide interface still works.

- Left/right arrows or Page Up/Page Down: previous/next slide.
- Home/End: first/last slide.
- N: show/hide speaker notes.
- Escape: leave presentation. Some browsers first leave full screen; press Escape again to close the slide interface.
- The slide menu jumps to any of the 15 slides.
- **Present this region** begins at the selected region’s slide.
- The final slide can open the classroom quiz.

Hide notes before projecting if you do not want the class to see the script. Practice with `SPEAKING_SCRIPT.md`; the website also downloads a plain-text copy. Suggested speaking time is about 8–10 minutes, plus questions or quiz.

## Explore and discuss

Choose a frontier from the opening cards, region buttons, or the world map. Each region includes a real photograph, a scientific purpose, advantages and disadvantages, three problem/solution cards, a verified fact, and linked references. The map markers represent **example locations**, not the entire regions; space is shown separately from Earth.

The timeline has six researched milestones. The comparison chart can show all challenges or one lens, and selecting a frontier reveals its benefits, risks, and a response. Ratings are explicitly **classroom discussion judgments**, not scientific measurements.

The quiz has five multiple-choice questions, immediate explanations, answer locking, a final score, review, and reset. It has no timer.

Ambient sound is synthesized locally using the Web Audio API, disabled by default, and controlled from the footer. It stops when the browser tab becomes hidden.

## PDF and printing

- **Download slide PDF** provides the checked, fixed-layout backup. It is regenerated from the lesson data every build.
- **Print / save as PDF** prints the full slide deck using a clean landscape layout. In your browser, choose “Save as PDF.”
- Check **Include speaker notes when printing** for rehearsal handouts.
- For the best classroom display, use the interactive presentation mode or the downloadable PDF. Browser print layouts can vary slightly by browser.

## Verification

```bash
npm test
npm run build
```

The interaction tests cover solution cards, mixed quiz scoring and reset, slide navigation/notes/boundaries/exit, keyboard map controls, and comparison filtering. Production uses local assets only. Reduced-motion preferences are respected; the presentation has a focus trap and background content is inert while it is open.

## Edit the lesson

- `src/data.ts`: region content, concise slide arguments, timeline, sources, quiz, and speaking notes.
- `src/Presentation.tsx`: slide layouts and presentation controls.
- `src/Exploration.tsx`: map, region details, comparison, and timeline.
- `src/styles.css`: theme, responsive layouts, atmosphere effects, and print styling.
- `scripts/build-pdf.mjs`: the standalone PDF backup.
- `scripts/build-offline.mjs`: production offline caching.

Run `npm run build` after changes so the PDF and offline cache match the website. Core sources were checked on **8 October 2026**. The project distinguishes scientific research from tourism and recreational mountaineering, and avoids unverified exploration percentages and invented statistics.

See `IMAGE_CREDITS.md` for image sources, license links, and crop/resize notices. The Antarctica image derivative remains under CC BY-SA 4.0; the rainforest photograph is Queensland, not the Amazon. No photo is presented as a reconstruction of a historical event.
