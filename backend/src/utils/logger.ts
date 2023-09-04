import logger from 'pino'
import dayjs from 'dayjs'
import prettifier from 'pino-pretty'

export const log = logger({
    prettifier,
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
})
