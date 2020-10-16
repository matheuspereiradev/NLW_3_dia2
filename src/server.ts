import express from 'express'
import 'express-async-errors'
import './database/connection'
const app = express();
import routes from './routes'
import path from 'path'
import cors from 'cors'


import handler from './errors/handler'

app.use(express.json());

app.post('/usuarios', (req,res)=>{
    //console.log(req.body)
    //console.log(req.params)
    //console.log(req.query)
    return res.json({
        nome:'matheus'
    })
});

app.use(routes)
app.use('/uploads',express.static(path.join(__dirname, '..' ,'uploads')))
app.use(handler)//trtar os erros
app.use(cors())//pra cessar de diferentes locais
//query params localhost/usuario?nome=valor&nome2=valor2  request.query
//route params DELETE localhost/usuario/1                 request.params         /usr/:id
//body vem de form                                        request.body   

app.listen(3030);

//para oserver rodar foi necessario adicionar
/*
-yarn add express
-yarn add @types/express -D (a tipagem do express)
-yarn add typescript -D (o typescript)
-yarn tsc --init (iniciar o typescript gerando o tsconfig.json e la mudei o targer "target": "es2017",)
- yarn add ts-node-dev -D (pra rodar pq o node nao roda nao dapra dar node src/server.ts or causa da extençao)
-yarn add type
la no script eu criei
"dev":"ts-node-dev --transpile-only src/server.ts"->pra rodar
--transpile-only    esse serve pra nao ver erros
--ignore-watch node_modules  nao observa arquivos de la(deixa mais rapido)
-typeorm gerenciador
e sqlite3
"strictPropertyInitialization": false no tsconfig.json
*/


//yarn typeorm migration:create -n create_orfanatos
//yarn typeorm migration:run
//yarn typeorm migration:revert