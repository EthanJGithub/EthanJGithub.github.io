# Ethan Jones — portfolio

Static portfolio for GitHub Pages. No build step or runtime dependencies.

## Preview

From this directory, run `python -m http.server 4173 --bind 127.0.0.1` and open http://127.0.0.1:4173.

## Editing

- `index.html`: biography, projects, experience, skills, and contact links.
- `assets/style.css`: shared layout and responsive styles.
- `assets/main.js`: keyboard-accessible project tabs, illustrative canvas animations, and mobile navigation.
- `articles/*.html`: original technical articles, with shared styles in `assets/article.css`.

The VisionLog panel plays a continuous seven-second pedestrian tracking clip at the original 10 fps (OpenCV vtest frames 404-473). A fresh app tracker assigns IDs 1 and 2 to the initial people, followed by IDs 3 and 4 as they enter. All 70 frames were visually reviewed for correct identity and box placement; each ID remains present after its first detection. The same app overlay uses a distinct color per ID and compact labels. The short video is fetched completely before playback and loops without an end hold. Visibility pauses only when the panel is entirely offscreen. The people count is encoded in each video frame alongside its boxes, eliminating a separate UI clock. The video viewport uses the native 4:3 ratio at full width, preserving every tracked person without letterboxing or cropping.

`assets/visionlog-tracking-v3.json` records actual model observations, source/settings, identity audit and video checksum. There are no scene cuts, manually rewritten IDs or generated detections. This curated result is not a guarantee for arbitrary footage. Versioned media filenames prevent stale video/metadata mixtures.

Other systems-lab panels illustrate system architecture. Pause/play, offscreen pausing, tab switching and reduced-motion preferences control the animations. Sentinel has a dedicated architectural SVG and a detailed article at `articles/sentinel.html`.

CredAgent uses an animated decision dossier with application inputs, illustrative SHAP contributions, retrieved policy evidence, human review and an audit chain. Copper and ivory accents match the app. On mobile the dossier and evidence cards stack; animation respects pause and reduced motion.
