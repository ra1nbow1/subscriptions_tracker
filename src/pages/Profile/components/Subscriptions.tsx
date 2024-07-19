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
				</div>
			</div>
			<button
				className="fixed right-5 bottom-5 bg-blue-700 transition-all duration-300 hover:scale-125 drop-shadow shadow-blue-800 shadow-2xl w-20 h-20 rounded-full"
				onClick={() => {
					setIsAddingNewSubscription(true)
				}}>
				<FontAwesomeIcon
					icon={faSquarePlus}
					size="2xl"
					className="mb-1"
				/>
			</button>
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
