import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import IUser, {
	ISubscription,
} from '../../../features/interfaces/user.interface'
import AddSubscriptionPanel from './AddSubscriptionPanel' // Import the sliding panel
import Subscription from './Subscription'

interface ISubscriptionProps {
	subscriptions: ISubscription[]
	uid: IUser['uid']
	userToken?: IUser['token']
}

function Subscriptions({
	subscriptions,
	uid,
	userToken = '',
}: Readonly<ISubscriptionProps>): JSX.Element {
	const [isAddingNewSubscription, setIsAddingNewSubscription] =
		useState(false)

	return (
		<>
			<div className="container mx-auto p-4 min-h-fit">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{subscriptions.map((subscription) => (
						<Subscription
							key={subscription.sid}
							subscription={subscription}
							userToken={userToken}
						/>
					))}
					<button
						onClick={() => {
							setIsAddingNewSubscription(true)
						}}
						className="bg-gray-800 p-4 h-60 rounded-lg shadow-md flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-700 transition-colors duration-200">
						<FontAwesomeIcon
							icon={faSquarePlus}
							size="2xl"
							className="mb-1"
						/>
						<div className="text-3xl font-bold mb-4">Добавить</div>
					</button>
				</div>
			</div>
			<AddSubscriptionPanel
				isOpen={isAddingNewSubscription}
				togglePanel={() => setIsAddingNewSubscription(false)}
				uid={uid}
				subscriptions={subscriptions}
			/>
		</>
	)
}

export default Subscriptions
