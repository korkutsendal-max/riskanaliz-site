/**
 * Temporarily disable the App Router to avoid route conflicts while we stabilize the deployment.
 * Next.js will use the legacy `pages/` router when `experimental.appDir` is set to false.
 *
 * NOTE: This is a pragmatic repo-only fix so the site can build and run. We can later
 * re-enable the App Router (remove this file or set appDir: true) and fully migrate to app/.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false
  }
}

module.exports = nextConfig
