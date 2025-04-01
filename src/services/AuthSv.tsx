import { API } from "../api";
import { LoginResponse } from '../components/types/authType';

export const ReqLogin = async (email: string, password: string): Promise<LoginResponse> => {
    const payload = {
        email: email,
        password: password
    }
    try {
        const response = await API.post<LoginResponse>('/api/auth/login', payload)
        return response.data;
    } catch (error: any) {
        throw error;
    }
}