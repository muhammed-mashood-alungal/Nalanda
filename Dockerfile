FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# build the project (creates dist/)
RUN npm run build

# expose port
EXPOSE 9000

# run compiled app
CMD ["node", "dist/server.js"]
