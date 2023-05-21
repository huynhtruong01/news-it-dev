import { InputField, ImageField } from '@/components/FormFields'
import { initUserProfileValues } from '@/data'
import { IUser, IUserData } from '@/models'
import { Box, BoxProps, Paper, Typography, Stack } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { theme, checkTypeImg, checkSizeImg } from '@/utils'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SIZE_10_MB } from '@/consts'
import { userApi } from '@/api'
import { saveUserLogin } from '@/store/user'
import { AppDispatch } from '@/store'
import { connect } from 'react-redux'
import { uploadImage } from '@/utils'
import { useSnackbar } from 'notistack'
import LoadingButton from '@mui/lab/LoadingButton'

export interface ISettingsFormProps extends BoxProps {
    user: IUser | null
    pSaveUserLogin: (data: IUser) => void
}

export function SettingsForm({ user, pSaveUserLogin, ...rest }: ISettingsFormProps) {
    const { enqueueSnackbar } = useSnackbar()
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
                if (user.avatar) return true
                return checkTypeImg(file)
            })
            .test('size-img', 'Maximum 10MB.', (file) => {
                if (user.avatar) return true
                return checkSizeImg(file, SIZE_10_MB)
            }),
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
        }
    }, [user])

    const handleSaveInfoSubmit = async (values: IUserData) => {
        try {
            if (user.id) {
                const newValues: IUser = { ...values, id: user.id }
                if (newValues.avatar instanceof File) {
                    // covert img by cloudinary
                    const { url } = await uploadImage(newValues.avatar)
                    newValues.avatar = url
                }

                // FETCH API TO UPDATE PROFILE
                const res = await userApi.updateUser(newValues)
                pSaveUserLogin(res.data.user)

                enqueueSnackbar('Update profile successfully.', {
                    variant: 'success',
                })
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
                        User
                    </Typography>
                    <Box paddingTop={2}>
                        <InputField
                            form={form}
                            name="username"
                            label="Username"
                            disabled={isSubmitting}
                            placeholder={'John Doe'}
                        />
                        <InputField
                            form={form}
                            name="firstName"
                            label="First Name"
                            disabled={isSubmitting}
                            placeholder={'Doe'}
                        />
                        <InputField
                            form={form}
                            name="lastName"
                            label="Last Name"
                            disabled={isSubmitting}
                            placeholder={'John'}
                        />
                        <InputField
                            form={form}
                            name="emailAddress"
                            label="Email"
                            disabled={isSubmitting}
                            placeholder={'john.doe@example.com'}
                        />
                        <ImageField
                            form={form}
                            name="avatar"
                            label="Profile Image"
                            disabled={isSubmitting}
                            initValue={user?.avatar}
                        />
                    </Box>
                </Box>

                <Box component={Paper} elevation={1} padding={3}>
                    <Typography component="h2" variant="h5" fontWeight={700}>
                        Other Information
                    </Typography>
                    <Box paddingTop={2}>
                        <InputField
                            form={form}
                            name="websiteUrl"
                            label="Website URL"
                            disabled={isSubmitting}
                            placeholder={'https://yoursite.com'}
                        />
                        <InputField
                            form={form}
                            name="bio"
                            label="Bio"
                            disabled={isSubmitting}
                            placeholder={'A short bio...'}
                            minRows={4}
                            multiline
                        />
                        <InputField
                            form={form}
                            name="currentlyLearning"
                            label="Currently Learning"
                            disabled={isSubmitting}
                            minRows={4}
                            multiline
                        />
                        <InputField
                            form={form}
                            name="skillLanguages"
                            label="Skills Languages"
                            disabled={isSubmitting}
                            placeholder={'Any languages, frameworks,etc...'}
                            minRows={4}
                            multiline
                        />
                        <InputField
                            form={form}
                            name="education"
                            label="Education"
                            disabled={isSubmitting}
                            placeholder={'Where did you go to school?'}
                        />
                        <InputField
                            form={form}
                            name="work"
                            label="Work"
                            disabled={isSubmitting}
                            placeholder={'What do you do?'}
                        />
                    </Box>
                </Box>

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
                            padding: theme.spacing(1.5),
                            fontWeight: 500,
                            '&:hover': {
                                backgroundColor: theme.palette.primary.dark,
                            },
                        }}
                    >
                        Save Profile Information
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

export default connect(null, mapDispatchToProps)(SettingsForm)
