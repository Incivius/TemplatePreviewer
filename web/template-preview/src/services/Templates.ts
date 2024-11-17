import { CreateTemplateSchema, TemplateSchema } from '../schemas/Templates';
import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://127.0.0.1:8000/templates';

async function mapTemplateResponse(response: AxiosResponse): Promise<TemplateSchema> {
    const item = response.data;
    return {
        id: item.id || 'N/A',
        name: item.name || 'N/A',
        content: item.content || 'N/A',
        variables: item.variables || []
    };
}

export async function getTemplates(): Promise<TemplateSchema[]> {
    try {
        const response = await axios.get(API_URL);
        return response.data.map((item: any) => ({
            id: item.id || 'N/A',
            name: item.name || 'N/A',
            content: item.content || 'N/A',
            variables: item.variables || []
        })) as TemplateSchema[];
    } catch (error) {
        console.error('Error fetching templates:', error);
        throw error;
    }
}

export async function createTemplate(template: CreateTemplateSchema): Promise<TemplateSchema> {
    try {
        const response = await axios.post(API_URL, {
            name: template.name,
            content: template.content,
            variables: template.variables
        });

        return await mapTemplateResponse(response);
    } catch (error) {
        console.error('Error creating template:', error);
        throw error;
    }
}
