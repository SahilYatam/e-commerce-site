# ---- Base image ----
FROM node:20-alpine AS build

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy the rest of the source
COPY . .

# Expose app port
EXPOSE 8000

CMD [ "node", "src/server.js" ]
