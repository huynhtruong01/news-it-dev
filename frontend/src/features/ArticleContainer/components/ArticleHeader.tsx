import { SelectFilter } from '@/components/Filters'
import { articleHeader } from '@/data'
import { Order } from '@/enums'
import { NewsFilters } from '@/enums/news'
import { IFilters, IHashTag, INewsStatus, IUser } from '@/models'
import { AppState } from '@/store'
import { theme } from '@/utils'
import { Box, Stack } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

export interface IArticleHeaderProps {
    filters: IFilters
    status: INewsStatus
    setStatus: Dispatch<SetStateAction<INewsStatus>>
    setFilters: Dispatch<SetStateAction<IFilters>>
    pUser: IUser | null
    pHashTags: IHashTag[]
}

function ArticleHeader({
    filters,
    status,
    setStatus,
    setFilters,
    pUser,
    pHashTags,
}: IArticleHeaderProps) {
    const { t } = useTranslation()
    const handleNewsFilters = (valFilter: string | number) => {
        if (typeof valFilter === 'string') {
            const newFilters = { ...filters }

            if (valFilter === NewsFilters.RELEVANT) {
                delete newFilters.numLikes

                if (pUser && pUser?.hashTags?.length) {
                    newFilters.hashTag = pUser.hashTags.map((h) => h.id).join(',')
                } else {
                    newFilters.hashTag = pHashTags.map((h) => h.id).join(',')
                }

                setStatus(NewsFilters.RELEVANT)
                setFilters({
                    ...newFilters,
                    createdAt: Order.DESC,
                    page: 1,
                    type: NewsFilters.RELEVANT,
                })
                return
            }

            if (valFilter === NewsFilters.LATEST) {
                delete newFilters.numLikes
                delete newFilters.hashTag
                delete newFilters.type

                setStatus(NewsFilters.LATEST)
                setFilters({ ...newFilters, createdAt: Order.DESC, page: 1 })
                return
            }

            delete newFilters.createdAt
            delete newFilters.hashTag
            delete newFilters.type
            setStatus(NewsFilters.TOP)
            setFilters({ ...newFilters, numLikes: Order.DESC, page: 1 })
        }
    }

    return (
        <Box component="header" marginBottom={1.5}>
            {/* Main content Nav */}
            <Stack
                gap={1}
                flexDirection={'row'}
                alignItems={'center'}
                sx={{
                    display: {
                        md: 'flex',
                        xs: 'none',
                    },
                }}
            >
                {articleHeader.map((item) => {
                    if (!pUser && item.value === NewsFilters.RELEVANT) return
                    return (
                        <Box
                            key={item.value}
                            component="li"
                            sx={{
                                backgroundColor:
                                    status === item.value
                                        ? theme.palette.primary.contrastText
                                        : 'transparent',
                                padding: theme.spacing(1, 1.25),
                                color:
                                    status === item.value
                                        ? theme.palette.primary.dark
                                        : theme.palette.secondary.main,
                                fontSize: '18px',
                                cursor: 'pointer',
                                borderRadius: theme.spacing(1),
                                fontWeight: status === item.value ? 600 : 400,

                                '&:hover': {
                                    color: theme.palette.primary.main,
                                    backgroundColor: theme.palette.primary.contrastText,
                                },
                            }}
                            onClick={() => handleNewsFilters(item.value as string)}
                        >
                            {t(item.name as string)}
                        </Box>
                    )
                })}
            </Stack>

            {/* Main content Select */}
            <Box
                sx={{
                    display: {
                        md: 'none',
                        xs: 'block',
                    },
                    width: '100%',
                }}
            >
                <SelectFilter
                    selects={articleHeader}
                    label=""
                    onFilterChange={handleNewsFilters}
                    initValue={NewsFilters.RELEVANT}
                    isAll={false}
                    width={'100%'}
                />
            </Box>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
        pHashTags: state.hashTag.hashTags,
    }
}

export default connect(mapStateToProps, null)(ArticleHeader)
