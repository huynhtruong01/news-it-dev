import {
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
 *     UserSearchHistory:
 *       type: object
 *       required:
 *          - userId
 *       properties:
 *          userId:
 *              type: integer
 *          searchQuery:
 *              type: string
 *     UserSearchHistoryRes:
 *       type: object
 *       properties:
 *          id:
 *              type: integer
 *          userId:
 *              type: integer
 *          searchQuery:
 *              type: string
 *          user:
 *              $ref: '#/components/schemas/UserRes'
 *          createdAt:
 *              type: string
 *          updatedAt:
 *              type: string
 */

@Entity('user_search_history')
@Entity()
export class UserSearchHistory {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'int',
    })
    @Index()
    userId: number

    @Column({
        type: 'varchar',
        length: 255,
    })
    @Index()
    searchQuery: string

    @ManyToOne(() => User, (user) => user.searchHistory, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn({ name: 'userId' })
    user?: User

    @CreateDateColumn()
    createdAt?: string

    @UpdateDateColumn()
    updatedAt?: string
}
