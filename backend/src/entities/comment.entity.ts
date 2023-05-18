import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
} from 'typeorm'
import { News } from '@/entities/news.entity'
import { User } from '@/entities/user.entity'

@Entity('comments')
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'int',
    })
    userId: number

    @Column({
        type: 'int',
    })
    newsId: number

    @Column({ nullable: true })
    parentCommentId: number | null

    @ManyToOne(() => Comment, (comment) => comment.childrenComments)
    @JoinColumn({ name: 'parentCommentId' })
    parentComment?: Comment

    @OneToMany(() => Comment, (comment) => comment.parentComment, {
        cascade: true,
    })
    childrenComments?: Comment[]

    @ManyToOne(() => News, (news) => news.comments)
    @JoinColumn({ name: 'newsId' })
    news?: News

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: 'userId' })
    user: User

    @Column({
        type: 'text',
    })
    comment: string

    @Column({
        type: 'int',
        default: 0,
    })
    numLikes: number

    // like comment
    @ManyToMany(() => User, (user) => user.newsLikes)
    likes?: User[]

    @Column({
        type: 'text',
    })
    slug: string

    @CreateDateColumn()
    createdAt: string

    @UpdateDateColumn()
    updatedAt: string
}
