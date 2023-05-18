import { Box } from '@mui/material'
import { CreateNewsForm } from '@/pages/CreateNews/components'
import { INewsForm, IOptionItem } from '@/models'
import { newsApi } from '@/api'
import { enqueueSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { uploadImage, generateIds } from '@/utils'

const generateNewValues = (values: INewsForm) => {
    const { hashTagOptionIds, hashTags, ...rest } = values
    const ids = generateIds(hashTagOptionIds as IOptionItem[])

    return {
        newValues: rest,
        ids,
    }
}

export function CreateNews() {
    const navigate = useNavigate()

    // create news
    const handleCreateNews = async (values: INewsForm) => {
        try {
            const { newValues, ids } = generateNewValues(values)
            if (newValues.thumbnailImage instanceof File) {
                const thumbnailImg = await uploadImage(
                    newValues.thumbnailImage,
                    import.meta.env.VITE_UPLOAD_PRESETS_NEWS_CLOUDINARY
                )
                newValues.thumbnailImage = thumbnailImg?.url
            }

            if (newValues.coverImage instanceof File) {
                const coverImg = await uploadImage(
                    newValues.coverImage,
                    import.meta.env.VITE_UPLOAD_PRESETS_NEWS_CLOUDINARY
                )
                newValues.coverImage = coverImg?.url
            }

            await newsApi.addNews({ ...newValues, hashTagIds: ids })

            enqueueSnackbar('Create News successfully.', {
                variant: 'success',
            })
            navigate('/')
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    // update news
    const handleUpdateNews = async (values: INewsForm) => {
        try {
            const { newValues, ids } = generateNewValues(values)
            if (newValues.thumbnailImage instanceof File) {
                const thumbnailImg = await uploadImage(
                    newValues.thumbnailImage,
                    import.meta.env.VITE_UPLOAD_PRESETS_NEWS_CLOUDINARY
                )
                newValues.thumbnailImage = thumbnailImg?.url
            }

            if (newValues.coverImage instanceof File) {
                const coverImg = await uploadImage(
                    newValues.coverImage,
                    import.meta.env.VITE_UPLOAD_PRESETS_NEWS_CLOUDINARY
                )
                newValues.coverImage = coverImg?.url
            }

            await newsApi.updateNews({ ...newValues, hashTagIds: ids })

            enqueueSnackbar('Update News successfully.', {
                variant: 'success',
            })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    const handleNewsSubmit = async (values: INewsForm) => {
        try {
            if (values?.id) {
                await handleUpdateNews(values)
            } else {
                await handleCreateNews(values)
            }

            navigate('/')
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    return (
        <Box>
            <CreateNewsForm onNewsSubmit={handleNewsSubmit} />
        </Box>
    )
}
