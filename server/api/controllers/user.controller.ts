import bcrypt from 'bcryptjs'
import * as crypto from 'crypto'
import dotenv from 'dotenv'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import QueryString from 'qs'
import sendMail from '../mailer/mailer'
import { ISubscription, IUser, User } from '../models/user.model'

dotenv.config()
const secretKey: string = process.env.TOKEN_KEY as string // Замените на ваш секретный ключ

// Регистрация пользователя
const registerUser = async (req: Request, res: Response): Promise<Response> => {
	const { first_name, last_name, email, password }: IUser = req.body

	if (!first_name || !last_name || !email || !password) {
		return res.status(422).json({ message: 'Fill all the fields' })
	}

	try {
		const existingUser: IUser | null = (await User.findOne({
			email,
		})) as IUser

		if (existingUser) {
			return res
				.status(409)
				.json({ message: 'User with this email already exists' })
		}

		const hashedPassword = await bcrypt.hash(password, 10)
		const uid = (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6)
		const hash = crypto
			.createHash('md5')
			.update(email.split('@')[0] as any)
			.digest('hex')

		await sendMail(email, uid, hash)

		const newUser: IUser = await User.create({
			uid: uid,
			first_name,
			last_name,
			email,
			password: hashedPassword,
			subscriptions: [],
			token: '',
			tgID: '',
			hash: hash,
			emailVerified: false,
		})

		return res.status(201).json(newUser)
	} catch (err) {
		console.error('Error while creating user:', err)
		return res.status(500).json({ message: 'Error while creating user' })
	}
}

// Вход пользователя
const loginUser = async (req: Request, res: Response): Promise<Response> => {
	const { email, password }: IUser = req.body

	if (!email || !password) {
		return res.status(422).json({ message: 'Fill all the fields' })
	}

	try {
		const user: IUser = (await User.findOne({ email })) as IUser
		if (!user) {
			return res.status(401).json({ message: 'Wrong credentials' })
		}

		if (!user.emailVerified) {
			return res.status(401).json({ message: 'Email is not verified' })
		}

		const isPasswordValid = await bcrypt.compare(password, user.password)
		const isHashValid = password === user.password

		if (!isPasswordValid && !isHashValid) {
			return res.status(401).json({ message: 'Wrong credentials' })
		}

		const token: IUser['token'] = jwt.sign({ uid: user.uid }, secretKey, {
			expiresIn: '1h',
		})
		return res.status(200).json({ token })
	} catch (err) {
		console.error('Error while user logging in occurred:', err)
		return res
			.status(500)
			.json({ message: 'Error while user logging in occurred' })
	}
}

// Получение всех юзеров
const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
	const users = await User.find()
	return res.status(200).json(users)
}

// Получение данных пользователя
const getUserData = async (req: Request, res: Response): Promise<Response> => {
	const token: IUser['token'] | undefined =
		req.headers.authorization?.split(' ')[1]

	if (!token) {
		return res.status(401).json({ message: 'Please, log in to the system' })
	}

	try {
		const decoded: unknown = jwt.verify(token, secretKey)
		const uid: IUser['uid'] = (decoded as IUser).uid

		const user: IUser | null = (await User.findOne({ uid: uid }).select(
			'-password',
		)) as IUser // Исключить поле password из результата
		if (!user) {
			return res.status(404).json({ message: 'User is not found' })
		}

		return res.status(200).json(user)
	} catch (err) {
		console.error('Error while getting user data occurred:', err)
		return res
			.status(500)
			.json({ message: 'Error while getting user data occurred' })
	}
}

// Добавление подписки пользователю
const addSubscription = async (
	req: Request,
	res: Response,
): Promise<Response<unknown, Record<string, IUser>>> => {
	const { uid } = req.params
	const { subscriptions }: { subscriptions: ISubscription[] } = req.body
	try {
		const updatedUser: IUser | null = (await User.findOneAndUpdate(
			{ uid: uid },
			{ subscriptions: subscriptions },
			{ new: true },
		)) as IUser
		if (!updatedUser) {
			return res.status(404).json({ message: 'User is not found' })
		}
		return res.status(200).json(updatedUser)
	} catch (err) {
		console.error('Error while adding subscription occurred:', err)
		return res
			.status(500)
			.json({ message: 'Error while adding subscription occurred' })
	}
}

