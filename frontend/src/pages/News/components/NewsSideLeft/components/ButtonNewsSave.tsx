import { newsApi } from '@/api'
import { INews, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { getProfile } from '@/store/user/thunkApi'
import { theme } from '@/utils'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { Box, BoxProps, IconButton, Stack, Typography } from '@mui/material'
import { indigo } from '@mui/material/colors'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

export interface IButtonNewsSaveProps extends BoxProps {
    news: INews
    pUser: IUser | null
    pGetProfile: () => Promise<PayloadAction<unknown>>
}

function ButtonNewsSave({ news, pUser, pGetProfile, ...rest }: IButtonNewsSaveProps) {
    const [numSaves, setNumSaves] = useState<number>(news.numSaves || 0)
    const [saved, setSaved] = useState<boolean>(false)

    useEffect(() => {
        if (pUser?.id) {
            const isLiked = pUser?.saves?.find((n) => n.id === news.id)
            if (isLiked) {
                setSaved(true)
            } else {
                setSaved(false)
            }
        }
    }, [pUser, news])

    const handleSaveNews = async () => {
        try {
            if (news.id) {
                if (saved) {
                    await newsApi.unsaveNews(news.id)
                    setSaved(false)
                    setNumSaves(numSaves <= 0 ? 0 : numSaves - 1)
                } else {
                    await newsApi.saveNews(news.id)
                    setSaved(true)
                    setNumSaves(numSaves + 1)
                }

                await pGetProfile()
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }

    return (
        <Box
            {...rest}
            position={'relative'}
            width={'100%'}
            onClick={handleSaveNews}
            sx={{
                cursor: 'pointer',
            }}
        >
            <Stack alignItems={'center'} padding={theme.spacing(0, 1)}>
                <IconButton
                    sx={{
                        borderRadius: '50%',
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
                <Typography
                    component="span"
                    fontSize={'14px'}
                    fontWeight={500}
                    color={theme.palette.secondary.light}
                >
                    {numSaves}
                </Typography>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonNewsSave)
