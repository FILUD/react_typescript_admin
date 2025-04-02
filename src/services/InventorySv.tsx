import { API } from "../api";

export const getAllInventory = async () => {
    try {
        const response = API.get(`/api/inventory`);
        return response;
    } catch (error) {
        throw error;
    }
} 