import { ProfileInfoItem } from '@/pages/Profile/components/ProfileInfo/components'
import { Box, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { HiHashtag } from 'react-icons/hi'
import { IoNewspaperOutline } from 'react-icons/io5'
import { RiChat1Line } from 'react-icons/ri'

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
                icon={HiHashtag}
                text={`${numTag} ${t('profile.tags_followed')}`}
            />
        </Box>
    )
}
