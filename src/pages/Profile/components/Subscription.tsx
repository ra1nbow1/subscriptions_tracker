import React, { useState } from 'react'
import { ISubscription } from '../../../features/interfaces/user.interface'
import SubscriptionDetailsModal from './SubscriptionDetailsModal'

interface SubscriptionProps {
	subscription: ISubscription
}

const Subscription: React.FC<SubscriptionProps> = ({ subscription }) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const toggleModal = () => {
		if (isModalOpen) {
			setIsModalOpen(false)
			document.body.style.overflow = 'auto'
		} else {
			setIsModalOpen(true)
			document.body.style.overflow = 'hidden'
		}
	}
	return (
		<>
			<div
				className="bg-gray-800 text-white p-4 rounded-lg shadow-md cursor-pointer"
				onClick={toggleModal}>
				<div className="flex justify-between items-center">
					<h3 className="text-xl font-bold">{subscription.title}</h3>
				</div>
			</div>
			{isModalOpen && (
				<SubscriptionDetailsModal
					subscription={subscription}
					toggleModal={toggleModal}
					onClose={toggleModal}
				/>
			)}
		</>
	)
}

export default Subscription
