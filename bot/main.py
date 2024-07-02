import logging
import asyncio

from aiogram import Bot, Dispatcher, types
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.filters import CommandStart

API_TOKEN = '6479185219:AAE-0aMoK5TRZqTpuFjDZCAb--tyLmWjWcw'  # Замените на ваш токен

# Логирование
logging.basicConfig(level=logging.INFO)

# Инициализация бота и диспетчера
bot = Bot(token='6479185219:AAE-0aMoK5TRZqTpuFjDZCAb--tyLmWjWcw')
dp = Dispatcher()


# Обработчик команды /start
@dp.message(CommandStart())
async def send_welcome(message: types.Message):
    markup = types.InlineKeyboardMarkup(
        inline_keyboard=[
            [
                types.InlineKeyboardButton(
                    text="Открыть приложение",
                    web_app=types.WebAppInfo(url=f'https://subscriptions-tracker-webapp.netlify.app/telegram'),
                )
            ]
        ]
    )

    await message.reply("Нажмите на кнопку ниже, чтобы открыть веб-приложение:", reply_markup=markup)


async def main():
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
