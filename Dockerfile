FROM node:8.9.1
RUN npm install -g typescript@2.4.2 grunt-cli forever
COPY ./server /root/line-flex-editor/server
WORKDIR /root/line-flex-editor/server
RUN npm install && tsc
COPY ./client /root/line-flex-editor/client
WORKDIR /root/line-flex-editor/client
RUN npm install && npm run-script build
CMD node /root/line-flex-editor/server/src/App.js