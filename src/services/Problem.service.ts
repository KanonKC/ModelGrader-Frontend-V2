import axios from "axios";
import { BASE_URL } from "../constants/BackendBaseURL";
import { GetAllProblemsByAccountResponse, GetAllProblemsResponse, ProblemServiceAPI, ValidateProgramResponse } from "../types/apis/Problem.api";
import { ProblemModel, ProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel, ProblemPopulateCreatorSecureModel } from "../types/models/Problem.model";

export const ProblemService: ProblemServiceAPI = {
    create: async (request, token) => {
        return axios.post<ProblemModel>(`${BASE_URL}/api/v1/problems`, request, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
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

    getv1: async (problemId, token) => {
        return axios.get<ProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel>(`${BASE_URL}/api/v1/problems/${problemId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
    },

    update: async (problemId, request, token) => {
        return axios.put<ProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel>(`${BASE_URL}/api/v1/problems/${problemId}`, request, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
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

    importPdf: async (problemId, request, token) => {
        axios.put<null>(`${BASE_URL}/api/v1/problems/${problemId}/import/pdf`, request, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    },
}