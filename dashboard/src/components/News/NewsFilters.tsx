import { IFilters } from '../../models'
import { selectStatus, selectTags } from '../../data'
import { SelectFilter } from '../Filters'
import { SetStateAction, Dispatch } from 'react'
import { ALL } from '../../consts'

export interface INewsFiltersProps {
    filters: IFilters
    setFilters: Dispatch<SetStateAction<IFilters>>
}

export function NewsFilters({ filters, setFilters }: INewsFiltersProps) {
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
                selects={selectTags}
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
