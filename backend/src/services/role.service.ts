import { AppDataSource } from '@/config'
import { Role } from '@/entities'
import { createRoleData } from '@/utils'

class RoleService {
    constructor(private roleRepository = AppDataSource.getRepository(Role)) {}

    async getAll(): Promise<Role[]> {
        try {
            const roles = await this.roleRepository.find()

            return roles
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async create(data: Role): Promise<Role> {
        try {
            const role = createRoleData(data)

            // TODO: create slug

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

            const newRole = await this.roleRepository.save({ ...role, ...data })

            return newRole
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async delete(id: number): Promise<void | null> {
        try {
            const role = await this.roleRepository.findOne({
                where: {
                    id,
                },
            })
            if (!role) return null

            await this.roleRepository.delete(id)
        } catch (error) {
            throw new Error(error as string)
        }
    }
}

export const roleService = new RoleService()
