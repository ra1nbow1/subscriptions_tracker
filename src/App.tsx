import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Profile from './pages/Profile'
import { setToken } from './features/auth/authSlice'
import './index.css'
import useTelegram from './features/hooks/useTelegram'
import Telegram from './pages/Telegram/Telegram'

const App: React.FC = () => {
	const dispatch = useDispatch()
	const { token } = useSelector((state: RootState) => state.auth)

	const { tgUser } = useTelegram()

	useEffect(() => {
		const savedToken = localStorage.getItem('token')
		if (savedToken) {
			dispatch(setToken(savedToken))
		}
	}, [dispatch])

	return (
		<Router>
			<div className="bg-gray-900 text-white">
				<Routes>
					<Route
						path="/"
						element={
							<Navigate to={token ? '/profile' : '/login'} />
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/profile"
						element={token ? <Profile /> : <Navigate to="/login" />}
					/>
					<Route
						path="/telegram"
						element={import.meta.env.VITE_WITH_TELEGRAM === 'true' ? <Telegram /> : <Navigate to="/login" />}
					/>
				</Routes>
			</div>
		</Router>
	)
}

export default App
