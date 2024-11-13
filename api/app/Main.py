from fastapi import FastAPI
from app.controller.template import create, read

app = FastAPI()

# Registrar as rotas de forma correta
app.add_api_route("/templates/", create, methods=["POST"])
app.add_api_route("/templates/{template_id}", read, methods=["GET"])
