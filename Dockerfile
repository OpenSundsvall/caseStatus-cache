FROM node:lts
WORKDIR /openecache
COPY . .
RUN npm config set registry https://nexus.sundsvall.se/repository/npm_proxy/
RUN npm install
ENTRYPOINT npm run dev
EXPOSE 3000