# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app

## add `/app/node_modules/.bin` to $PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install @vue/cli@3.7.0 -g
COPY tsconfig.json /app/tsconfig.json
COPY . /app

ENV NODE_ENV="production"

# start app
CMD ["npm", "run", "serve"]
