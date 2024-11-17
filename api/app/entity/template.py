from pydantic import BaseModel
from typing import List, Optional

class Template(BaseModel):
    name: str
    content: str
    variables: List[str]

class TemplateIn(Template):
    pass

class TemplateOut(Template):
    id: str
