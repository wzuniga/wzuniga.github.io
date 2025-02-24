# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR ./portfolio

# Copiar el archivo package.json y package-lock.json al directorio de trabajo
COPY ./portfolio/package*.json ./

# Install the application dependencies
RUN npm install --force

COPY ./portfolio .

# Build the React application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Define the entry point for the container
CMD ["npm", "start"]
