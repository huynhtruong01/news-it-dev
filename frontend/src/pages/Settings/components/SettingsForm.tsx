import { InputField, ImageField } from '@/components/FormFields'
import { initUserProfileValues } from '@/data'
import { IUser, IUserData } from '@/models'
import { Box, BoxProps, Paper, Typography, Stack, Button } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { theme, checkTypeImg, checkSizeImg } from '@/utils'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SIZE_10_MB } from '@/consts'

export interface ISettingsFormProps extends BoxProps {
    user: IUser
}

export function SettingsForm({ user, ...rest }: ISettingsFormProps) {
    const {
        avatar,
        username,
        lastName,
        firstName,
        emailAddress,
        websiteUrl,
        bio,
        currentlyLearning,
        education,
        work,
        skillLanguages,
    } = user

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
            .test('is-required', 'Choose avatar image.', (value) => {
                if (!avatar || !value) return
                return true
            })
            .test('type-img', 'Invalid type image.', (file) => {
                if (avatar) return true
                return checkTypeImg(file)
            })
            .test('size-img', 'Maximum 10MB.', (file) => {
                if (avatar) return true
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

        setValue('username', username)
        setValue('lastName', lastName)
        setValue('firstName', firstName)
        setValue('emailAddress', emailAddress)
        setValue('websiteUrl', websiteUrl)
        setValue('bio', bio)
        setValue('currentlyLearning', currentlyLearning)
        setValue('skillLanguages', skillLanguages)
        setValue('education', education)
        setValue('work', work)
        setValue('avatar', avatar)
    }, [user])

    const handleSaveInfoSubmit = async (values: IUserData) => {
        try {
            // TODO: covert img by cloudinary
            // TODO: FETCH API TO UPDATE PROFILE
            console.log('values: ', values)
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
                            initValue={avatar}
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
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: theme.palette.primary.light,
                            '&:hover': {
                                backgroundColor: theme.palette.primary.dark,
                            },
                        }}
                    >
                        Save Profile Information
                    </Button>
                </Box>
            </Stack>
        </Box>
    )
}
