import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://admin:password@localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "mydatabase")
