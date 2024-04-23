FROM node

WORKDIR /apple-store-mza

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]