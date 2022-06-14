# syntax=docker/dockerfile:1

# Build Stage
FROM node:fermium-alpine AS builder

WORKDIR /home/build/app

COPY package.json yarn.lock tsconfig.json jest.config.js ./
COPY ./src/ ./src

RUN yarn install --frozen-lockfile --non-interactive --quiet

RUN yarn lint:build
RUN yarn test
RUN yarn build

# Production Run Stage
FROM node:fermium-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package.json yarn.lock ./
COPY --from=builder /home/build/app/dist ./dist

RUN yarn --production --quiet

CMD ["yarn", "start"]
