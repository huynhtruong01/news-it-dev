import { newsApi } from '@/api'
import { INews, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { setShowModalAuth } from '@/store/common'
import { saveNews, unsaveNews } from '@/store/user'
import { getProfile } from '@/store/user/thunkApi'
import { theme } from '@/utils'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import {
    Box,
    BoxProps,
    Button,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material'
import { indigo } from '@mui/material/colors'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

export interface IButtonNewsSaveProps extends BoxProps {
    news: INews
    pUser: IUser | null
    pGetProfile: () => Promise<PayloadAction<unknown>>
    pSetShowModalAuth: (isShow: boolean) => void
    pSaveNews: (data: INews) => void
    pUnSaveNews: (data: INews) => void
}

function ButtonNewsSave({
    news,
    pUser,
    pSetShowModalAuth,
    pSaveNews,
    pUnSaveNews,
    ...rest
}: IButtonNewsSaveProps) {
    const { t } = useTranslation()
    const [numSaves, setNumSaves] = useState<number>(news?.numSaves || 0)
    const [saved, setSaved] = useState<boolean>(false)

    useEffect(() => {
        if (!news) return

        if (pUser?.id) {
            const isLiked = pUser?.saves?.find((n) => n.id === news.id)
            if (isLiked) {
                setSaved(true)
            } else {
                setSaved(false)
            }
        }
    }, [pUser, news])

    useEffect(() => {
        setNumSaves(news?.numSaves as number)
    }, [news])

    const handleSaveNews = async () => {
        try {
            if (!pUser?.id) {
                pSetShowModalAuth(true)
                return
            }

            if (news.id) {
                if (saved) {
                    setNumSaves(numSaves - 1)
                    pUnSaveNews(news)
                    await newsApi.unsaveNews(news.id)
                } else {
                    setNumSaves(numSaves + 1)
                    pSaveNews(news)
                    await newsApi.saveNews(news.id)
                }
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }

    return (
        <Box
            {...rest}
            position={'relative'}
            width={{
                md: '100%',
                xs: 'auto',
            }}
            onClick={handleSaveNews}
        >
            <Stack
                alignItems={'center'}
                padding={theme.spacing(0, 1)}
                sx={{
                    display: {
                        md: 'flex',
                        xs: 'none',
                    },
                }}
            >
                <Tooltip title={t('news.save') as string}>
                    <IconButton
                        sx={{
                            borderRadius: '50%',
                            svg: {
                                transition: '.2s ease-in-out',
                            },
                            '&:hover': {
                                svg: {
                                    color: indigo[700],
                                },
                            },
                        }}
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
                </Tooltip>
                <Typography
                    component="span"
                    sx={{
                        fontSize: theme.typography.body2,
                        fontWeight: 500,
                        color: theme.palette.secondary.light,
                    }}
                >
                    {numSaves}
                </Typography>
            </Stack>

            {/* mobile */}
            <Button
                variant="contained"
                startIcon={
                    saved ? (
                        <BookmarkIcon
                            sx={{
                                color: `${indigo[500]} !important`,
                            }}
                        />
                    ) : (
                        <BookmarkBorderIcon />
                    )
                }
                sx={{
                    fontSize: theme.typography.caption,
                    display: {
                        md: 'none',
                        xs: 'flex',
                    },
                    padding: theme.spacing(0.5, 0.5, 0.5, 0),
                }}
            >
                {numSaves} {t('button.save')}
            </Button>
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
        pSaveNews: (data: INews) => dispatch(saveNews(data)),
        pUnSaveNews: (data: INews) => dispatch(unsaveNews(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonNewsSave)
