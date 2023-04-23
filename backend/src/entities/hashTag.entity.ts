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
import { News } from '@/entities/news.entity'

@Entity('hash_tags')
export class HashTag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany(() => User, (user) => user.hashTags)
    @JoinTable()
    users?: User[]

    @ManyToMany(() => News, (news) => news.hashTags)
    @JoinTable()
    news?: News[]

    @Column({
        type: 'text',
    })
    name: string

    @Column({
        type: 'text',
        default: '',
    })
    desciption: string

    @Column({
        type: 'text',
    })
    slug: string

    @CreateDateColumn()
    createdAt: string

    @UpdateDateColumn()
    updatedAt: string
}
