from fastapi import FastAPI
from app.controller.template import create, read, read_all
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ou substitua "*" pelo seu domínio (exemplo: "http://localhost:3000")
    allow_credentials=True,
    allow_methods=["*"],  # Permitir métodos como GET, POST, etc.
    allow_headers=["*"],  # Permitir todos os headers
)

app.add_api_route("/templates/", create, methods=["POST"])
app.add_api_route("/templates/{template_id}", read, methods=["GET"])
app.add_api_route("/templates/", read_all, methods=["GET"])
