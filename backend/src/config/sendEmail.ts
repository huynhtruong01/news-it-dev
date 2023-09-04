import { OAuth2Client } from 'google-auth-library'
import nodemailer, { TransportOptions } from 'nodemailer'
// import smtpTransport from 'nodemailer-smtp-transport'

import dotenv from 'dotenv'
dotenv.config({
    path: './.env',
})

export interface CustomTransportOptions extends TransportOptions {
    service: string
}

const OAUTH_PLAYGROUND = process.env.OAUTH_PLAYGROUND as string
const CLIENT_ID = process.env.CLIENT_ID as string
const CLIENT_SECRET = process.env.CLIENT_SECRET as string
const MAIL_REFRESH_TOKEN = process.env.MAIL_REFRESH_TOKEN as string
const SENDER_EMAIL_ADDRESS = process.env.SENDER_EMAIL_ADDRESS as string

export const sendEmail = async (
    to: string | string[],
    url: string,
    text: string,
    message = `Chúc mừng! Bạn gần như đã sẵn sàng để bắt đầu sử dụng Web Tin tức.
    Chỉ cần nhấp vào nút bên dưới để xác thực địa chỉ email của bạn.`
) => {
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
            html: `<div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to News Technology UTC2</h2>
            <p>${message}
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${text}</a>
        
            <p>Nếu nút không hoạt động vì bất kỳ lý do gì, bạn cũng có thể nhấp vào đường link bên dưới:</p>
        
            <div>${url}</div>
            </div>`,
        }

        const result = await transport.sendMail(mailOptions)
        return result
    } catch (error) {
        throw new Error(`error send email ${error}` as string)
    }
}
