FROM node:20

WORKDIR /usr/src/app

# to update minor version patches
RUN npm install -g npm

ENV PORT=8080
EXPOSE 8080

CMD [ "npm", "start" ]