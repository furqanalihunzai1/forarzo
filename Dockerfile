FROM node:16

RUN npm install -g sequelize-cli
COPY package.json .
RUN npm install
RUN npm rebuild bcrypt --build-from-source

COPY . .
EXPOSE 3000
CMD ["sh", "-c", "sequelize db:migrate && npm run dev"]

