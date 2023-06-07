import { IUserData } from '@/models'
import { COLOR_WHITE } from '@/consts'

export const initUserProfileValues: IUserData = {
    username: '',
    emailAddress: '',
    firstName: '',
    lastName: '',
    avatar: '',
    websiteUrl: '',
    bio: '',
    currentlyLearning: '',
    skillLanguages: '',
    education: '',
    isAdmin: false,
    work: '',
    bandingColor: COLOR_WHITE,
}
