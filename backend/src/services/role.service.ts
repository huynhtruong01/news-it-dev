import { AppDataSource } from '@/config'
import { Role } from '@/entities'
import { IObjectCommon, IOrder, IRoleRes } from '@/models'
import { createRoleData, paginationQuery } from '@/utils'
import { commonService } from './common.service'
import { Order } from '@/enums'

class RoleService {
    constructor(private roleRepository = AppDataSource.getRepository(Role)) {}

    // get all
    async getAll() {
        try {
            const roles = await this.roleRepository.find({
                relations: {
                    users: true,
                },
            })

            return roles
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get all by params
    async getAllByParams(query: IObjectCommon): Promise<IRoleRes> {
        try {
            const { take, skip } = paginationQuery(query)
            const conditionsSearch = ((query.search as string) || '')
                .split(' ')
                .map((k) => k.toLowerCase())

            const queryBuilder = this.roleRepository
                .createQueryBuilder('role')
                .leftJoinAndSelect('role.users', 'users')
                .take(take)
                .skip(skip)
                .orderBy('role.createdAt', (query.createdAt as IOrder) || Order.DESC)

            if (query.search) {
                queryBuilder.andWhere(
                    conditionsSearch
                        .map((keyword) => {
                            return `LOWER(role.name) LIKE :${keyword}`
                        })
                        .join(' OR '),
                    conditionsSearch.reduce((params, keyword) => {
                        return { ...params, [keyword]: `%${keyword}%` }
                    }, {})
                )
            }

            const [roles, count] = await queryBuilder.getManyAndCount()

            return [roles, count]
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // find all by id
    async getAllRolesById(roleIds: number[] = []) {
        try {
            let newRoleIds: number[] = roleIds
            if (newRoleIds.length === 0) {
                newRoleIds = [2]
            }

            const roles = await this.roleRepository
                .createQueryBuilder('role')
                .where('role.id IN (:...ids)', {
                    ids: newRoleIds,
                })
                .getMany()

            return roles
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async create(data: Role): Promise<Role> {
        try {
            const role = createRoleData(data)

            // create slug
            role.slug = commonService.generateSlug(role.name)

            const newRole = await this.roleRepository.save(role)

            return newRole
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async getById(id: number): Promise<Role | null> {
        try {
            const role = await this.roleRepository.findOne({
                where: {
                    id,
                },
            })
            if (!role) return null

            return role
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async update(data: Role): Promise<Role | null> {
        try {
            const role = await this.roleRepository.findOne({
                where: {
                    id: data.id,
                },
            })
            if (!role) return null

            const slug = commonService.generateSlug(data.name)
            const newRole = await this.roleRepository.save({
                ...role,
                name: data.name,
                slug,
                description: data.description,
                color: data.color,
            })

            return newRole
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async delete(id: number): Promise<Role | null> {
        try {
            const role = await this.roleRepository.findOne({
                where: {
                    id,
                },
            })
            if (!role) return null

            await this.roleRepository
                .createQueryBuilder()
                .delete()
                .from(Role)
                .where('id = :id', { id })
                .execute()

            return role
        } catch (error) {
            throw new Error(error as string)
        }
    }
}

export const roleService = new RoleService()
