import React, { memo } from 'react'
import { ISubscription } from '../../../features/interfaces/user.interface.ts'

const Payments = memo(({ subscription }: { subscription: ISubscription }) => {
	const generatePaymentDates = (
		startDate: number,
		renewalPeriod: 'месяц' | 'год',
	) => {
		const dates = []
		const start = new Date(startDate)
		const now = new Date()

		while (start <= now) {
			dates.push(new Date(start))
			if (renewalPeriod === 'месяц') {
				start.setMonth(start.getMonth() + 1)
			} else if (renewalPeriod === 'год') {
				start.setFullYear(start.getFullYear() + 1)
			}
		}
		return dates
	}

	const paymentDates = generatePaymentDates(
		subscription.startDate,
		subscription.renewalPeriod,
	)
	return (
		<div className="flex flex-col text-gray-400 overflow-y-auto max-w-md sm:w-1/2">
			<div className="flex flex-row justify-between">
				<h4 className="block mb-2 text-sm font-medium text-gray-400">
					История списаний
				</h4>
			</div>
			<table className="min-w-full text-left">
				<thead>
					<tr>
						<th className="py-2 px-4 border-b border-gray-400">
							#
						</th>
						<th className="py-2 px-4 border-b border-gray-400">
							Дата списания
						</th>
						<th className="py-2 px-4 border-b border-gray-400">
							Сумма
						</th>
					</tr>
				</thead>
				<tbody>
					{paymentDates.map((date, index) => (
						<tr key={index}>
							<td className="py-2 px-4 border-b border-gray-400">
								{index + 1}
							</td>
							<td className="py-2 px-4 border-b border-gray-400">
								{date.toLocaleDateString()}
							</td>
							<td className="py-2 px-4 border-b border-gray-400">
								{subscription.price} ₽
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
})
export default Payments
