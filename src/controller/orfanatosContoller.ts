import {Request,Response} from 'express'
import { getRepository } from 'typeorm'
import Orfanatos from '../database/models/Orfanatos'
import orfanatoView from '../views/orfanatoView'

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

          const orfanato = orfanatosRepository.create({
            nome,
            latitude,
            longitude,
            sobre,
            abre_as,
            instrucoes,
            aberto_final_semana,
            imagens
          })
          await orfanatosRepository.save(orfanato)

          return res.status(201).json(orfanato) 
    }
}