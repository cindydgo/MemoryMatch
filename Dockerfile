# Étape 1 : build de l'app
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . ./
RUN npm run build

# Étape 2 : serveur pour les fichiers statiques
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
