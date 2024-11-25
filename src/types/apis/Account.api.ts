import { AxiosResponse } from "axios";
import { AccountModel, AccountSecureModel } from "../models/Account.model";

export type AccountCreateRequest = {
    username: string;
    password: string;
    email: string;
}


export type GetAllAccountQuery = {
    search?: string;
}

export type AccountServiceAPI = {
    create: (request: AccountCreateRequest) => Promise<AxiosResponse<AccountModel>>;
    getAll: (query?:GetAllAccountQuery) => Promise<AxiosResponse<{accounts: AccountSecureModel[]}>>;
    get: (accountId:string) => Promise<AxiosResponse<AccountModel>>;
}

export interface Account {
    id: string;
    username: string;
    createdAt: string;
    updatedAt: string;
}