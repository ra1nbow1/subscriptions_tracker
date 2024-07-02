import React from 'react'
import IUser, {
	ISubscription,
} from '../../../features/interfaces/user.interface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { logout } from '../../../features/auth/authSlice'
import { AppDispatch } from '../../../store'

interface IHeaderProps {
	user: IUser
}

function Header({ user }: Readonly<IHeaderProps>) {
	const subscriptions = user['subscriptions']
	const dispatch = useDispatch<AppDispatch>()

	const calculateTotalExpenses = (subscriptions: ISubscription[]): number => {
		const now = Date.now()

		return subscriptions.reduce((total, subscription) => {
			const { price, renewalPeriod, startDate } = subscription
			const start = new Date(startDate)
			const end = new Date(now)

			let periods = 0

			if (renewalPeriod === 'месяц') {
				const monthsDiff =
					(end.getFullYear() - start.getFullYear()) * 12 +
					(end.getMonth() - start.getMonth())
				periods = monthsDiff
			} else if (renewalPeriod === 'год') {
				const yearsDiff = end.getFullYear() - start.getFullYear()
				periods = yearsDiff
			}

			if (end > start) {
				total += price * periods
			}

			return total
		}, 0)
	}

	const monthlySpend = subscriptions.reduce((total, subscription) => {
		if (subscription.renewalPeriod.toLowerCase() === 'месяц') {
			return total + subscription.price
		} else if (subscription.renewalPeriod.toLowerCase() === 'год') {
			return total + subscription.price / 12
		}
		return total
	}, 0)

	const handleLogout = () => {
		dispatch(logout())
	}

	return (
		<header className="bg-gray-800 text-white p-4 shadow-lg">
			<div className="container mx-auto flex justify-between items-center">
				<div className="flex flex-row ml-4">
					<h1 className="text-2xl font-bold">
						{user?.first_name} {user?.last_name} {user?.uid}
					</h1>
					<button
						onClick={handleLogout}
						className="ml-4 text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-800 transition-colors duration-300">
						<FontAwesomeIcon icon={faSignOutAlt} size="lg" /> Выйти
					</button>
				</div>
				<div className="text-right mr-4">
					<p>
						Потрачено всего: ~
						{calculateTotalExpenses(subscriptions).toFixed(2)}₽
					</p>
					<p>В месяц: ~{monthlySpend.toFixed(2)}₽</p>
				</div>
			</div>
		</header>
	)
}

export default Header
