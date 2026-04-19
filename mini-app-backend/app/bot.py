from aiogram import Bot, Dispatcher, Router, F
from aiogram.filters import Command
from aiogram.types import (
    Message,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    WebAppInfo,
    PreCheckoutQuery,
)

from .config import BOT_TOKEN, MINI_APP_URL

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()
router = Router()


@router.message(Command("start"))
async def start(message: Message) -> None:
    kb = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="🛒 Відкрити магазин",
                    web_app=WebAppInfo(url=MINI_APP_URL),
                )
            ]
        ]
    )
    await message.answer(
        "Ласкаво просимо в TapToOrder! Це демо Mini App — тестові Stars, "
        "гроші не списуються.",
        reply_markup=kb,
    )


@router.pre_checkout_query()
async def pre_checkout(query: PreCheckoutQuery) -> None:
    await query.answer(ok=True)


@router.message(F.successful_payment)
async def paid(message: Message) -> None:
    charge_id = message.successful_payment.telegram_payment_charge_id
    await message.answer(
        f"✅ Дякуємо! Замовлення #{charge_id[:6]} прийнято."
    )


dp.include_router(router)
