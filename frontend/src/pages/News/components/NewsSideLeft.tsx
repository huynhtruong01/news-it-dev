import { Box, BoxProps, IconButton, Stack } from '@mui/material'
import { ButtonNewsIcon } from '.'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

export type INewsSideLeftProps = {
    likes: number
    comments: number
    saves: number
} & BoxProps

export function NewsSideLeft({ likes, comments, saves, ...rest }: INewsSideLeftProps) {
    const handleLike = () => {
        console.log('like')
    }

    const handleComment = () => {
        console.log('comment')
    }

    const handleSave = () => {
        console.log('save')
    }

    return (
        <Box {...rest} component="aside" position={'relative'} height={'100%'}>
            <Stack alignItems={'center'} gap={2} position={'sticky'} top={120}>
                <ButtonNewsIcon
                    text={likes}
                    icon={FavoriteBorderOutlinedIcon}
                    onButtonClick={handleLike}
                />
                <ButtonNewsIcon
                    text={comments}
                    icon={ChatBubbleOutlineOutlinedIcon}
                    onButtonClick={handleComment}
                />
                <ButtonNewsIcon
                    text={saves}
                    icon={BookmarkBorderOutlinedIcon}
                    onButtonClick={handleSave}
                />
                <IconButton>
                    <MoreHorizIcon />
                </IconButton>
            </Stack>
        </Box>
    )
}
