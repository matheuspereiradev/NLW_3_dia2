import {ErrorRequestHandler} from 'express'
import {ValidationError} from 'yup'

interface Validation {
    [key:string]:string[]
}

const errorHandler:ErrorRequestHandler = function(erro,req,res,next){
    if(erro instanceof ValidationError){
        let erros:Validation = {}

        erro.inner.forEach(err=>{
            erros[err.path] = err.errors;
        })

        res.status(400).json({mensage:'erros de validaçao',erros})
    }

    console.error(erro)
    return res.status(505).json({message:'Internal server error'})
}

export default errorHandler;