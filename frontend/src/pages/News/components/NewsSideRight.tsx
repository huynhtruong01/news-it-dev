import { IUser } from '@/models'
import { Box, BoxProps, Stack } from '@mui/material'
import { NewsSideRightRelation, NewsSideRightRelationUser, NewsSideRightUser } from '.'

export interface INewsSideRightProps extends BoxProps {
    user: IUser | null
}

export function NewsSideRight({ user, ...rest }: INewsSideRightProps) {
    return (
        user && (
            <Box component={Stack} gap={2} {...rest}>
                <NewsSideRightUser user={user} />
                <NewsSideRightRelationUser user={user} />
                <NewsSideRightRelation hashTagIds={[1, 2, 3]} />
            </Box>
        )
    )
}
