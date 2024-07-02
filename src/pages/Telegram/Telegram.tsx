import React, { useEffect, useState } from 'react'
import axios from '../../features/auth/axios'
import IUser from '../../features/interfaces/user.interface'

function Telegram() {
	const [uid, setUid] = useState('')
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
	const [user, setUser] = useState<IUser>()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const data = await axios.get(`tg/user/${uid}`)
		setUser(data.data)
		console.log(data.data);
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
			<div>
			{user.uid}
			</div>
	)
}

export default Telegram
