from fastapi import HTTPException
from app.models.template import create_template, get_all_templates, get_template
from app.entity.template import TemplateIn, TemplateOut
from typing import List

async def create(template: TemplateIn) -> TemplateOut:
    template_created = await create_template(template)
    return template_created

async def read(template_id: str) -> TemplateOut:
    template = await get_template(template_id)
    if template is None:
        raise HTTPException(status_code=404, detail="Template not found")
    return template

async def read_all() -> List[TemplateOut]:
    templates = await get_all_templates()
    if not templates:
        raise HTTPException(status_code=404, detail="No templates found")
    return templates