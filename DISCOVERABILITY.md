# Discoverability and domain setup

Every public page has an absolute canonical URL, Open Graph and Twitter card metadata, and Person/WebSite/Article structured data as appropriate. The shared PNG is 1200x630 with a matching SVG source. Robots and sitemap cover the homepage and four articles. These help crawlers understand the site; they do not guarantee indexing, rankings or a specific iPhone preview. Messaging apps may cache older previews.

## Domain recommendation

Prefer `ethanjones.dev`: short, name-based and aligned with software engineering. `ethanjonesml.com` is a reasonable fallback. On 2026-09-12 the Google .dev registry RDAP endpoint returned404 for ethanjones.dev; Verisign returned404 for ethanjonesml.com. This is not a guarantee of availability or a price quote; confirm registration availability before purchase. No domain was purchased or connected.

A domain-name keyword alone has little ranking benefit. Keep detailed project articles, descriptive titles, source links and fast mobile pages. References: https://developers.google.com/search/docs/fundamentals/seo-starter-guide and https://developer.apple.com/videos/play/tech-talks/205/ .

## Once the owner selects and owns a domain

1. Verify the domain in GitHub Pages settings and configure its DNS using GitHub's current official guidance. Enable HTTPS.
2. Set the Pages custom domain/CNAME only when DNS and ownership are ready. Do not point the live site at an unowned domain.
3. Update all canonical/og:url/social-image/JSON-LD references and sitemap/robots URLs together. Preserve article paths.
4. Verify redirects, HTTPS, static social metadata and image fetches, mobile layouts and video loops.
5. Verify the site in Google Search Console and submit the sitemap. Monitor indexing and redirects after migration.

Current primary URL: https://ethanjgithub.github.io/ .
