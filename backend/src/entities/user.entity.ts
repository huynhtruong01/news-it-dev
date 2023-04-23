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
    password: string

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

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable()
    roles: Role[]

    @ManyToMany(() => User, (user) => user.followers)
    followers?: User[]

    @ManyToMany(() => User, (user) => user.following)
    following?: User[]

    @ManyToMany(() => News, (news) => news.likes)
    newsLikes?: News[]

    @ManyToMany(() => News, (news) => news.saveUsers)
    saves?: News[]

    @OneToMany(() => News, (news) => news.user)
    news?: News[]

    @OneToMany(() => Comment, (comment) => comment.user)
    comments?: Comment[]

    @ManyToMany(() => HashTag, (hashTag) => hashTag.users)
    @JoinTable()
    hashTags?: HashTag[]

    @Column({
        type: 'boolean',
        default: false,
    })
    isActive: boolean

    @Column({
        type: 'boolean',
        default: false,
    })
    isAdmin: boolean

    @Column({
        type: 'text',
    })
    slug: string

    @CreateDateColumn()
    createdAt?: string

    @UpdateDateColumn()
    updatedAt?: string
}
