import { IUser } from '@/models'
import { AppState } from '@/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const useCheckSelf = (user: IUser) => {
    const pUser = useSelector((state: AppState) => state.user.user)
    const [isSelf, setIsSelf] = useState<boolean>(false)

    useEffect(() => {
        const checkSelf = pUser?.id === user?.id ? false : true
        setIsSelf(checkSelf)
    }, [pUser, user])

    return isSelf
}
