import { useLinkUser } from '@/hooks'
import { INews, IUser } from '@/models'
import { AppDispatch } from '@/store'
import { setShowModalUnSaveReading } from '@/store/common'
import { formatDate, theme } from '@/utils'
import { Avatar, Box, Button, Stack, Typography, alpha } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export interface IReadingListNewsItemProps {
    article: INews
    setArticleUnSave?: Dispatch<SetStateAction<INews | null>>
    pSetShowModalUnSaveReading: (isShow: boolean) => void
}

function ReadingListNewsItem({
    article,
    setArticleUnSave,
    pSetShowModalUnSaveReading,
}: IReadingListNewsItemProps) {
    const { t } = useTranslation()
    const linkUser = useLinkUser(article?.user as IUser)

    const handleUnSaveNews = () => {
        setArticleUnSave?.(article)
        pSetShowModalUnSaveReading(true)
    }

    return (
        <Stack
            direction={{
                md: 'row',
                xs: 'column',
            }}
            justifyContent={'space-between'}
            alignItems={{
                md: 'center',
                xs: 'flex-start',
            }}
            gap={{
                md: 0,
                xs: 2,
            }}
            component="article"
            sx={{
                width: '100%',
                padding: 3,
                '&:not(:last-of-type)': {
                    borderBottom: `1px solid ${alpha(
                        theme.palette.secondary.main,
                        0.075
                    )}`,
                },
            }}
        >
            <Stack direction={'row'} gap={2}>
                <Box>
                    <Link to={linkUser}>
                        <Avatar
                            src={article.user?.avatar as string}
                            alt={article.user?.username as string}
                            sx={{
                                width: 32,
                                height: 32,
                            }}
                        />
                    </Link>
                </Box>
                <Box>
                    <Typography
                        component="h3"
                        fontSize={{
                            md: '18px',
                            xs: '1rem',
                        }}
                        fontWeight={700}
                        sx={{
                            lineHeight: 1.25,
                            marginBottom: 0.25,
                            '&:hover': {
                                color: theme.palette.primary.dark,
                            },
                        }}
                    >
                        {/* WRITE LINK HERE */}
                        <Link to={`/news/${article.slug}`}>{article.title}</Link>
                    </Typography>
                    <Stack
                        direction={{
                            md: 'row',
                            xs: 'column',
                        }}
                        alignItems={{
                            md: 'center',
                            xs: 'flex-start',
                        }}
                        gap={0.5}
                        sx={{
                            fontSize: theme.typography.body2,
                            span: {
                                display: 'inline-block',
                                fontSize: theme.typography.body2,
                            },
                        }}
                    >
                        <Stack
                            direction={'row'}
                            gap={0.5}
                            alignItems={'center'}
                            flexWrap={'wrap'}
                            sx={{
                                b: {
                                    color: alpha(theme.palette.secondary.main, 0.4),
                                },
                                span: {
                                    color: alpha(theme.palette.secondary.main, 0.8),
                                },
                            }}
                        >
                            <Typography
                                component="span"
                                sx={{
                                    a: {
                                        fontWeight: 600,
                                        color: theme.palette.secondary.main,
                                        '&:hover': {
                                            color: theme.palette.primary.dark,
                                        },
                                    },
                                }}
                            >
                                <Link to={linkUser}>{article.user?.username}</Link>
                            </Typography>
                            <b> • </b>
                            <span>
                                {formatDate(article.createdAt || new Date(), 'MMM DD')}
                            </span>
                            <b> • </b>
                            <span>
                                {article.readTimes} {t('common.min_read')}
                            </span>
                            {(article?.hashTags?.length as number) > 0 && <b> • </b>}
                            <Stack direction={'row'} gap={0.5} flexWrap={'wrap'}>
                                {article?.hashTags &&
                                    article?.hashTags.map((tag) => (
                                        <Typography
                                            component="span"
                                            key={tag.id}
                                            sx={{
                                                a: {
                                                    display: 'inline-block',
                                                    padding: theme.spacing(0.5, 0.9),
                                                    borderRadius: theme.spacing(0.75),
                                                    color: alpha(
                                                        theme.palette.secondary.main,
                                                        0.9
                                                    ),
                                                    '&:hover': {
                                                        backgroundColor: alpha(
                                                            theme.palette.grey[700],
                                                            0.1
                                                        ),
                                                        boxShadow: `0 0 1px ${theme.palette.grey[700]}`,
                                                    },
                                                },
                                            }}
                                        >
                                            {/* WRITE LINK HERE */}
                                            <Link to={`/tags/${tag.name}`}>
                                                #{tag.name}
                                            </Link>
                                        </Typography>
                                    ))}
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
            <Button
                variant="contained"
                sx={{
                    padding: theme.spacing(1, 2),
                    backgroundColor: alpha(theme.palette.secondary.main, 0.075),
                    color: theme.palette.secondary.main,
                    borderRadius: theme.spacing(0.75),
                    width: {
                        md: 'auto',
                        xs: '100%',
                    },

                    '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.dark, 0.1),
                        color: theme.palette.primary.dark,
                    },
                }}
                onClick={handleUnSaveNews}
            >
                {t('button.unsave')}
            </Button>
        </Stack>
    )
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetShowModalUnSaveReading: (isShow: boolean) =>
            dispatch(setShowModalUnSaveReading(isShow)),
    }
}

export default connect(null, mapDispatchToProps)(ReadingListNewsItem)
