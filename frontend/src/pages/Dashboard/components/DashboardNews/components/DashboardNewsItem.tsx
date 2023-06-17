import { Status } from '@/enums'
import { INews, INewsForm, IOptionItem, IStatus } from '@/models'
import { AppDispatch } from '@/store'
import { setShowModalDelete, setShowModalPublicNews } from '@/store/common'
import { setInitValueForm, setNews } from '@/store/news'
import { theme } from '@/utils'
import { Box, BoxProps, Paper, Stack, Typography, Grid } from '@mui/material'
import { green, red, yellow } from '@mui/material/colors'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export interface IDashboardNewsItemProps extends BoxProps {
    pSetInitValuesNewsForm: (values: INewsForm) => void
    pSetShowModalDelete: (isShow: boolean) => void
    pSetShowModalPublicNews: (isShow: boolean) => void
    pSetNews: (news: INews) => void
    news: INews
}

function DashboardNewsItem({
    news,
    pSetInitValuesNewsForm,
    pSetShowModalDelete,
    pSetShowModalPublicNews,
    pSetNews,
    ...rest
}: IDashboardNewsItemProps) {
    const { t } = useTranslation()
    const navigate = useNavigate()

    // DELETE NEWS
    const handleDeleteNews = () => {
        pSetShowModalDelete(true)
        pSetNews(news)
    }

    // set init values form
    const handleSetInitValueNewsForm = () => {
        const hashTagOptionIds = news.hashTags?.map(
            (item) =>
                ({
                    id: item.id,
                    name: item.name,
                } as IOptionItem)
        )

        const newNewsValues: INewsForm = {
            id: news.id,
            title: news.title,
            sapo: news.sapo,
            thumbnailImage: news.thumbnailImage,
            coverImage: news.coverImage,
            content: news.content,
            status: news.status as IStatus,
            readTimes: news.readTimes,
            hashTags: news.hashTags,
            hashTagOptionIds,
        }

        pSetInitValuesNewsForm(newNewsValues)

        if (news.status !== Status.UNPUBLIC) {
            navigate('/update-news')
        } else {
            pSetShowModalPublicNews(true)
        }
    }

    return (
        <Box component={Paper} elevation={1} {...rest}>
            <Grid
                container
                spacing={2}
                sx={{
                    padding: 2,
                }}
            >
                <Grid item xs={12} md={5}>
                    <Typography
                        component="h3"
                        fontWeight={700}
                        fontSize={{
                            lg: '19px',
                            xs: '17px',
                        }}
                        sx={{
                            color: theme.palette.primary.light,

                            a: {
                                display: 'inline',

                                '&:hover': {
                                    color: theme.palette.primary.dark,
                                    textDecoration: 'underline',
                                },
                            },
                        }}
                        noWrap
                    >
                        {/* WRITE LINK HERE */}
                        <Link to={`/news/${news.slug}`}>{news.title}</Link>
                    </Typography>
                </Grid>
                <Grid item xs={4} md={3}>
                    <Stack
                        alignItems={{
                            md: 'center',
                            xs: 'flex-start',
                        }}
                    >
                        <Typography
                            component="span"
                            sx={{
                                textTransform: 'capitalize',
                                padding: 0.5,
                                backgroundColor: yellow[700],
                                borderRadius: 1.5,
                                fontSize: theme.typography.subtitle2,
                                color: '#78350f',
                                lineHeight: 1.25,
                                textAlign: 'center',
                                fontWeight: 400,
                            }}
                        >
                            {t(`status.${news.status}`)}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={8} md={4}>
                    <Stack
                        direction={'row'}
                        gap={1}
                        justifyContent={'flex-end'}
                        sx={{
                            div: {
                                fontSize: theme.typography.body2,
                                padding: theme.spacing(0.5, 1.5),
                                borderRadius: theme.spacing(0.75),
                                cursor: 'pointer',
                                transition: '.2s ease-in-out',
                                '&:hover': {
                                    backgroundColor: theme.palette.grey[200],
                                },
                            },
                        }}
                    >
                        <Box
                            sx={{
                                color: red[700],
                                backgroundColor: red[50],
                            }}
                            onClick={handleDeleteNews}
                        >
                            {t('button.delete')}
                        </Box>
                        <Box
                            sx={{
                                color: green[700],
                                backgroundColor: green[50],
                            }}
                            onClick={handleSetInitValueNewsForm}
                        >
                            {news.status !== Status.UNPUBLIC
                                ? t('button.edit')
                                : t(`status.public`)}
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetInitValuesNewsForm: (values: INewsForm) => dispatch(setInitValueForm(values)),
        pSetShowModalDelete: (isShow: boolean) => dispatch(setShowModalDelete(isShow)),
        pSetShowModalPublicNews: (isShow: boolean) =>
            dispatch(setShowModalPublicNews(isShow)),
        pSetNews: (news: INews) => dispatch(setNews(news)),
    }
}

export default connect(null, mapDispatchToProps)(DashboardNewsItem)
