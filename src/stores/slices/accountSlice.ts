import { createSlice } from "@reduxjs/toolkit";

export interface AccountState {
	username: string;
	accessToken: string | null;
	refreshToken: string | null;
	expiresAt: string | null;
}

const initialState: AccountState = {
	username: "",
	accessToken: null,
	refreshToken: null,
	expiresAt: null,
};

export const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		loadAccountFromLocal: (state: AccountState) => {
			state.username = localStorage.getItem("username") || "";
			state.accessToken = localStorage.getItem("token") || null;
			state.refreshToken = localStorage.getItem("refreshToken") || null;
			state.expiresAt = localStorage.getItem("expiresAt") || null;
		},
		setAccount: (state: AccountState, action) => {
			state.username = action.payload.username;
		},
		setAccessToken: (state: AccountState, action) => {
			state.accessToken = action.payload.accessToken;
		},
		setRefreshToken: (state: AccountState, action) => {
			state.refreshToken = action.payload.refreshToken;
		},
		setExpiresAt: (state: AccountState, action) => {
			state.expiresAt = action.payload.expiresAt;
		},
	},
});

export const { loadAccountFromLocal } = accountSlice.actions;
