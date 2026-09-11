# Ethan Jones — portfolio

Static portfolio for GitHub Pages. No build step or runtime dependencies.

## Preview

From this directory, run `python -m http.server 4173 --bind 127.0.0.1` and open http://127.0.0.1:4173.

## Editing

- `index.html`: biography, projects, experience, skills, and contact links.
- `assets/style.css`: shared layout and responsive styles.
- `assets/main.js`: keyboard-accessible project tabs, illustrative canvas animations, and mobile navigation.
- `articles/*.html`: original technical articles, with shared styles in `assets/article.css`.

The VisionLog panel plays a recorded pedestrian-detection clip. All 30 frames were processed independently through VisionLog's YOLO26m browser detector and visually reviewed. The boxes are embedded in the corresponding video frames, preventing playback drift. The count uses the video's frame callback. Source footage: OpenCV `samples/data/vtest.avi`, frames 420?449 at the original 10 fps. The downloadable `assets/visionlog-motion.json` contains every detection, source reference, settings, and video checksum. No generated motion or invented detections; this is recorded inference, not a live feed or speed benchmark. Earlier still evidence remains available in `assets/visionlog-detections.json` and `assets/visionlog-detection.webp`.

Other systems-lab panels remain illustrative animations with synthetic data. Pause/play, offscreen pausing, tab switching, and reduced-motion preferences also control the video.

Publish through the repository's existing GitHub Pages configuration after reviewing the redesign.
