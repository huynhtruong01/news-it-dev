import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
    Index,
    AfterLoad,
} from 'typeorm'
import { User } from '@/entities/user.entity'
import { News } from '@/entities/news.entity'

/**
 * @openapi
 * components:
 *   schemas:
 *     HashTag:
 *       type: object
 *       required:
 *          - name
 *          - title
 *       properties:
 *          name:
 *              type: string
 *          title:
 *              type: string
 *          description:
 *              type: string
 *          color:
 *              type: string
 *          iconImage:
 *              type: string
 *     HashTagRes:
 *       type: object
 *       properties:
 *          id:
 *              type: integer
 *          name:
 *              type: string
 *          title:
 *              type: string
 *          description:
 *              type: string
 *          color:
 *              type: string
 *          iconImage:
 *              type: string
 *          numNews:
 *              type: integer
 *          numUsers:
 *              type: integer
 *          news:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/NewsRes'
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

@Entity('hash_tags')
export class HashTag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 255,
        unique: true,
    })
    @Index('idx_name_hashTags_unique')
    name: string

    @Column({
        type: 'varchar',
        length: 255,
        unique: true,
    })
    @Index('idx_hashTags_title_unique')
    title: string

    @Column({
        type: 'varchar',
        length: 255,
        default: '',
    })
    @Index()
    description: string

    @Column({
        type: 'varchar',
        length: 255,
        unique: true,
    })
    @Index('idx_name_hashTags_color_unique')
    color: string

    @Column({
        type: 'varchar',
        length: 255,
        default: '',
    })
    iconImage: string

    @Column({
        type: 'int',
        default: 0,
    })
    @Index()
    numNews: number

    @Column({
        type: 'int',
        default: 0,
    })
    @Index()
    numUsers: number

    @ManyToMany(() => User, (user) => user.hashTags, {
        onDelete: 'CASCADE',
    })
    @JoinTable({
        name: 'hash_tags_users_users',
        joinColumn: { name: 'hashTagId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
    })
    users?: User[]

    @ManyToMany(() => News, (news) => news.hashTags, {
        onDelete: 'CASCADE',
    })
    // @JoinTable({
    //     name: 'news_hash_tags_hash_tags',
    //     joinColumn: { name: 'hashTagId', referencedColumnName: 'id' },
    //     inverseJoinColumn: { name: 'newsId', referencedColumnName: 'id' },
    // })
    news?: News[]

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
    countNews() {
        this.numNews = this.news ? this.news.length : 0
    }

    @AfterLoad()
    countUsers() {
        this.numUsers = this.users ? this.users.length : 0
    }
}
