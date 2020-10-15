import {Request,Response} from 'express'
import { getRepository } from 'typeorm'
import Orfanatos from '../database/models/Orfanatos'

export default{
    async index(req:Request,res:Response){
      const orfanatosRepository = getRepository(Orfanatos) //aponta para o model orfanatos
      const orfanatos = await orfanatosRepository.find()
      return res.json(orfanatos)
    },

    async show(req:Request,res:Response){

      const {id} = req.params

      const orfanatosRepository = getRepository(Orfanatos)
      const orfanato = await orfanatosRepository.findOneOrFail(id)
      return res.json(orfanato)
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

          const orfanato = orfanatosRepository.create({
            nome,
            latitude,
            longitude,
            sobre,
            abre_as,
            instrucoes,
            aberto_final_semana
          })
          await orfanatosRepository.save(orfanato)

          return res.status(201).json(orfanato) 
    }
}