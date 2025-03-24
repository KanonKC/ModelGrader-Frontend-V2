import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProblemAPI from "../../services/Problem.service";
import { Account } from "../../types/apis/Account.api";
import { ProblemInstruction } from "../../types/apis/Problem.api";

export interface ProblemState {
    id: string;
    creator: Account | null;
    createdAt: string;
    updatedAt: string;
    title: string;
    instruction: ProblemInstruction | null;
    isLoading: boolean;
}

const initialState: ProblemState = {
    id: "",
    creator: null,
    createdAt: "",
    updatedAt: "",
    title: "",
    instruction: null,
    isLoading: false,
}

export const loadProblem = createAsyncThunk(
    "problem/loadProblem",
    async (problemId: string) => {
        return await ProblemAPI.get(problemId);
    }
)

export const problemSlice = createSlice({
    name: "problem",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadProblem.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(loadProblem.fulfilled, (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.id = action.payload.data.id;
            state.creator = action.payload.data.creator;
            state.createdAt = action.payload.data.createdAt;
            state.updatedAt = action.payload.data.updatedAt;
            state.title = action.payload.data.title;
            state.instruction = action.payload.data.instruction;
        });
    }
});