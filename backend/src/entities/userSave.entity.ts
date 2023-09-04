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
 *     UserSave:
 *       type: object
 *       required:
 *          - userId
 *          - newsId
 *       properties:
 *          saved:
 *              type: boolean
 *          userId:
 *              type: integer
 *          newsId:
 *              type: integer
 *     UserSaveRes:
 *       type: object
 *       properties:
 *          id:
 *              type: integer
 *          saved:
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

@Entity('user_save')
export class UserSave extends BaseEntity {
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

    @Column({
        default: true,
    })
    saved: boolean

    @ManyToOne(() => User, (user) => user.saves, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn({ name: 'userId' })
    user?: User

    @ManyToOne(() => News, (news) => news.saveUsers, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn({ name: 'newsId' })
    news?: News

    @CreateDateColumn()
    createdAt?: string

    @UpdateDateColumn()
    updatedAt?: string
}
