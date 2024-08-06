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

EXPOSE 3000

CMD ["yarn", "start"]
# End of Selection