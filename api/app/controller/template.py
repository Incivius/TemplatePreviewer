from fastapi import HTTPException
from app.models.template import create_template, get_template
from app.entity.template import TemplateIn, TemplateOut

# Remova a criação do FastAPI aqui

# A rota já estará registrada em Main.py, então não há necessidade de repetir isso aqui
async def create(template: TemplateIn) -> TemplateOut:
    template_created = await create_template(template)
    return template_created

async def read(template_id: str) -> TemplateOut:
    template = await get_template(template_id)
    if template is None:
        raise HTTPException(status_code=404, detail="Template not found")
    return template
