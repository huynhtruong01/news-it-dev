import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
    Index,
} from 'typeorm'
import { User } from '@/entities/user.entity'
import { News } from '@/entities/news.entity'

@Entity('hash_tags')
export class HashTag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'text',
        unique: true,
    })
    @Index()
    name: string

    @Column({
        type: 'text',
    })
    @Index()
    title: string

    @Column({
        type: 'text',
        default: '',
    })
    @Index()
    description: string

    @Column({
        type: 'text',
    })
    @Index()
    color: string

    @Column({
        type: 'text',
    })
    @Index()
    iconImage: string

    @Column({
        type: 'int',
        default: 0,
    })
    @Index()
    numNews: number

    @Column({
        type: 'int',
        default: 0,
    })
    @Index()
    numUsers: number

    @ManyToMany(() => User, (user) => user.hashTags, {
        onDelete: 'CASCADE',
        // eager: true,
    })
    @JoinTable({
        name: 'hash_tags_users_users',
        joinColumn: { name: 'hashTagId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
    })
    users?: User[]

    @ManyToMany(() => News, (news) => news.hashTags, {
        onDelete: 'CASCADE',
        // eager: true,
    })
    @JoinTable({
        name: 'news_hash_tags_hash_tags',
        joinColumn: { name: 'hashTagId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'newsId', referencedColumnName: 'id' },
    })
    news?: News[]

    @Column({
        type: 'text',
    })
    slug: string

    @CreateDateColumn()
    createdAt: string

    @UpdateDateColumn()
    updatedAt: string
}
