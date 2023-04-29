import { Results, StatusCode, StatusText } from '@/enums'
import { RequestUser } from '@/models'
import { roleService } from '@/services'
import { Response } from 'express'

class RoleController {
    // (GET)
    async getAllRoles(req: RequestUser, res: Response) {
        try {
            const roles = await roleService.getAll()

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    roles,
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

    // (GET) by id
    async getRole(req: RequestUser, res: Response) {
        try {
            const role = await roleService.getById(Number(req.params.roleId))

            if (!role) {
                res.status(StatusCode.NOT_FOUND).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Not found this role.',
                })
                return
            }

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    role,
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
    async createRole(req: RequestUser, res: Response) {
        try {
            const newRole = await roleService.create(req.body)

            res.status(StatusCode.CREATED).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    role: newRole,
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
    async updateRole(req: RequestUser, res: Response) {
        try {
            const newRole = await roleService.update(req.body)
            if (!newRole) {
                res.status(StatusCode.NOT_FOUND).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Not found this role to update.',
                })
                return
            }

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    role: newRole,
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
    async deleteRole(req: RequestUser, res: Response) {
        try {
            const role = await roleService.delete(Number(req.params.roleId))
            if (!role) {
                res.status(StatusCode.NOT_FOUND).json({
                    results: Results.ERROR,
                    status: StatusText.FAILED,
                    message: 'Not found this role to delete.',
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
}

export const roleController = new RoleController()
