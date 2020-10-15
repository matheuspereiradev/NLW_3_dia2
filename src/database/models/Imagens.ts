import{Entity,Column,PrimaryGeneratedColumn,ManyToOne,JoinColumn} from 'typeorm'
import './Orfanatos'
import Orfanato from './Orfanatos';

@Entity('imagens')
export default class Imagem{
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    path:string;
    //esse aqui aponta para o campo imagens lado orfanto
    @ManyToOne(()=>Orfanato, orfanato=>orfanato.imagens)
    @JoinColumn({name:'orfanato_id'})
    orfanato:Orfanato;
}