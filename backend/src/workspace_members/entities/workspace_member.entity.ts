import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, type Relation, Unique, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/users.entity.js";
import { MemberRole } from "../enum/member-role.enum.js";
import { Workspace } from "../../workspaces/entities/workspace.entity.js";

@Entity('workspace_members')
@Unique(['user_id', 'workspace_id'])
export class WorkspaceMember {

    @PrimaryGeneratedColumn()
    id : number

    @Column({type : 'integer'})
    user_id : number

    @Column({type : 'integer'})
    workspace_id : number

    @Column({type : 'enum', enum :MemberRole, default : MemberRole.MEMBER})
    role : MemberRole

    @CreateDateColumn()
    created_at : Date

    @UpdateDateColumn()
    updated_at : Date

    @ManyToOne(() => User, (user) => user.Workspaces)
    @JoinColumn({name :'user_id'})
    Member : Relation<User>

    @ManyToOne(() => Workspace, (workspace) => workspace.Members)
    @JoinColumn({name :'workspace_id'})
    WorkSpace : Relation<Workspace>

}
