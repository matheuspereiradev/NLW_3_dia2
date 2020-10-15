import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrfanatos1602635451207 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //altera o banco
        await queryRunner.createTable(new Table({
            name:'orfanatos',
            columns:[{
                name:'id',
                type:'integer',
                unsigned:true,
                isPrimary:true,
                isGenerated:true,
                generationStrategy:'increment'
            },{
                name:'nome',
                type:'varchar'
            },{
                name:'latitude',
                type:'decimal',
                scale:10,
                precision:2
            },{
                name:'longitude',
                type:'decimal',
                scale:10,
                precision:2
            },{
                name:'sobre',
                type:'text'
            },{
                name:'abre_as',
                type:'varchar'
            },{
                name:'instrucoes',
                type:'text'
            },{
                name:'aberto_final_semana',
                type:'boolean',
                default:false
            }]
        })
    )}

    public async down(queryRunner: QueryRunner): Promise<void> {
        //desfaz o up
        await queryRunner.dropTable('orfanatos')
    }

}
