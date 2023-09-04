import { User } from '@/entities/user.entity'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

/**
 * @openapi
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *          - name
 *       properties:
 *          name:
 *              type: string
 *          description:
 *              type: string
 *          color:
 *              type: string
 *     RoleRes:
 *       type: object
 *       properties:
 *          id:
 *              type: integer
 *          name:
 *              type: string
 *          description:
 *              type: string
 *          color:
 *              type: string
 *          numUsers:
 *              type: integer
 *          users:
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

@Entity('roles')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 255,
        unique: true,
    })
    @Index('idx_name_unique')
    name: string

    @Column({
        type: 'varchar',
        length: 255,
    })
    @Index()
    color: string

    @Column({
        type: 'varchar',
        length: 255,
        default: '',
    })
    @Index()
    description: string

    @Column({
        type: 'int',
        default: 0,
    })
    @Index()
    numUsers: number

    @ManyToMany(() => User, (user) => user.roles, {
        onDelete: 'CASCADE',
        eager: true,
    })
    users?: User[]

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
}
