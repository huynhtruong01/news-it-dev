import { Paper, Stack, Typography } from '@mui/material'
import { HEADER_HEIGHT } from '@/consts'
import { theme } from '@/utils'
import { useTranslation } from 'react-i18next'

export function ConfirmEmailMessage() {
    const { t } = useTranslation()

    return (
        <Stack
            component={Paper}
            elevation={1}
            justifyContent={'center'}
            alignItems={'center'}
            height={`calc(100vh - ${HEADER_HEIGHT}px - 48px)`}
        >
            <Typography
                component="span"
                sx={{
                    fontSize: theme.typography.h6,
                    fontWeight: 700,
                }}
            >
                {t('message.check_your_email_reset_password')}
            </Typography>
        </Stack>
    )
}
