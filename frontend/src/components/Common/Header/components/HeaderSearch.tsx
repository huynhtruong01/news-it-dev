import { newsApi } from '@/api'
import { IObjectCommon } from '@/models'
import { debounceFunc, theme } from '@/utils'
import SearchIcon from '@mui/icons-material/Search'
import {
    Avatar,
    Box,
    BoxProps,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    TextField,
    alpha,
} from '@mui/material'
import {
    ChangeEvent,
    Dispatch,
    FormEvent,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ProgressLoading, EmptyList } from '@/components/Common'

export interface IHeaderSearchProps extends BoxProps {
    searchVal: string
    setSearchVal: Dispatch<SetStateAction<string>>
}

interface IListProps extends BoxProps {
    loading?: boolean
    list: IObjectCommon[]
}

export function ListResult({ loading, list, ...rest }: IListProps) {
    return (
        <Box
            component={Paper}
            elevation={1}
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
                position: 'absolute',
                left: 0,
                transform: 'translateY(8px)',
            }}
            {...rest}
        >
            {loading && <ProgressLoading />}
            {list.length === 0 && (
                <EmptyList title={'No results'} noPaper padding={1.5} />
            )}
            {list.length > 0 && (
                <List>
                    {list.map((item) => (
                        <Link to={`/news/${item.slug}`} key={item.id}>
                            <ListItem
                                sx={{
                                    transition: '.2s ease-in-out',
                                    '&:hover': {
                                        backgroundColor: alpha(
                                            theme.palette.secondary.dark,
                                            0.05
                                        ),
                                    },
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar src={item?.coverImage as string} />
                                </ListItemAvatar>
                                <ListItemText primary={item.title} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            )}
        </Box>
    )
}

export function HeaderSearch({ searchVal, setSearchVal, ...rest }: IHeaderSearchProps) {
    const { t } = useTranslation()
    const searchRef = useRef<HTMLInputElement | null>(null)
    const [news, setNews] = useState<IObjectCommon[]>([])
    const [searchList, setSearchList] = useState<string>('')
    const [noShow, setNoShow] = useState<boolean>(false)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!searchList) return
        ;(async () => {
            try {
                const res = await newsApi.getAllNewsPublic({
                    limit: 5,
                    page: 1,
                    search: searchList,
                })
                const newNews = res.data.news.map((n: IObjectCommon) => ({
                    id: n.id,
                    title: n.title,
                    coverImage: n.coverImage,
                    slug: n.slug,
                }))
                setNews(newNews)
            } catch (error) {
                throw new Error(error as string)
            }
        })()
    }, [searchList])

    useEffect(() => {
        setSearchList('')
        if (location.pathname.startsWith('/search')) {
            setNoShow(true)
        }
    }, [navigate])

    const handleSearchListChange = (value: string) => {
        setSearchList(value)
    }

    const debounceSearch = useCallback(
        debounceFunc((value: string) => handleSearchListChange(value), 800),
        []
    )

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearchVal(value)
        debounceSearch(value)
    }

    const handleSearchNews = (e: FormEvent<HTMLElement>) => {
        e.preventDefault()
        navigate(`/search?q=${encodeURIComponent(searchVal)}`)
        if (searchRef.current) searchRef.current.blur()
    }

    return (
        <Box
            component="form"
            onSubmit={handleSearchNews}
            sx={{
                position: 'relative',
                width: 300,
            }}
            {...rest}
        >
            <TextField
                inputRef={searchRef}
                value={searchVal}
                InputProps={{
                    endAdornment: (
                        <InputAdornment
                            position="start"
                            sx={{
                                marginRight: 0,
                            }}
                        >
                            <IconButton
                                type="submit"
                                sx={{
                                    '&:hover': {
                                        backgroundColor: alpha(
                                            theme.palette.primary.main,
                                            0.1
                                        ),
                                        svg: {
                                            color: theme.palette.primary.main,
                                        },
                                    },
                                }}
                            >
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                size="small"
                placeholder={`${t('common.search')}...`}
                onChange={handleSearchChange}
                sx={{
                    width: '100%',
                    '.MuiInputBase-root': {
                        paddingRight: 0,
                    },
                    fieldset: {
                        paddingRight: 0,
                    },
                }}
            />
            {!noShow && (
                <ListResult
                    list={news as IObjectCommon[]}
                    display={searchList ? 'block' : 'none'}
                />
            )}
        </Box>
    )
}
