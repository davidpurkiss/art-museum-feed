# syntax=docker/dockerfile:1

# Build Stage
FROM node:fermium-alpine AS builder

WORKDIR /home/build/app

COPY ./ ./

RUN yarn install --frozen-lockfile --non-interactive --quiet

RUN yarn lint
RUN yarn test
RUN yarn build

# Production Run Stage
FROM node:fermium-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package.json next.config.js yarn.lock ./
COPY --from=builder /home/build/app/.next ./.next

RUN yarn --production --quiet

CMD ["yarn", "start"]