// Удаление подписки пользователя
const deleteSubscription = async (
	req: Request,
	res: Response,
): Promise<Response<unknown, Record<string, IUser>>> => {
	const token: IUser['token'] = req.headers.authorization?.split(
		' ',
	)[1] as string
	const { sid }: { sid: ISubscription['sid'] } = req.body

	if (!token) {
		return res.status(401).json({ message: 'Please, log in to the system' })
	}

	try {
		const decoded: unknown = jwt.verify(token, secretKey)
		const uid: IUser['uid'] = (decoded as IUser).uid

		const user: IUser | null = (await User.findOne({ uid: uid })) as IUser
		const newSubscriptions: ISubscription[] = user.subscriptions.filter(
			(sub) => sub['sid'] != sid,
		)
		await User.updateOne({ uid: uid }, { subscriptions: newSubscriptions })

		return res.status(200).json(user)
	} catch (err) {
		console.error('Error while deleting subscription occurred', err)
		return res
			.status(500)
			.json({ message: 'Error while deleting subscription occurred' })
	}
}

// Изменение подписки пользователя
const editSubscription = async (
	req: Request,
	res: Response,
): Promise<Response<unknown, Record<string, IUser>>> => {
	const token: IUser['token'] | undefined =
		req.headers.authorization?.split(' ')[1]
	const {
		sid,
		title,
		renewalPeriod,
		price,
		startDate,
		description,
		website,
		categories,
	}: ISubscription = req.body

	if (!token) {
		return res.status(401).json({ message: 'Please, log in to the system' })
	}

	try {
		const decoded: unknown = jwt.verify(token, secretKey)
		const uid: IUser['uid'] = (decoded as IUser).uid

		const user: IUser | null = (await User.findOne({ uid: uid })) as IUser
		if (!user) {
			return res.status(404).json({ message: 'User is not found' })
		}

		user.subscriptions = user.subscriptions.map(
			(subscription): ISubscription =>
				subscription.sid === sid
					? {
							...subscription,
							title,
							description,
							renewalPeriod,
							price,
							startDate,
							website,
							categories,
						}
					: subscription,
		)
		await user.save()

		return res.status(200).json(user)
	} catch (err) {
		console.error('Error while editing subscription occurred', err)
		return res
			.status(500)
			.json({ message: 'Error while editing subscription occurred' })
	}
}

const deleteUser = async (req: Request, res: Response) => {
	const { uid } = req.params

	await User.findOneAndDelete({ uid: uid })
	return res.status(200).json({ message: 'User deleted' })
}

const tgSetUserId = async (req: Request, res: Response) => {
	const { uid, tgID }: IUser = req.body
	try {
		const user: IUser = (await User.findOneAndUpdate(
			{ uid: uid },
			{ tgID: tgID },
			{ new: true },
		)) as IUser
		if (!user) {
			return res.status(404).json({ message: 'User is not found' })
		}

		return res.status(200).json(user)
	} catch (err) {
		console.error('Error while setting user data occurred:', err)
		return res
			.status(500)
			.json({ message: 'Error while setting user data occurred' })
	}
}

const tgGetUserData = async (req: Request, res: Response) => {
	const { uid } = req.params
	try {
		const user: IUser = (await User.findOne({ uid: uid })) as IUser
		return res.status(200).json(user)
	} catch (err) {
		console.error('Error while searching user occurred:', err)
		return res
			.status(500)
			.json({ message: 'Error while searching user occurred' })
	}
}

const verifyEmail = async (req: Request, res: Response) => {
	const { uid, hash }: { uid: IUser['uid']; hash: string } = req.params as {
		uid: string
		hash: string
	}
	const force:
		| string
		| string[]
		| QueryString.ParsedQs
		| QueryString.ParsedQs[]
		| undefined = req.query.force
	try {
		const user: IUser = (await User.findOne({ uid: uid })) as IUser
		if (!user) {
			return res.status(404).json({ message: 'User is not found' })
		}
		if (user.emailVerified) {
			return res
				.status(403)
				.json({ message: 'Email is already verified' })
		}
		if (user.hash !== hash && force !== 'true') {
			return res.status(403).json({ message: 'Wrong hash' })
		} else {
			await User.findOneAndUpdate(
				{ uid: uid },
				{ emailVerified: true },
				{ new: true },
			)
			return res.status(200).json({ message: 'Email verified' })
		}
	} catch (err) {
		return res
			.status(500)
			.json({ message: 'Error while verifying email occurred' })
	}
}

export {
	getAllUsers,
	registerUser,
	loginUser,
	getUserData,
	deleteUser,
	addSubscription,
	deleteSubscription,
	editSubscription,
	tgSetUserId,
	tgGetUserData,
	verifyEmail,
}
