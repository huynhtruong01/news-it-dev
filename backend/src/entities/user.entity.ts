import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToMany,
    BaseEntity,
    OneToMany,
    JoinTable,
    Index,
    AfterLoad,
    JoinColumn,
} from 'typeorm'
import { News } from '@/entities/news.entity'
import { Comment } from '@/entities/comment.entity'
import { Role } from '@/entities/role.entity'
import { HashTag } from '@/entities/hashTag.entity'
import { Notify } from '@/entities/notify.entity'
import { DEFAULT_COLOR } from '@/consts'
import { Report, UserFollow, UserLike, UserSave, UserSearchHistory } from '@/entities'

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *          - username
 *          - firstName
 *          - lastName
 *          - emailAddress
 *          - type
 *          - password
 *       properties:
 *          username:
 *              type: string
 *          firstName:
 *              type: string
 *          lastName:
 *              type: string
 *          emailAddress:
 *              type: string
 *          type:
 *              type: string
 *          password:
 *              type: string
 *          dateJoined:
 *              type: string
 *              format: date
 *          avatar:
 *              type: string
 *          websiteUrl:
 *              type: string
 *          bio:
 *              type: string
 *          currentlyLearning:
 *              type: string
 *          skillLanguages:
 *              type: string
 *          education:
 *              type: string
 *          work:
 *              type: string
 *          bandingColor:
 *              type: string
 *          isActive:
 *              type: boolean
 *          isAdmin:
 *              type: boolean
 *     UserRes:
 *       type: object
 *       properties:
 *          id:
 *              type: integer
 *          username:
 *              type: string
 *          firstName:
 *              type: string
 *          lastName:
 *              type: string
 *          emailAddress:
 *              type: string
 *          type:
 *              type: string
 *          password:
 *              type: string
 *          dateJoined:
 *              type: string
 *              format: date
 *          newsCount:
 *              type: integer
 *          avatar:
 *              type: string
 *          websiteUrl:
 *              type: string
 *          bio:
 *              type: string
 *          currentlyLearning:
 *              type: string
 *          skillLanguages:
 *              type: string
 *          education:
 *              type: string
 *          work:
 *              type: string
 *          bandingColor:
 *              type: string
 *          numFollowers:
 *              type: integer
 *          numFollowing:
 *              type: integer
 *          numNewsLike:
 *              type: integer
 *          numNewsSaves:
 *              type: integer
 *          numComments:
 *              type: integer
 *          isActive:
 *              type: boolean
 *          isAdmin:
 *              type: boolean
 *          slug:
 *              type: string
 *          createdAt:
 *              type: string
 *          updatedAt:
 *              type: string
 *          roles:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Role'
 *          followers:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/UserFollow'
 *          following:
 *              type: array
 *              item:
 *                  $ref: '#/components/schemas/UserFollow'
 *          saves:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/UserSave'
 *          news:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/News'
 *          newsLikes:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/News'
 *          comments:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Comment'
 *          replyComments:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Comment'
 *          hashTags:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/HashTag'
 *          commentLikes:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Comment'
 *          notificationsReceived:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Notify'
 *          notifications:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Notify'
 *          searchHistory:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/UserSearchHistory'
 *          reports:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Report'
 *     UserProfile:
 *       type: object
 *       properties:
 *          username:
 *              type: string
 *          firstName:
 *              type: string
 *          lastName:
 *              type: string
 *          emailAddress:
 *              type: string
 *          avatar:
 *              type: string
 *          websiteUrl:
 *              type: string
 *          bio:
 *              type: string
 *          currentlyLearning:
 *              type: string
 *          skillLanguages:
 *              type: string
 *          education:
 *              type: string
 *          work:
 *              type: string
 *          bandingColor:
 *              type: string
 */

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 255,
        unique: true,
    })
    @Index('idx_username', ['username'])
    username: string

    @Column({
        type: 'varchar',
        length: 255,
    })
    @Index('idx_firstName', ['firstName'])
    firstName: string

    @Column({
        type: 'varchar',
        length: 255,
    })
    @Index('idx_lastName', ['lastName'])
    lastName: string

    @Column({
        type: 'varchar',
        length: 255,
        unique: true,
    })
    @Index('idx_emailAddress', ['emailAddress'], { unique: true })
    emailAddress: string

    @Column({
        type: 'varchar',
        length: 255,
    })
    type: string

    @Column({
        type: 'varchar',
        length: 255,
    })
    @Index('idx_password', ['password'])
    password?: string

    @Column({
        type: 'datetime',
    })
    @Index('idx_dateJoined', ['dateJoined'])
    dateJoined: Date

    @Column({
        type: 'int',
        default: 0,
    })
    @Index('idx_newsCount', ['newsCount'])
    newsCount: number

    @Column({
        type: 'varchar',
        length: 255,
        default: '',
    })
    @Index('idx_avatar', ['avatar'])
    avatar?: string

    @Column({
        type: 'varchar',
        length: 255,
        default: '',
    })
    @Index('idx_websiteUrl', ['websiteUrl'])
    websiteUrl?: string

    @Column({
        type: 'varchar',
        length: 255,
        default: '',
    })
    @Index('idx_bio', ['bio'])
    bio?: string

    @Column({
        type: 'varchar',
        length: 255,
        default: '',
    })
    @Index('idx_currentlyLearning', ['currentlyLearning'])
    currentlyLearning?: string

    @Column({
        type: 'varchar',
        length: 255,
        default: '',
    })
    @Index('idx_skillLanguages', ['skillLanguages'])
    skillLanguages?: string

    @Column({
        type: 'varchar',
        length: 255,
        default: '',
    })
    @Index('idx_education', ['education'])
    education?: string

    @Column({
        type: 'varchar',
        length: 255,
        default: '',
    })
    @Index('idx_work', ['work'])
    work?: string

    @Column({
        type: 'varchar',
        length: 255,
        default: DEFAULT_COLOR,
    })
    @Index('idx_bandingColor', ['bandingColor'])
    bandingColor?: string

    @Column({
        type: 'int',
        default: 0,
    })
    @Index('idx_numFollowers', ['numFollowers'])
    numFollowers: number

    @Column({
        type: 'int',
        default: 0,
    })
    @Index('idx_numFollowing', ['numFollowing'])
    numFollowing: number

    @Column({
        type: 'int',
        default: 0,
    })
    @Index('idx_numNewsLike', ['numNewsLike'])
    numNewsLike: number

    @Column({
        type: 'int',
        default: 0,
    })
    @Index('idx_numNewsSaves', ['numNewsSaves'])
    numNewsSaves: number

    @Column({
        type: 'int',
        default: 0,
    })
    @Index('idx_numComments', ['numComments'])
    numComments: number

    @ManyToMany(() => Role, (role) => role.users, {
        cascade: true,
    })
    @JoinTable({
        name: 'users_roles_roles',
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' },
    })
    roles: Role[]

    @OneToMany(() => UserFollow, (user) => user.follower, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'followerId' })
    followers?: UserFollow[]

    @OneToMany(() => UserFollow, (user) => user.user, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'userId' })
    following?: UserFollow[]

    @OneToMany(() => UserLike, (userLike) => userLike.user, {
        cascade: true,
    })
    newsLikes?: UserLike[]

    @OneToMany(() => UserSave, (userSave) => userSave.user, {
        onDelete: 'CASCADE',
    })
    saves?: UserSave[]

    @OneToMany(() => News, (news) => news.user, {
        cascade: true,
    })
    news?: News[]

    @OneToMany(() => Comment, (comment) => comment.user, {
        cascade: true,
    })
    comments?: Comment[]

    @OneToMany(() => Comment, (comment) => comment.replyUser, {
        cascade: true,
    })
    replyComments?: Comment[]

    @ManyToMany(() => HashTag, (hashTag) => hashTag.users, {
        cascade: true,
    })
    @JoinTable({
        name: 'hash_tags_users_users',
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'hashTagId', referencedColumnName: 'id' },
    })
    hashTags?: HashTag[]

    @ManyToMany(() => Comment, (comment) => comment.likes, {
        cascade: true,
    })
    @JoinTable({
        name: 'user_comment_likes',
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'commentId', referencedColumnName: 'id' },
    })
    commentLikes?: Comment[]

    @ManyToMany(() => Notify, (notify) => notify.recipients, {
        cascade: true,
    })
    @JoinTable({
        name: 'user_notifications_received',
        joinColumn: { name: 'userNotifyId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'notificationId', referencedColumnName: 'id' },
    })
    notificationsReceived?: Notify[]

    @OneToMany(() => Notify, (notify) => notify.user, {
        cascade: true,
    })
    notifications?: Notify[]

    @OneToMany(() => UserSearchHistory, (searchQuery) => searchQuery.user, {
        cascade: true,
    })
    searchHistory: UserSearchHistory[]

    @OneToMany(() => Report, (report) => report.reporter)
    reports: Report[]

    @Column({
        type: 'boolean',
        default: true,
    })
    @Index('idx_isActive', ['isActive'])
    isActive: boolean

    @Column({
        type: 'boolean',
        default: false,
    })
    @Index('idx_isAdmin', ['isAdmin'])
    isAdmin: boolean

    @Column({
        type: 'varchar',
        length: 255,
    })
    @Index('idx_slug', ['slug'])
    slug: string

    @Column({
        type: 'simple-array',
    })
    @Index('idx_roleIds', ['roleIds'])
    roleIds?: number[]

    @CreateDateColumn()
    @Index('idx_createdAt', ['createdAt'])
    createdAt?: string

    @UpdateDateColumn()
    @Index('idx_updatedAt', ['updatedAt'])
    updatedAt?: string

    @AfterLoad()
    countFollowing() {
        this.numFollowing = this.following ? this.following.length : 0
    }

    @AfterLoad()
    countFollowers() {
        this.numFollowers = this.followers ? this.followers.length : 0
    }

    @AfterLoad()
    countNewsLikes() {
        this.numNewsLike = this.newsLikes ? this.newsLikes.length : 0
    }

    @AfterLoad()
    countComment() {
        this.numComments = this.comments ? this.comments.length : 0
    }

    @AfterLoad()
    countNewsSave() {
        this.numNewsSaves = this.saves ? this.saves.length : 0
    }

    @AfterLoad()
    countNews() {
        this.newsCount = this.news ? this.news.length : 0
    }

    @AfterLoad()
    covertRoleIds() {
        this.roleIds = this.roles ? this.roles.map((r) => r.id) : []
    }
}
