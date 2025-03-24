import axios from "axios";
import { Auth, AuthServiceAPI } from "../types/apis/Auth.api";
import { BASE_URL } from "../constants/BackendBaseURL";
import { AccountModel } from "../types/models/Account.model";
import { AuthenticationResultResponse } from "../types/models/Auth.model";
import { backendAPI } from ".";

export const AuthService: AuthServiceAPI = {
    login: async (request) => {
        const response = await axios.post<AccountModel>(`${BASE_URL}/api/login`, request);
        return response;
    },

    logout: async (request) => {
        const response = await axios.post<AccountModel>(`${BASE_URL}/api/logout`, request);
        return response;
    },

    authorize: async (request) => {
        // const response = await axios.put<AuthenticationResultResponse>(`${BASE_URL}/api/token`, request);
        // return response;
        return { result: '' }
    }

}

export interface LoginPayload {
	emailOrUsername: string;
	password: string;
}

export default class AuthAPI {
    static async login(payload: LoginPayload) {
        return backendAPI.put<Auth>("/login", payload);
    }
}