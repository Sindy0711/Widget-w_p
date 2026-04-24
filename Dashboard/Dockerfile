FROM node:20-alpine
WORKDIR /app
ARG VITE_WEATHER_API_KEY
ENV VITE_WEATHER_API_KEY=$VITE_WEATHER_API_KEY

COPY package*.json ./ 
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]