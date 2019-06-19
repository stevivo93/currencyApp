# base image
FROM node:latest

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy all files from current directory to docker
COPY package.json /usr/src/app

# install app dependencies
RUN npm install

ADD src /usr/src/app/src
ADD public /usr/src/app/public

RUN npm build

# start app
CMD ["npm","start"]