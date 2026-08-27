## SEO & design improvements added

I updated the project to improve SEO and the application form UX. Changes pushed:

- components/SEO.js: centralized meta tags, Open Graph, Twitter Card and JSON-LD organization data
- pages/_app.js: injects default SEO headers
- pages/_document.js: sets lang and charset
- pages/apply.js: redesigned form page with validation, file preview, and clearer layout
- pages/sitemap.xml.js: dynamic sitemap endpoint at /sitemap.xml
- public/robots.txt: robots + sitemap

Next recommended steps:
- Add Open Graph image (public/og-image.png) and logo (public/logo.png)
- Add reCAPTCHA v2/v3 on the apply form (server-side verification in API)
- Configure SMTP credentials in .env on the server
- Test /apply form and check email delivery

