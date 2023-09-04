import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { News, User } from '@/entities'

/**
 * @openapi
 * components:
 *   schemas:
 *     UserLike:
 *       type: object
 *       required:
 *          - userId
 *          - newsId
 *       properties:
 *          liked:
 *              type: boolean
 *          userId:
 *              type: integer
 *          newsId:
 *              type: integer
 *     UserLikeRes:
 *       type: object
 *       properties:
 *          id:
 *              type: integer
 *          liked:
 *              type: boolean
 *          userId:
 *              type: integer
 *          newsId:
 *              type: integer
 *          user:
 *              $ref: '#/components/schemas/UserRes'
 *          news:
 *              $ref: '#/components/schemas/NewsRes'
 *          createdAt:
 *              type: string
 *          updatedAt:
 *              type: string
 */

@Entity('user_like')
export class UserLike extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: true })
    liked?: boolean

    @Column({
        type: 'int',
    })
    userId: number

    @Column({
        type: 'int',
    })
    newsId: number

    @ManyToOne(() => User, (user) => user.newsLikes, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'userId' })
    user?: User

    @ManyToOne(() => News, (news) => news.likes, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'newsId' })
    news?: News

    @CreateDateColumn()
    createdAt?: string

    @UpdateDateColumn()
    updatedAt?: string
}
