export interface TemplateSchema {
    id: string;
    name: string;
    content: string;
    variables: string[];
}

export interface CreateTemplateSchema extends Omit<TemplateSchema, 'id'> {
}
