import { NewsStatus, Results, StatusCode, StatusText } from '@/enums'
import { IObjectCommon, RequestUser } from '@/models'
import { hashTagService, newsService, userService } from '@/services'
import { Request, Response } from 'express'

// ---------------- CHECK -------------------------
const checkNewsId = (newsId: number, res: Response): boolean => {
    if (!newsId) {
        res.status(StatusCode.BAD_REQUEST).json({
            results: Results.ERROR,
            status: StatusText.FAILED,
            message: 'Unauthorized or missing news id.',
        })
        return false
    }

    return true
}

class NewsController {
    // get all news public (GET)
    async getAllNewsPublic(req: Request, res: Response) {
        try {
            const sort: IObjectCommon = req.query as IObjectCommon
            const news = await newsService.getAllByConditional(
                {
                    status: NewsStatus.PUBLIC,
                },
                sort
            )

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    news,
                },
            })
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }

    // get all news (GET)
    async getAllNews(req: RequestUser, res: Response) {
        try {
            const news = await newsService.getAll()

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    news,
                },
            })
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }

    // get news by /detail/:slug (GET)
    async getNewsBySlug(req: RequestUser, res: Response) {
        try {
            const news = await newsService.getBySlug(req.params.newsSlug)
            if (!news) {
                res.status(StatusCode.ERROR).json({
                    results: Results.ERROR,
                    status: StatusText.ERROR,
                    message: 'Not found this news by slug.',
                })
                return
            }

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    news,
                },
            })
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }

    // get by :id (GET)
    async getNews(req: RequestUser, res: Response) {
        try {
            const news = await newsService.getById(Number(req.params.newsId))
            if (!news) {
                res.status(StatusCode.ERROR).json({
                    results: Results.ERROR,
                    status: StatusText.ERROR,
                    message: 'Not found this news by id.',
                })
                return
            }

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    news,
                },
            })
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }

    // create (POST)
    async createNews(req: RequestUser, res: Response) {
        try {
            // check hash tag ids
            const checkHashTags = hashTagService.checkHashTagIds(req.body.hashTagIds)
            if (!checkHashTags) {
                res.status(StatusCode.BAD_REQUEST).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Missing hash tags or invalid type.',
                })
                return
            }

            // check user
            const user = await userService.getById(Number(req.user?.id))
            if (!user) {
                res.status(StatusCode.NOT_FOUND).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Not found this user to create news.',
                })
                return
            }

            const newNews = await newsService.create({
                ...req.body,
                userId: req.user?.id,
            })

            res.status(StatusCode.CREATED).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    news: newNews,
                },
            })
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }

    // update (PUT)
    async updateNews(req: RequestUser, res: Response) {
        try {
            const newNews = await newsService.update(Number(req.params.newsId), req.body)
            if (!newNews) {
                res.status(StatusCode.NOT_FOUND).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Not found this news to update.',
                })
                return
            }

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    news: newNews,
                },
            })
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }

    // delete (DELETE)
    async deleteNews(req: RequestUser, res: Response) {
        try {
            const news = await newsService.delete(Number(req.params.newsId))
            if (!news) {
                res.status(StatusCode.NOT_FOUND).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Not found this news to delete.',
                })
                return
            }

            res.status(StatusCode.DELETED).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: null,
            })
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }

    // TODO: count news view when user access that news (GET)
    async countViewsNews(req: RequestUser, res: Response) {
        try {
            if (req.params.newsId) {
                const news = await newsService.countViews(Number(req.params.newsId))

                res.status(StatusCode.SUCCESS).json({
                    results: Results.SUCCESS,
                    status: StatusText.SUCCESS,
                    data: {
                        news,
                    },
                })
                return
            }

            res.status(StatusCode.NOT_FOUND).json({
                results: Results.ERROR,
                status: StatusText.FAILED,
                message: 'Not found this news to count views.',
            })
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }

    // TODO: likes news (GET)
    async likeNews(req: RequestUser, res: Response) {
        try {
            const { newsId } = req.params
            // check has userId, newsId
            if (!checkNewsId(Number(newsId), res) || !req.user?.id) return

            // get user, check and push user to likes
            const news = await newsService.like(Number(newsId), req.user)

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    news,
                    message: `Like '${news?.title}' news success.`,
                },
            })
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }

    // TODO: dislike news (GET)
    async dislikeNews(req: RequestUser, res: Response) {
        try {
            const { newsId } = req.params
            if (!checkNewsId(Number(newsId), res) || !req.user?.id) return

            const news = await newsService.dislike(Number(newsId), req.user)

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    news,
                    message: `Unlike '${news?.title}' news success.`,
                },
            })
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }

    // TODO: save news (GET)
    async saveNews(req: RequestUser, res: Response) {
        try {
            const { newsId } = req.params
            if (!checkNewsId(Number(newsId), res) || !req.user?.id) return

            const news = await newsService.save(Number(newsId), req.user)

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    news,
                    message: `Save '${news?.title}' news success.`,
                },
            })
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }

    // TODO: unsave news (GET)
    async unsaveNews(req: RequestUser, res: Response) {
        try {
            const { newsId } = req.params
            if (!checkNewsId(Number(newsId), res) || !req.user?.id) return

            const news = await newsService.unsave(Number(newsId), req.user)

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    news,
                    message: `Unsave '${news?.title}' news success.`,
                },
            })
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }
}

export const newsController = new NewsController()
