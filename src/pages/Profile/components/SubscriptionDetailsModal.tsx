import { faApple, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faGlobeEurope, faTimes } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { memo, useEffect, useState } from 'react'
import axios from '../../../features/auth/axios'
import { ISubscription } from '../../../features/interfaces/user.interface'
import Payments from '../components/Payments.tsx'
import { validate_url } from '../utils.tsx'
import CategoriesSelect from './CategoriesSelect.tsx'

interface SubscriptionDetailsModalProps {
	subscription: ISubscription
	toggleModal: () => void
	userToken?: string
}

const SubscriptionDetailsModal = memo(
	({
		subscription,
		toggleModal,
		userToken,
	}: SubscriptionDetailsModalProps) => {
		const [isEditing, setIsEditing] = useState(false)
		const [title, setTitle] = useState<ISubscription['title']>(
			subscription.title,
		)
		const [description, setDescription] = useState<
			ISubscription['description']
		>(subscription.description)
		const [renewalPeriod, setRenewalPeriod] = useState<
			ISubscription['renewalPeriod'] | ''
		>(subscription.renewalPeriod)
		const [price, setPrice] = useState<ISubscription['price']>(
			subscription.price,
		)
		const [startDate, setStartDate] = useState<ISubscription['startDate']>(
			subscription.startDate,
		)
		const [website, setWebsite] = useState<ISubscription['website']>(
			subscription.website,
		)
		const [categories, setCategories] = useState<any>(
			subscription.categories,
		)
		useEffect(() => {
			const handleEsc = (event: KeyboardEvent) => {
				if (event.key === 'Escape') {
					toggleModal()
				}
			}

			window.addEventListener('keydown', handleEsc)

			return () => {
				window.removeEventListener('keydown', handleEsc)
			}
		}, [toggleModal])

		const deleteSubscription = () => {
			const token = userToken || localStorage.getItem('token')
			axios
				.post(
					'/api/delete',
					{
						sid: subscription.sid,
					},
					{
						headers: { Authorization: `Bearer ${token}` },
					},
				)
				.then(() => window.location.reload())
		}

		const updateSubscripion = () => {
			if (website && !validate_url(website)) {
				alert('Неверный формат URL')
				return
			}
			const token = userToken || localStorage.getItem('token')
			axios
				.post(
					'/api/edit',
					{
						sid: subscription.sid,
						title: title,
						description: description,
						renewalPeriod: renewalPeriod,
						price: price,
						startDate: startDate,
						website: website,
						categories: categories.map((item) => item.value),
					},
					{
						headers: { Authorization: `Bearer ${token}` },
					},
				)
				.then(() => window.location.reload())
		}

		function resetToDefault() {
			setTitle(subscription.title)
			setDescription(subscription.description)
			setRenewalPeriod(subscription.renewalPeriod)
			setPrice(subscription.price)
			setStartDate(subscription.startDate)
			setWebsite(subscription.website)
			setCategories(subscription.categories)
		}

		function convertToDate(ms: number): string {
			const date = new Date(ms)
			return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`
		}

		function prepareNotification(
			startDate: ISubscription['startDate'],
			description: ISubscription['description'],
			renewalPeriod: ISubscription['renewalPeriod'],
		): string[] {
			const reminderDate = new Date(startDate)
			reminderDate.setDate(reminderDate.getDate() - 1)

			const recurrenceRule =
				renewalPeriod === 'месяц'
					? 'RRULE:FREQ=MONTHLY'
					: 'RRULE:FREQ=YEARLY'
			const formattedDescription = `${description} Подробнее на ${window.location.origin}`
			const startDateFormat = new Date(startDate)
				.toISOString()
				.split('T')[0]
				.replace(/-/g, '')
			const reminderDateFormat = reminderDate
				.toISOString()
				.split('T')[0]
				.replace(/-/g, '')
			return [
				reminderDateFormat,
				startDateFormat,
				formattedDescription,
				recurrenceRule,
			]
		}

		const createICalendarLink = (
			startDate: ISubscription['startDate'],
			title: ISubscription['title'],
			description: ISubscription['description'],
			renewalPeriod: ISubscription['renewalPeriod'],
		): string => {
			const [
				reminderDateFormat,
				startDateFormat,
				formattedDescription,
				recurrenceRule,
			] = prepareNotification(startDate, description, renewalPeriod)

			return `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AUID:${subscription.sid}%0ADTSTAMP:${reminderDateFormat}T000000Z%0ASUMMARY:Списание ${encodeURIComponent(title)}%0ADESCRIPTION:${encodeURIComponent(formattedDescription)}%0ADTSTART;VALUE=DATE:${startDateFormat}%0ADTEND;VALUE=DATE:${startDateFormat}%0A${recurrenceRule}%0AEND:VEVENT%0AEND:VCALENDAR`
		}

		const createGoogleCalendarLink = (
			startDate: ISubscription['startDate'],
			title: ISubscription['title'],
			description: ISubscription['description'],
			renewalPeriod: ISubscription['renewalPeriod'],
		): string => {
			const [
				reminderDateFormat,
				startDateFormat,
				formattedDescription,
				recurrenceRule,
			] = prepareNotification(startDate, description, renewalPeriod)

			return `https://www.google.com/calendar/render?action=TEMPLATE&text=Списание ${encodeURIComponent(title)}&dates=${startDateFormat}/${startDateFormat}&details=${encodeURIComponent(formattedDescription)}&recur=${recurrenceRule}&reminder=${reminderDateFormat}`
		}
		console.log(categories)
		return (
			<div className="fixed subscription-modal inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 screen">
				<div className="bg-gray-800 text-white rounded-lg shadow-lg w-11/12 max-w-3xl p-6 relative flex flex-col sm:flex-row">
					<div className="flex flex-col mr-5 sm:w-1/2">
						<div className="w-full max-w-md">
							<label className="block mb-2 text-sm font-medium text-gray-400">
								Название
							</label>
							<input
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>,
								) => {
									setTitle(e.target.value)
								}}
								value={title}
								type="text"
								disabled={!isEditing}
								className="block w-full mb-3 outline-none rounded-md py-2 px-3 bg-gray-800 border-2 border-gray-700 text-gray-400 focus:placeholder-white focus:text-white focus:border-blue-600 sm:text-sm sm:leading-4 transition duration-200"
							/>
						</div>
						<div className="w-full max-w-md">
							<label className="block mb-2 text-sm font-medium text-gray-400">
								Описание
							</label>
							<textarea
								value={description}
								onChange={(
									e: React.ChangeEvent<HTMLTextAreaElement>,
								) => {
									setDescription(e.target.value)
								}}
								disabled={!isEditing}
								className="block w-full mb-3 h-14 resize-none outline-none rounded-md py-2 px-3 bg-gray-800 border-2 border-gray-700 text-gray-400 focus:placeholder-white focus:text-white focus:border-blue-600 sm:text-sm sm:leading-4 transition duration-200"></textarea>
						</div>
						<div className="w-full max-w-md">
							<label className="block mb-2 text-sm font-medium text-gray-400">
								Периодичность
							</label>
							<select
								onChange={(
									e: React.ChangeEvent<HTMLSelectElement>,
								) =>
									setRenewalPeriod(
										e.target.value as 'месяц' | 'год',
									)
								}
								defaultValue={renewalPeriod}
								disabled={!isEditing}
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
								disabled={!isEditing}
								type="number"
								min="0"
								step="0.01"
								value={price}
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>,
								) => setPrice(parseInt(e.target.value))}
								className="block w-full mb-3 outline-none rounded-md py-2 px-3 bg-gray-800 border-2 border-gray-700 text-gray-400 focus:placeholder-white focus:text-white focus:border-blue-600 sm:text-sm sm:leading-4 transition duration-200"
							/>
						</div>
						<div className="w-full max-w-md mt-3">
							<label className="block mb-2 text-sm font-medium text-gray-400">
								Дата первого платежа
							</label>
							<input
								disabled={!isEditing}
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>,
								) =>
									setStartDate(
										new Date(e.target.value).getTime(),
									)
								}
								type="date"
								value={convertToDate(startDate)}
								className="block w-full mb-3 outline-none rounded-md py-2 px-3 bg-gray-800 border-2 border-gray-700 text-gray-400 focus:placeholder-white focus:text-white focus:border-blue-600 sm:text-sm sm:leading-4 transition duration-200"
							/>
						</div>
						<div className="w-full max-w-md mb-2">
							<label className="block mb-2 text-sm font-medium text-gray-400">
								Сайт
							</label>
							<div className="flex flex-row justify-center align-middle m-0">
								<input
									value={website}
									disabled={!isEditing}
									onChange={(
										e: React.ChangeEvent<HTMLInputElement>,
									) => {
										setWebsite(e.target.value)
									}}
									type="text"
									className="block w-full outline-none rounded-md py-2 px-3 bg-gray-800 border-2 border-gray-700 text-gray-400 focus:placeholder-white focus:text-white focus:border-blue-600 sm:text-sm sm:leading-4 transition duration-200"
								/>
								{subscription?.website && (
									<a
										href={subscription?.website}
										target="_blank"
										className="flex items-center bg-transparent border-2 border-gray-700 text-gray-400 font-bold px-3 text-sm place-content-center ml-2 rounded">
										<FontAwesomeIcon icon={faGlobeEurope} />
									</a>
								)}
							</div>
						</div>
						<div className="w-full max-w-md">
							<label className="block mb-2 text-sm font-medium text-gray-400">
								Категории
							</label>
							{!isEditing ? (
								<div className="flex justify-around flex-wrap w-full mb-3 outline-none rounded-md py-2 px-2 bg-gray-800 border-2 border-gray-700 text-gray-400 focus:placeholder-white focus:text-white focus:border-blue-600 sm:text-sm sm:leading-4 transition duration-200">
									{categories.length > 0 ? (
										categories?.map((category, index) => (
											<i key={index}>{category}</i>
										))
									) : (
										<i>Не указано</i>
									)}
								</div>
							) : (
								<CategoriesSelect
									categories={categories}
									setCategories={setCategories}
								/>
							)}
						</div>
						<div className="w-full max-w-md flex flex-row mb-3">
							<a
								href={createICalendarLink(
									subscription.startDate,
									subscription.title,
									subscription.description,
									subscription.renewalPeriod,
								)}
								download={`${subscription.title}.ics`}
								className="text-gray-400 border border-gray-400 rounded p-2 w-1/2 text-center">
								<FontAwesomeIcon icon={faApple} /> Apple
								Calendar
							</a>
							<a
								href={createGoogleCalendarLink(
									subscription.startDate,
									subscription.title,
									subscription.description,
									subscription.renewalPeriod,
								)}
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-400 border border-gray-400 rounded p-2 w-1/2 text-center">
								<FontAwesomeIcon icon={faGoogle} /> Google
								Calendar
							</a>
						</div>
						{!isEditing ? (
							<div className="flex flex-col justify-between w-full max-w-md">
								<button
									onClick={(
										e: React.MouseEvent<HTMLButtonElement>,
									) => {
										setIsEditing(true)
										let arr = []
										for (let item of categories) {
											let obj = {}
											obj['value'] = item
											obj['label'] = item
											arr.push(obj)
										}
										setCategories(arr)
									}}
									className="bg-blue-600 font-bold text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors duration-300 mb-3">
									Изменить
								</button>
								<button
									onClick={deleteSubscription}
									className="bg-red-500 font-bold text-white px-4 py-2 rounded hover:bg-red-800 transition-colors duration-300">
									Удалить
								</button>
							</div>
						) : (
							<div className="flex flex-col justify-between">
								<button
									onClick={updateSubscripion}
									className="bg-blue-600 font-bold text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors duration-300 mb-3">
									Сохранить
								</button>
								<button
									onClick={() => {
										setIsEditing(false)
										resetToDefault()
									}}
									className="bg-red-500 font-bold text-white px-4 py-2 rounded hover:bg-red-800 transition-colors duration-300">
									Отменить
								</button>
							</div>
						)}
					</div>
					<button
						onClick={toggleModal}
						className="text-white text-2xl absolute top-2 right-3">
						<FontAwesomeIcon icon={faTimes} />
					</button>
					<Payments subscription={subscription} />
				</div>
			</div>
		)
	},
)

export default SubscriptionDetailsModal
