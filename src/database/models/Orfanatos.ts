import{Entity,Column,PrimaryGeneratedColumn, OneToMany,JoinColumn} from 'typeorm'
import Imagem from './Imagens';

@Entity('orfanatos')
export default class Orfanatos{
    @PrimaryGeneratedColumn('increment')
    id:number;
    @Column()
    nome:string;
    @Column()
    latitude:number;
    @Column()
    longitude:number;
    @Column()
    sobre:string;
    @Column()
    abre_as:string;
    @Column()
    instrucoes:string;
    @Column()
    aberto_final_semana:boolean;

    //apornta la pro orfanato na imagem
    @OneToMany(()=>Imagem, imagem=> imagem.orfanato,{
        cascade:['insert','update']
    })
    @JoinColumn({name:'orfanato_id'})
    imagens:Imagem[];
}