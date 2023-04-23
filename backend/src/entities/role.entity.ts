import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm'
import { User } from '@/entities/user.entity'

@Entity('roles')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'text',
    })
    name: string

    @ManyToMany(() => User, (user) => user)
    @JoinTable()
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
