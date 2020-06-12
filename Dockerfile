# base image
FROM node:12.16.3

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

# set working directory
WORKDIR /foodstore

# add `/foodstore/node_modules/.bin` to $PATH
ENV PATH /foodstore/node_modules/.bin:$PATH

# install and cache dependencies
COPY package.json /foodstore/package.json
RUN npm install
RUN npm install -g @angular/cli@^9.1.8

# add foodstore
COPY . /foodstore

# start foodstore
CMD ng serve --host 0.0.0.0
