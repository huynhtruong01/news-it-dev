import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { User } from '@/entities'

/**
 * @openapi
 * components:
 *   schemas:
 *     UserFollow:
 *       type: object
 *       required:
 *          - userId
 *          - followerId
 *       properties:
 *          userId:
 *              type: integer
 *          followerId:
 *              type: integer
 *     UserFollowRes:
 *       type: object
 *       properties:
 *          id:
 *              type: integer
 *          userId:
 *              type: integer
 *          followerId:
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

@Entity('user_follow')
export class UserFollow extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'int',
    })
    userId: number

    @Column({
        type: 'int',
    })
    followerId: number

    @ManyToOne(() => User, (user) => user.following, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn({ name: 'userId' })
    user: User

    @ManyToOne(() => User, (user) => user.followers, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn({ name: 'followerId' })
    follower: User

    @CreateDateColumn()
    @Index()
    createdAt?: string

    @UpdateDateColumn()
    @Index()
    updatedAt?: string
}
