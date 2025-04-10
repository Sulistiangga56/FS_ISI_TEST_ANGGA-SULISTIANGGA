# Gunakan image Node resmi
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json terlebih dahulu
COPY package*.json ./

# Install ulang dependensi dari dalam container
RUN npm install

# Copy semua file project
COPY . .

# Jalankan dev server
CMD ["npm", "run", "dev"]
