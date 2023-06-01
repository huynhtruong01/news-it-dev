import { SearchFilter } from '@/components/Filters'
import { INewsFilters } from '@/models'
import { AppState } from '@/store'
import { Box } from '@mui/material'
import { connect } from 'react-redux'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { DEFAULT_LANGUAGES } from '@/consts'

export interface IDashboardFollowFiltersProps {
    setFilters: Dispatch<SetStateAction<INewsFilters>>
    pLanguages: string
}

function DashboardFollowFilters({
    setFilters,
    pLanguages,
}: IDashboardFollowFiltersProps) {
    const { t } = useTranslation()
    const handleSearchFollow = (value: string) => {
        setFilters((prev) => ({ ...prev, search: value }))
    }

    return (
        <Box>
            <SearchFilter
                initValue=""
                onSearchChange={handleSearchFollow}
                placeholder={t('placeholder.search_username_name') as string}
                sx={{
                    width: pLanguages === DEFAULT_LANGUAGES ? 350 : 300,
                }}
            />
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pLanguages: state.common.languages,
    }
}

export default connect(mapStateToProps, null)(DashboardFollowFilters)
