# syntax=docker/dockerfile:1.7

# === Stage 1: Build ===
FROM node:22-alpine AS build
RUN corepack enable && corepack prepare pnpm@10.18.3 --activate
WORKDIR /app

ARG API_TOKEN
ENV API_TOKEN=$API_TOKEN
ARG API_BASE
ENV API_BASE=$API_BASE
ARG SITE_URL
ENV SITE_URL=$SITE_URL

COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# === Stage 2: Serve ===
FROM nginx:alpine AS serve
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
