# Ethan Jones — portfolio

Static portfolio for GitHub Pages. No build step or runtime dependencies.

## Preview

From this directory, run `python -m http.server 4173 --bind 127.0.0.1` and open http://127.0.0.1:4173.

## Editing

- `index.html`: biography, projects, experience, skills, and contact links.
- `assets/style.css`: shared layout and responsive styles.
- `assets/main.js`: keyboard-accessible project tabs, illustrative canvas animations, and mobile navigation.
- `articles/*.html`: original technical articles, with shared styles in `assets/article.css`.

The VisionLog panel plays a continuous seven-second pedestrian tracking clip at the original 10 fps (OpenCV vtest frames 404-473). A fresh app tracker assigns IDs 1 and 2 to the initial people, followed by IDs 3 and 4 as they enter. All 70 frames were visually reviewed for correct identity and box placement; each ID remains present after its first detection. The same app overlay uses a distinct color per ID and compact labels. Playback stops at the end with an explicit replay button to avoid a jump back to the first frame.

`assets/visionlog-tracking-v2.json` records actual model observations, source/settings, identity audit and video checksum. There are no scene cuts, manually rewritten IDs or generated detections. This curated result is not a guarantee for arbitrary footage. Versioned media filenames prevent stale video/metadata mixtures.

Other systems-lab panels illustrate system architecture. Pause/play, offscreen pausing, tab switching and reduced-motion preferences control the animations. Sentinel has a dedicated architectural SVG and a detailed article at `articles/sentinel.html`.
