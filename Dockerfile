FROM node
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD [ 'cross-env', 'NODE_ENV=production', "node", 'server.js' ]