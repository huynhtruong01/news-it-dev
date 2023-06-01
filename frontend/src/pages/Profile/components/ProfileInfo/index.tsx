import { Box, Paper } from '@mui/material'
import { IoNewspaperOutline } from 'react-icons/io5'
import { RiChat1Line } from 'react-icons/ri'
import { ProfileInfoItem } from '@/pages/Profile/components/ProfileInfo/components'
import TagIcon from '@mui/icons-material/Tag'
import { useTranslation } from 'react-i18next'

export interface IProfileInfoProps {
    numNews: number
    numComments: number
    numTag: number
}

export function ProfileInfo({ numNews, numComments, numTag }: IProfileInfoProps) {
    const { t } = useTranslation()

    return (
        <Box component={Paper} elevation={1} padding={2}>
            <ProfileInfoItem
                icon={IoNewspaperOutline}
                text={`${numNews} ${t('common.news')}`}
                marginBottom={2}
            />
            <ProfileInfoItem
                icon={RiChat1Line}
                text={`${numComments} ${t('profile.comments_written')}`}
                marginBottom={2}
            />
            <ProfileInfoItem
                icon={TagIcon}
                text={`${numTag} ${t('profile.tags_followed')}`}
            />
        </Box>
    )
}
