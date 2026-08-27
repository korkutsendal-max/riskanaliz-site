# RiskAnaliz Pro - Dev notes

This commit adds a TypeScript + App Router scaffold, Tailwind, React Hook Form + Zod-based application form, Lucide icons, and a Prisma schema placeholder. The API route for handling form submissions is kept in pages/api/apply.ts to simplify multipart handling using formidable.

Next steps (recommended):
- Add SMTP credentials to the server .env and test using /api/email-test (not implemented yet).
- Add OG image and logo at public/og-image.png and public/logo.png
- Enable reCAPTCHA and rate-limiting for the apply form.
- Optionally move API to App Router when multipart parsing approach is finalized.

