import moment from 'moment'

export const formatDate = (date: Date, formatStr = 'MMM DD YYYY') => {
    return moment(date).format(formatStr)
}
