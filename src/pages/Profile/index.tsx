import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../../store'
import { logout } from '../../features/auth/authSlice'
import axios from '../../features/auth/axios'
import IUser from '../../features/interfaces/user.interface'
import Subscriptions from './components/Subscriptions'
import Header from './components/Header'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import useTelegram from '../../features/hooks/useTelegram'

function Profile() {
	const { close, tgUser } = useTelegram()
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()
	console.log(tgUser)
	const { token } = useSelector((state: RootState) => state.auth)
	const [user, setUser] = useState<IUser>({
		uid: '',
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		subscriptions: [],
		token: '',
	})

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get('/api/user', {
					headers: { Authorization: `Bearer ${token}` },
				})
				setUser(response.data)
			} catch (error) {
				console.error('Error fetching user:', error)
				dispatch(logout())
				navigate('/login')
			}
		}

		if (token) {
			fetchUser()
		} else {
			navigate('/login')
		}
	}, [token, dispatch, history])

	return (
		<>
			<Helmet>
				<title>
					Подписки • {user.first_name} {user.last_name}
				</title>
			</Helmet>
			<header>
				<Header user={user} />
			</header>

			<section className="subscriptions h-fit min-h-screen">
				<Subscriptions
					subscriptions={user.subscriptions}
					uid={user.uid}
				/>
			</section>
		</>
	)
}

export default Profile
