import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Problem } from "../../types/apis/Problem.api";
import ProblemAPI from "../../services/Problem.service";
import { FilterOptions } from "../../types/Filter";

export interface MyProblemListState {
	problemList: Problem[];
	isLoading: boolean;
	totalProblem: number;
	currentPage: number;
	pageSize: number;
	error: string | null;
}

const initialState: MyProblemListState = {
	problemList: [],
	isLoading: false,
	error: null,
	totalProblem: 0,
	pageSize: 10,
	currentPage: 1,
};

export const loadMyProblemList = createAsyncThunk(
	"myProblemList/loadMyProblemList",
	async (options?: FilterOptions) => {
		const response = await ProblemAPI.getAllMy(options);
		console.log("loadMyProblemList", response);
		return response.data;
	}
);

export const loadAndAppendMyProblemList = createAsyncThunk(
	"myProblemList/loadAndAppendMyProblemList",
	async (options?: FilterOptions) => {
		const response = await ProblemAPI.getAllMy(options);
		return response.data;
	}
);

export const myProblemListSlice = createSlice({
	name: "myProblemList",
	initialState,
	reducers: {
		setProblemList: (state, action: PayloadAction<Problem[]>) => {
			state.problemList = action.payload;
		},
		setIsLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loadMyProblemList.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(loadMyProblemList.fulfilled, (state, action) => {
			state.isLoading = false;
			state.problemList = action.payload.data;
			state.totalProblem = action.payload.total;
		});
		builder.addCase(loadMyProblemList.rejected, (state, action) => {
			state.isLoading = false;
			state.error = String(action.error.message);
		});
		builder.addCase(loadAndAppendMyProblemList.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(
			loadAndAppendMyProblemList.fulfilled,
			(state, action) => {
				state.isLoading = false;
				state.problemList = state.problemList.concat(
					action.payload.data
				);
				state.totalProblem = action.payload.total;
			}
		);
		builder.addCase(
			loadAndAppendMyProblemList.rejected,
			(state, action) => {
				state.isLoading = false;
				state.error = String(action.error.message);
			}
		);
	},
});

export const { setProblemList, setIsLoading, setError, setCurrentPage } =
	myProblemListSlice.actions;
