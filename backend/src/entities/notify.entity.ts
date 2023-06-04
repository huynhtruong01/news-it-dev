import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { News, User } from '.'

@Entity('notifies')
export class Notify extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'int',
    })
    @Index()
    userId: number

    @Column({
        nullable: true,
    })
    @Index()
    newsId: number | null

    @Column({
        type: 'text',
    })
    @Index()
    text: string

    @Column({
        type: 'simple-array',
    })
    @Index()
    readUsers?: (string | number)[]

    @ManyToMany(() => User, (user) => user.notificationsReceived, {
        onDelete: 'CASCADE',
        eager: true,
    })
    recipients?: User[]

    @ManyToOne(() => User, (user) => user.notifications, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn({ name: 'userId' })
    user?: User

    @ManyToOne(() => News, (news) => news.notifications, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn({ name: 'newsId' })
    news?: News | null

    @CreateDateColumn()
    createdAt?: string

    @UpdateDateColumn()
    updatedAt?: string
}
