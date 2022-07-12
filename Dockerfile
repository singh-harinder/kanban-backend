FROM node:16-alpine3.16

ARG FRONTEND_URL
ARG COOKIE_SECRET
ARG CLOUDINARY_CLOUD_NAME
ARG CLOUDINARY_KEY
ARG CLOUDINARY_SECRET

RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]
EXPOSE 3000

RUN mkdir /app && chown -R node:node /app
WORKDIR /app
COPY --chown=node:node package.json package-lock.json ./
RUN npm install --force 
COPY --chown=node:node . ./
RUN npm run postinstall-keystone


USER node
CMD ["npm", "run", "dev"]