import { COLOR_WHITE, COLOR_WHITE_2 } from '@/consts'
import { IsFollow } from '@/enums'
import { IFollow, IHashTag, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { setShowModalAuth } from '@/store/common'
import { followHashTag, getProfile, unfollowHashTag } from '@/store/user/thunkApi'
import { theme } from '@/utils'
import { Box, Button, Paper, Typography, alpha } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export interface ITagsItemProps {
    tag: IHashTag
    pUser: IUser | null
    pGetProfile: () => Promise<PayloadAction<unknown>>
    pSetShowModalAuth: (isShow: boolean) => void
    pFollowHashTag: (data: IHashTag) => Promise<PayloadAction<unknown>>
    pUnFollowHashTag: (data: IHashTag) => Promise<PayloadAction<unknown>>
    pLanguages: string
}

function TagsItem({
    tag,
    pUser,
    pSetShowModalAuth,
    pFollowHashTag,
    pUnFollowHashTag,
}: ITagsItemProps) {
    const { t } = useTranslation()
    const [followed, setFollowed] = useState<IFollow>(IsFollow.FOLLOW)
    const color = useMemo(() => {
        return tag.color === COLOR_WHITE || tag.color === COLOR_WHITE_2
            ? theme.palette.primary.dark
            : tag.color
    }, [tag])

    useEffect(() => {
        if (Array.isArray(pUser?.hashTags)) {
            const isFollowed = pUser?.hashTags.find((t) => t.id === tag.id)
            if (isFollowed) {
                setFollowed(IsFollow.FOLLOWING)
                return
            }

            setFollowed(IsFollow.FOLLOW)
            return
        }
    }, [pUser])

    // useEffect(() => {
    //     ;(async () => {
    //         try {
    //             const results = await axios
    //                 .post(
    //                     'https://rapid-translate-multi-traduction.p.rapidapi.com/t',
    //                     {
    //                         from:
    //                             pLanguages === DEFAULT_LANGUAGES
    //                                 ? 'en'
    //                                 : DEFAULT_LANGUAGES,
    //                         to:
    //                             pLanguages === DEFAULT_LANGUAGES
    //                                 ? DEFAULT_LANGUAGES
    //                                 : 'en',
    //                         q: content,
    //                     },
    //                     {
    //                         headers: {
    //                             'content-type': 'application/json',
    //                             'X-RapidAPI-Key':
    //                                 'b58ca47cf1mshf76613c5f72fa07p17e82bjsnf62ccd71481d',
    //                             'X-RapidAPI-Host':
    //                                 'rapid-translate-multi-traduction.p.rapidapi.com',
    //                         },
    //                     }
    //                 )
    //                 .then((res) => res.data)
    //             setContent(results[0])
    //         } catch (error) {
    //             throw new Error(error as string)
    //         }
    //     })()
    // }, [pLanguages])

    const handleFollowClick = async () => {
        try {
            if (!pUser?.id) {
                pSetShowModalAuth(true)
                return
            }

            if (followed === IsFollow.FOLLOW && tag.id) {
                setFollowed(IsFollow.FOLLOWING)
                await pFollowHashTag(tag)
            } else {
                setFollowed(IsFollow.FOLLOW)
                await pUnFollowHashTag(tag)
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }

    const handleShowModalAuth = () => {
        pSetShowModalAuth(true)
    }

    return (
        <Box
            component={Paper}
            elevation={1}
            sx={{
                position: 'relative',
                borderTop: `1rem solid ${color}`,
                borderRadius: theme.spacing(0.75),
            }}
        >
            {tag.iconImage && (
                <Box
                    sx={{
                        position: 'absolute',
                        right: 4,
                        bottom: {
                            md: 4,
                            xs: 6,
                        },
                        width: 64,
                        height: 64,
                    }}
                >
                    <img src={tag.iconImage} alt={tag.title} />
                </Box>
            )}
            <Box
                sx={{
                    padding: 3,
                }}
            >
                <Typography
                    component="h3"
                    fontSize={'19px'}
                    marginBottom={2}
                    sx={{
                        marginLeft: -1,
                        span: {
                            color,
                        },
                        a: {
                            fontWeight: 600,
                            padding: theme.spacing(0.75, 1),
                            borderRadius: theme.spacing(0.65),
                            color: theme.palette.secondary.dark,
                            transition: '.2s ease-in-out',
                            '&:hover': {
                                boxShadow: `0 0 0 1px ${color}`,
                                backgroundColor: alpha(color as string, 0.1),
                            },
                        },
                    }}
                >
                    {/* WRITE LINK HERE */}
                    <Link to={`/tags/${tag.name}`}>
                        <span>#</span>
                        {tag.name}
                    </Link>
                </Typography>
                <Typography
                    marginBottom={1.5}
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        color: alpha(theme.palette.secondary.main, 0.9),
                    }}
                >
                    {tag.description}
                </Typography>
                <Typography
                    sx={{
                        marginBottom: 2,
                        fontSize: theme.typography.body2,
                        color: alpha(theme.palette.secondary.main, 0.7),
                    }}
                >
                    {tag.numNews || 0} {t('profile.news_published')}
                </Typography>
                {/* CHECK FOLLOW & FOLLOWING */}
                {!pUser?.id && (
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'transparent',
                            border: `2px solid ${theme.palette.grey[500]}`,
                            borderRadius: theme.spacing(0.75),
                            color: theme.palette.secondary.main,
                            padding: theme.spacing(0.75, 1.75),
                            fontSize: theme.typography.body1,
                            fontWeight: 500,
                            transition: '.2s ease-in-out',
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.grey[700], 0.05),
                                borderColor: theme.palette.grey[700],
                            },
                        }}
                        onClick={handleShowModalAuth}
                    >
                        Follow
                    </Button>
                )}
                {pUser?.id && (
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor:
                                followed === IsFollow.FOLLOWING
                                    ? 'transparent'
                                    : theme.palette.primary.light,
                            border: `2px solid ${
                                followed === IsFollow.FOLLOWING
                                    ? theme.palette.grey[500]
                                    : theme.palette.primary.light
                            }`,
                            borderRadius: theme.spacing(0.75),
                            color:
                                followed === IsFollow.FOLLOWING
                                    ? theme.palette.secondary.main
                                    : theme.palette.primary.contrastText,
                            padding: theme.spacing(0.75, 1.75),
                            fontSize: theme.typography.body1,
                            fontWeight: 500,
                            transition: '.2s ease-in-out',
                            '&:hover': {
                                backgroundColor:
                                    followed === IsFollow.FOLLOWING
                                        ? alpha(theme.palette.grey[700], 0.05)
                                        : theme.palette.primary.dark,
                                borderColor:
                                    followed === IsFollow.FOLLOWING
                                        ? theme.palette.grey[700]
                                        : theme.palette.primary.dark,
                            },
                        }}
                        onClick={handleFollowClick}
                    >
                        {followed === IsFollow.FOLLOW
                            ? t('profile.follow')
                            : t('profile.following')}
                    </Button>
                )}
            </Box>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
        pLanguages: state.common.languages,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetProfile: () => dispatch(getProfile()),
        pSetShowModalAuth: (isShow: boolean) => dispatch(setShowModalAuth(isShow)),
        pFollowHashTag: (data: IHashTag) => dispatch(followHashTag(data)),
        pUnFollowHashTag: (data: IHashTag) => dispatch(unfollowHashTag(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagsItem)
