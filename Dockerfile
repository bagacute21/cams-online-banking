# FROM mhart/alpine-node:11 AS builder
# WORKDIR /app
# COPY . .
# RUN yarn run build

# FROM mhart/alpine-node
# RUN yarn global add serve
# WORKDIR /app
# COPY --from=builder /app/build .
# CMD ["serve", "-p", "80", "-s", "."]


# base image
FROM node:12.2.0-alpine

VOLUME /tmp

# set working directory
WORKDIR /app

# add /app/node_modules/.bin to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
COPY src /app/src
COPY public /app/public
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

# start app
CMD ["npm", "start"]
