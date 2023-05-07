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

    @ManyToMany(() => User, (user) => user.hashTags, {
        onDelete: 'CASCADE',
    })
    users?: User[]

    @ManyToMany(() => News, (news) => news.hashTags)
    @JoinTable()
    news?: News[]

    @Column({
        type: 'text',
        unique: true,
    })
    name: string

    @Column({
        type: 'text',
        default: '',
    })
    description: string

    @Column({
        type: 'text',
    })
    color: string

    @Column({
        type: 'text',
    })
    iconImage: string

    @Column({
        type: 'text',
    })
    slug: string

    @CreateDateColumn()
    createdAt: string

    @UpdateDateColumn()
    updatedAt: string
}
