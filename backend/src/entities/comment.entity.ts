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
    JoinTable,
    Index,
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
    @Index()
    userId: number

    @Column({
        nullable: true,
    })
    @Index()
    replyUserId: number | null

    @Column({
        type: 'int',
    })
    @Index()
    newsId: number

    @Column({ nullable: true })
    @Index()
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
        eager: true,
    })
    @JoinColumn({ name: 'newsId' })
    news?: News

    @ManyToOne(() => User, (user) => user.comments, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn({ name: 'userId' })
    user: User

    @ManyToOne(() => User, (user) => user.replyComments, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn({ name: 'replyUserId' })
    replyUser?: User

    @Column({
        type: 'text',
    })
    @Index()
    comment: string

    @Column({
        type: 'int',
        default: 0,
    })
    @Index()
    numLikes: number

    // like comment
    @ManyToMany(() => User, (user) => user.commentLikes, {
        onDelete: 'CASCADE',
    })
    @JoinTable({
        name: 'user_comment_likes',
        joinColumn: { name: 'commentId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
    })
    likes?: User[]

    @Column({
        type: 'text',
    })
    @Index()
    slug: string

    @CreateDateColumn()
    createdAt: string

    @UpdateDateColumn()
    updatedAt: string
}
