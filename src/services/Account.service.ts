import axios from 'axios';
import { BASE_URL } from "../constants/BackendBaseURL";
import { Account, AccountServiceAPI } from "../types/apis/Account.api";
import { AccountModel } from "../types/models/Account.model";
import { backendAPI } from '.';



export const AccountService: AccountServiceAPI = {
    create: async (request) => {
        const response = await axios.post<AccountModel>(`${BASE_URL}/api/accounts`, request);
        return response;
    },

    getAll: async (query) => {
        const response = await axios.get<{accounts: AccountModel[]}>(`${BASE_URL}/api/accounts`,{params:query});
        return response;
    },

    get: async (id) => {
        const response = await axios.get<AccountModel>(`${BASE_URL}/api/accounts/${id}`);
        return response;
    }
}

export interface CreateAccountPayload {
	email: string;
	password: string;
	username: string;
}

export default class AccountAPI {
    static async create(payload: CreateAccountPayload) {
        return backendAPI.post<Account>("/register", payload);
    }
    
    static async get(accessToken: string) {
        return backendAPI.get<Account>("/me", {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
    }
}