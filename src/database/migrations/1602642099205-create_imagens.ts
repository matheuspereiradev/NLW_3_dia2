import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImagens1602642099205 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:'imagens',
            columns:[{
                name:'id',
                type:'integer',
                unsigned:true,
                isPrimary:true,
                isGenerated:true,
                generationStrategy:'increment'
            },{
                name:'path',
                type:'varchar'
            },{
                name:'orfanato_id',
                type:'integer'
            }],
            foreignKeys:[
                {
                    name: 'imagemOrfanato',
                    columnNames:['orfanato_id'],
                    referencedTableName:'orfanatos',
                    referencedColumnNames:['id'],
                    onUpdate:'CASCADE',
                    onDelete:'CASCADE'
                }
            ]

        })
    )}
//CASCADE SERVE PRA SE MUDAR LA OU EXCLUIR ELE EXCLUI AQ TMB
    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
