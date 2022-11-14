FROM node:16-alpine AS build
WORKDIR /app
RUN apk update && apk add --no-cache tzdata
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY . .
RUN corepack enable
RUN corepack prepare pnpm@7.11.0 --activate
RUN pnpm install
RUN pnpm build
RUN pnpm prune --prod
ENV NODE_ENV production

FROM ghcr.io/puppeteer/puppeteer:latest AS production
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
CMD [ "node", "dist/index.js" ]