import { Request, Response } from 'express'
import { User, IUser, ISubscription } from '../models/user.model'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()
const secretKey: string = process.env.TOKEN_KEY as string // Замените на ваш секретный ключ

// Регистрация пользователя
const registerUser = async (req: Request, res: Response): Promise<Response> => {
	const { first_name, last_name, email, password }: IUser = req.body

	if (!first_name || !last_name || !email || !password) {
		return res.status(422).json({ message: 'Заполните все поля' })
	}

	try {
		const existingUser: IUser | null = await User.findOne({ email })

		if (existingUser) {
			return res
				.status(409)
				.json({ message: 'Пользователь с таким email уже существует' })
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		const newUser: IUser = await User.create({
			uid: (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6),
			first_name,
			last_name,
			email,
			password: hashedPassword,
			subscriptions: [],
			token: '',
			tgID: '',
		})

		return res.status(201).json(newUser)
	} catch (err) {
		console.error('Ошибка при создании пользователя:', err)
		return res
			.status(500)
			.json({ message: 'Ошибка при создании пользователя' })
	}
}

// Вход пользователя
const loginUser = async (req: Request, res: Response): Promise<Response> => {
	const { email, password }: IUser = req.body

	if (!email || !password) {
		return res.status(422).json({ message: 'Заполните все поля' })
	}

	try {
		const user: IUser = (await User.findOne({ email })) as IUser
		if (!user) {
			return res.status(401).json({ message: 'Неверные учетные данные' })
		}

		const isPasswordValid = await bcrypt.compare(password, user.password)
		const isHashValid = password === user.password

		if (!isPasswordValid && !isHashValid) {
			return res.status(401).json({ message: 'Неверные учетные данные' })
		}

		const token: IUser['token'] = jwt.sign({ uid: user.uid }, secretKey, {
			expiresIn: '1h',
		})
		return res.status(200).json({ token })
	} catch (err) {
		console.error('Ошибка при входе пользователя:', err)
		return res
			.status(500)
			.json({ message: 'Ошибка при входе пользователя' })
	}
}

// Получение данных пользователя
const getUserData = async (req: Request, res: Response): Promise<Response> => {
	const token: IUser['token'] | undefined =
		req.headers.authorization?.split(' ')[1]

	if (!token) {
		return res
			.status(401)
			.json({ message: 'Пожалуйста, войдите в систему' })
	}

	try {
		const decoded: unknown = jwt.verify(token, secretKey)
		const uid: IUser['uid'] = (decoded as IUser).uid

		const user: IUser | null = (await User.findOne({ uid: uid }).select(
			'-password',
		)) as IUser // Исключить поле password из результата
		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}

		return res.status(200).json(user)
	} catch (err) {
		console.error('Ошибка при получении данных пользователя:', err)
		return res
			.status(500)
			.json({ message: 'Ошибка при получении данных пользователя' })
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
		const updatedUser: IUser | null = await User.findOneAndUpdate(
			{ uid: uid },
			{ subscriptions: subscriptions },
			{ new: true },
		)
		if (!updatedUser) {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}

		return res.status(200).json(updatedUser)
	} catch (err) {
		console.error('Ошибка при обновлении подписок пользователя:', err)
		return res
			.status(500)
			.json({ message: 'Ошибка при обновлении подписок пользователя' })
	}
}

// Удаление подписки пользователя
const deleteSubscription = async (
	req: Request,
	res: Response,
): Promise<Response<unknown, Record<string, IUser>>> => {
	const token: IUser['token'] = req.headers.authorization?.split(
		' ',
	)[1] as IUser['token']
	const { sid }: { sid: ISubscription['sid'] } = req.body

	if (!token) {
		return res
			.status(401)
			.json({ message: 'Пожалуйста, войдите в систему' })
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
		console.error('Ошибка при удалении подписки', err)
		return res.status(500).json({ message: 'Ошибка при удалении подписки' })
	}
}

// Изменение подписки пользователя
const editSubscription = async (
	req: Request,
	res: Response,
): Promise<Response<unknown, Record<string, IUser>>> => {
	const token: IUser['token'] | undefined =
		req.headers.authorization?.split(' ')[1]
	const { sid, title, renewalPeriod, price, startDate }: ISubscription =
		req.body

	if (!token) {
		return res
			.status(401)
			.json({ message: 'Пожалуйста, войдите в систему' })
	}

	try {
		const decoded: unknown = jwt.verify(token, secretKey)
		const uid: IUser['uid'] = (decoded as IUser).uid

		const user: IUser | null = (await User.findOne({ uid: uid })) as IUser
		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}

		const newSubscriptions: ISubscription[] = user.subscriptions.map(
			(subscription) =>
				subscription.sid === sid
					? {
							...subscription,
							title,
							renewalPeriod,
							price,
							startDate,
						}
					: subscription,
		)

		user.subscriptions = newSubscriptions
		await user.save()

		return res.status(200).json(user)
	} catch (err) {
		console.error('Ошибка при редактировании подписки', err)
		return res
			.status(500)
			.json({ message: 'Ошибка при редактировании подписки' })
	}
}

const deleteUser = async (req: Request, res: Response) => {
	const { uid } = req.params

	await User.findOneAndDelete({ uid: uid })
	return res.status(200).json({ message: 'Пользователь удален' })
}

const tgSetUserId = async (req: Request, res: Response) => {
	const { uid, tgid } = req.body
	try {
		const user = await User.findOneAndUpdate(
			{ uid: uid },
			{ tgID: tgid },
			{ new: true },
		)
		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}

		return res.status(200).json(user)
	} catch (err) {
		console.error('Ошибка при обновлении подписок пользователя:', err)
		return res
			.status(500)
			.json({ message: 'Ошибка при обновлении подписок пользователя' })
	}
}

const tgGetUserData = async (req: Request, res: Response) => {
	const { uid } = req.params
	try {
		const user = (await User.findOne({ uid: uid })) as IUser
		if (!user['tgID']) {
			return res
				.status(500)
				.json({ message: 'Telegram аккаунт не привязан' })
		}
		return res.status(200).json(user)
	} catch (err) {
		console.error('Ошибка при поиске пользователя:', err)
		return res
			.status(500)
			.json({ message: 'Ошибка при поиске пользователя' })
	}
}

export {
	registerUser,
	loginUser,
	getUserData,
	deleteUser,
	addSubscription,
	deleteSubscription,
	editSubscription,
	tgSetUserId,
	tgGetUserData,
}
