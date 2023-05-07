import {
    RoleSelectValue,
    RoleSelectName,
    ActiveSelectName,
    ActiveSelectValue,
} from '../enums'
import { ISelectValue, IUserTable, IUserData, ITableHeader, IOptionItem } from '../models'

export const users: IUserTable[] = [
    {
        id: 1,
        avatar: 'https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-1.jpg',
        username: 'huynhtruong01',
        firstName: 'Huynh',
        lastName: 'Truong',
        emailAddress: 'htruong01@gmail.com',
        newsCount: 3,
        isActive: true,
        isAdmin: true,
        createdAt: new Date(),
    },
    {
        id: 2,
        avatar: 'https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-1.jpg',
        username: 'huynhtruong01',
        firstName: 'Huynh',
        lastName: 'Truong',
        emailAddress: 'htruong01@gmail.com',
        newsCount: 3,
        isActive: true,
        isAdmin: true,
        createdAt: new Date(),
    },
    {
        id: 3,
        avatar: 'https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-1.jpg',
        username: 'huynhtruong01',
        firstName: 'Huynh',
        lastName: 'Truong',
        emailAddress: 'htruong01@gmail.com',
        newsCount: 3,
        isActive: false,
        isAdmin: true,
        createdAt: new Date(),
    },
    {
        id: 4,
        avatar: 'https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-1.jpg',
        username: 'huynhtruong01',
        firstName: 'Huynh',
        lastName: 'Truong',
        emailAddress: 'htruong01@gmail.com',
        newsCount: 3,
        isActive: false,
        isAdmin: true,
        createdAt: new Date(),
    },
    {
        id: 5,
        avatar: 'https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-1.jpg',
        username: 'huynhtruong01',
        firstName: 'Huynh',
        lastName: 'Truong',
        emailAddress: 'htruong01@gmail.com',
        newsCount: 3,
        isActive: false,
        isAdmin: true,
        createdAt: new Date(),
    },
    {
        id: 6,
        avatar: 'https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-1.jpg',
        username: 'huynhtruong01',
        firstName: 'Huynh',
        lastName: 'Truong',
        emailAddress: 'htruong01@gmail.com',
        newsCount: 3,
        isActive: false,
        isAdmin: true,
        createdAt: new Date(),
    },
]

export const selectsRole: ISelectValue[] = [
    {
        name: RoleSelectName.ADMIN,
        value: RoleSelectValue.ADMIN,
    },
    {
        name: RoleSelectName.USER,
        value: RoleSelectValue.USER,
    },
]

export const selectActive: ISelectValue[] = [
    {
        name: ActiveSelectName.ACTIVE,
        value: ActiveSelectValue.ACTIVE,
    },
    {
        name: ActiveSelectName.INACTIVE,
        value: ActiveSelectValue.INACTIVE,
    },
]

export const userHeaders: readonly ITableHeader[] = [
    {
        id: 'id',
        label: 'ID',
        isSort: false,
    },
    {
        id: 'avatar',
        label: 'Avatar',
        isSort: false,
    },
    {
        id: 'username',
        label: 'Username',
        isSort: false,
    },
    {
        id: 'firstName',
        label: 'First Name',
        isSort: false,
    },
    {
        id: 'lastName',
        label: 'Last Name',
        isSort: false,
    },
    {
        id: 'emailAddress',
        label: 'Email',
        isSort: false,
    },
    {
        id: 'newsCount',
        label: 'News Quantity',
        isSort: true,
    },
    {
        id: 'createdAt',
        label: 'Date Created',
        isSort: true,
    },
    {
        id: 'isAdmin',
        label: 'Role',
        isSort: false,
    },
    {
        id: 'isActive',
        label: 'Active',
        isSort: false,
    },
    {
        id: '',
        label: 'Actions',
        isSort: false,
    },
]

export const initUserFormValues: IUserData = {
    id: undefined,
    username: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    isAdmin: false,
    roleOptionIds: [],
}

export const roleOptions: IOptionItem[] = [
    {
        id: 1,
        name: 'admin',
    },
    {
        id: 2,
        name: 'user',
    },
]
