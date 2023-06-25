import { Box, Grid, Paper, Stack, IconButton, Typography, BoxProps } from '@mui/material'
import Person2Icon from '@mui/icons-material/Person2'
import { theme } from '../../../utils'
import { teal, orange, indigo, red } from '@mui/material/colors'
import DescriptionIcon from '@mui/icons-material/Description'
import StyleIcon from '@mui/icons-material/Style'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { AppState } from '../../../store'
import { connect } from 'react-redux'
import { IStatisticalNums } from '../../../models'
import { Link } from 'react-router-dom'

export interface IStatisticalNumsProps extends BoxProps {
    pStatisticalNums: IStatisticalNums
}

export function StatisticalNums({ pStatisticalNums, ...rest }: IStatisticalNumsProps) {
    return (
        <Box {...rest}>
            <Grid
                container
                spacing={2}
                sx={{
                    '& button': {
                        borderRadius: theme.spacing(1),
                        padding: 1,
                        svg: {
                            width: 28,
                            height: 28,
                        },
                    },
                    '& h6, & span': {
                        lineHeight: 1,
                    },
                    '& h6': {
                        fontWeight: 700,
                    },
                    '& span': {
                        fontSize: theme.typography.caption,
                        color: theme.palette.grey[500],
                    },
                    '& .MuiGrid-item:hover': {
                        cursor: 'pointer',
                    },
                }}
            >
                <Grid item md={3}>
                    <Link to="/users">
                        <Stack
                            component={Paper}
                            elevation={1}
                            direction={'row'}
                            alignItems={'center'}
                            gap={2}
                            sx={{
                                padding: 3,
                            }}
                        >
                            <IconButton
                                sx={{
                                    backgroundColor: teal[50],
                                    svg: {
                                        color: teal[600],
                                    },
                                }}
                            >
                                <Person2Icon />
                            </IconButton>
                            <Stack justifyContent={'space-between'}>
                                <Typography component="h6" variant="h6" marginBottom={1}>
                                    {pStatisticalNums.numUser}
                                </Typography>
                                <Typography component="span">Users</Typography>
                            </Stack>
                        </Stack>
                    </Link>
                </Grid>
                <Grid item md={3}>
                    <Link to={'/news'}>
                        <Stack
                            component={Paper}
                            elevation={1}
                            direction={'row'}
                            alignItems={'center'}
                            gap={2}
                            sx={{
                                padding: 3,
                            }}
                        >
                            <IconButton
                                sx={{
                                    backgroundColor: orange[50],
                                    svg: {
                                        color: orange[600],
                                    },
                                }}
                            >
                                <DescriptionIcon />
                            </IconButton>
                            <Stack>
                                <Typography component="h6" variant="h6" marginBottom={1}>
                                    {pStatisticalNums.numNews}
                                </Typography>
                                <Typography component="span">News</Typography>
                            </Stack>
                        </Stack>
                    </Link>
                </Grid>
                <Grid item md={3}>
                    <Link to={'/hash-tags'}>
                        <Stack
                            component={Paper}
                            elevation={1}
                            direction={'row'}
                            alignItems={'center'}
                            gap={2}
                            sx={{
                                padding: 3,
                            }}
                        >
                            <IconButton
                                sx={{
                                    backgroundColor: indigo[50],
                                    svg: {
                                        color: indigo[600],
                                    },
                                }}
                            >
                                <StyleIcon />
                            </IconButton>
                            <Stack>
                                <Typography component="h6" variant="h6" marginBottom={1}>
                                    {pStatisticalNums.numHashTag}
                                </Typography>
                                <Typography component="span">Tags</Typography>
                            </Stack>
                        </Stack>
                    </Link>
                </Grid>
                <Grid item md={3}>
                    <Stack
                        component={Paper}
                        elevation={1}
                        direction={'row'}
                        alignItems={'center'}
                        gap={2}
                        sx={{
                            padding: 3,
                            cursor: 'text',
                        }}
                    >
                        <IconButton
                            sx={{
                                backgroundColor: red[50],
                                svg: {
                                    color: red[600],
                                },
                                cursor: 'auto',
                            }}
                        >
                            <FavoriteIcon />
                        </IconButton>
                        <Stack>
                            <Typography component="h6" variant="h6" marginBottom={1}>
                                {pStatisticalNums.numLikes}
                            </Typography>
                            <Typography component="span">Likes</Typography>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pStatisticalNums: state.common.statisticalNums,
    }
}

export default connect(mapStateToProps, null)(StatisticalNums)
