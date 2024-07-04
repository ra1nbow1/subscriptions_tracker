import logging
import asyncio
import os
from dotenv import load_dotenv
from aiogram import Bot, Dispatcher, types
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.filters import CommandStart

load_dotenv()

logging.basicConfig(level=logging.INFO)

bot = Bot(token=os.environ["BOT_TOKEN"])
dp = Dispatcher()


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


if __name__ == "__main__" and os.environ["VITE_WITH_TELEGRAM"] == "true":
    asyncio.run(main())
