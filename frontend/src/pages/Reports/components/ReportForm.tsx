import { reportApi } from '@/api'
import { ButtonLoadingForm } from '@/components/Common'
import { InputField, RadioListField } from '@/components/FormFields'
import { reportList } from '@/data'
import { StatusReport } from '@/enums'
import { IObjectCommon, IReportData, IReportForm, IReportStatus, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { setNewsReport } from '@/store/news'
import { theme } from '@/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Stack, alpha } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

export interface IReportFormProps {
    pSetNewsReport: (value: IObjectCommon | null) => void
    pNewsReport: IObjectCommon | null
    pUser: IUser | null
}

const schema = yup.object().shape({
    report: yup.object().required('Please choose one of these options'),
    message: yup.string(),
})

function ReportForm({ pSetNewsReport, pNewsReport, pUser }: IReportFormProps) {
    const [status, setStatus] = useState<string>('')
    const navigate = useNavigate()
    const { t } = useTranslation()

    const form = useForm<IReportForm>({
        defaultValues: {
            report: null,
            message: '',
        },
        resolver: yupResolver(schema),
    })

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = form

    const handleReportSubmit = async (values: IReportForm) => {
        try {
            if (pNewsReport && pUser) {
                const report: IReportData = {
                    newsId: pNewsReport.newsId as number,
                    userId: pUser.id as number,
                    reason:
                        values.report?.id === StatusReport.OTHER
                            ? (values.message as string)
                            : (values.report?.value as string),
                    status: values.report?.id as IReportStatus,
                }
                await reportApi.createReport(report)
                reset()
                pSetNewsReport(null)
                enqueueSnackbar(t('message.report_success'), {
                    variant: 'success',
                })
                navigate(-1)
            }
        } catch (error) {
            enqueueSnackbar((error as Error).message, {
                variant: 'error',
            })
        }
    }

    const handleBack = () => {
        navigate(-1)
    }

    const handleStatusChange = (value: string) => {
        setStatus(value)
    }

    return (
        <Box component={'form'} onSubmit={handleSubmit(handleReportSubmit)}>
            <Box>
                <RadioListField<IReportForm>
                    form={form}
                    name={'report'}
                    label={t('input.report')}
                    disabled={isSubmitting}
                    radioList={reportList}
                    required
                    onStatusChange={handleStatusChange}
                />
                {status === StatusReport.OTHER && (
                    <InputField<IReportForm>
                        form={form}
                        label={t('input.message')}
                        placeholder="..."
                        name={'message'}
                        disabled={isSubmitting}
                        minRows={4}
                        multiline
                    />
                )}
            </Box>
            <Stack
                direction={'row'}
                gap={1.5}
                sx={{
                    marginTop: 3,
                    button: {
                        fontWeight: 500,
                        padding: theme.spacing(1.5),
                    },
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        color: theme.palette.secondary.main,
                        border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                        },
                    }}
                    onClick={handleBack}
                >
                    {t('button.back')}
                </Button>
                <ButtonLoadingForm
                    loading={isSubmitting}
                    text={t('button.send_feedback') as string}
                    sx={{
                        flex: 1,
                    }}
                />
            </Stack>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pNewsReport: state.news.newsReport,
        pUser: state.user.user,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetNewsReport: (value: IObjectCommon | null) => dispatch(setNewsReport(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm)
