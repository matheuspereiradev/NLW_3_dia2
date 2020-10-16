import {Request,Response} from 'express'
import { getRepository } from 'typeorm'
import Orfanatos from '../database/models/Orfanatos'
import orfanatoView from '../views/orfanatoView'

import * as Yup from 'yup'

export default{
    async index(req:Request,res:Response){
      const orfanatosRepository = getRepository(Orfanatos) //aponta para o model orfanatos

      //ele da find e ele da um join razendo as relaçoes de imagens que é a coluna definida no model
      const orfanatos = await orfanatosRepository.find({
        relations:['imagens']
      })
      return res.json(orfanatoView.renderMany(orfanatos))
    },

    async show(req:Request,res:Response){

      const {id} = req.params

      const orfanatosRepository = getRepository(Orfanatos)
      const orfanato = await orfanatosRepository.findOneOrFail(id,{
        relations:['imagens']
      })
      return res.json(orfanatoView.render(orfanato))//chama a view pq ela vai tratar como eses dados devem ser retornados
    },

    async create(req:Request,res:Response){
        const{
            nome,
            latitude,
            longitude,
            sobre,
            abre_as,
            instrucoes,
            aberto_final_semana
          }=req.body; 

          const orfanatosRepository = getRepository(Orfanatos) //aponta para o model orfanatos

          const requestImages = req.files as Express.Multer.File[];

          const imagens = requestImages.map( imagem =>{
            return {
              path:imagem.filename
            }
          })

          const dados={
            nome,
            latitude,
            longitude,
            sobre,
            abre_as,
            instrucoes,
            aberto_final_semana,
            imagens
          }

          const padrao = Yup.object().shape({
            nome:Yup.string().required('nome é obrigatorio'),
            latitude:Yup.number().required(),
            longitude:Yup.number().required(),
            sobre:Yup.string().required().max(300),
            abre_as:Yup.string().required(),
            instrucoes:Yup.string().required(),
            aberto_final_semana:Yup.boolean().required(),
            imagens:Yup.array(Yup.object().shape({
              path:Yup.string().required()
            }))
          })
          //abortEarly exibe todos os erros
          await padrao.validate(dados,{
            abortEarly:false
          })

          const orfanato = orfanatosRepository.create(dados)
          await orfanatosRepository.save(orfanato)

          return res.status(201).json(orfanato) 
    }
}