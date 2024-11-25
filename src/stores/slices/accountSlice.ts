import { createSlice } from "@reduxjs/toolkit"

export interface AccountState {
    username: string
    accessToken: string | null
    refreshToken: string | null
    expiresAt: string | null
    isLogin: boolean
}

const initialState: AccountState = {
    username: '',
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
    isLogin: false
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        loadAccountFromLocal: (state: AccountState) => {
            state.username = localStorage.getItem('username') || ''
            state.accessToken = localStorage.getItem('token') || null
            state.refreshToken = localStorage.getItem('refreshToken') || null
            state.expiresAt = localStorage.getItem('expiresAt') || null
            state.isLogin = !!state.accessToken
        },
    }
})

export const { loadAccountFromLocal } = accountSlice.actions