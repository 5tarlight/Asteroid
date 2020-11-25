FROM node

WORKDIR /usr/app

COPY package*.json ./
COPY yarn*.lock ./

RUN npm install yarn -g --force
RUN yarn

COPY . .

RUN yarn build

WORKDIR ./dist
CMD node index.js