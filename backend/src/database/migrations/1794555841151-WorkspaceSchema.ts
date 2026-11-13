import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class WorkspaceSchema1794555841151 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.createTable(
                            new Table({
                                name : 'workspaces',
                                columns : [
                                    {
                                        name : 'id',
                                        type : 'integer',
                                        isPrimary: true,
                                        isGenerated : true,
                                        generationStrategy: 'increment'
                                    },
                                    {
                                        name : 'title',
                                        type : 'varchar',
                                    },
                
                                    {
                                        name : 'description',
                                        type : 'text',
                                        isNullable : true,
                                    },
                
                                    {
                                        name : 'created_by',
                                        type : 'integer',
                                        isNullable: false
                                    },
        
                                    {
                                        name : 'created_at',
                                        type : 'timestamp',
                                        default : 'CURRENT_TIMESTAMP'
                                    }, 
                
                                    {
                                        name : 'updated_at',
                                        type : 'timestamp',
                                        default : 'CURRENT_TIMESTAMP'
                                    }
                                ],
                                foreignKeys: [
                                    {
                                        name: 'fk_user_workspace',
                                        columnNames :['created_by'],
                                        referencedColumnNames : ['id'],
                                        referencedTableName : 'users'
                                    }
                                ]
                            })
                        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('workspaces', 'fk_user_workspace');
        await queryRunner.dropTable('workspaces')
    }

}
