import { API } from "../api";

export const getAllCategory = async () => {
    try {
        const response = await API.get('/api/categories');
        return response;
    } catch (error: any) {
        throw error;
    }
}

export const getCategoryByID = async (category_id: number) => {
    try {
        const response = await API.get(`/api/categories/${category_id}`);
        return response;
    } catch (error: any) {
        throw error;
    }
}

export const createCategory = async (name: string, description: string | undefined, image: string | undefined) => {
    const payload = {
        name: name,
        description: description,
        image: image,
    }
    try {
        const response = await API.post('/api/post/categories', payload);
        return response;
    } catch (error: any) {
        throw error;
    }
}

export const deleteCategory = async (category_id: number) => {
    try {
        const response = await API.delete(`/api/delete/categories?category_id=${category_id}`)
        return response;
    } catch (error: any) {
        throw error;
    }
}

export const editCategory = async (category_id: number, name: string | undefined, description: string | undefined, image: string | undefined) => {
    if (!category_id) return;
    try {
        const payload = {
            name: name,
            description: description,
            image: image
        }
        const response = await API.put(`/api/edit/categories/${category_id}`, payload);
        return response;
    } catch (error) {
        throw error;
    }
}