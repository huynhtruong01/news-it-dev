import { Box, Typography, Paper } from '@mui/material'
import { SelectFilter } from '@/components/Filters'
import { languagesListSelect } from '@/data'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { AppDispatch, AppState } from '@/store'
import { setLanguages } from '@/store/common'

export interface ISettingsSelectLanguagesProps {
    pLanguages: string
    pSetLanguages: (lang: string) => void
}

export function SettingsSelectLanguages({
    pLanguages,
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
                    initValue={pLanguages}
                    sx={{
                        width: '100%',
                    }}
                />
            </Box>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pLanguages: state.common.languages,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetLanguages: (lang: string) => dispatch(setLanguages(lang)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsSelectLanguages)
