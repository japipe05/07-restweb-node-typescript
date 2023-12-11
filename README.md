> npm init -y
* Node con TypeScript - TS-Node-dev (preferido)
https://gist.github.com/Klerith/3ba17e86dc4fabd8301a59699b9ffc0b

> npm i -D typescript @types/node ts-node-dev rimraf
> npx tsc --init --outDir dist/ --rootDir src

"dev": "tsnd --respawn --clear src/app.ts",
  "build": "rimraf ./dist && tsc",
  "start": "npm run build && node dist/app.js"

Crear Keys //debe de tener git y el path en enviromentes  D:\Aplicaciones\Git\usr\bin

> openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt

> npm i dotenv env-var


# Base de datos postgres 
> docker compose up -d


# Trabajar con prisma
>npm install prisma --save-dev

> npx prisma init --datasource-provider postgresql

>npx prisma migrate dev --name init

readme 3