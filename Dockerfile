FROM node:18-alpine

EXPOSE 3000 9229

WORKDIR /home/app

COPY package.json .
COPY yarn.lock .

# RUN npm i -g yarn

# Should be install --prod only and build outside maybe?
RUN yarn install

COPY . .

RUN npm run build

CMD ./scripts/start.sh