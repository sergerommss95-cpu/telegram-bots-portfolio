from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from aiogram.types import Update

from .bot import bot, dp
from .config import WEBHOOK_URL


@asynccontextmanager
async def lifespan(app: FastAPI):
    if WEBHOOK_URL:
        await bot.set_webhook(
            f"{WEBHOOK_URL}/webhook",
            drop_pending_updates=True,
        )
    yield
    await bot.delete_webhook()


app = FastAPI(lifespan=lifespan)


@app.get("/health")
async def health() -> dict[str, bool]:
    return {"ok": True}


@app.post("/webhook")
async def webhook(request: Request) -> dict[str, bool]:
    data = await request.json()
    update = Update.model_validate(data)
    await dp.feed_update(bot, update)
    return {"ok": True}
