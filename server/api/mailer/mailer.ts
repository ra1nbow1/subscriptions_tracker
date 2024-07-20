import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import { IUser } from '../models/user.model'

dotenv.config()

const transporter = nodemailer.createTransport({
	host: process.env.MAIL_SERVER,
	port: 587,
	secure: false,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASSWORD,
	},
})

export default async function sendMail(
	recipient: IUser['email'],
	uid: IUser['uid'],
	hash: IUser['hash'],
) {
	await transporter.sendMail({
		from: `"Трекер подписок" <${process.env.MAIL_USER}>`,
		to: recipient,
		subject: 'Подтвердите адрес электронной почты',
		html: `Для подтверждения перейдите по <a href="${process.env.BASE_URL}/auth/verify/${uid}/${hash}/">ссылке</a>`,
	})
}