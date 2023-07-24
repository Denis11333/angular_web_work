# Використовуємо базовий образ Node.js для збірки
FROM node:18 as builder

# Встановлюємо робочу директорію в контейнері
WORKDIR /app

# Копіюємо файли package.json та package-lock.json у робочу директорію контейнера
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо решту файлів додатку у робочу директорію контейнера
COPY . .

# Збираємо додаток Angular
RUN npm run build

# Використовуємо базовий образ Nginx для розгортання
FROM nginx:1.21

# Копіюємо скомпільовані файли додатку Angular у директорію Nginx
COPY --from=builder /app/dist/* /usr/share/nginx/html/

# Конфігуруємо Nginx для маршрутизації запитів до Angular додатку
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Встановлюємо порт, на якому працює Nginx
EXPOSE 4200

# Команда запуску вебсервера Nginx
CMD ["nginx", "-g", "daemon off;"]
