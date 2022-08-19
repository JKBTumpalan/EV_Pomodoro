# Build off of the alpine image to keep this image as small as possible

# Build this image with: `docker build -t patterns-api .`
# Run this image with: `docker run -p 9000:9000 -it --name patterns-api --rm patterns-api`

FROM node:8-alpine

RUN mkdir -p /api-src
WORKDIR /api-src

# Copy package.json into the image and install before copying everything else
COPY package.json /api-src
RUN npm install --quiet

COPY ./ /api-src

# RUN npm run migrate

CMD [ "node", "main.js" ]
