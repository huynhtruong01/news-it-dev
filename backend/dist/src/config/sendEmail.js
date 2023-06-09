"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const google_auth_library_1 = require("google-auth-library");
const nodemailer_1 = __importDefault(require("nodemailer"));
// import smtpTransport from 'nodemailer-smtp-transport'
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: './.env',
});
const OAUTH_PLAYGROUND = process.env.OAUTH_PLAYGROUND;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const MAIL_REFRESH_TOKEN = process.env.MAIL_REFRESH_TOKEN;
const SENDER_EMAIL_ADDRESS = process.env.SENDER_EMAIL_ADDRESS;
const sendEmail = (to, url, text) => __awaiter(void 0, void 0, void 0, function* () {
    const oAuth2Client = new google_auth_library_1.OAuth2Client(CLIENT_ID, CLIENT_SECRET, OAUTH_PLAYGROUND);
    oAuth2Client.setCredentials({ refresh_token: MAIL_REFRESH_TOKEN });
    try {
        const accessToken = yield oAuth2Client.getAccessToken();
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
        };
        const transport = nodemailer_1.default.createTransport(transportOptions);
        const mailOptions = {
            from: SENDER_EMAIL_ADDRESS,
            to,
            subject: 'News Website',
            text,
            html: `<div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to News Technology UTC2.</h2>
            <p>Congratulations! You're almost set to start using News Web.
                Just click the button below to validate your email address.
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${text}</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>${url}</div>
            </div>`,
        };
        const result = yield transport.sendMail(mailOptions);
        return result;
    }
    catch (error) {
        throw new Error(`error send email ${error}`);
    }
});
exports.sendEmail = sendEmail;
