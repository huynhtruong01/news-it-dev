import { Box, Typography, Paper } from '@mui/material'
import { SelectFilter } from '@/components/Filters'
import { languagesListSelect } from '@/data'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { AppDispatch } from '@/store'
import { setLanguages } from '@/store/common'

export interface ISettingsSelectLanguagesProps {
    pSetLanguages: (lang: string) => void
}

export function SettingsSelectLanguages({
    pSetLanguages,
}: ISettingsSelectLanguagesProps) {
    const { t } = useTranslation()

    const handleLanguagesChange = (value: string | number) => {
        if (typeof value === 'string') {
            i18next.changeLanguage(value)
            pSetLanguages(value)
        }
    }

    return (
        <Box component={Paper} elevation={1} padding={3}>
            <Typography component="h2" variant="h5" fontWeight={700}>
                {t('settings.languages')}
            </Typography>
            <Box paddingTop={2}>
                <SelectFilter
                    label={''}
                    selects={languagesListSelect}
                    onFilterChange={handleLanguagesChange}
                    isAll={false}
                    initValue={'vi'}
                    sx={{
                        width: '100%',
                    }}
                />
            </Box>
        </Box>
    )
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetLanguages: (lang: string) => dispatch(setLanguages(lang)),
    }
}

export default connect(null, mapDispatchToProps)(SettingsSelectLanguages)
