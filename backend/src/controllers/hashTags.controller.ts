import { Results, StatusCode, StatusText } from '@/enums'
import { RequestUser } from '@/models'
import { hashTagService } from '@/services'
import { Response } from 'express'

// check name hash tag
const checkDuplicateName = async (
    name: string,
    res: Response
): Promise<boolean | null> => {
    const checkName = await hashTagService.checkNameHashTag(name)
    if (checkName) {
        res.status(StatusCode.BAD_REQUEST).json({
            results: Results.ERROR,
            status: StatusText.FAILED,
            message: `${name} is exits. Choose another name.`,
        })
        return null
    }

    return true
}

class HashTagController {
    // (GET)
    async getAllHashTag(req: RequestUser, res: Response) {
        try {
            const hashTags = await hashTagService.getAll()

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    hashTags,
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

    // (GET)
    async getHashTag(req: RequestUser, res: Response) {
        try {
            const hashTag = await hashTagService.getById(Number(req.params.hashTagId))

            if (!hashTag) {
                res.status(StatusCode.NOT_FOUND).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Not found this hash tag.',
                })
                return
            }

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    hashTag,
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
    async createHashTag(req: RequestUser, res: Response) {
        try {
            if (!(await checkDuplicateName(req.body.name, res))) return

            const newHashTag = await hashTagService.create(req.body)

            res.status(StatusCode.CREATED).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    hashTag: newHashTag,
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
    async updateHashTag(req: RequestUser, res: Response) {
        try {
            if (!(await checkDuplicateName(req.body.name, res))) return

            const newHashTag = await hashTagService.update(req.body)
            if (!newHashTag) {
                res.status(StatusCode.NOT_FOUND).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Not found this hash tag to update.',
                })
                return
            }

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    hashTag: newHashTag,
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
    async deleteHashTag(req: RequestUser, res: Response) {
        try {
            const hashTag = await hashTagService.delete(Number(req.params.hashTagId))
            if (!hashTag) {
                res.status(StatusCode.NOT_FOUND).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Not found this hash tag to delete.',
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

    // TODO: user follow hash tag
    async followHashTag(req: RequestUser, res: Response) {
        try {
            if (req.user?.id) {
                const { hashTagId } = req.params
                await hashTagService.follow(Number(req.user.id), Number(hashTagId))

                res.status(StatusCode.SUCCESS).json({
                    results: Results.SUCCESS,
                    status: StatusText.SUCCESS,
                    data: {
                        message: 'Follow hash tag success.',
                    },
                })
                return
            }

            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.FAILED,
                data: {
                    message: 'Follow hash tag failed.',
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

    // TODO: unfollow hash tag
    async unFollowHashTag(req: RequestUser, res: Response) {
        try {
            if (req.user?.id) {
                const { hashTagId } = req.params
                await hashTagService.unfollow(Number(req.user.id), Number(hashTagId))

                res.status(StatusCode.SUCCESS).json({
                    results: Results.SUCCESS,
                    status: StatusText.SUCCESS,
                    data: {
                        message: 'Unfollow hash tag success.',
                    },
                })
                return
            }

            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.FAILED,
                message: 'Unfollow hash tag failed.',
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

export const hashTagController = new HashTagController()
