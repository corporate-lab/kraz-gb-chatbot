FROM --platform=linux/amd64 node:19-bullseye-slim

WORKDIR /app

# Instalar herramientas de compilación
RUN apt-get update && apt-get install -y python3 make g++

# Copiar package.json y yarn.lock
COPY package.json ./

# Instalar dependencias
RUN yarn install

COPY prisma ./prisma
RUN npx prisma generate

# Copiar el resto de la aplicación
COPY . .

# Construir la aplicación
RUN yarn build

# Exponer el puerto
EXPOSE 3000

CMD ["yarn", "start"]