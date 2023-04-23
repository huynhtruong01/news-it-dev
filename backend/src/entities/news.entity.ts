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
} from 'typeorm'
import { User } from '@/entities/user.entity'
import { HashTag } from '@/entities/hashTag.entity'
import { NewsStatus } from '@/enums'
import { INewsStatus } from '@/models'
import { Comment } from './comment.entity'

@Entity('news')
export class News extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'int',
    })
    userId: number

    @Column({
        type: 'text',
    })
    title: string

    @Column({
        type: 'text',
        default: '',
    })
    sapo: string

    @Column({
        type: 'text',
    })
    content: string

    @Column({
        type: 'int',
        default: 0,
    })
    newsViews: number

    @ManyToMany(() => User, (user) => user.newsLikes)
    likes?: User[]

    @ManyToMany(() => User, (user) => user.saves)
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

    @ManyToOne(() => User, (user) => user.news)
    @JoinColumn({
        name: 'userId',
    })
    user?: User

    @ManyToMany(() => HashTag, (hashTag) => hashTag.news)
    @JoinTable()
    hashTags?: HashTag[]

    @OneToMany(() => Comment, (comment) => comment.news)
    comments?: Comment[]

    @Column({
        type: 'int',
    })
    readTimes: number

    @Column({
        type: 'text',
    })
    slug: string

    @CreateDateColumn()
    createdAt: string

    @UpdateDateColumn()
    updatedAt: string
}
