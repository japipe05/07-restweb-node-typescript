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


> npm i --save-dev @types/compression

# Test

https://gist.github.com/Klerith/98d7b1bc0f1525e892f260813cad1007

>npm install -D jest @types/jest ts-jest supertest
>npx jest --init

En el archivo jest.config.js configurar

preset: 'ts-jest',
testEnvironment: "jest-environment-node",

npm i --save-dev @types/supertest

npm i dotenv-cli