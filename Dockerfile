# syntax=docker/dockerfile:1
FROM node:17.6.0 AS base

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn
COPY . .

FROM base as testing
ENV NODE_ENV testing
CMD ["yarn", "test:cov"] 

FROM base as production
ENV NODE_ENV production
RUN yarn build
CMD ["node", "dist/main"]
