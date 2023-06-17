import { Dispatch, SetStateAction } from 'react'
import { connect } from 'react-redux'
import { ALL } from '../../consts'
import { selectStatus } from '../../data'
import { IFilters, IOptionItem } from '../../models'
import { AppState } from '../../store'
import { SelectFilter } from '../Filters'

export interface INewsFiltersProps {
    filters: IFilters
    setFilters: Dispatch<SetStateAction<IFilters>>
    pHashTags: IOptionItem[]
}

function NewsFilters({ filters, setFilters, pHashTags }: INewsFiltersProps) {
    const handleFilterStatus = (value: string | number) => {
        if (+value < 0 || !value) {
            const newFilters = { ...filters }
            delete newFilters.status
            setFilters(newFilters)
            return
        }

        setFilters({ ...filters, status: value.toString() })
    }

    const handleFilterTag = (value: string | number) => {
        if (typeof value !== 'number' || +value < 0) {
            const newFilters = { ...filters }
            delete newFilters.hashTag
            setFilters(newFilters)
            return
        }

        setFilters({ ...filters, hashTag: +value })
    }

    return (
        <>
            <SelectFilter
                selects={pHashTags}
                initValue={ALL}
                label={'Tags'}
                onFilterChange={handleFilterTag}
                marginRight={2}
            />
            <SelectFilter
                selects={selectStatus}
                initValue={ALL}
                label={'Status'}
                onFilterChange={handleFilterStatus}
                width={110}
            />
        </>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pHashTags: state.hashTag.hashTagSelects,
    }
}

export default connect(mapStateToProps, null)(NewsFilters)
