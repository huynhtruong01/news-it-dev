import { InputField } from '@/components/FormFields'
import { initUserProfileValues } from '@/data'
import { IUser, IUserData } from '@/models'
import { Box, BoxProps, Paper, Typography, Stack, Button } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { theme } from '@/utils'
import * as yup from 'yup'

export interface ISettingsFormProps extends BoxProps {
    user: IUser
}

// TODO: MAKE SCHEMA HERE !!!
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
    avatar: yup.string(),
})

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

    const form = useForm<IUserData>({
        defaultValues: initUserProfileValues,
    })
    const {
        setValue,
        reset,
        formState: { isSubmitting },
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

    return (
        <Box {...rest}>
            <Stack component="form" gap={3}>
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
                        />
                        <InputField
                            form={form}
                            name="firstName"
                            label="First Name"
                            disabled={isSubmitting}
                        />
                        <InputField
                            form={form}
                            name="lastName"
                            label="Last Name"
                            disabled={isSubmitting}
                        />
                        <InputField
                            form={form}
                            name="emailAddress"
                            label="Email"
                            disabled={isSubmitting}
                        />
                        {/* TODO: AVATAR FIELD */}
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
                        />
                        <InputField
                            form={form}
                            name="bio"
                            label="Bio"
                            disabled={isSubmitting}
                        />
                        <InputField
                            form={form}
                            name="currentlyLearning"
                            label="Currently Learning"
                            disabled={isSubmitting}
                        />
                        <InputField
                            form={form}
                            name="skillLanguages"
                            label="Skills Languages"
                            disabled={isSubmitting}
                        />
                        <InputField
                            form={form}
                            name="education"
                            label="Education"
                            disabled={isSubmitting}
                        />
                        <InputField
                            form={form}
                            name="work"
                            label="Work"
                            disabled={isSubmitting}
                        />
                    </Box>
                </Box>

                <Box component={Paper} elevation={1} padding={3}>
                    <Button
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
