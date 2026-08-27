# Dockerfile for production build

FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies (use npm install to avoid requiring package-lock.json)
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Production image
FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV=production

# Install only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy build artifacts and required files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env ./.env

EXPOSE 3000
CMD ["npm", "start"]
