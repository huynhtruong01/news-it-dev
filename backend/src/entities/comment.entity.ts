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
    AfterLoad,
} from 'typeorm'
import { News } from '@/entities/news.entity'
import { User } from '@/entities/user.entity'

/**
 * @openapi
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *          - userId
 *          - newsId
 *          - comment
 *       properties:
 *          userId:
 *              type: integer
 *          replyUserId:
 *              type: integer
 *          newsId:
 *              type: integer
 *          parentCommentId:
 *              oneOf:
 *                  - type: integer
 *                  - type: null
 *              nullable: true
 *          comment:
 *              type: string
 *     CommentRes:
 *       type: object
 *       properties:
 *          id:
 *              type: integer
 *          userId:
 *              type: integer
 *          replyUserId:
 *              type: integer
 *          newsId:
 *              type: integer
 *          parentCommentId:
 *              oneOf:
 *                  - type: integer
 *                  - type: null
 *              nullable: true
 *          comment:
 *              type: string
 *          numLikes:
 *              type: integer
 *          numReplyComments:
 *              type: integer
 *          parentComment:
 *              $ref: '#/components/schemas/CommentRes'
 *          childrenComments:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/CommentRes'
 *          news:
 *              $ref: '#/components/schemas/NewsRes'
 *          user:
 *              $ref: '#/components/schemas/UserRes'
 *          replyUser:
 *              $ref: '#/components/schemas/UserRes'
 *          likes:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/UserRes'
 *          slug:
 *              type: string
 *          createdAt:
 *              type: string
 *          updatedAt:
 *              type: string
 */

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
        cascade: true,
        eager: true,
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
        type: 'varchar',
        length: 255,
    })
    @Index()
    comment: string

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
    numReplyComments: number

    // like comment
    @ManyToMany(() => User, (user) => user.commentLikes, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinTable({
        name: 'user_comment_likes',
        joinColumn: { name: 'commentId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
    })
    likes?: User[]

    @Column({
        type: 'varchar',
        length: 255,
    })
    @Index()
    slug: string

    @CreateDateColumn()
    createdAt: string

    @UpdateDateColumn()
    updatedAt: string

    @AfterLoad()
    countUsers() {
        this.numLikes = this.likes ? this.likes.length : 0
    }

    @AfterLoad()
    countReplyComments() {
        this.numReplyComments = this.childrenComments ? this.childrenComments.length : 0
    }
}
