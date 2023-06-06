import { NewsList } from '@/components/Common'
import { INews, IUser } from '@/models'
import { BoxProps, Stack } from '@mui/material'

export interface IProfileNewsProps extends BoxProps {
    news: INews[]
    user?: IUser
}

export function ProfileNews({ news, user }: IProfileNewsProps) {
    return (
        <Stack gap={2}>
            <NewsList newsList={news} user={user} />
        </Stack>
    )
}
