import { hashTagApi } from '@/api'
import { IsFollow } from '@/enums'
import { IFollow, IHashTag, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { getProfile } from '@/store/user/thunkApi'
import { theme } from '@/utils'
import { Box, Button, Paper, Typography, alpha } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { useMemo, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export interface ITagsItemProps {
    pUser: IUser | null
    pGetProfile: () => Promise<PayloadAction<unknown>>
    tag: IHashTag
}

function TagsItem({ tag, pUser, pGetProfile }: ITagsItemProps) {
    const [followed, setFollowed] = useState<IFollow>(IsFollow.FOLLOW)
    const color = useMemo(() => {
        return tag.color === '#ffffff' ? theme.palette.primary.dark : tag.color
    }, [tag])

    useEffect(() => {
        if (Array.isArray(pUser?.hashTags)) {
            const isFollowed = pUser?.hashTags.find((t) => t.id === tag.id)
            if (isFollowed) {
                setFollowed(IsFollow.FOLLOWING)
                return
            }

            setFollowed(IsFollow.FOLLOW)
            return
        }
    }, [pUser])

    const handleFollowClick = async () => {
        try {
            if (followed === IsFollow.FOLLOW && tag.id) {
                await hashTagApi.followHashTag(tag.id)
                setFollowed(IsFollow.FOLLOWING)
            } else {
                await hashTagApi.unfollowHashTag(tag.id)
                setFollowed(IsFollow.FOLLOW)
            }

            await pGetProfile()
        } catch (error) {
            throw new Error(error as string)
        }
    }

    return (
        <Box
            component={Paper}
            elevation={1}
            sx={{
                borderTop: `1rem solid ${color}`,
                borderRadius: theme.spacing(0.75),
            }}
        >
            <Box
                sx={{
                    padding: 3,
                }}
            >
                <Typography
                    component="h3"
                    fontSize={'19px'}
                    marginBottom={2}
                    sx={{
                        marginLeft: -1,
                        span: {
                            color: color,
                        },
                        a: {
                            fontWeight: 600,
                            padding: theme.spacing(1, 1.25),
                            borderRadius: theme.spacing(0.75),
                            transition: '.2s ease-in-out',
                            '&:hover': {
                                boxShadow: `0 0 0 1px ${color}`,
                                backgroundColor: alpha(color as string, 0.1),
                            },
                        },
                    }}
                >
                    {/* TODO: WRITE LINK HERE */}
                    <Link to={`/tags/${tag.slug}`}>
                        <span>#</span>
                        {tag.name}
                    </Link>
                </Typography>
                <Typography marginBottom={1.5}>{tag.description}</Typography>
                <Typography
                    sx={{
                        marginBottom: 2,
                        fontSize: theme.typography.body2,
                    }}
                >
                    {tag.news?.length || 0} news published
                </Typography>
                {/* TODO: CHECK FOLLOW & FOLLOWING */}
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: 'transparent',
                        border: `2px solid ${theme.palette.grey[500]}`,
                        borderRadius: theme.spacing(0.75),
                        color: theme.palette.secondary.main,
                        padding: theme.spacing(0.75, 1.75),
                        fontSize: theme.typography.body1,
                        fontWeight: 500,
                        transition: '.2s ease-in-out',
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.grey[700], 0.05),
                            borderColor: theme.palette.grey[700],
                        },
                    }}
                    onClick={handleFollowClick}
                >
                    {followed === IsFollow.FOLLOW ? 'Follow' : 'Following'}
                </Button>
            </Box>
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
        pGetProfile: () => dispatch(getProfile()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagsItem)
