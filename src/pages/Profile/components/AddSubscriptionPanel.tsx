import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest'
import axios from '../../../features/auth/axios.ts'
import IUser, {
	ISubscription,
} from '../../../features/interfaces/user.interface'

import popularServices from '../data/popularServices.ts'
import CategoriesSelect from './CategoriesSelect.tsx'

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
	const [suggestions, setSuggestions] = useState<string[]>([])
	const [categories, setCategories] = useState<ISubscription['categories']>(
		[],
	)

	const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
		setSuggestions(getSuggestions(value))
	}

	const onSuggestionsClearRequested = () => {
		setSuggestions([])
	}

	const getSuggestions = (value: string) => {
		const inputValue = value.trim().toLowerCase()
		const inputLength = inputValue.length

		return inputLength === 0
			? []
			: popularServices.filter((service) =>
					service.toLowerCase().includes(inputValue),
				)
	}
	const getSuggestionValue = (suggestion: string) => suggestion

	const renderSuggestion = (suggestion: string) => <div>{suggestion}</div>
	const handleNewSubscription = () => {
		if (!title || !renewalPeriod || !price || !startDate) {
			console.log(title, price, renewalPeriod, startDate)
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
							description: description,
							website: website,
							categories: categories.map((item) => item.value),
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
					<Autosuggest
						suggestions={suggestions}
						onSuggestionsFetchRequested={
							onSuggestionsFetchRequested
						}
						onSuggestionsClearRequested={
							onSuggestionsClearRequested
						}
						getSuggestionValue={getSuggestionValue}
						renderSuggestion={renderSuggestion}
						inputProps={{
							value: title,
							onChange: (e, { newValue }) => setTitle(newValue),
							className:
								'block w-full mb-3 outline-none rounded-md py-2 px-3 bg-gray-800 border-2 border-gray-700 text-gray-400 focus:placeholder-white focus:text-white focus:border-blue-600 sm:text-sm sm:leading-4 transition duration-200',
						}}
						theme={
							title
								? {
										container: 'relative',
										suggestionsContainer:
											(!title ? 'hidden' : '') +
											'absolute w-full z-10 bg-gray-800 border-2 border-gray-700 rounded-md mt-1',
										suggestionsList: 'list-none p-0 m-0',
										suggestion:
											'p-2 cursor-pointer hover:bg-gray-700 rounded text-gray-400',
										suggestionHighlighted: 'bg-gray-700',
										suggestionsHidden:
											'hidden display-none',
									}
								: {
										display: 'none',
									}
						}
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
						placeholder={'Периодичность'}
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
				<div className="w-full max-w-md">
					<label className="block mb-2 text-sm font-medium text-gray-400">
						Категории
					</label>
					<CategoriesSelect
						categpries={categories}
						setCategories={setCategories}
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
