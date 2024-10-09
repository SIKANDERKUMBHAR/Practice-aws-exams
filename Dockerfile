# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the application (for production)
RUN npm run build

# Stage 2: Serve the application
FROM node:18-alpine AS runner

# Set the working directory inside the container
WORKDIR /app

# Copy the production build from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port the Next.js app will run on
EXPOSE 3000

# Set the command to start the Next.js app in production mode
CMD ["npm", "run", "start"]
