import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserProfileSchema1794547842978 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                    new Table({
                        name : 'user_profiles',
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
                                isUnique : true
                            },
        
                            {
                                name : 'first_name',
                                type : 'varchar',
                                isNullable : false,
                            },
        
                            {
                                name : 'last_name',
                                type : 'varchar',
                                isNullable : true,
                            },
                            {
                                name : 'age',
                                type : 'integer',
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
                                name: 'fk_user_profile',
                                columnNames :['user_id'],
                                referencedColumnNames : ['id'],
                                referencedTableName : 'users'
                            }
                        ]
                    })
                )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('user_profiles', 'fk_user_profile');
        await queryRunner.dropTable('user_profiles')
    }

}
