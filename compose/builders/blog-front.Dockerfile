ARG MONOREPO_VERSION=main
FROM greenpress/monorepo:${MONOREPO_VERSION} as base

FROM node:15.14-alpine
ENV THEME=damal
ENV PORT=3000
ENV NODE_ENV=production
EXPOSE $PORT
ADD --from=base /apps/blog-front/greenpress-blog-front.tgz .
WORKDIR /package
CMD npm start
