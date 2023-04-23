import { AppDataSource } from '@/config'
import { User } from '@/entities'
import { createUserData } from '@/utils'

class UserService {
    constructor(private userRepository = AppDataSource.getRepository(User)) {}

    async getAll() {
        try {
            const users = await this.userRepository.find()

            return users
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async create(data: User): Promise<User> {
        try {
            const user = createUserData(data)

            // TODO: add role when create user

            // TODO: create slug by username

            const newUser = await this.userRepository.save(user)

            return newUser
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async getById(id: number): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id,
                },
            })
            if (!user) return null

            return user
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async update(data: User): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id: data.id,
                },
            })
            if (!user) return null

            const newUser = await this.userRepository.save({ ...user, ...data })

            return newUser
        } catch (error) {
            throw new Error(error as string)
        }
    }

    async delete(id: number): Promise<void | null> {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id,
                },
            })

            if (!user) return null

            await this.userRepository.delete(id)
        } catch (error) {
            throw new Error(error as string)
        }
    }
}

export const userService = new UserService()
