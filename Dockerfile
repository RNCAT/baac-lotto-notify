FROM node:16.13.2-alpine
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN yarn workspaces focus --production
CMD [ "yarn", "start" ]