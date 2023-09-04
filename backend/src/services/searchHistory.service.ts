import { AppDataSource } from '@/config'
import { UserSearchHistory } from '@/entities'
import { createSearchHistory } from '@/utils'
class SearchHistoryService {
    constructor(
        private searchHistoryRepository = AppDataSource.getRepository(UserSearchHistory)
    ) {}

    // find all by userId
    async getAllByUserId(userId: number) {
        try {
            const searchHistories = await this.searchHistoryRepository
                .createQueryBuilder('searchHistory')
                .where('searchHistory.userId = :userId', { userId })
                .getMany()

            return searchHistories
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // create
    async create(data: UserSearchHistory) {
        try {
            const searchHistory = createSearchHistory(data)
            if (data.user) {
                searchHistory.user = data.user
            }

            await this.searchHistoryRepository.save(searchHistory)
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get by search query
    async getBySearchQuery(
        searchQuery: string,
        userId: number
    ): Promise<UserSearchHistory | null> {
        try {
            const userSearchHistory = await this.searchHistoryRepository
                .createQueryBuilder('searchUser')
                .where('searchUser.searchQuery = :search', {
                    search: searchQuery,
                })
                .andWhere('searchUser.userId = :userId', {
                    userId,
                })
                .getOne()

            if (!userSearchHistory) return null

            return userSearchHistory
        } catch (error) {
            throw new Error(error as string)
        }
    }
}

export const searchHistoryService = new SearchHistoryService()
