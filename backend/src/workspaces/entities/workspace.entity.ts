import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, type Relation, UpdateDateColumn, VirtualColumn } from "typeorm";
import { User } from "../../users/entities/users.entity.js";
import { WorkspaceMember } from "../../workspace_members/entities/workspace_member.entity.js";

@Entity('workspaces')
export class Workspace {

    @PrimaryGeneratedColumn()
    id : number

    @Column({type : 'varchar'})
    title : string

    @Column({type : 'text', nullable: true})
    description: string

    @Column({type : 'integer'})
    created_by : number

    @VirtualColumn({
        query: (alias) => `
            SELECT COUNT(*)::int
            FROM workspace_members wm
            WHERE wm.workspace_id = ${alias}."id"
        `
    })
    total_members: number;

    @CreateDateColumn()
    created_at : Date

    @UpdateDateColumn()
    updated_at : Date

    @ManyToOne(() => User, (user) => user.Created_Workspaces)
    @JoinColumn({name :'created_by'})
    CreatedBy : Relation<User>

    @OneToMany(() => WorkspaceMember, (workspaceMember) => workspaceMember.WorkSpace)
    Members : Relation <WorkspaceMember[]>

    

}
