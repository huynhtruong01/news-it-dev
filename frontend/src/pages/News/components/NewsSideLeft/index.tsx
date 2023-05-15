import { INews } from '@/models'
import {
    ButtonMore,
    ButtonNewsLike,
    ButtonNewsSave,
} from '@/pages/News/components/NewsSideLeft/components'
import { Box, BoxProps, Stack } from '@mui/material'

export interface INewsSideLeftProps extends BoxProps {
    news: INews
}

export function NewsSideLeft({ news, ...rest }: INewsSideLeftProps) {
    return (
        <Box {...rest} component="aside" position={'relative'} height={'100%'}>
            <Stack alignItems={'center'} gap={2} position={'sticky'} top={120}>
                <ButtonNewsLike news={news} />
                <ButtonNewsSave news={news} />
                <ButtonMore />
            </Stack>
        </Box>
    )
}
