"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleController = void 0;
const enums_1 = require("../enums");
const services_1 = require("../services");
class RoleController {
    // get all
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield services_1.roleService.getAll();
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        roles,
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // get all by params (GET)
    getAllRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.query;
                const [roles, count] = yield services_1.roleService.getAllByParams(query);
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        roles,
                        total: count,
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // (GET) by id
    getRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const role = yield services_1.roleService.getById(Number(req.params.roleId));
                if (!role) {
                    res.status(enums_1.StatusCode.NOT_FOUND).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Not found this role.',
                    });
                    return;
                }
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        role,
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // create (POST)
    createRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newRole = yield services_1.roleService.create(req.body);
                res.status(enums_1.StatusCode.CREATED).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        role: newRole,
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // update (PUT)
    updateRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newRole = yield services_1.roleService.update(req.body);
                if (!newRole) {
                    res.status(enums_1.StatusCode.NOT_FOUND).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Not found this role to update.',
                    });
                    return;
                }
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        role: newRole,
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // delete (DELETE)
    deleteRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const role = yield services_1.roleService.delete(Number(req.params.roleId));
                if (!role) {
                    res.status(enums_1.StatusCode.NOT_FOUND).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Not found this role to delete.',
                    });
                    return;
                }
                res.status(enums_1.StatusCode.DELETED).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: null,
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
}
exports.roleController = new RoleController();
