from app.database.db import db
from app.entity.template import TemplateIn, TemplateOut
from bson import ObjectId

async def create_template(template: TemplateIn) -> TemplateOut:
    template_dict = template.dict()
    result = await db.templates.insert_one(template_dict)
    
    return TemplateOut(id=str(result.inserted_id), **template_dict)

async def get_template(template_id: str) -> TemplateOut:

    template = await db.templates.find_one({"_id": ObjectId(template_id)})
    
    if template:
        return TemplateOut(id=str(template["_id"]), **template)
    return None
