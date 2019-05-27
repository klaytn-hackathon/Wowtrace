FROM keymetrics/pm2:latest-alpine

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production
RUN npm install -g node-gyp @adonisjs/cli

CMD [ "pm2-runtime", "start", "pm2.json" ]