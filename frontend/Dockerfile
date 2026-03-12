# ---------- Stage 1: Build ----------
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Change this line in your Dockerfile
ARG VITE_REDIRECT_URI=https://fitly-ai.duckdns.org/
ENV VITE_REDIRECT_URI=$VITE_REDIRECT_URI

RUN npm run build


# ---------- Stage 2: Serve ----------
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]