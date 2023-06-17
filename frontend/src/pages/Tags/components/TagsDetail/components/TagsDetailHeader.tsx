import { hashTagApi } from '@/api'
import { COLOR_WHITE, DEFAULT_LANGUAGES } from '@/consts'
import { IsFollow } from '@/enums'
import { IFollow, IHashTag, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { setShowModalAuth } from '@/store/common'
import { getProfile } from '@/store/user/thunkApi'
import { theme } from '@/utils'
import { Box, BoxProps, Button, Paper, Stack, Typography, alpha } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

export interface ITagsDetailHeaderProps extends BoxProps {
    pUser: IUser | null
    pGetProfile: () => Promise<PayloadAction<unknown>>
    tag: IHashTag
    pSetShowModalAuth: (isShow: boolean) => void
    pLanguages: string
}

function TagsDetailHeader({
    pUser,
    pGetProfile,
    tag,
    pSetShowModalAuth,
    pLanguages,
    ...rest
}: ITagsDetailHeaderProps) {
    const { t } = useTranslation()
    const [followed, setFollowed] = useState<IFollow>(IsFollow.FOLLOW)
    const [content, setContent] = useState<string>(tag.description as string)

    const color = useMemo(() => {
        return tag.color === COLOR_WHITE ? theme.palette.primary.dark : tag.color
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

        setFollowed(IsFollow.FOLLOW)
        return
    }, [pUser])

    useEffect(() => {
        ;(async () => {
            try {
                const results = await axios
                    .post(
                        'https://rapid-translate-multi-traduction.p.rapidapi.com/t',
                        {
                            from:
                                pLanguages === DEFAULT_LANGUAGES
                                    ? 'en'
                                    : DEFAULT_LANGUAGES,
                            to:
                                pLanguages === DEFAULT_LANGUAGES
                                    ? DEFAULT_LANGUAGES
                                    : 'en',
                            q: content,
                        },
                        {
                            headers: {
                                'content-type': 'application/json',
                                'X-RapidAPI-Key':
                                    'b58ca47cf1mshf76613c5f72fa07p17e82bjsnf62ccd71481d',
                                'X-RapidAPI-Host':
                                    'rapid-translate-multi-traduction.p.rapidapi.com',
                            },
                        }
                    )
                    .then((res) => res.data)
                setContent(results[0])
            } catch (error) {
                throw new Error(error as string)
            }
        })()
    }, [pLanguages])

    const handleFollowClick = async () => {
        try {
            if (!pUser?.id) {
                pSetShowModalAuth(true)
                return
            }

            if (pUser?.id || tag.id) {
                setFollowed(IsFollow.FOLLOWING)
                // call api follow tag
                await hashTagApi.followHashTag(tag.id)
                // get profile
                await pGetProfile()
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }

    const handleUnfollowClick = async () => {
        try {
            if (!pUser?.id) {
                pSetShowModalAuth(true)
                return
            }

            if (pUser?.id || tag.id) {
                setFollowed(IsFollow.FOLLOW)
                // call api follow tag
                await hashTagApi.unfollowHashTag(tag.id)
                // get profile
                await pGetProfile()
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }

    const handleShowModal = () => {
        pSetShowModalAuth(true)
    }

    return (
        <Box component="header" borderRadius={theme.spacing(0.75)} {...rest}>
            <Box
                component={Paper}
                elevation={1}
                sx={{
                    borderTop: `1rem solid ${color}`,
                }}
            >
                <Stack
                    direction={{
                        md: 'row',
                        xs: 'column',
                    }}
                    padding={{
                        md: 3,
                        xs: 2,
                    }}
                    gap={2}
                >
                    {tag.iconImage && (
                        <Box
                            sx={{
                                display: {
                                    md: 'block',
                                    xs: 'none',
                                },
                                img: {
                                    width: 64,
                                    height: 64,
                                },
                            }}
                        >
                            <img src={tag.iconImage} alt={tag.title} />
                        </Box>
                    )}
                    <Stack flex={1}>
                        <Stack
                            direction={'row'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                        >
                            <Typography component="h1" variant="h4" fontWeight={800}>
                                {tag.title}
                            </Typography>
                            <Box
                                sx={{
                                    button: {
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
                                    },
                                }}
                            >
                                {!pUser?.id && (
                                    <Button variant="contained" onClick={handleShowModal}>
                                        {t('profile.follow')}
                                    </Button>
                                )}
                                {pUser?.id &&
                                    (followed === IsFollow.FOLLOWING ? (
                                        <Button
                                            variant="contained"
                                            onClick={handleUnfollowClick}
                                        >
                                            {t('profile.following')}
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            onClick={handleFollowClick}
                                        >
                                            {t('profile.follow')}
                                        </Button>
                                    ))}
                            </Box>
                        </Stack>

                        <Typography
                            marginTop={2}
                            sx={{
                                maxWidth: {
                                    md: '75%',
                                    xs: '100%',
                                },
                                color: theme.palette.secondary.main,
                            }}
                        >
                            {content}
                        </Typography>
                    </Stack>
                </Stack>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagsDetailHeader)
