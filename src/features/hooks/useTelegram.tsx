export default function useTelegram(): { close: () => void, tgUser: unknown} {
	const tg = window.Telegram.WebApp
    const close = () => {
        tg.close()
    }
    const tgUser = tg.initDataUnsafe
    return { close, tgUser }
}
