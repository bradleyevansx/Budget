# Stage 1: Build the Angular application
FROM node:slim@sha256:dfb18d8011c0b3a112214a32e772d9c6752131ffee512e974e59367e46fcee52 AS build
WORKDIR /app

# Copy package configuration files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application for production (including SSR server)
# The output path is defined in angular.json as dist/front
RUN npm run build

# Stage 2: Setup the production environment using Node.js server
FROM node:slim
WORKDIR /app

# Copy package.json to install only production dependencies
COPY package.json package-lock.json* ./
RUN npm install --omit=dev

# Copy the built application output from the build stage
COPY --from=build /app/dist/front ./dist/front

# Expose the port the Node server will run on (default is 4000 from server.ts)
EXPOSE 4000

# Command to run the server
# This matches the "serve:ssr:Front" script in package.json
CMD ["node", "dist/front/server/server.mjs"]