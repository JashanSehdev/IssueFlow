import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class WorkspaceMemberSchema1794556065272 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                                    new Table({
                                        name : 'workspace_members',
                                        columns : [
                                            {
                                                name : 'id',
                                                type : 'integer',
                                                isPrimary: true,
                                                isGenerated : true,
                                                generationStrategy: 'increment'
                                            },
                                            {
                                                name : 'user_id',
                                                type : 'integer',
                                            },
                        
                                            {
                                                name : 'workspace_id',
                                                type : 'integer',
                                            },
                        
                                            {
                                                name : 'role',
                                                type : 'enum',
                                                enum :['administrator', 'member'],
                                                enumName: 'member_role_enum',
                                                default : "'member'"
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
                                                name: 'fk_member_user',
                                                columnNames :['user_id'],
                                                referencedColumnNames : ['id'],
                                                referencedTableName : 'users'
                                            },
                                            {
                                                name: 'fk_user_workspace',
                                                columnNames :['workspace_id'],
                                                referencedColumnNames : ['id'],
                                                referencedTableName : 'workspaces'
                                            }
                                        ],

                                        uniques : [
                                            {
                                                name : 'uq_user_workspace',
                                                columnNames : ["user_id", "workspace_id"]
                                            }
                                        ]
                                    })
                                )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('workspace_members', 'fk_member_user');
        await queryRunner.dropForeignKey('workspace_members', 'fk_user_workspace');
        await queryRunner.dropTable('workspace_members')
    }

}
