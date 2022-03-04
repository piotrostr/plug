# syntax=docker/dockerfile:1
FROM node:17.6.0 AS base

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock

FROM base as testing
ENV NODE_ENV testing
RUN yarn
COPY . .
CMD ["yarn", "test:cov"] 

FROM base as production
ENV NODE_ENV production
RUN yarn
COPY . .
CMD ["yarn", "start:prod"]
