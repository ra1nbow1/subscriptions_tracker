export default function useTelegram(): {
	tgUser: {
		auth_date: string
		hash: string
		query_id: string
		user: {
			allows_write_to_pm: boolean
			first_name: string
			id: number
			is_premium: boolean
			language_code: string
			last_name: string
			username: string
		}
	}
} {
	const tg: any = window.Telegram.WebApp
	const tgUser = tg.initDataUnsafe
	return { tgUser }
}
