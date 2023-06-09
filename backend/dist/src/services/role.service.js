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
exports.roleService = void 0;
const config_1 = require("../config");
const entities_1 = require("../entities");
const utils_1 = require("../utils");
const common_service_1 = require("./common.service");
const enums_1 = require("../enums");
class RoleService {
    constructor(roleRepository = config_1.AppDataSource.getRepository(entities_1.Role)) {
        this.roleRepository = roleRepository;
    }
    // get all
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield this.roleRepository.find({
                    relations: {
                        users: true,
                    },
                });
                return roles;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get all by params
    getAllByParams(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { take, skip } = (0, utils_1.paginationQuery)(query);
                const conditionsSearch = (query.search || '')
                    .split(' ')
                    .map((k) => k.toLowerCase());
                const queryBuilder = this.roleRepository
                    .createQueryBuilder('role')
                    .leftJoinAndSelect('role.users', 'users')
                    .take(take)
                    .skip(skip)
                    .orderBy('role.createdAt', query.createdAt || enums_1.Order.DESC);
                if (query.search) {
                    queryBuilder.andWhere(conditionsSearch
                        .map((keyword) => {
                        return `LOWER(role.name) LIKE :${keyword}`;
                    })
                        .join(' OR '), conditionsSearch.reduce((params, keyword) => {
                        return Object.assign(Object.assign({}, params), { [keyword]: `%${keyword}%` });
                    }, {}));
                }
                const [roles, count] = yield queryBuilder.getManyAndCount();
                return [roles, count];
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // find all by id
    getAllRolesById(roleIds = []) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newRoleIds = roleIds;
                if (newRoleIds.length === 0) {
                    newRoleIds = [2];
                }
                const roles = yield this.roleRepository
                    .createQueryBuilder('role')
                    .where('role.id IN (:...ids)', {
                    ids: newRoleIds,
                })
                    .getMany();
                return roles;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const role = (0, utils_1.createRoleData)(data);
                // create slug
                role.slug = common_service_1.commonService.generateSlug(role.name);
                const newRole = yield this.roleRepository.save(role);
                return newRole;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const role = yield this.roleRepository.findOne({
                    where: {
                        id,
                    },
                });
                if (!role)
                    return null;
                return role;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const role = yield this.roleRepository.findOne({
                    where: {
                        id: data.id,
                    },
                });
                if (!role)
                    return null;
                const slug = common_service_1.commonService.generateSlug(data.name);
                const newRole = yield this.roleRepository.save(Object.assign(Object.assign({}, role), { name: data.name, slug }));
                return newRole;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const role = yield this.roleRepository.findOne({
                    where: {
                        id,
                    },
                });
                if (!role)
                    return null;
                yield this.roleRepository
                    .createQueryBuilder()
                    .delete()
                    .from(entities_1.Role)
                    .where('id = :id', { id })
                    .execute();
                return role;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.roleService = new RoleService();
