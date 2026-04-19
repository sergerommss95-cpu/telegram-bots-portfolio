import os
from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = os.getenv("BOT_TOKEN", "")
WEBHOOK_URL = os.getenv("WEBHOOK_URL", "")
MINI_APP_URL = os.getenv("MINI_APP_URL", "https://example.vercel.app/mini-app")

if not BOT_TOKEN:
    raise RuntimeError("BOT_TOKEN env var is required")
