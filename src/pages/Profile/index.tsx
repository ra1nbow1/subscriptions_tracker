// noinspection JSAnnotator

import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../features/auth/authSlice'
import axios from '../../features/auth/axios'
import IUser from '../../features/interfaces/user.interface'
import { AppDispatch, RootState } from '../../store'
import Header from './components/Header'
import Subscriptions from './components/Subscriptions'

interface IProfileProps {
	userToken?: string
}

function Profile({ userToken }: Readonly<IProfileProps>) {
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()
	const { token } = useSelector((state: RootState) => state.auth)
	const [popupState, setPopupState] = useState(false)
	const [user, setUser] = useState<IUser>({
		emailVerified: false,
		hash: '',
		uid: '',
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		subscriptions: [],
		token: '',
		tgID: '',
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

	const copyUid = () => {
		navigator.clipboard.writeText(user.uid)
	}

	return (
		<>
			<Helmet>
				<title>
					Подписки • {user.first_name} {user.last_name}
				</title>
			</Helmet>
			<header>
				<Header
					user={user}
					popupState={popupState}
					managePopup={setPopupState}
				/>
			</header>
			{popupState && (
				<div className="flex flex-col max-w-screen-xl p-4 bg-gray-800 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded fixed">
					<div className="flex justify-between items-center font-bold text-2xl mb-3">
						{user.tgID != ''
							? 'Telegram подключен'
							: 'Подключите Telegram'}
						<FontAwesomeIcon
							icon={faClose}
							size="2xl"
							className="mb-1 cursor-pointer text-xl"
							onClick={() => setPopupState(false)}
						/>
					</div>
					<div className="mb-3">
						Запустите{' '}
						<a
							className="text-blue-600 underline"
							href="https://t.me/subscriptions_tracker_bot">
							бота
						</a>{' '}
						и используйте UID своего аккаунта
					</div>
					<div className="mb-3">Нажмите, чтобы скопировать</div>
					<button
						onClick={copyUid}
						className="p-4 text-center border border-dashed rounded border-gray-600 bg-gray-900 cursor-pointer">
						{user.uid}
					</button>
				</div>
			)}

			<section className="subscriptions h-fit min-h-screen">
				<Subscriptions
					subscriptions={user.subscriptions}
					uid={user.uid}
					userToken={userToken}
				/>
			</section>
		</>
	)
}

export default Profile
