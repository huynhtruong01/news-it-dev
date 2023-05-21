import { OAuth2Client } from 'google-auth-library'
import nodemailer, { TransportOptions } from 'nodemailer'

export interface CustomTransportOptions extends TransportOptions {
    service: string
}

const OAUTH_PLAYGROUND = process.env.OAUTH_PLAYGROUND as string
const CLIENT_ID = process.env.CLIENT_ID as string
const CLIENT_SECRET = process.env.CLIENT_SECRET as string
const MAIL_REFRESH_TOKEN = process.env.MAIL_REFRESH_TOKEN as string
const SENDER_EMAIL_ADDRESS = process.env.SENDER_EMAIL_ADDRESS as string

export const sendEmail = async (to: string, url: string, text: string) => {
    const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, OAUTH_PLAYGROUND)

    oAuth2Client.setCredentials({ refresh_token: MAIL_REFRESH_TOKEN })

    try {
        const accessToken = await oAuth2Client.getAccessToken()
        const transportOptions = {
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: SENDER_EMAIL_ADDRESS,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: MAIL_REFRESH_TOKEN,
                accessToken: accessToken.token,
            },
        } as TransportOptions

        const transport = nodemailer.createTransport(transportOptions)

        const mailOptions = {
            from: SENDER_EMAIL_ADDRESS,
            to,
            subject: 'News Website',
            text,
            html: `${url}`,
        }

        const result = await transport.sendMail(mailOptions)
        return result
    } catch (error) {
        throw new Error(error as string)
    }
}
