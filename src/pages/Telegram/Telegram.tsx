import React, { useState } from 'react'
import axios from '../../features/auth/axios'
import IUser from '../../features/interfaces/user.interface'
import Header from '../Profile/components/Header'
import Subscriptions from '../Profile/components/Subscriptions'
import useTelegram from '../../features/hooks/useTelegram'

function Telegram() {
	const [uid, setUid] = useState('')
	const [user, setUser] = useState<IUser>()
	const { tgUser } = useTelegram()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		let data = await axios.get(`tg/user/${uid}`).then(data => data.data)

		if (!data.tgID) {
			await axios.post(`tg/user/`, {
				uid: uid,
				tgID: tgUser.user.id
			})
		}
		const token = await axios.post('/auth/login', {
			email: data['email'],
			password: data['password']
		})
		data['token'] = token.data.token
		setUser(data)
	}

	return (
			!user ?
			<div className="bg-gray-800 flex flex-col justify-center p-8 rounded-lg shadow-lg w-full h-screen max-w-md">
				<h2 className="text-3xl font-bold text-white mb-8 text-center">
					Telegram
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="uid"
							className="block text-sm font-medium text-gray-300 mb-2">
							UID
						</label>
						<input
							type="text"
							id="uid"
							className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
							value={uid}
							onChange={(e) => setUid(e.target.value)}
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-800 transition-colors duration-300">
						Войти
					</button>
				</form>
			</div> :
			<div className="bg-gray-800 flex flex-col justify-center p-5 rounded-lg shadow-lg w-full max-w-md">
				<header>
					<Header user={user} env="telegram" />
				</header>

				<section className="subscriptions h-fit min-h-screen">
					<Subscriptions
						subscriptions={user.subscriptions}
						uid={user.uid}
						userToken={user.token}
					/>
				</section>
			</div>
	)
}

export default Telegram
