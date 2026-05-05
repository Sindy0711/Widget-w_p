FROM node:20-alpine AS base
WORKDIR /app

COPY package*.json ./ 
RUN npm ci

FROM base AS development
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

FROM base AS build
ARG VITE_WEATHER_API_KEY
ENV VITE_WEATHER_API_KEY=$VITE_WEATHER_API_KEY
COPY . .
RUN npm run build

FROM nginx:stable-alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
