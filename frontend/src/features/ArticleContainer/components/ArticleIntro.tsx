import { ButtonIconForm, HashTagList } from '@/components/Common'
import { INews } from '@/models'
import { theme } from '@/utils'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { Box, IconButton, Stack, Typography, alpha } from '@mui/material'
import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export interface IArticleIntroProps {
    article: INews
}

export function ArticleIntro({ article }: IArticleIntroProps) {
    const navigate = useNavigate()

    const { title, sapo, hashTags, readTimes, numLikes, numComments, slug } = article

    const tags = useMemo(() => {
        return Array.isArray(hashTags) && hashTags.length ? hashTags : []
    }, [article])

    const handleLikeClick = () => {
        navigate(`/news/${slug}`)
    }

    const handleCommentClick = () => {
        navigate(`/news/${slug}#comments`)
    }

    return (
        <Box width={'100%'} paddingLeft={5}>
            <Box marginBottom={theme.spacing(1)}>
                <Typography
                    component="h2"
                    variant="h4"
                    fontWeight={'bold'}
                    sx={{
                        '&:hover': {
                            a: {
                                color: theme.palette.primary.main,
                            },
                        },
                    }}
                >
                    <Link to={`/news/${slug}`}>{title}</Link>
                </Typography>
                {sapo && <Typography>{sapo}</Typography>}
            </Box>

            <HashTagList tags={tags} />

            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Stack
                    direction={'row'}
                    alignItems={'center'}
                    gap={1}
                    sx={{
                        marginLeft: theme.spacing(-0.5),
                        button: {
                            padding: theme.spacing(0.75, 1.5),
                            borderRadius: theme.spacing(0.75),
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            color: theme.palette.secondary.light,
                            fontWeight: 400,

                            '&:hover': {
                                boxShadow: 'none',
                                backgroundColor: alpha(
                                    theme.palette.secondary.main,
                                    0.075
                                ),
                            },
                        },
                    }}
                >
                    <ButtonIconForm
                        text={`${numLikes} likes`}
                        icon={ThumbUpIcon}
                        onButtonClick={handleLikeClick}
                    />
                    <ButtonIconForm
                        text={`${numComments} comments`}
                        icon={ChatBubbleOutlineOutlinedIcon}
                        onButtonClick={handleCommentClick}
                    />
                </Stack>

                <Stack direction={'row'} gap={1} alignItems={'center'}>
                    <Typography component="small" fontSize={'12px'} fontWeight={400}>
                        {readTimes} min read
                    </Typography>
                    <IconButton
                        sx={{
                            borderRadius: theme.spacing(0.5),
                            '&:hover': {
                                backgroundColor: '#3b49df1a',
                            },
                        }}
                    >
                        <BookmarkBorderIcon />
                    </IconButton>
                </Stack>
            </Stack>
        </Box>
    )
}
