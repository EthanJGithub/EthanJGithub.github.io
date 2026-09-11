# Ethan Jones — portfolio

Static portfolio for GitHub Pages. No build step or runtime dependencies.

## Preview

From this directory, run `python -m http.server 4173 --bind 127.0.0.1` and open http://127.0.0.1:4173.

## Editing

- `index.html`: biography, projects, experience, skills, and contact links.
- `assets/style.css`: shared layout and responsive styles.
- `assets/main.js`: keyboard-accessible project tabs, illustrative canvas animations, and mobile navigation.
- `articles/*.html`: original technical articles, with shared styles in `assets/article.css`.

The VisionLog panel plays a ten-second pedestrian tracking clip. All 100 frames were processed with the browser YOLO26m detector and the app's Kalman/global-assignment/appearance tracker, then visually reviewed. Six people retain their assigned IDs through the clip. Brief occlusion can hide a detection box; its ID is retained on reacquisition. Boxes and IDs are embedded in their corresponding frames to prevent playback drift. Source: OpenCV `samples/data/vtest.avi`, frames 390?489 at 10 fps. `assets/visionlog-motion.json` contains observations, settings, provenance and video checksum. This is recorded inference, not a live feed or speed benchmark.

Other systems-lab panels illustrate system architecture. Pause/play, offscreen pausing, tab switching and reduced-motion preferences control the animations. Sentinel has a dedicated architectural SVG and a detailed article at `articles/sentinel.html`.
