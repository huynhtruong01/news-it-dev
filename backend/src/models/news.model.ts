import { News } from '@/entities'
import { NewsStatus } from '@/enums'

export type INewsStatus = NewsStatus.DRAFT | NewsStatus.PUBLIC | NewsStatus.UNPUBLIC

export type INewsRes = [News[], number]
