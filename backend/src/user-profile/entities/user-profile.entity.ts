import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, type Relation, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/users.entity.js";

@Entity('user-profiles')
export class UserProfile {

    @PrimaryGeneratedColumn()
    id : number

    @Column({type : 'integer', unique: true})
    user_id : number

    @Column({type : 'varchar'})
    first_name : string

    @Column({type : 'varchar'})
    last_name : string

    @Column({type : 'integer'})
    age : number

    @CreateDateColumn()
    created_at : Date

    @UpdateDateColumn()
    updated_at : Date

    @OneToOne(() => User, (user) => user.Profile)
    User : Relation<User>
}
