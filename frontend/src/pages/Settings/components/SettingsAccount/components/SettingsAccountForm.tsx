import { authApi } from '@/api'
import { ButtonLoadingForm } from '@/components/Common'
import { PasswordField } from '@/components/FormFields'
import { TYPE_ACCOUNT } from '@/consts'
import { IResetPassword, ISettingSetPassword } from '@/models'
import { AppDispatch } from '@/store'
import { setShowModalDeleteAccount } from '@/store/common'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, BoxProps, Button, Paper, Stack, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { enqueueSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import * as yup from 'yup'

export interface ISettingsAccountFormProps extends BoxProps {
    emailAddress: string
    pSetShowModal: (isShow: boolean) => void
    type: string
}

const schema = yup.object().shape({
    currentPassword: yup
        .string()
        .required('Please enter current password.')
        .min(6, 'Please enter current password at least six characters.'),
    password: yup
        .string()
        .required('Please enter new password.')
        .min(6, 'Please enter new password at least six characters.'),
    confirmPassword: yup
        .string()
        .required('Please enter confirm password.')
        .oneOf([yup.ref('password')], 'Confirm password not matched.')
        .min(6, 'Please enter confirm password at least six characters.'),
})

function SettingsAccountForm({ emailAddress, pSetShowModal, type, ...rest }) {
    const { t } = useTranslation()
    const form = useForm<ISettingSetPassword>({
        defaultValues: {
            currentPassword: '',
            password: '',
            confirmPassword: '',
        },
        resolver: yupResolver(schema),
    })

    const {
        reset,
        formState: { isSubmitting },
        handleSubmit,
    } = form

    const handleSetPassword = async (values: ISettingSetPassword) => {
        try {
            const newValues: IResetPassword = {
                emailAddress,
                password: values.currentPassword,
                confirmPassword: values.confirmPassword,
            }

            await authApi.resetPassword(newValues)

            reset()
            enqueueSnackbar(t('message.set_new_password_success'), {
                variant: 'success',
            })
        } catch (error) {
            enqueueSnackbar((error as Error).message, {
                variant: 'error',
            })
        }
    }

    const handleShowModal = () => {
        pSetShowModal(true)
    }

    return (
        <Box {...rest}>
            <Stack gap={3}>
                {type === TYPE_ACCOUNT && (
                    <Box component={Paper} elevation={1} padding={3}>
                        <Typography component="h2" variant="h5" fontWeight={700}>
                            {t('button.set_new_password')}
                        </Typography>
                        <Box
                            component="form"
                            paddingTop={2}
                            onSubmit={handleSubmit(handleSetPassword)}
                        >
                            <Box marginBottom={3}>
                                <PasswordField<ISettingSetPassword>
                                    form={form}
                                    label={t('input.current_password')}
                                    name="currentPassword"
                                    disabled={isSubmitting}
                                />
                                <PasswordField<ISettingSetPassword>
                                    form={form}
                                    label={t('input.password')}
                                    name="password"
                                    disabled={isSubmitting}
                                />
                                <PasswordField<ISettingSetPassword>
                                    form={form}
                                    label={t('input.confirm_password')}
                                    name="confirmPassword"
                                    disabled={isSubmitting}
                                />
                            </Box>
                            <ButtonLoadingForm
                                loading={isSubmitting}
                                text={t('button.set_new_password')}
                                fullWidth={false}
                            />
                        </Box>
                    </Box>
                )}

                <Box component={Paper} elevation={1} padding={3}>
                    <Typography component="h2" variant="h5" fontWeight={700}>
                        {t('button.delete_account')}
                    </Typography>
                    <Box paddingTop={2}>
                        <Button
                            variant="contained"
                            sx={{
                                fontWeight: 500,
                                padding: 1.5,
                                backgroundColor: red[500],
                                '&:hover': {
                                    backgroundColor: red[700],
                                },
                            }}
                            onClick={handleShowModal}
                        >
                            {t('button.delete_account')}
                        </Button>
                    </Box>
                </Box>
            </Stack>
        </Box>
    )
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetShowModal: (isShow: boolean) => dispatch(setShowModalDeleteAccount(isShow)),
    }
}

export default connect(null, mapDispatchToProps)(SettingsAccountForm)
