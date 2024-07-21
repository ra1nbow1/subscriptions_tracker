import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../features/auth/authSlice'
import IUser from '../../features/interfaces/user.interface'
import { AppDispatch } from '../../store'

function Register() {
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()
	const [first_name, setFirst_name] = useState<IUser['first_name']>('')
	const [last_name, setLast_name] = useState<IUser['last_name']>('')
	const [email, setEmail] = useState<IUser['email']>('')
	const [password, setPassword] = useState<IUser['password']>('')
	const [alertIsOpened, setAlertIsOpened] = useState(false)
	const [alertContent, setAlertContent] = useState('')

	const handleRegister = (e: React.FormEvent) => {
		e.preventDefault()
		dispatch<any>(
			registerUser({ first_name, last_name, email, password }),
		).then((res) => {
			if (res.type === 'auth/registerUser/fulfilled') {
				navigate('/profile')
			} else if (res.type === 'auth/registerUser/rejected') {
				setAlertContent(res.payload.message)
				setAlertIsOpened(true)
				setTimeout(() => setAlertIsOpened(false), 3000)
			}
		})
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-900">
			<div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-3xl font-bold text-white mb-8 text-center">
					Sign Up
				</h2>
				<form onSubmit={handleRegister}>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-300 mb-2">
							First Name
							<input
								autoComplete="given-name"
								id="first_name"
								className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
								value={first_name}
								onChange={(e) => setFirst_name(e.target.value)}
								required
							/>
						</label>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-300 mb-2">
							Last Name
							<input
								autoComplete="family-name"
								id="last_name"
								className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
								value={last_name}
								onChange={(e) => setLast_name(e.target.value)}
								required
							/>
						</label>
					</div>
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-300 mb-2">
							Email
						</label>
						<input
							autoComplete="email"
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
							Password
						</label>
						<input
							autoComplete="new-password"
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
						Sign Up
					</button>
				</form>
				<div className="flex flex-col mt-3 justify-center text-center">
					Already have an account?
					<a href="/login" className="text-blue-600 hover:underline">
						Sign In
					</a>
				</div>
				<Helmet>
					<title>Subscriptions Tracker • Sign Up</title>
				</Helmet>
			</div>
			{alertIsOpened && (
				<div
					className="p-4 mb-4 text-sm text-red-800 fixed bottom-10 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
					role="alert">
					<span className="font-medium">Error!</span> {alertContent}
				</div>
			)}
		</div>
	)
}

export default Register
