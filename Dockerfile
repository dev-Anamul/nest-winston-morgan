
# base image
FROM node:20-alpine

# set up work directory
WORKDIR /usr/src/app

# copy package and lock file
COPY package.json yarn*.lock ./

# install dependencies
RUN yarn install --frozen-lockfile --verbose

# copy all other files
COPY . .

# install nest cli
RUN yarn global add @nestjs/cli

# expose the port
EXPOSE 3000

# run the dev server
CMD yarn start:dev
