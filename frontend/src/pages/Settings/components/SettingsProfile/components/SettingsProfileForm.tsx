import { userApi } from '@/api'
import { ImageField, InputField, ColorField } from '@/components/FormFields'
import { SIZE_10_MB } from '@/consts'
import { initUserProfileValues } from '@/data'
import { IUser, IUserData } from '@/models'
import { AppDispatch } from '@/store'
import { saveUserLogin } from '@/store/user'
import { checkSizeImg, checkTypeImg, theme, uploadImage } from '@/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, BoxProps, Paper, Stack, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { SettingsSelectLanguages } from '@/pages/Settings/components/SettingsProfile/components'
import { useTranslation } from 'react-i18next'

export interface ISettingsProfileFormProps extends BoxProps {
    user: IUser | null
    pSaveUserLogin: (data: IUser) => void
}

export function SettingsProfileForm({
    user,
    pSaveUserLogin,
    ...rest
}: ISettingsProfileFormProps) {
    const { t } = useTranslation()
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const schema = yup.object().shape({
        username: yup.string().required('Please enter username.'),
        lastName: yup.string().required('Please enter last name.'),
        firstName: yup.string().required('Please enter first name.'),
        emailAddress: yup.string().required('Please enter email address.'),
        websiteUrl: yup.string(),
        bio: yup.string(),
        currentlyLearning: yup.string(),
        work: yup.string(),
        skillLanguages: yup.string(),
        avatar: yup
            .mixed()
            .test('type-img', 'Invalid type image.', (file) => {
                if (user?.avatar) return true
                return checkTypeImg(file as File)
            })
            .test('size-img', 'Maximum 10MB.', (file) => {
                if (user?.avatar) return true
                return checkSizeImg(file as File, SIZE_10_MB)
            }),
        bandingColor: yup.string(),
    })

    const form = useForm<IUserData>({
        defaultValues: initUserProfileValues,
        resolver: yupResolver(schema),
    })
    const {
        setValue,
        reset,
        formState: { isSubmitting },
        handleSubmit,
    } = form

    useEffect(() => {
        reset(initUserProfileValues)

        if (user) {
            setValue('username', user?.username)
            setValue('lastName', user?.lastName)
            setValue('firstName', user?.firstName)
            setValue('emailAddress', user?.emailAddress)
            setValue('websiteUrl', user?.websiteUrl)
            setValue('bio', user?.bio)
            setValue('currentlyLearning', user?.currentlyLearning)
            setValue('skillLanguages', user?.skillLanguages)
            setValue('education', user?.education)
            setValue('work', user?.work)
            setValue('avatar', user?.avatar)
            setValue('bandingColor', user?.bandingColor)
        }
    }, [user])

    const handleSaveInfoSubmit = async (values: IUserData) => {
        try {
            if (user?.id) {
                const newValues: IUser = { ...values, id: user?.id as number }
                if (newValues?.avatar && (newValues.avatar as File) instanceof File) {
                    // covert img by cloudinary
                    const img = await uploadImage(
                        newValues.avatar as File,
                        import.meta.env.VITE_UPLOAD_PRESETS_AVATAR_CLOUDINARY
                    )
                    newValues.avatar = img?.url as string
                }

                // FETCH API TO UPDATE PROFILE
                const res = await userApi.updateUser(newValues)
                pSaveUserLogin(res.data.user)

                enqueueSnackbar(t('message.update_profile_success'), {
                    variant: 'success',
                })

                navigate('/profile')
            }
        } catch (error) {
            throw new Error(error as string)
        }
    }

    return (
        <Box {...rest}>
            <Stack component="form" gap={3} onSubmit={handleSubmit(handleSaveInfoSubmit)}>
                <Box component={Paper} elevation={1} padding={3}>
                    <Typography component="h2" variant="h5" fontWeight={700}>
                        {t('settings.user')}
                    </Typography>
                    <Box paddingTop={2}>
                        <InputField<IUserData>
                            form={form}
                            name="username"
                            label={t('input.username')}
                            disabled={isSubmitting}
                            placeholder={'John Doe'}
                        />
                        <InputField<IUserData>
                            form={form}
                            name="firstName"
                            label={t('input.first_name')}
                            disabled={isSubmitting}
                            placeholder={'Doe'}
                        />
                        <InputField<IUserData>
                            form={form}
                            name="lastName"
                            label={t('input.last_name')}
                            disabled={isSubmitting}
                            placeholder={'John'}
                        />
                        <InputField<IUserData>
                            form={form}
                            name="emailAddress"
                            label={t('input.email')}
                            disabled={isSubmitting}
                            placeholder={'john.doe@example.com'}
                        />
                        <ImageField<IUserData>
                            form={form}
                            name="avatar"
                            label={t('input.profile_image')}
                            disabled={isSubmitting}
                            initValue={user?.avatar as string}
                        />
                    </Box>
                </Box>

                <Box component={Paper} elevation={1} padding={3}>
                    <Typography component="h2" variant="h5" fontWeight={700}>
                        {t('settings.other_information')}
                    </Typography>
                    <Box paddingTop={2}>
                        <InputField<IUserData>
                            form={form}
                            name="websiteUrl"
                            label={t('input.website_url')}
                            disabled={isSubmitting}
                            placeholder={'https://yoursite.com'}
                        />
                        <InputField<IUserData>
                            form={form}
                            name="bio"
                            label={t('input.bio')}
                            disabled={isSubmitting}
                            placeholder={t('placeholder.short_bio') as string}
                            minRows={4}
                            multiline
                        />
                        <InputField<IUserData>
                            form={form}
                            name="currentlyLearning"
                            label={t('input.currently_learning')}
                            disabled={isSubmitting}
                            minRows={4}
                            multiline
                        />
                        <InputField<IUserData>
                            form={form}
                            name="skillLanguages"
                            label={t('input.skill_languages')}
                            disabled={isSubmitting}
                            placeholder={t('placeholder.skill_languages') as string}
                            minRows={4}
                            multiline
                        />
                        <InputField<IUserData>
                            form={form}
                            name="education"
                            label={t('input.education')}
                            disabled={isSubmitting}
                            placeholder={
                                t('placeholder.where_did_you_go_to_school') as string
                            }
                        />
                        <InputField<IUserData>
                            form={form}
                            name="work"
                            label={t('input.work')}
                            disabled={isSubmitting}
                            placeholder={t('placeholder.what_do_you_do') as string}
                        />
                    </Box>
                </Box>

                <Box component={Paper} elevation={1} padding={3}>
                    <Typography component="h2" variant="h5" fontWeight={700}>
                        {t('settings.banding')}
                    </Typography>
                    <Box paddingTop={2}>
                        <ColorField<IUserData>
                            form={form}
                            name={'bandingColor'}
                            label={t('input.banding_color')}
                            disabled={isSubmitting}
                            placeholder={'Enter color'}
                        />
                    </Box>
                </Box>

                <SettingsSelectLanguages />

                <Box component={Paper} elevation={1} padding={3}>
                    <LoadingButton
                        type="submit"
                        fullWidth
                        loading={isSubmitting}
                        loadingPosition="start"
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{
                            backgroundColor: theme.palette.primary.light,
                            padding: 1.5,
                            fontWeight: 500,
                            '&:hover': {
                                backgroundColor: theme.palette.primary.dark,
                            },
                        }}
                    >
                        {t('button.save_profile_info')}
                    </LoadingButton>
                </Box>
            </Stack>
        </Box>
    )
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSaveUserLogin: (data: IUser) => dispatch(saveUserLogin(data)),
    }
}

export default connect(null, mapDispatchToProps)(SettingsProfileForm)
