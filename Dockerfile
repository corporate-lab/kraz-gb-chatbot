# Start of Selection
FROM --platform=linux/amd64 node:19-bullseye-slim

WORKDIR /app

# Copy package.json
COPY package.json ./

# Instala las dependencias
RUN yarn install

# Copy the rest of the application
COPY . .

# Build the application
RUN yarn build

# Usa la variable PORT del entorno, con 3000 como valor por defecto
ENV PORT=${PORT:-3000}
ENV PORTTEST=${PORTTEST:-3001}

# Exponer ambos puertos
EXPOSE ${PORT}
EXPOSE ${PORTTEST}

CMD ["yarn", "start"]
# End of Selection