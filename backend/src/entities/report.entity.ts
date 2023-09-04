import { StatusReport } from '@/enums'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { News, User } from '@/entities'

/**
 * @openapi
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       required:
 *          - userId
 *          - newsId
 *          - reason
 *          - status
 *       properties:
 *          userId:
 *              type: integer
 *          newsId:
 *              type: integer
 *          reason:
 *              type: string
 *          status:
 *              type: string
 *              enum:
 *                  - rude or vulgar
 *                  - harassment or hate speech
 *                  - spam or copyright issue
 *                  - other
 *     ReportRes:
 *       type: object
 *       properties:
 *          id:
 *              type: integer
 *          userId:
 *              type: integer
 *          newsId:
 *              type: integer
 *          reason:
 *              type: string
 *          status:
 *              type: string
 *              enum:
 *                  - rude or vulgar
 *                  - harassment or hate speech
 *                  - spam or copyright issue
 *                  - other
 *          reporter:
 *              $ref: '#/components/schemas/UserRes'
 *          reportNews:
 *              $ref: '#/components/schemas/NewsRes'
 *          createdAt:
 *              type: string
 *          updatedAt:
 *              type: string
 */

@Entity('reports')
export class Report extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'int',
    })
    @Index()
    userId: number

    @Column({
        type: 'int',
    })
    @Index()
    newsId: number

    @Column({
        type: 'varchar',
        length: 255,
    })
    @Index()
    reason: string

    @Column({
        type: 'enum',
        enum: StatusReport,
        default: StatusReport.OTHER,
    })
    status: StatusReport.OTHER

    @ManyToOne(() => User, (user) => user.reports, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn({ name: 'userId' })
    reporter?: User

    @ManyToOne(() => News, (news) => news.reporterNews, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn({ name: 'newsId' })
    reportNews?: News

    @CreateDateColumn()
    @Index()
    createdAt?: string

    @UpdateDateColumn()
    @Index()
    updatedAt?: string
}
