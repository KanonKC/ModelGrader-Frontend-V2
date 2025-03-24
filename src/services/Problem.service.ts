import axios from "axios";
import { backendAPI } from ".";
import { BASE_URL } from "../constants/BackendBaseURL";
import { ProgrammingLanguage } from "../constants/ProgrammingLanguage";
import { ListAPIResponse } from "../types/apis";
import { GetAllProblemsByAccountResponse, GetAllProblemsResponse, Problem, ProblemServiceAPI, ValidateProgramResponse } from "../types/apis/Problem.api";
import { FilterOptions } from "../types/Filter";
import { ProblemModel, ProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel, ProblemPopulateCreatorSecureModel } from "../types/models/Problem.model";

export const ProblemService: ProblemServiceAPI = {
    create: async (accountId,request) => {
        return axios.post<ProblemModel>(`${BASE_URL}/api/accounts/${accountId}/problems`, request);
    },

    getAll: async (query) => {
        return axios.get<GetAllProblemsResponse>(`${BASE_URL}/api/problems`,{params:query});
    },

    getAllAsCreator: async (accountId,query) => {
        return axios.get<GetAllProblemsByAccountResponse>(`${BASE_URL}/api/accounts/${accountId}/problems`,{params:query});
    },

    get: async (accountId,problemId) => {
        return axios.get<ProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel>(`${BASE_URL}/api/accounts/${accountId}/problems/${problemId}`);
    },

    update: async (problemId,accountId,request) => {
        return axios.put<ProblemModel>(`${BASE_URL}/api/accounts/${accountId}/problems/${problemId}`, request);
    },

    delete: async (problemId,accountId) => {
        return axios.delete<null>(`${BASE_URL}/api/accounts/${accountId}/problems/${problemId}`);
    },

    // deleteMultiple: async (problemIds) => {
    //     return axios.delete<null>(`${BASE_URL}/api/problems/`, {problem: problemIds});
    // },

    updateGroupPermissions: async (problemId, accountId,groups) => {
        return axios.put<ProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel>(`${BASE_URL}/api/accounts/${accountId}/problems/${problemId}/groups`, {groups});
    },

    validateProgram: async (request) => {
        return axios.post<ValidateProgramResponse>(`${BASE_URL}/api/problems/validate`, request);
    },

    getPublic: async (problemId) => {
        return axios.get<ProblemPopulateCreatorSecureModel>(`${BASE_URL}/api/problems/${problemId}`);
    },
}

export interface CreateProblemPayload {
	title: string;
	instruction: {
		type: "plate" | "markdown" | "pdf";
		markdownContent?: string;
		pdfUrl?: string;
		plateContent?: string;
	};
	solution: {
		code: string;
		language: ProgrammingLanguage;
		timeLimitMs: number;
		memoryLimitKb: number;
	};
	testcases: {
		input: string;
	}[];
}

export interface UpdateProblemPayload extends CreateProblemPayload {}

export interface ValidateProblem {
    isError: boolean;
    isTimeout: boolean;
    isMemoryExceeded: boolean;
    outputList: RuntimeOutput[];
}

export interface RuntimeOutput {
	isError: boolean;
	isTimeout: boolean;
	isMemoryExceeded: boolean;
	inputFilename: string;
	outputFilename: string;
    inputFileUrl: string;
    outputFileUrl: string;
	executionTimeMs: number;
}

export interface UploadPDF {
    filename: string;
    url: string;
}

export default class ProblemAPI {
    static async getAllMy(options?: FilterOptions) {
        return backendAPI.get<ListAPIResponse<Problem>>("/my/problems", { params: options });
    }
    static async getAll(options?: FilterOptions) {
        return backendAPI.get<ListAPIResponse<Problem>>("/problems", { params: options });
    }
    static async get(problemId: string) {
        return backendAPI.get<Problem>(`/problems/${problemId}`);
    }
    static async create(payload: CreateProblemPayload) {
        return backendAPI.post<Problem>("/problems", payload);
    }
    static async update(problemId: string, payload: UpdateProblemPayload) {
        return backendAPI.put<Problem>(`/problems/${problemId}`, payload);
    }
    static async validate(payload: CreateProblemPayload) {
        return backendAPI.post<ValidateProblem>(`/problems/validation`, payload);
    }
    static async uploadPDF(formData: FormData) {
        return backendAPI.post<UploadPDF>(`/problems/instructions/pdf`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }
}