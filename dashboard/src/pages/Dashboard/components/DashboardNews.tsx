import { connect } from 'react-redux'
import { AppState } from '../../../store'
import {
    BoxProps,
    Box,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Stack,
    Typography,
    alpha,
} from '@mui/material'
import { Widget } from '../../../components'
import { INews, IStatus } from '../../../models'
import { formatDate, statusColor, theme } from '../../../utils'

export interface IDashboardNewsProps extends BoxProps {
    pNewsDashboard: INews[]
}

function DashboardNews({ pNewsDashboard, ...rest }: IDashboardNewsProps) {
    return (
        <Widget title="Recent News" isMore={true} link={'/news'} {...rest}>
            <TableContainer>
                <Table width={'100%'}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">No</TableCell>
                            <TableCell>News Title</TableCell>
                            <TableCell>Post Date</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell>Like</TableCell>
                            <TableCell>Viewers</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pNewsDashboard.map((news) => {
                            const colors = statusColor(news.status as IStatus)

                            return (
                                <TableRow
                                    key={news.id}
                                    sx={{
                                        td: {
                                            borderBottom: 'none',
                                            color: alpha(theme.palette.text.primary, 0.7),
                                            fontSize: theme.typography.body2,

                                            span: {
                                                fontSize: theme.typography.body2,
                                            },
                                        },
                                    }}
                                >
                                    <TableCell align="center">
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                width: 30,
                                                height: 20,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: theme.spacing(0.5),
                                                backgroundColor:
                                                    theme.palette.primary.light,
                                                color: theme.palette.primary.contrastText,
                                                fontSize: theme.typography.caption,
                                                fontWeight: 500,
                                                margin: 'auto',
                                            }}
                                        >
                                            {news.id}
                                        </Box>
                                    </TableCell>
                                    <TableCell width={300}>
                                        <Stack direction={'row'} gap={1.5}>
                                            <Box
                                                sx={{
                                                    img: {
                                                        width: 80,
                                                        height: 40,
                                                        objectFit: 'cover',
                                                        borderRadius: theme.spacing(0.75),
                                                    },
                                                }}
                                            >
                                                <img
                                                    src={news.coverImage as string}
                                                    alt={news.title}
                                                />
                                            </Box>
                                            <Typography
                                                component="span"
                                                sx={{
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    fontWeight: `500 !important`,
                                                }}
                                            >
                                                {news.title}
                                            </Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>{formatDate(news.createdAt)}</TableCell>
                                    <TableCell align="center">
                                        <Box
                                            sx={{
                                                padding: theme.spacing(0.5, 1),
                                                borderRadius: theme.spacing(0.5),
                                                backgroundColor: colors[0],
                                                color: colors[1],
                                                textAlign: 'center',
                                                textTransform: 'capitalize',
                                                fontWeight: 500,
                                                maxWidth: 80,
                                                margin: 'auto',
                                            }}
                                        >
                                            {news.status}
                                        </Box>
                                    </TableCell>
                                    <TableCell>{news.numLikes} Likes</TableCell>
                                    <TableCell>{news.newsViews} Views</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Widget>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pNewsDashboard: state.news.news,
    }
}

export default connect(mapStateToProps, null)(DashboardNews)
