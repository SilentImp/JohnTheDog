FROM node:lts-alpine@sha256:5edad160011cc8cfb69d990e9ae1cb2681c0f280178241d58eba05b5bfc34047 AS build
RUN mkdir -p /var/app && chown -R node /var/app
ENV NODE_ENV production
WORKDIR /var/app
COPY . .
RUN npm ci --only=production --silent
RUN npm run build

FROM node:lts-alpine@sha256:5edad160011cc8cfb69d990e9ae1cb2681c0f280178241d58eba05b5bfc34047
RUN apk add --update bash curl && rm -rf /var/cache/apk/*
ENV NODE_ENV production
USER node
WORKDIR /var/app
COPY --chown=node:node --from=build /var/app/node_modules /var/app/node_modules
COPY --chown=node:node --from=build /var/app/.next /var/app/.next
COPY --chown=node:node --from=build /var/app/public /var/app/public
COPY --chown=node:node --from=build /var/app/package.json /var/app/package.json

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s CMD curl --fail http://0.0.0.0:3000 || exit 1

CMD "npm" "start"
