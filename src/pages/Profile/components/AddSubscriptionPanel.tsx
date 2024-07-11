import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import axios from '../../../features/auth/axios'
import IUser, {
	ISubscription,
} from '../../../features/interfaces/user.interface'

interface AddSubscriptionPanelProps {
	isOpen: boolean
	togglePanel: () => void
	uid: IUser['uid']
	subscriptions: ISubscription[]
}

const AddSubscriptionPanel = ({
	isOpen,
	togglePanel,
	uid,
	subscriptions,
}: AddSubscriptionPanelProps) => {
	const [title, setTitle] = useState<ISubscription['title']>('')
	const [description, setDescription] =
		useState<ISubscription['description']>('')
	const [renewalPeriod, setRenewalPeriod] =
		useState<ISubscription['renewalPeriod']>('месяц')
	const [price, setPrice] = useState<ISubscription['price']>(0)
	const [startDate, setStartDate] = useState<ISubscription['startDate']>(0)

	const handleNewSubscription = () => {
		if (!title || !renewalPeriod || !price || !startDate) {
			alert('Заполните все поля')
		} else {
			axios
				.put(`/api/${uid}/subscriptions`, {
					subscriptions: [
						...subscriptions,
						{
							title: title,
							price: price,
							renewalPeriod: renewalPeriod,
							startDate: startDate,
							sid: (
								Math.floor(Math.random() * 90000) + 10000
							).toString(),
						},
					],
				})
				.then(() => window.location.reload())
				.catch(() => {
					alert('Ошибка')
				})
		}
	}

	return (
		<div
			className={`p-4 fixed top-0 right-0 h-full w-1/2 max-w-md bg-gray-800 shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
			<div className="flex justify-between items-center p-4 border-b border-gray-700">
				<h2 className="text-2xl text-white">Добавить подписку</h2>
				<button onClick={togglePanel}>
					<FontAwesomeIcon
						icon={faClose}
						className="text-white text-2xl"
					/>
				</button>
			</div>
			<div className="p-6">
				<input
					type="text"
					name="title"
					id="title"
					min="1"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setTitle(e.target.value)
					}
					className="block w-full outline-none rounded-md py-1 px-3 mb-2 bg-transparent border-2 text-gray-400 focus:placeholder-white focus:text-white border-blue-800 focus:border-blue-600 sm:text-sm sm:leading-4"
					placeholder="Название"
					required
				/>
				<textarea
					name="description"
					id="title"
					onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
						setDescription(e.target.value)
					}
					className="block w-full outline-none rounded-md py-1 px-3 mb-2 bg-transparent border-2 text-gray-400 focus:placeholder-white focus:text-white border-blue-800 focus:border-blue-600 sm:text-sm sm:leading-4"
					placeholder="Название"
					required></textarea>
				<select
					onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
						setRenewalPeriod(e.target.value as 'месяц' | 'год')
					}
					className="w-full outline-none py-1 px-3 mb-2 bg-transparent sm:text-sm sm:leading-4 text-gray-400 border-2 border-blue-800 focus:border-blue-600 rounded-md focus:text-white appearance-none focus:shadow-outline">
					<option value="месяц">Каждый месяц</option>
					<option value="год">Каждый год</option>
				</select>
				<div className="relative rounded-md shadow-sm">
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
						<span className="text-gray-500 sm:text-sm">₽</span>
					</div>
					<input
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setPrice(parseInt(e.target.value))
						}
						type="number"
						name="price"
						id="price"
						min="1"
						className="block w-full outline-none rounded-md mb-2 py-1 align-middle px-3 pl-7 bg-transparent border-2 focus:placeholder-white text-gray-400 focus:text-white border-blue-800 focus:border-blue-600 sm:text-sm sm:leading-4"
						placeholder="0"
						required
					/>
				</div>
				<input
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setStartDate(new Date(e.target.value).getTime())
					}
					type="date"
					required
					className="block w-full mb-3 bg-transparent border-2 border-blue-800 focus:border-blue-600 mt-2 py-0 px-3 rounded-md sm:text-sm sm:leading-4 outline-none text-gray-400 focus:text-white"
				/>
				<button
					onClick={handleNewSubscription}
					className="bg-blue-600 font-bold text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors duration-300 mr-3">
					Сохранить
				</button>
				<button
					onClick={togglePanel}
					className="bg-red-500 font-bold text-white px-4 py-2 rounded hover:bg-red-800 transition-colors duration-300">
					Отменить
				</button>
			</div>
		</div>
	)
}

export default AddSubscriptionPanel
