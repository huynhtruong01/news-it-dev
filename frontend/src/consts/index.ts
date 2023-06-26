import { NotifyType } from '@/enums'

export const IMAGE_MINE_TYPE: readonly string[] = ['image/png', 'image/jpg', 'image/jpeg']
export const SIZE_10_MB: number = 10 * 1024 * 1024
export const SIZE_4_MB: number = 4 * 1024 * 1024
export const ALL = -1
export const LOGO =
    'https://res.cloudinary.com/practicaldev/image/fetch/s--pcSkTMZL--/c_limit,f_auto,fl_progressive,q_80,w_190/https://practicaldev-herokuapp-com.freetls.fastly.net/assets/devlogo-pwa-512.png'
export const COLOR_WHITE = '#ffffff'
export const COLOR_WHITE_2 = '#fff'

export const HEADER_HEIGHT = 58
export const MAX_SCROLL_TOP = 200

export const NEW_LIST_QUERY_KEY = 'news-list'
export const SIGNOUT_NAV = 'signout'
export const DEFAULT_LANGUAGES = 'vi'

export const DEFAULT_SELECT_VALUE = '/settings/profile'

export const IMAGE_PREVIEW =
    'https://thepracticaldev.s3.amazonaws.com/i/6hqmcjaxbgbon8ydw93z.png'

export const TYPE_ACCOUNT = 'register'
export const NOT_FOUND_URL =
    'https://res.cloudinary.com/huynhtruong01/image/upload/v1687591824/not_found_i5wql2.png'

export const INCLUDE_COMMENT_LINK = [
    NotifyType.COMMENT,
    NotifyType.LIKE_COMMENT,
    NotifyType.REPLY,
]
