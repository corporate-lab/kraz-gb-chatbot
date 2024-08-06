FROM --platform=linux/amd64 node:19-bullseye-slim

WORKDIR /app

# Copia package.json y yarn.lock
COPY package.json yarn.lock ./

# Instala las dependencias
RUN yarn install

# Copia el resto de la aplicación
COPY . .

# Construye la aplicación
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]