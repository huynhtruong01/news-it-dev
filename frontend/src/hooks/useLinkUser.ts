import { IUser } from '@/models'
import { AppState } from '@/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const useLinkUser = (user: IUser) => {
    const pUser = useSelector((state: AppState) => state.user.user)
    const [link, setLink] = useState<string>('')

    useEffect(() => {
        const checkLink =
            pUser?.id === user?.id ? '/profile' : `/profile/${user?.username}`
        setLink(checkLink)
    }, [pUser, user])

    return link
}
