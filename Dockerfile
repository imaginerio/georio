FROM node:10

EXPOSE 5000

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN apt-get update && apt-get install -y postgresql-client

RUN mkdir /app
WORKDIR /app
ADD package.json /app/
RUN yarn --pure-lockfile
ADD . /app

CMD ["yarn", "start"]
