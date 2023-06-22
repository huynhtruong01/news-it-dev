import moment from 'moment'

export const shortDateFormat = (date: Date) => moment(date).format('DD/MM/YYYY')

export const longDateTimeFormat = (date: Date) => moment(date).format('DD/MM/YYYY HH:mm')

export const fullDateTimeFormat = (date: Date) =>
    moment(date).format('DD/MM/YYYY HH:mm:ss')

export const timeFormat = (date: Date) => moment(date).format('HH:mm')

export const timeSince = (date: Date) => {
    const seconds = moment().diff(moment(date), 'seconds')

    let interval = seconds / 31536000
    if (interval > 1) {
        return `${longDateTimeFormat(date)}`
    }

    interval = seconds / 2592000
    if (interval > 1) {
        return `${Math.floor(interval)} tháng trước`
    }

    interval = seconds / 604800
    if (interval > 1) {
        return `${Math.floor(interval)} tuần trước`
    }

    interval = seconds / 86400
    if (interval > 1) {
        return `${Math.floor(interval)} ngày trước`
    }

    interval = seconds / 3600
    if (interval > 1) {
        return `${Math.floor(interval)} giờ trước`
    }

    interval = seconds / 60
    if (interval > 1) {
        return `${Math.floor(interval)} phút trước`
    }

    return `${Math.floor(seconds)} giây trước`
}
