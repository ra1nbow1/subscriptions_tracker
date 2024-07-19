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
	const [website, setWebsite] = useState<ISubscription['website']>('')

	const handleNewSubscription = () => {
		if (!title || !renewalPeriod || !price || !startDate) {
			console.log(title, price, renewalPeriod, startDate)
			alert('Заполните все поля')
		} else {
			console.log({
				title: title,
				price: price,
				renewalPeriod: renewalPeriod,
				startDate: startDate,
				sid: (Math.floor(Math.random() * 90000) + 10000).toString(),
				description: description,
				website: website,
			})
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
							description: description,
							website: website,
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
			className={`p-4 add-new-subscription fixed top-0 right-0 h-full w-1/2 max-w-md bg-gray-800 shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
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
				<div className="w-full max-w-md">
					<label className="block mb-2 text-sm font-medium text-gray-400">
						Название
					</label>
					<input
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setTitle(e.target.value)
						}}
						type="text"
						className="block w-full mb-3 outline-none rounded-md py-2 px-3 bg-gray-800 border-2 border-gray-700 text-gray-400 focus:placeholder-white focus:text-white focus:border-blue-600 sm:text-sm sm:leading-4 transition duration-200"
					/>
				</div>
				<div className="w-full max-w-md">
					<label className="block mb-2 text-sm font-medium text-gray-400">
						Описание
					</label>
					<textarea
						onChange={(
							e: React.ChangeEvent<HTMLTextAreaElement>,
						) => {
							setDescription(e.target.value)
						}}
						className="block w-full mb-3 h-14 resize-none outline-none rounded-md py-2 px-3 bg-gray-800 border-2 border-gray-700 text-gray-400 focus:placeholder-white focus:text-white focus:border-blue-600 sm:text-sm sm:leading-4 transition duration-200"></textarea>
				</div>
				<div className="w-full max-w-md">
					<label className="block mb-2 text-sm font-medium text-gray-400">
						Периодичность
					</label>
					<select
						onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
							setRenewalPeriod(e.target.value as 'месяц' | 'год')
						}
						className="block w-full mb-3 outline-none rounded-md py-2 px-3 bg-gray-800 border-2 border-gray-700 text-gray-400 focus:placeholder-white focus:text-white focus:border-blue-600 sm:text-sm sm:leading-4 transition duration-200 appearance-none">
						<option value="месяц">Каждый месяц</option>
						<option value="год">Каждый год</option>
					</select>
				</div>
				<div className="w-full max-w-md">
					<label className="block mb-2 text-sm font-medium text-gray-400">
						Стоимость
					</label>
					<input
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setPrice(parseFloat(e.target.value))
						}
						type="number"
						min="0"
						step="0.01"
						className="block w-full mb-3 outline-none rounded-md py-2 px-3 bg-gray-800 border-2 border-gray-700 text-gray-400 focus:placeholder-white focus:text-white focus:border-blue-600 sm:text-sm sm:leading-4 transition duration-200"
					/>
				</div>
				<div className="w-full max-w-md mt-3">
					<label className="block mb-2 text-sm font-medium text-gray-400">
						Дата первого платежа
					</label>
					<input
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setStartDate(new Date(e.target.value).getTime())
						}
						type="date"
						className="block w-full mb-3 outline-none rounded-md py-2 px-3 bg-gray-800 border-2 border-gray-700 text-gray-400 focus:placeholder-white focus:text-white focus:border-blue-600 sm:text-sm sm:leading-4 transition duration-200"
					/>
				</div>
				<div className="w-full max-w-md">
					<label className="block mb-2 text-sm font-medium text-gray-400">
						Сайт
					</label>
					<input
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setWebsite(e.target.value)
						}}
						type="text"
						className="block w-full mb-3 outline-none rounded-md py-2 px-3 bg-gray-800 border-2 border-gray-700 text-gray-400 focus:placeholder-white focus:text-white focus:border-blue-600 sm:text-sm sm:leading-4 transition duration-200"
					/>
				</div>
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
