import logging
import asyncio
import os
from dotenv import load_dotenv
from aiogram import Bot, Dispatcher, types
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.filters import CommandStart

load_dotenv()

# Логирование
logging.basicConfig(level=logging.INFO)

# Инициализация бота и диспетчера
bot = Bot(token=os.environ["BOT_TOKEN"])
dp = Dispatcher()


# Обработчик команды /start
@dp.message(CommandStart())
async def send_welcome(message: types.Message):
    markup = types.InlineKeyboardMarkup(
        inline_keyboard=[
            [
                types.InlineKeyboardButton(
                    text="Открыть приложение",
                    web_app=types.WebAppInfo(url=os.environ["WEBAPP_URL"]),
                )
            ]
        ]
    )

    await message.reply(
        "Нажмите на кнопку ниже, чтобы открыть веб-приложение:", reply_markup=markup
    )


async def main():
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
