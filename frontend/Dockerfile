# # Use an official node image as the base image
# FROM node:18-alpine


# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# RUN npm install

# COPY . .

# # Expose the port the app runs on
# EXPOSE 5173

# # Command to run the application
# CMD ["npm", "run", "dev"]`


# Use an official Node.js image as the base image for building the app
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite application
RUN npm run build

# Use a lightweight web server to serve the app
FROM nginx:alpine

# Copy the build output to the Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 3000 for the web server
EXPOSE 3000

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]