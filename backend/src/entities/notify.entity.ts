import { NotifyType } from '@/enums'
import { INotifyType } from '@/models'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { News, User } from '.'

/**
 * @openapi
 * components:
 *   schemas:
 *     Notify:
 *       type: object
 *       required:
 *          - userId
 *          - newsId
 *          - text
 *       properties:
 *          userId:
 *              type: integer
 *          newsId:
 *              type: integer
 *          text:
 *              type: string
 *          commentText:
 *              type: string
 *          type:
 *              type: string
 *              enum:
 *                  - notify_news
 *                  - comment
 *                  - follow
 *                  - like
 *                  - like_comment
 *                  - reply
 *     NotifyRes:
 *       type: object
 *       properties:
 *          id:
 *              type: integer
 *          userId:
 *              type: integer
 *          newsId:
 *              type: integer
 *          text:
 *              type: string
 *          commentText:
 *              type: string
 *          type:
 *              type: string
 *              enum:
 *                  - notify_news
 *                  - comment
 *                  - follow
 *                  - like
 *                  - like_comment
 *                  - reply
 *          readUsers:
 *               type: array
 *               items:
 *                   type: integer
 *          recipients:
 *               type: array
 *               items:
 *                   $ref: '#/components/schemas/UserRes'
 *          user:
 *              $ref: '#/components/schemas/UserRes'
 *          news:
 *              $ref: '#/components/schemas/NewsRes'
 *          createdAt:
 *              type: string
 *          updatedAt:
 *              type: string
 */

@Entity('notifies')
export class Notify extends BaseEntity {
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
    newsId: number | null

    @Column({
        type: 'varchar',
        length: 255,
    })
    @Index()
    text: string

    @Column({
        type: 'text',
    })
    commentText?: string

    @Column({
        type: 'enum',
        enum: NotifyType,
        default: NotifyType.DEFAULT,
    })
    type: INotifyType

    @Column({
        type: 'simple-array',
    })
    readUsers?: (string | number)[]

    @ManyToMany(() => User, (user) => user.notificationsReceived, {
        onDelete: 'CASCADE',
        eager: true,
    })
    recipients?: User[]

    @ManyToOne(() => User, (user) => user.notifications, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn({ name: 'userId' })
    user?: User

    @ManyToOne(() => News, (news) => news.notifications, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn({ name: 'newsId' })
    news?: News | null

    @CreateDateColumn()
    createdAt?: string

    @UpdateDateColumn()
    updatedAt?: string
}
