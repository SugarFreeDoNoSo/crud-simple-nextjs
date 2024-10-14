# Usar la imagen base de Node.js 20
FROM node:20

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install -g bun
RUN bun install

# Copiar el resto del código de la aplicación
COPY . .

# Generar el cliente de Prisma
RUN bunx prisma generate

# Construir la aplicación Next.js
RUN bun run build

# Exponer el puerto en el que corre la aplicación (por defecto 3000)
EXPOSE 3000

# CMD ["bun", "run", "dev"]