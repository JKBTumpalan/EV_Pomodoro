FROM node:16-alpine3.11

WORKDIR /pomodoro-app

COPY package*.json ./
COPY yarn.lock ./

RUN npm install --quiet

COPY . .

CMD ["yarn", "start"]