import { newsApi } from '@/api'
import { ButtonIconForm, HashTagList } from '@/components/Common'
import { INews, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { setShowModalAuth } from '@/store/common'
import { getProfile } from '@/store/user/thunkApi'
import { theme } from '@/utils'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Box, IconButton, Stack, Typography, alpha } from '@mui/material'
import { indigo } from '@mui/material/colors'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useMemo, useState } from 'react'
import { RiChat3Line } from 'react-icons/ri'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite'

export interface IArticleIntroProps {
    article: INews
    pUser: IUser | null
    pGetProfile: () => Promise<PayloadAction<unknown>>
    pSetShowModalAuth: (isShow: boolean) => void
}

function ArticleIntro({
    article,
    pUser,
    pGetProfile,
    pSetShowModalAuth,
}: IArticleIntroProps) {
    const [saved, setSaved] = useState<boolean>(false)
    const [liked, setLiked] = useState<boolean>(false)
    const navigate = useNavigate()

    const { title, sapo, hashTags, readTimes, numLikes, slug, comments } = article

    useEffect(() => {
        if (pUser?.id) {
            const isSaved = pUser?.saves?.find((n) => n.id === article.id)
            const isLiked = pUser?.newsLikes?.find((n) => n.id === article.id)
            if (isSaved) {
                setSaved(true)
            } else {
                setSaved(false)
            }

            if (isLiked) {
                setLiked(true)
            } else {
                setLiked(false)
            }
        }
    }, [pUser, article])

    const tags = useMemo(() => {
        return Array.isArray(hashTags) && hashTags.length ? hashTags : []
    }, [article])

    const handleLikeClick = () => {
        navigate(`/news/${slug}`)
    }

    const handleCommentClick = () => {
        navigate(`/news/${slug}#comments`)
    }

    const handleSaveNews = async () => {
        try {
            if (!pUser?.id) {
                pSetShowModalAuth(true)
                return
            }
            if (article.id) {
                if (saved) {
                    setSaved(false)
                    await newsApi.unsaveNews(article.id)
                } else {
                    setSaved(true)
                    await newsApi.saveNews(article.id)
                }

                await pGetProfile()
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }

    const commentLength = useMemo(() => {
        return comments?.length || 0
    }, [article])

    return (
        <Box width={'100%'} paddingLeft={5}>
            <Box marginBottom={2}>
                <Typography
                    component="h2"
                    variant="h4"
                    fontWeight={'bold'}
                    sx={{
                        marginBottom: 1,
                        a: {
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        },

                        '&:hover': {
                            a: {
                                color: theme.palette.primary.main,
                            },
                        },
                    }}
                >
                    <Link to={`/news/${slug}`}>{title}</Link>
                </Typography>
                {sapo && (
                    <Typography
                        sx={{
                            fontSize: theme.typography.body2,
                            color: alpha(theme.palette.secondary.dark, 0.8),
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            paddingRight: 3,
                        }}
                    >
                        {sapo}
                    </Typography>
                )}
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
                            alignItems: 'center',
                            padding: theme.spacing(0.75, 1.5),
                            borderRadius: theme.spacing(0.75),
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            fontWeight: 400,
                            color: alpha(theme.palette.secondary.dark, 0.8),
                            fontSize: theme.typography.body2,
                            lineHeight: 1,

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
                        text={`${numLikes} Likes`}
                        icon={liked ? FavoriteIcon : FavoriteBorderIcon}
                        isLiked={liked}
                        onButtonClick={handleLikeClick}
                    />
                    <ButtonIconForm
                        text={`${commentLength} Comments`}
                        icon={RiChat3Line}
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
                        onClick={handleSaveNews}
                    >
                        {saved ? (
                            <BookmarkIcon
                                sx={{
                                    color: `${indigo[500]} !important`,
                                }}
                            />
                        ) : (
                            <BookmarkBorderIcon />
                        )}
                    </IconButton>
                </Stack>
            </Stack>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetProfile: () => dispatch(getProfile()),
        pSetShowModalAuth: (isShow: boolean) => dispatch(setShowModalAuth(isShow)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleIntro)
