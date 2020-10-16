import Orfanato from '../database/models/Orfanatos'
import imagensView from '../views/imagensView'

export default{
    render(orfanato:Orfanato){
        return {
            id:orfanato.id,
            nome:orfanato.nome,
            latitude:orfanato.latitude,
            longitude:orfanato.longitude,
            sobre:orfanato.sobre,
            abre_as:orfanato.abre_as,
            instrucoes:orfanato.instrucoes,
            aberto_final_semana:orfanato.aberto_final_semana,
            imagens:imagensView.renderMany(orfanato.imagens)
        }
    },

    renderMany(orfanatos:Orfanato[]){
        return orfanatos.map(orfanato=>this.render(orfanato))
    }
}