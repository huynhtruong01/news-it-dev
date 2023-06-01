import { IHashTag } from '@/models'
import { theme } from '@/utils'
import { Box, Stack, Typography, alpha } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export interface ITagsDetailLeftProps {
    hashTagFollows: IHashTag[]
}

export function TagsDetailLeft({ hashTagFollows }: ITagsDetailLeftProps) {
    const { t } = useTranslation()

    return (
        <Box>
            <Typography
                component="h3"
                fontWeight={700}
                fontSize={'18px'}
                marginBottom={2}
                padding={theme.spacing(1, 2, 1, 0)}
            >
                {t('tags.title_detail')}
            </Typography>
            <Stack gap={0.5}>
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
        </Box>
    )
}
