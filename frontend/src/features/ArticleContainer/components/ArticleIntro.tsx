import { newsApi } from '@/api'
import { ButtonIconForm, HashTagList } from '@/components/Common'
import { INews, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { setShowModalAuth } from '@/store/common'
import { likeNews, saveNews, unlikeNews, unsaveNews } from '@/store/user'
import { getProfile } from '@/store/user/thunkApi'
import { theme } from '@/utils'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Box, IconButton, Stack, Typography, alpha } from '@mui/material'
import { indigo } from '@mui/material/colors'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RiChat1Line } from 'react-icons/ri'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export interface IArticleIntroProps {
    article: INews
    pUser: IUser | null
    pGetProfile: () => Promise<PayloadAction<unknown>>
    pSetShowModalAuth: (isShow: boolean) => void
    pLikeNews: (data: INews) => void
    pUnLikeNews: (data: INews) => void
    pSaveNews: (data: INews) => void
    pUnSaveNews: (data: INews) => void
}

function ArticleIntro({
    article,
    pUser,
    pSetShowModalAuth,
    pSaveNews,
    pUnSaveNews,
}: IArticleIntroProps) {
    const { t } = useTranslation()
    const [saved, setSaved] = useState<boolean>(false)
    const [liked, setLiked] = useState<boolean>(false)
    const navigate = useNavigate()

    const { title, sapo, hashTags, readTimes, numLikes, slug } = article

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
                    pUnSaveNews(article)
                    await newsApi.unsaveNews(article.id)
                } else {
                    pSaveNews(article)
                    await newsApi.saveNews(article.id)
                }
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }

    return (
        <Box
            width={'100%'}
            paddingLeft={{
                md: 5,
                sm: 2.5,
                xs: 0,
            }}
        >
            <Box marginBottom={2}>
                <Typography
                    component="h2"
                    variant="h4"
                    fontWeight={'bold'}
                    sx={{
                        a: {
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        },

                        '&:hover': {
                            a: {
                                color: theme.palette.primary.main,
                                textDecoration: 'underline',
                            },
                        },
                    }}
                >
                    <Link to={`/news/${slug}`}>{title}</Link>
                </Typography>
                {sapo && (
                    <Typography
                        sx={{
                            color: alpha(theme.palette.secondary.dark, 0.7),
                            marginTop: 1.5,
                            padding: 1.5,
                            backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                            borderRadius: theme.spacing(0.75),
                            borderLeft: `6px solid ${theme.palette.primary.main}`,
                        }}
                    >
                        <Typography
                            component="span"
                            sx={{
                                display: {
                                    md: '-webkit-box',
                                    xs: 'none',
                                },
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                fontSize: theme.typography.body2,
                            }}
                        >
                            {sapo}
                        </Typography>
                    </Typography>
                )}
            </Box>

            <HashTagList tags={tags} />

            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                marginTop={2}
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
                            boxShadow: 'none',
                            fontWeight: 400,
                            color: alpha(theme.palette.secondary.dark, 0.8),
                            fontSize: theme.typography.body2,
                            lineHeight: 1,

                            svg: {
                                fontSize: theme.typography.body2,
                            },

                            '&:hover': {
                                boxShadow: 'none',
                            },
                        },
                    }}
                >
                    <ButtonIconForm
                        text={`${t('button.likes')}`}
                        num={numLikes}
                        icon={liked ? FavoriteIcon : FavoriteBorderIcon}
                        isLiked={liked}
                        onButtonClick={handleLikeClick}
                    />
                    <ButtonIconForm
                        text={`${t('button.comment')}`}
                        num={article.numComments}
                        icon={RiChat1Line}
                        onButtonClick={handleCommentClick}
                    />
                </Stack>

                <Stack direction={'row'} gap={1} alignItems={'center'}>
                    <Typography component="small" fontSize={'12px'} fontWeight={400}>
                        {readTimes} {t('common.min_read')}
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
        pLikeNews: (data: INews) => dispatch(likeNews(data)),
        pUnLikeNews: (data: INews) => dispatch(unlikeNews(data)),
        pSaveNews: (data: INews) => dispatch(saveNews(data)),
        pUnSaveNews: (data: INews) => dispatch(unsaveNews(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleIntro)
