import { IHashTag, IUser } from '@/models'
import { AppState } from '@/store'
import { theme } from '@/utils'
import {
    Box,
    Button,
    Divider,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
    alpha,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export interface ITagsDetailLeftProps {
    hashTagFollows: IHashTag[]
    tag: IHashTag
    pUser: IUser | null
}

export function TagsDetailLeft({ tag, hashTagFollows, pUser }: ITagsDetailLeftProps) {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const handleNavigate = (e: SelectChangeEvent) => {
        navigate(`/tags/${e.target.value}`)
    }

    return (
        <Box>
            <Stack>
                <Box padding={2}>
                    {pUser && (
                        <Button
                            variant="contained"
                            sx={{
                                display: 'inline-flex',
                                padding: theme.spacing(1, 1.5),
                                fontSize: theme.typography.body2,
                                backgroundColor: theme.palette.primary.light,
                                fontWeight: 500,

                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                },
                            }}
                            onClick={() => navigate('/create-news')}
                        >
                            {t('button.create_news')}
                        </Button>
                    )}
                </Box>
                {pUser && <Divider />}
                {pUser && (
                    <Box padding={2} width={'100%'}>
                        <Typography
                            component="h4"
                            marginBottom={1}
                            padding={theme.spacing(1, 2, 1, 0)}
                            sx={{
                                fontSize: theme.typography.body1,
                                fontWeight: `700 !important`,
                            }}
                        >
                            {t('tags.title_detail')}
                        </Typography>
                        <Stack
                            gap={0.5}
                            sx={{
                                display: {
                                    md: 'inline-flex',
                                    xs: 'none',
                                },
                            }}
                            width={'100%'}
                        >
                            {hashTagFollows.map((t) => (
                                <Box
                                    key={t.id}
                                    sx={{
                                        a: {
                                            display: 'block',
                                            padding: theme.spacing(1.1, 1),
                                            borderRadius: theme.spacing(0.75),

                                            '&:hover': {
                                                backgroundColor: alpha(
                                                    theme.palette.primary.dark,
                                                    0.1
                                                ),
                                                color: theme.palette.primary.dark,
                                                textDecoration: 'underline',
                                            },
                                        },
                                    }}
                                >
                                    <Link to={`/tags/${t.name}`}>#{t.name}</Link>
                                </Box>
                            ))}
                        </Stack>
                        <Box
                            sx={{
                                display: {
                                    md: 'none',
                                    xs: 'block',
                                },
                            }}
                        >
                            <Select
                                fullWidth
                                value={'all'}
                                size="small"
                                onChange={handleNavigate}
                                sx={{
                                    backgroundColor: theme.palette.primary.contrastText,
                                }}
                            >
                                <MenuItem value={'all'}>
                                    {t('common.select_tag')}
                                </MenuItem>
                                {hashTagFollows.map((tag) => (
                                    <MenuItem key={tag.id} value={tag.name}>
                                        {tag.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </Box>
                )}
                {pUser && <Divider />}
                <Box padding={2}>
                    <Typography
                        fontWeight={500}
                        color={alpha(theme.palette.secondary.main, 0.9)}
                    >
                        {tag.numNews || 0} {t('profile.news_published_2')}
                    </Typography>
                </Box>
            </Stack>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
    }
}

export default connect(mapStateToProps, null)(TagsDetailLeft)
