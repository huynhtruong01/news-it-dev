import { theme } from '@/utils'
import { Box, Paper, Typography } from '@mui/material'
import { ReportForm } from '@/pages/Reports/components'
import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/Common'

// export interface IReportsProps {}

export function Reports() {
    const { t } = useTranslation()

    return (
        <Box padding={2}>
            <Seo
                title={`${t('title_document.report_abuse')} - ${t(
                    'title_document.news_community'
                )}`}
            />
            <Box
                component={Paper}
                elevation={1}
                padding={theme.spacing(4, 8)}
                sx={{
                    width: '100%',
                    maxWidth: 1024,
                    margin: 'auto',
                }}
            >
                <Box marginBottom={2}>
                    <Typography component="h1" fontWeight={700} fontSize={'35px'}>
                        {t('main_home.report_abuse')}
                    </Typography>
                </Box>
                <ReportForm />
            </Box>
        </Box>
    )
}
