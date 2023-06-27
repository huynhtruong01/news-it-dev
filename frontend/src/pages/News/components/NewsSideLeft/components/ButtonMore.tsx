import { INews, IObjectCommon, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { setNewsReport } from '@/store/news'
import { theme } from '@/utils'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import {
    Box,
    BoxProps,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Tooltip,
    Typography,
    alpha,
    useMediaQuery,
} from '@mui/material'
import { green, red } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import { MouseEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbShare3 } from 'react-icons/tb'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    FacebookIcon,
    FacebookShareButton,
    RedditIcon,
    RedditShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from 'react-share'

export interface IButtonMoreProps extends BoxProps {
    news: INews
    pSetNewsReport: (value: IObjectCommon | null) => void
    pUser: IUser | null
}

const useStyles = makeStyles({
    shareItem: {
        width: '100%',
        '&:hover': {
            color: theme.palette.primary.dark,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            'span, svg': {
                color: theme.palette.primary.dark,
            },
        },
        '& svg': {
            width: 30,
            height: 30,
            borderRadius: theme.spacing(0.5),
        },
        '& button': {
            width: '100%',
        },
    },
})

function ButtonMore({ news, pSetNewsReport, pUser, ...rest }: IButtonMoreProps) {
    const isMediumScreen = useMediaQuery('(min-width:768px)')
    const { t } = useTranslation()
    const styles = useStyles()
    const [copied, setCopied] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const navigate = useNavigate()

    const handleOpenMore = (e: MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget)
    }

    const handleCloseMore = () => {
        setAnchorEl(null)
        setCopied(false)
    }

    const handleCopyLink = async () => {
        const link = window.location.href
        setCopied(true)

        await navigator.clipboard.writeText(link)
    }

    const handleReport = () => {
        navigate('/report-abuse')
        pSetNewsReport({
            newsId: news.id,
            slug: news.slug as string,
        })
    }

    return (
        <Box {...rest}>
            <Tooltip title={t('button.more')}>
                <IconButton
                    onClick={handleOpenMore}
                    sx={{
                        display: {
                            md: 'flex',
                            xs: 'none',
                        },
                        borderRadius: '50%',
                    }}
                >
                    <MoreHorizIcon />
                </IconButton>
            </Tooltip>

            {/* mobile */}
            <Button
                variant="contained"
                startIcon={<TbShare3 />}
                onClick={handleOpenMore}
                sx={{
                    color: theme.palette.secondary.main,
                    fontSize: theme.typography.body2,
                    backgroundColor: alpha(theme.palette.secondary.main, 0.075),
                    padding: theme.spacing(1, 2),
                    display: {
                        md: 'none',
                        xs: 'flex',
                    },
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                    },
                }}
            >
                {t('button.share')}
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMore}
                disableScrollLock={isMediumScreen ? true : false}
                PaperProps={{
                    elevation: 1,
                    sx: {
                        padding: 1,
                        borderRadius: theme.spacing(0.75),
                        width: 250,
                        overflow: 'visible',
                        filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))',
                        marginLeft: {
                            md: '45px',
                            xs: 0,
                        },
                        marginTop: {
                            md: '-40px',
                            xs: theme.spacing(1.75),
                        },
                        ul: {
                            padding: 0,
                        },
                        li: {
                            borderRadius: theme.spacing(0.75),
                            padding: 1,
                            marginBottom: 0.5,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
                <MenuItem className={styles.shareItem} onClick={handleCopyLink}>
                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        width={'100%'}
                        sx={{
                            'span, svg': {
                                color: theme.palette.secondary.main,
                            },
                            svg: {
                                margin: theme.spacing(0, 1),
                            },
                        }}
                    >
                        <Typography component="span" fontWeight={700}>
                            {t('button.copy_link')}
                        </Typography>
                        <FileCopyIcon
                            sx={{
                                width: '24px !important',
                                height: '24px !important',
                            }}
                        />
                    </Stack>
                </MenuItem>
                {copied && (
                    <MenuItem
                        sx={{
                            cursor: 'text',
                            backgroundColor: alpha(green[500], 0.1),
                            '&:hover': {
                                backgroundColor: alpha(green[500], 0.1),
                            },
                        }}
                    >
                        <Typography textAlign={'center'} width={'100%'}>
                            {t('button.copy_clipboard')}
                        </Typography>
                    </MenuItem>
                )}
                <MenuItem className={styles.shareItem}>
                    <FacebookShareButton
                        quote={news.title}
                        url={window.location.href}
                        onClick={handleCloseMore}
                    >
                        <Stack direction={'row'} alignItems={'center'} gap={1.5}>
                            <FacebookIcon /> {t('share_news.facebook')}
                        </Stack>
                    </FacebookShareButton>
                </MenuItem>
                <MenuItem className={styles.shareItem}>
                    <WhatsappShareButton
                        url={window.location.href}
                        onClick={handleCloseMore}
                    >
                        <Stack direction={'row'} alignItems={'center'} gap={1.5}>
                            <WhatsappIcon />
                            {t('share_news.whats_app')}
                        </Stack>
                    </WhatsappShareButton>
                </MenuItem>
                <MenuItem className={styles.shareItem}>
                    <TwitterShareButton
                        url={window.location.href}
                        onClick={handleCloseMore}
                    >
                        <Stack direction={'row'} alignItems={'center'} gap={1.5}>
                            <TwitterIcon />
                            {t('share_news.twitter')}
                        </Stack>
                    </TwitterShareButton>
                </MenuItem>
                <MenuItem className={styles.shareItem}>
                    <RedditShareButton
                        url={window.location.href}
                        onClick={handleCloseMore}
                    >
                        <Stack direction={'row'} alignItems={'center'} gap={1.5}>
                            <RedditIcon />
                            {t('share_news.reddit')}
                        </Stack>
                    </RedditShareButton>
                </MenuItem>
                <MenuItem className={styles.shareItem}>
                    <TelegramShareButton
                        url={window.location.href}
                        onClick={handleCloseMore}
                    >
                        <Stack direction={'row'} alignItems={'center'} gap={1.5}>
                            <TelegramIcon />
                            {t('share_news.telegram')}
                        </Stack>
                    </TelegramShareButton>
                </MenuItem>
                {pUser && (
                    <MenuItem
                        sx={{
                            color: red[500],
                            backgroundColor: red[50],
                            border: `1px solid ${red[500]}`,
                            transition: '.2s ease-in-out',

                            '&:hover': {
                                backgroundColor: red[100],
                            },
                        }}
                    >
                        <Box onClick={handleReport} width={'100%'} textAlign={'center'}>
                            {t('share_news.report')}
                        </Box>
                    </MenuItem>
                )}
            </Menu>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetNewsReport: (value: IObjectCommon | null) => dispatch(setNewsReport(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonMore)
