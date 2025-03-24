import { AxiosResponse } from "axios";
import { AccountModel } from "../models/Account.model";
import { AuthenticationResultResponse } from "../models/Auth.model";

export type LoginRequest = {
    username: string;
    password: string;
}

export type LogoutRequest = {
    account_id: string;
    token: string;
}

export type AuthorizationRequest = {
    account_id: string;
    token: string;
}

export type AuthServiceAPI = {
    login: (request: LoginRequest) => Promise<AxiosResponse<AccountModel>>;
    logout: (request: LogoutRequest) => Promise<AxiosResponse<AccountModel>>;
    authorize: (request: AuthorizationRequest) => AuthenticationResultResponse // Promise<AxiosResponse<AuthenticationResultResponse>>;
}

export interface Auth {
    id: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    password: string;
    accessToken: string | null;
    refreshToken: string | null;
    tokenExpireAt: string | null;
    accountId: string;
}