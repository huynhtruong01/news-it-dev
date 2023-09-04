import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToMany,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn,
    CreateDateColumn,
    JoinTable,
    OneToMany,
    Index,
    AfterLoad,
} from 'typeorm'
import { User, HashTag, Comment, Notify, UserLike, UserSave, Report } from '@/entities'
import { NewsStatus } from '@/enums'
import { INewsStatus } from '@/models'

/**
 * @openapi
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       required:
 *        - userId
 *        - title
 *        - content
 *        - thumbnailImage
 *        - coverImage
 *        - readTimes
 *       properties:
 *         title:
 *           type: string
 *         sapo:
 *           type: string
 *         content:
 *           type: string
 *         thumbnailImage:
 *           type: number
 *         coverImage:
 *           type: string
 *         newsViews:
 *           type: integer
 *         numLikes:
 *           type: integer
 *         numComments:
 *           type: integer
 *         numSaves:
 *           type: integer
 *         numReport:
 *           type: integer
 *         status:
 *           type: string
 *         readTimes:
 *           type: integer
 *         slug:
 *           type: string
 *         hashTagIds:
 *           type: array
 *           items:
 *              type: number
 *     NewsRes:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         sapo:
 *           type: string
 *         content:
 *           type: string
 *         thumbnailImage:
 *           type: string
 *         coverImage:
 *           type: string
 *         newsViews:
 *           type: integer
 *         numLikes:
 *           type: integer
 *         numComments:
 *           type: integer
 *         numSaves:
 *           type: integer
 *         numReport:
 *           type: integer
 *         status:
 *           type: string
 *         readTimes:
 *           type: integer
 *         slug:
 *           type: string
 *         hashTagIds:
 *           type: array
 *           items:
 *              type: number
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *         likes:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/UserLike'
 *         hashTags:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/HashTag'
 *         saveUsers:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/User'
 *         comments:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/Comment'
 *         notifications:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/Notify'
 *         reporterNews:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/Report'
 *         user:
 *           $ref: '#/components/schemas/User'
 */

@Entity('news')
export class News extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'number',
    })
    @Index()
    userId: number

    @Column({
        type: 'varchar',
        length: 255,
    })
    title: string

    @Column({
        type: 'varchar',
        length: 255,
        default: '',
    })
    sapo?: string

    @Column({
        type: 'text',
    })
    content: string

    @Column({
        type: 'int',
        default: 0,
    })
    @Index()
    newsViews: number

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
    numComments: number

    @Column({
        type: 'int',
        default: 0,
    })
    @Index()
    numSaves: number

    @Column({
        type: 'int',
        default: 0,
    })
    @Index()
    numReport: number

    @OneToMany(() => UserLike, (userLike) => userLike.news, {
        onDelete: 'CASCADE',
    })
    likes?: UserLike[]

    @OneToMany(() => UserSave, (userSave) => userSave.news, {
        onDelete: 'CASCADE',
    })
    saveUsers?: UserSave[]

    @Column({
        type: 'enum',
        enum: NewsStatus,
        default: NewsStatus.DRAFT,
    })
    status: INewsStatus

    @Column({
        type: 'varchar',
        length: 255,
    })
    thumbnailImage: string

    @Column({
        type: 'varchar',
        length: 255,
    })
    coverImage: string

    @ManyToOne(() => User, (user) => user.news, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn({
        name: 'userId',
    })
    user: User

    @ManyToMany(() => HashTag, (hashTag) => hashTag.news, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinTable({
        name: 'news_hash_tags_hash_tags',
        joinColumn: { name: 'newsId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'hashTagId', referencedColumnName: 'id' },
    })
    hashTags?: HashTag[] | []

    @OneToMany(() => Comment, (comment) => comment.news, {
        onDelete: 'CASCADE',
    })
    comments?: Comment[]

    @OneToMany(() => Notify, (notify) => notify.news, {
        onDelete: 'CASCADE',
    })
    notifications?: Notify[]

    @OneToMany(() => Report, (report) => report.reportNews)
    reporterNews: Report[]

    @Column({
        type: 'int',
    })
    @Index()
    readTimes: number

    @Column({
        type: 'varchar',
        length: 255,
    })
    slug: string

    @Column({
        type: 'simple-array',
    })
    hashTagIds: number[]

    @CreateDateColumn()
    createdAt: string

    @UpdateDateColumn()
    updatedAt: string

    @AfterLoad()
    countSaves() {
        this.numSaves = this.saveUsers ? this.saveUsers.length : 0
    }

    @AfterLoad()
    countLikes() {
        this.numLikes = this.likes ? this.likes.length : 0
    }

    @AfterLoad()
    countComments() {
        this.numComments = this.comments ? this.comments.length : 0
    }

    @AfterLoad()
    countReport() {
        this.numReport = this.reporterNews ? this.reporterNews.length : 0
    }
}
