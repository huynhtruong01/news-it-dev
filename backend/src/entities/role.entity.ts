import { User } from '@/entities/user.entity'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity('roles')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'text',
        unique: true,
    })
    name: string

    @Column({
        type: 'text',
    })
    color: string

    @Column({
        type: 'text',
    })
    description: string

    @Column({
        type: 'int',
        default: 0,
    })
    numUsers: number

    @ManyToMany(() => User, (user) => user.roles, {
        onDelete: 'CASCADE',
        eager: true,
    })
    users?: User[]

    @Column({
        type: 'text',
    })
    slug: string

    @CreateDateColumn()
    createdAt: string

    @UpdateDateColumn()
    updatedAt: string
}
