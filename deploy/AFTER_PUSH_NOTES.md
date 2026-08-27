## Hostinger quick-deploy: notes

I pushed Docker and nginx setup for quick deploy to Hostinger VPS (server2069). Since you asked for the shortest path, I added:

- Dockerfile
- docker-compose.yml (app + nginx)
- deploy/nginx.conf (reverse proxy to app)
- deploy/HOSTINGER_DEPLOY.md (step-by-step quick deploy commands)

What I did now:
- Added the files above to the repository and pushed them to main.

Next steps I can take if you want me to continue:
- If you provide SSH credentials (private via secure channel), I can SSH into the host, install Docker, and run `docker compose up -d --build` and verify the site.
- Alternatively, you can follow the steps in deploy/HOSTINGER_DEPLOY.md to run them yourself.

Security note: Do NOT post private SSH keys, passwords, or other secrets in this chat. If you want me to SSH in, provide credentials through a secure channel arranged by you.
