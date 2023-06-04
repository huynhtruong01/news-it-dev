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
} from 'typeorm'
import { News } from '@/entities/news.entity'
import { Comment } from '@/entities/comment.entity'
import { Role } from '@/entities/role.entity'
import { HashTag } from '@/entities/hashTag.entity'
import { Notify } from '@/entities/notify.entity'

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'text',
        unique: true,
    })
    @Index()
    username: string

    @Column({
        type: 'text',
    })
    @Index()
    firstName: string

    @Column({
        type: 'text',
    })
    @Index()
    lastName: string

    @Column({
        type: 'text',
        unique: true,
    })
    @Index()
    emailAddress: string

    @Column({
        type: 'text',
    })
    @Index()
    password?: string

    // @Column({
    //     type: 'datetime',
    // })
    // passwordChangeAt: Date

    // @Column({
    //     type: 'text',
    // })
    // passwordResetToken: string

    // @Column({
    //     type: 'datetime',
    // })
    // passwordResetExpires: Date

    @Column({
        type: 'datetime',
    })
    @Index()
    dateJoined: Date

    @Column({
        type: 'int',
        default: 0,
    })
    @Index()
    newsCount: number

    @Column({
        type: 'text',
        default: '',
    })
    @Index()
    avatar?: string

    @Column({
        type: 'text',
        default: '',
    })
    @Index()
    websiteUrl?: string

    @Column({
        type: 'text',
        default: '',
    })
    @Index()
    bio?: string

    @Column({
        type: 'text',
        default: '',
    })
    @Index()
    currentlyLearning?: string

    @Column({
        type: 'text',
        default: '',
    })
    @Index()
    skillLanguages?: string

    @Column({
        type: 'text',
        default: '',
    })
    @Index()
    education?: string

    @Column({
        type: 'text',
        default: '',
    })
    @Index()
    work?: string

    @Column({
        type: 'text',
        default: '#ffffff',
    })
    @Index()
    bandingColor?: string

    @Column({
        type: 'int',
        default: 0,
    })
    @Index()
    numFollowers: number

    @Column({
        type: 'int',
        default: 0,
    })
    @Index()
    numFollowing: number

    @Column({
        type: 'int',
        default: 0,
    })
    @Index()
    numNewsLike: number

    @Column({
        type: 'int',
        default: 0,
    })
    @Index()
    numNewsSaves: number

    @ManyToMany(() => Role, (role) => role.users, {
        cascade: true,
    })
    @JoinTable({
        name: 'users_roles_roles',
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' },
    })
    roles: Role[]

    @ManyToMany(() => User, (user) => user.followers, {
        onDelete: 'CASCADE',
    })
    @JoinTable({
        name: 'users_followers_users',
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'userFollowId', referencedColumnName: 'id' },
    })
    followers?: User[]

    @ManyToMany(() => User, (user) => user.following, {
        onDelete: 'CASCADE',
    })
    @JoinTable({
        name: 'users_following_users',
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'userFollowedId', referencedColumnName: 'id' },
    })
    following?: User[]

    @ManyToMany(() => News, (news) => news.likes, {
        cascade: true,
    })
    @JoinTable({
        name: 'users_news_likes_news',
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'newsId', referencedColumnName: 'id' },
    })
    newsLikes?: News[]

    @ManyToMany(() => News, (news) => news.saveUsers, {
        cascade: true,
    })
    @JoinTable({
        name: 'users_saves_news',
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'newsId', referencedColumnName: 'id' },
    })
    saves?: News[]

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

    @Column({
        type: 'boolean',
        default: true,
    })
    @Index()
    isActive: boolean

    @Column({
        type: 'boolean',
    })
    @Index()
    isAdmin: boolean

    @Column({
        type: 'text',
    })
    @Index()
    slug: string

    roleIds?: number[]

    @CreateDateColumn()
    createdAt?: string

    @UpdateDateColumn()
    updatedAt?: string
}
