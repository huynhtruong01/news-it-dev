import { SearchFilter } from '@/components/Filters'
import { INotifyFilters } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { setShowModalDeleteAllNotify } from '@/store/common'
import { theme } from '@/utils'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Stack } from '@mui/material'
import { red } from '@mui/material/colors'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

export interface INotificationSearchFiltersProps {
    setFilters: Dispatch<SetStateAction<INotifyFilters>>
    pSetShowDeleteAllNotify: (isShow: boolean) => void
    pNumNotifies: number
}

function NotificationSearchFilters({
    setFilters,
    pSetShowDeleteAllNotify,
    pNumNotifies,
}: INotificationSearchFiltersProps) {
    const { t } = useTranslation()
    const handleSearchNotify = (value: string) => {
        setFilters((prev) => ({ ...prev, page: 1, search: !value ? '' : value }))
    }

    const handleShowModal = () => {
        pSetShowDeleteAllNotify(true)
    }

    return (
        <Stack
            direction={'row'}
            gap={2}
            width={{
                md: 'auto',
                xs: '100%',
            }}
        >
            <SearchFilter
                initValue={''}
                onSearchChange={handleSearchNotify}
                placeholder={t('placeholder.search_title') as string}
                width={{
                    md: 300,
                    xs: '100%',
                }}
            />
            <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                sx={{
                    backgroundColor: red[600],
                    padding: theme.spacing(0, 2),
                    fontWeight: 500,
                    '&:hover': {
                        backgroundColor: red[700],
                    },
                }}
                onClick={handleShowModal}
                disabled={!pNumNotifies}
            >
                {t('button.delete_all_notify')}
            </Button>
        </Stack>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pNumNotifies: state.notify.numNotifications,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetShowDeleteAllNotify: (isShow: boolean) =>
            dispatch(setShowModalDeleteAllNotify(isShow)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSearchFilters)
