import { IFilters } from '../../models'
import { selectActive, selectsRole } from '../../data'
import { SelectFilter } from '../Filters'
import { SetStateAction, Dispatch } from 'react'
import { ALL } from '../../consts'

export interface IUserFiltersProps {
    filters: IFilters
    setFilters: Dispatch<SetStateAction<IFilters>>
}

export function UserFilters({ filters, setFilters }: IUserFiltersProps) {
    const handleFilterActive = (value: string | number) => {
        if (typeof value !== 'number' || +value < 0) {
            const newFilters = { ...filters }
            delete newFilters.isActive
            setFilters(newFilters)
            return
        }

        const newValue = value === 1 ? true : false
        setFilters({ ...filters, isActive: newValue })
    }

    const handleFilterRole = (value: string | number) => {
        if (typeof value !== 'number' || +value < 0) {
            const newFilters = { ...filters }
            delete newFilters.isAdmin
            setFilters(newFilters)
            return
        }

        // const newValue = value === 1 ? true : false
        setFilters({ ...filters, isAdmin: value })
    }

    return (
        <>
            <SelectFilter
                selects={selectActive}
                initValue={ALL}
                label={'Active'}
                onFilterChange={handleFilterActive}
                marginRight={2}
            />
            <SelectFilter
                selects={selectsRole}
                initValue={ALL}
                label={'Role'}
                onFilterChange={handleFilterRole}
            />
        </>
    )
}
