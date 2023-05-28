import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
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
    userId: number

    @Column({
        type: 'int',
    })
    newsId: number

    @Column({
        type: 'text',
    })
    text: string

    @Column({
        type: 'simple-array',
    })
    readUsers?: (string | number)[]

    @ManyToMany(() => User, (user) => user.notificationsReceived, {
        onDelete: 'CASCADE',
    })
    recipients?: User[]

    @ManyToOne(() => User, (user) => user.notifications, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'userId' })
    user?: User

    @ManyToOne(() => News, (news) => news.notifications, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'newsId' })
    news?: News

    @CreateDateColumn()
    createdAt: string

    @UpdateDateColumn()
    updatedAt: string
}
