import {
    RoleSelectValue,
    RoleSelectName,
    ActiveSelectName,
    ActiveSelectValue,
} from '../enums'
import { ISelectValue, IUserData, ITableHeader, IOptionItem } from '../models'

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
        align: 'left',
    },
    {
        id: 'firstName',
        label: 'First Name',
        isSort: false,
        align: 'left',
    },
    {
        id: 'lastName',
        label: 'Last Name',
        isSort: false,
        align: 'left',
    },
    {
        id: 'emailAddress',
        label: 'Email',
        isSort: false,
        align: 'left',
    },
    {
        id: 'newsCount',
        label: 'News Quantity',
        isSort: true,
    },
    {
        id: 'createdAt',
        label: 'Created',
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
        value: 'admin',
    },
    {
        id: 2,
        name: 'user',
        value: 'user',
    },
]
