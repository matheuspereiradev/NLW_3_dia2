import {Router} from 'express'
import multer from 'multer'

import uploadConfig from './config/upload'

const rotas = Router();
const upload = multer(uploadConfig);

import OrfanatosContoller from './controller/orfanatosContoller'


rotas.post('/orfanatos',upload.array('images'),OrfanatosContoller.create );
rotas.get('/orfanatos',OrfanatosContoller.index );
rotas.get('/orfanatos/:id',OrfanatosContoller.show );

export default rotas;