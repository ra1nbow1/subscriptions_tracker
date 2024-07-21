export interface ISubscription {
	title: string
	description: string
	price: number
	renewalPeriod: 'month' | 'year'
	startDate: number
	sid: string
	website: string
	categories: string[]
}

export default interface IUser {
	uid: string
	first_name: string
	last_name: string
	email: string
	password: string
	subscriptions: ISubscription[]
	token: string
	tgID: string
	hash: string
	emailVerified: boolean
}
