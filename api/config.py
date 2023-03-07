from datetime import timedelta
import os
import random
import string

# Flask
DEBUG = os.getenv("APP_DEBUG", default="false") == "true"
SECRET_KEY = ''.join(random.choice(string.ascii_letters) for _ in range(64))

# JWT
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=15)
JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=7)

# SQL Alchemy
SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI")
SQLALCHEMY_TRACK_MODIFICATIONS = False

# Notifications
TEAMS_WEBHOOK = os.getenv("TEAMS_WEBHOOK")
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHATID = os.getenv("TELEGRAM_CHATID")

# Misc
from urllib3 import disable_warnings
from urllib3.exceptions import InsecureRequestWarning
# Oculta los avisos de certificados no fiables (Darktrace)
# TODO: Confiar en los certificados firmados por la CA de Sofistic y eliminar esto
disable_warnings(InsecureRequestWarning)
