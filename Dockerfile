FROM node:23-slim

RUN apt-get update && apt install -y git

WORKDIR /app-frontend

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "build"]

