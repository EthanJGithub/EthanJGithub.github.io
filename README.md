# Ethan Jones — portfolio

Static portfolio for GitHub Pages. No build step or runtime dependencies.

## Preview

From this directory, run `python -m http.server 4173 --bind 127.0.0.1` and open http://127.0.0.1:4173.

## Editing

- `index.html`: biography, projects, experience, skills, and contact links.
- `assets/style.css`: shared layout and responsive styles.
- `assets/main.js`: keyboard-accessible project tabs, illustrative canvas animations, and mobile navigation.
- `articles/*.html`: original technical articles, with shared styles in `assets/article.css`.

The VisionLog panel shows actual YOLO26n output captured using the app’s browser detector and shared overlay renderer. `assets/visionlog-detections.json` records the source, configuration, and unmodified detections. It is a captured still frame, not a live feed. The other systems-lab panels are illustrative animations with synthetic data. Its links open the deployed projects. Reduced-motion preferences pause the animation; visitors can explicitly play it. Content, project details, and links remain usable without JavaScript.

Publish through the repository's existing GitHub Pages configuration after reviewing the redesign.
