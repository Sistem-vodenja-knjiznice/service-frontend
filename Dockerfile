# Stage 1: Build the React app
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the application code and build for production
COPY . ./
RUN npm run build

# Stage 2: Production environment
FROM nginx:alpine AS production

# Copy the production build artifacts
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default NGINX port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
