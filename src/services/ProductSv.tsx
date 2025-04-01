import { API } from "../api";


export const getAllProduct = async () => {
    try {
        const response = await API.get('/api/products');
        return response;
    } catch (error: any) {
        throw error;
    }
}

export const createProduct = async (payload: {
    category_id: number,
    name: string,
    description: string,
    price: number,
    image: string,
    is_available: number,
    points_earned: number
}) => {
    console.log("Final payload:", payload);
    try {
        const response = await API.post('/api/post/product', payload);
        return response;
    } catch (error: any) {
        throw error;
    }
}


export const deleteProduct = async (product_id: number) => {
    try {
        const response = await API.delete(`/api/delete/product?product_id=${product_id}`)
        return response;
    } catch (error: any) {
        throw error;
    }
}

export const getProductByID = async (product_id: number) => {
    try {
        const response = await API.get(`/api/product/${product_id}`)
        return response;
    } catch (error: any) {
        throw error;
    }
}
