import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { loginUser } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

function Login() {
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [alertIsOpened, setAlertIsOpened] = useState(false)
	const [alertContent, setAlertContent] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		dispatch<any>(loginUser({ email, password })).then((res) => {
			if (res.type === 'auth/loginUser/fulfilled') {
				navigate('/profile')
			} else if (res.type === 'auth/loginUser/rejected') {
				setAlertContent(res.payload.message)
				setAlertIsOpened(true)
				setTimeout(() => setAlertIsOpened(false), 3000)
			}
		})
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
			<div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-3xl font-bold text-white mb-8 text-center">
					Вход
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-300 mb-2">
							Email
						</label>
						<input
							type="email"
							id="email"
							className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="mb-6">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-300 mb-2">
							Пароль
						</label>
						<input
							type="password"
							id="password"
							className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-800 transition-colors duration-300">
						Войти
					</button>
				</form>
				<div className="flex flex-col mt-3 justify-center text-center">
					Нет аккаунта?
					<a
						href="/register"
						className="text-blue-600 hover:underline">
						{' '}
						Зарегистрироваться{' '}
					</a>
				</div>
			</div>
			<Helmet>
				<title>Трекер подписок • Вход</title>
			</Helmet>
			{alertIsOpened && (
				<div
					className="p-4 mb-4 text-sm text-red-800 fixed bottom-10 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
					role="alert">
					<span className="font-medium">Ошибка!</span> {alertContent}
				</div>
			)}
		</div>
	)
}

export default Login
