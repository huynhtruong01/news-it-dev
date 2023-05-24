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
    username: string

    @Column({
        type: 'text',
    })
    firstName: string

    @Column({
        type: 'text',
    })
    lastName: string

    @Column({
        type: 'text',
        unique: true,
    })
    emailAddress: string

    @Column({
        type: 'text',
    })
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
    dateJoined: Date

    @Column({
        type: 'int',
        default: 0,
    })
    newsCount: number

    @Column({
        type: 'text',
        default: '',
    })
    avatar?: string

    @Column({
        type: 'text',
        default: '',
    })
    websiteUrl?: string

    @Column({
        type: 'text',
        default: '',
    })
    bio?: string

    @Column({
        type: 'text',
        default: '',
    })
    currentlyLearning?: string

    @Column({
        type: 'text',
        default: '',
    })
    skillLanguages?: string

    @Column({
        type: 'text',
        default: '',
    })
    education?: string

    @Column({
        type: 'text',
        default: '',
    })
    work?: string

    @Column({
        type: 'int',
        default: 0,
    })
    numFollowers: number

    @Column({
        type: 'int',
        default: 0,
    })
    numFollowing: number

    @Column({
        type: 'int',
        default: 0,
    })
    numNewsLike: number

    @Column({
        type: 'int',
        default: 0,
    })
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
    @JoinTable()
    followers?: User[]

    @ManyToMany(() => User, (user) => user.following, {
        onDelete: 'CASCADE',
    })
    @JoinTable()
    following?: User[]

    @ManyToMany(() => News, (news) => news.likes, {
        cascade: true,
    })
    @JoinTable()
    newsLikes?: News[]

    @ManyToMany(() => News, (news) => news.saveUsers, {
        cascade: true,
    })
    @JoinTable()
    saves?: News[]

    @OneToMany(() => News, (news) => news.user, {
        cascade: true,
    })
    news?: News[]

    @OneToMany(() => Comment, (comment) => comment.user, {
        cascade: true,
    })
    comments?: Comment[]

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
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'notificationId', referencedColumnName: 'id' },
    })
    notificationsReceived?: Notify[]

    @OneToMany(() => Notify, (notify) => notify.user, {
        cascade: true,
    })
    @JoinTable({
        name: 'user_notifications',
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'notificationId', referencedColumnName: 'id' },
    })
    notifications?: Notify[]

    // TODO: add column role names

    @Column({
        type: 'boolean',
        default: true,
    })
    isActive: boolean

    @Column({
        type: 'boolean',
    })
    isAdmin: boolean

    @Column({
        type: 'text',
    })
    slug: string

    roleIds?: number[]

    @CreateDateColumn()
    createdAt?: string

    @UpdateDateColumn()
    updatedAt?: string
}
