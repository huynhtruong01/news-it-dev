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
        nullable: true,
    })
    replyUserId: number | null

    @Column({
        type: 'int',
    })
    newsId: number

    @Column({ nullable: true })
    parentCommentId: number | null

    @ManyToOne(() => Comment, (comment) => comment.childrenComments, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'parentCommentId' })
    parentComment?: Comment

    @OneToMany(() => Comment, (comment) => comment.parentComment, {
        onDelete: 'CASCADE',
    })
    childrenComments?: Comment[]

    @ManyToOne(() => News, (news) => news.comments, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'newsId' })
    news?: News

    @ManyToOne(() => User, (user) => user.comments, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'userId' })
    user: User

    @ManyToOne(() => User, (user) => user.replyComments, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'replyUserId' })
    replyUser?: User

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
    @ManyToMany(() => User, (user) => user.commentLikes, {
        onDelete: 'CASCADE',
    })
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
