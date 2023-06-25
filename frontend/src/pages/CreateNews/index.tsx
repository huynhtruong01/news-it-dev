import { Box } from '@mui/material'
import { CreateNewsForm } from '@/pages/CreateNews/components'
import { INewsForm, IOptionItem, IUser } from '@/models'
import { newsApi, notifyApi } from '@/api'
import { enqueueSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { uploadImage, generateIds, calcReadTimes } from '@/utils'
import { setInitValueForm } from '@/store/news'
import { AppDispatch, AppState } from '@/store'
import { initNewsFormValues } from '@/data'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/Common'

export const generateNewValues = (values: INewsForm) => {
    const { hashTagOptionIds, hashTags, ...rest } = values
    const ids = generateIds(hashTagOptionIds as IOptionItem[])

    const newContent = handleCleanContent(rest.content)
    rest.content = newContent

    return {
        newValues: rest,
        ids,
    }
}

const handleCleanContent = (content: string) => {
    // replace empty p tag
    const newContent = content.replace(/<p><\/p>/g, '')
    return newContent
}

export interface ICreateNewsProps {
    pUser: IUser | null
    pInitValuesForm: INewsForm
    pSetInitValuesNewsForm: (values: INewsForm) => void
}

function CreateNews({
    pUser,
    pSetInitValuesNewsForm,
    pInitValuesForm,
}: ICreateNewsProps) {
    const { t } = useTranslation()
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
            const readTimes = calcReadTimes(values.content)

            const res = await newsApi.addNews({
                ...newValues,
                hashTagIds: ids,
                readTimes,
            })
            enqueueSnackbar(t('message.create_success'), {
                variant: 'success',
            })
            navigate('/')

            if (pUser) {
                const notify = {
                    userId: pUser.id,
                    newsId: res.data.news.id,
                    text: 'add new news',
                    user: pUser,
                    news: res.data.news,
                    recipients: pUser.followers,
                    readUsers: [],
                }
                await notifyApi.newNewsNotify({ news: res.data.news, notify })
            }
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
            const readTimes = calcReadTimes(values.content)

            await newsApi.updateNews({ ...newValues, hashTagIds: ids, readTimes })

            enqueueSnackbar(t('message.update_success'), {
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

            pSetInitValuesNewsForm(initNewsFormValues)

            navigate('/')
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    return (
        <Box>
            <Seo
                title={`${
                    pInitValuesForm?.id
                        ? t('title_document.update_news')
                        : t('title_document.create_news')
                } - ${t('title_document.news_community')}`}
            />
            <CreateNewsForm onNewsSubmit={handleNewsSubmit} />
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pInitValuesForm: state.news.initValuesForm,
        pUser: state.user.user,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetInitValuesNewsForm: (values: INewsForm) => dispatch(setInitValueForm(values)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNews)
