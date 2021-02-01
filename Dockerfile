FROM node:10

EXPOSE 5000

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN mkdir /app
WORKDIR /app
ADD package.json /app/
ADD yarn.lock /app/
RUN yarn --pure-lockfile
ADD . /app

CMD ["yarn", "start"]