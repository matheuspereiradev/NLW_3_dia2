import express from 'express';

const app = express();

app.listen(3030);

//para oserver rodar foi necessario adicionar
/*
-yarn add express
-yarn add @types/express -D (a tipagem do express)
-yarn add typescript -D (o typescript)
-yarn tsc --init (iniciar o typescript gerando o tsconfig.json e la mudei o targer "target": "es2017",)
- yarn add ts-node-dev -D (pra rodar pq o node nao roda nao dapra dar node src/server.ts or causa da extençao)
*/