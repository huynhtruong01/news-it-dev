import { IHashTag } from '@/models'
import { theme } from '@/utils'
import { Box, Paper, Typography, alpha } from '@mui/material'
import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { COLOR_WHITE, DEFAULT_LANGUAGES } from '@/consts'
import { connect } from 'react-redux'
import { AppState } from '@/store'
import axios from 'axios'

export interface IDashboardTagProps {
    tag: IHashTag
    pLanguage: string
}

function DashboardTag({ tag, pLanguage }: IDashboardTagProps) {
    const [desc, setDesc] = useState<string>(tag.description as string)

    const color = useMemo(() => {
        return tag.color === COLOR_WHITE ? theme.palette.primary.dark : tag.color
    }, [tag])

    useEffect(() => {
        ;(async () => {
            try {
                const results = await axios
                    .post(
                        'https://rapid-translate-multi-traduction.p.rapidapi.com/t',
                        {
                            from:
                                pLanguage === DEFAULT_LANGUAGES
                                    ? 'en'
                                    : DEFAULT_LANGUAGES,
                            to:
                                pLanguage === DEFAULT_LANGUAGES
                                    ? DEFAULT_LANGUAGES
                                    : 'en',
                            q: tag.description,
                        },
                        {
                            headers: {
                                'content-type': 'application/json',
                                'X-RapidAPI-Key':
                                    'b58ca47cf1mshf76613c5f72fa07p17e82bjsnf62ccd71481d',
                                'X-RapidAPI-Host':
                                    'rapid-translate-multi-traduction.p.rapidapi.com',
                            },
                        }
                    )
                    .then((res) => res.data)
                setDesc(results[0])
            } catch (error) {
                throw new Error(error as string)
            }
        })()
    }, [pLanguage])

    return (
        <Box
            component={Paper}
            elevation={1}
            borderRadius={theme.spacing(0.75)}
            borderTop={`10px solid ${color}`}
        >
            <Box padding={theme.spacing(2, 3, 3)}>
                <Typography
                    component="h3"
                    fontSize={'18px'}
                    marginBottom={2}
                    sx={{
                        span: {
                            color,
                        },
                        a: {
                            fontWeight: 600,
                            padding: theme.spacing(0.75, 1),
                            borderRadius: theme.spacing(0.65),
                            color: alpha(theme.palette.secondary.main, 0.9),
                            transition: '.2s ease-in-out',
                            '&:hover': {
                                boxShadow: `0 0 0 1px ${color}`,
                                backgroundColor: alpha(color as string, 0.1),
                                color: theme.palette.secondary.main,
                            },
                        },
                    }}
                >
                    {/* WRITE LINK HERE */}
                    <Link to={`/tags/${tag.name}`}>
                        <span>#</span>
                        {tag.name}
                    </Link>
                </Typography>
                <Typography
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical',
                        color: theme.palette.grey[700],
                    }}
                >
                    {desc}
                </Typography>
            </Box>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pLanguage: state.common.languages,
    }
}

export default connect(mapStateToProps, null)(DashboardTag)
