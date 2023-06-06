import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToMany,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn,
    CreateDateColumn,
    JoinTable,
    OneToMany,
    Index,
} from 'typeorm'
import { User } from '@/entities/user.entity'
import { HashTag } from '@/entities/hashTag.entity'
import { NewsStatus } from '@/enums'
import { INewsStatus } from '@/models'
import { Comment } from './comment.entity'
import { Notify } from './notify.entity'

@Entity('news')
export class News extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'number',
    })
    @Index()
    userId: number

    @Column({
        type: 'text',
    })
    title: string

    @Column({
        type: 'text',
        default: '',
    })
    sapo?: string

    @Column({
        type: 'text',
    })
    content: string

    @Column({
        type: 'int',
        default: 0,
    })
    @Index()
    newsViews: number

    @Column({
        type: 'int',
        default: 0,
    })
    @Index()
    numLikes: number

    @Column({
        type: 'int',
        default: 0,
    })
    @Index()
    numComments: number

    @Column({
        type: 'int',
        default: 0,
    })
    @Index()
    numSaves: number

    @ManyToMany(() => User, (user) => user.newsLikes, {
        onDelete: 'CASCADE',
    })
    @JoinTable({
        name: 'users_news_likes_news',
        joinColumn: { name: 'newsId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
    })
    likes?: User[]

    @ManyToMany(() => User, (user) => user.saves, {
        onDelete: 'CASCADE',
    })
    @JoinTable({
        name: 'users_saves_news',
        joinColumn: { name: 'newsId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
    })
    saveUsers?: User[]

    @Column({
        type: 'enum',
        enum: NewsStatus,
        default: NewsStatus.DRAFT,
    })
    status: INewsStatus

    @Column({
        type: 'text',
    })
    thumbnailImage: string

    @Column({
        type: 'text',
    })
    coverImage: string

    @ManyToOne(() => User, (user) => user.news, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn({
        name: 'userId',
    })
    user: User

    @ManyToMany(() => HashTag, (hashTag) => hashTag.news, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinTable({
        name: 'news_hash_tags_hash_tags',
        joinColumn: { name: 'newsId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'hashTagId', referencedColumnName: 'id' },
    })
    hashTags?: HashTag[] | []

    @OneToMany(() => Comment, (comment) => comment.news, {
        onDelete: 'CASCADE',
    })
    comments?: Comment[]

    @OneToMany(() => Notify, (notify) => notify.news, {
        onDelete: 'CASCADE',
    })
    notifications?: Notify[]

    @Column({
        type: 'int',
    })
    @Index()
    readTimes: number

    @Column({
        type: 'text',
    })
    slug: string

    @Column({
        type: 'simple-array',
    })
    hashTagIds: number[]

    @CreateDateColumn()
    createdAt: string

    @UpdateDateColumn()
    updatedAt: string
}
