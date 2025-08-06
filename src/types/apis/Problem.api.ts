import { AxiosResponse } from "axios";
import { GroupModel, ProblemGroupPermissionModel } from "../models/Group.model";
import { ProblemModel } from "../models/Problem.model";

export type CreateProblemRequest = {
	title: string;
	language: string;
	description: string | null;
	solution: string;
	testcases: string[];
	time_limit: number;
	allowed_languages: string;
};

export type UpdateProblemRequest = {
	title?: string;
	language?: string;
	description?: string;
	solution?: string;
	testcases?: string[];
	time_limit?: number;
};

export type GetAllProblemsByAccountResponse = {
	start: number;
	end: number;
	total_personal_problems: number;
	total_manageable_problems: number;
	problems: ProblemModel[];
	manageable_problems: ProblemModel[];
};

export type ValidateProgramRequest = {
	language: string;
	source_code: string;
	testcases: string[];
	time_limited: number;
};

export type RuntimeResult = {
	input: string;
	output: string | null;
	runtime_status: string;
};

export type ValidateProgramResponse = {
	runnable: boolean;
	has_error: boolean;
	has_timeout: boolean;
	runtime_results: RuntimeResult[];
};

export type GetAllProblemsQuery = {
	start?: number;
	end?: number;
	account_id?: string;
	query?: string;
};

export type GetAllProblemsResponse = {
	problems: ProblemModel[];
};

export type ProblemGroupPermissionCreateRequest = {
	group_id: string;
	permission_manage_problems?: boolean;
	permission_view_problems?: boolean;
};

export type ProblemGroupPermissionPopulateGroupModel =
	ProblemGroupPermissionModel & {
		group: GroupModel;
	};

export type ProblemServiceAPI = {
	create: (
		accountId: string,
		request: CreateProblemRequest
	) => Promise<AxiosResponse<ProblemModel>>;
	getAll: (
		query?: GetAllProblemsQuery
	) => Promise<AxiosResponse<GetAllProblemsResponse>>;
	getAllAsCreator: (
		accountId: string,
		query?: GetAllProblemsQuery
	) => Promise<AxiosResponse<GetAllProblemsByAccountResponse>>;
	get: (
		accountId: string,
		problemId: string
	) => Promise<AxiosResponse<ProblemModel>>;
	update: (
		problemId: string,
		accountId: string,
		request: UpdateProblemRequest | CreateProblemRequest
	) => Promise<AxiosResponse<ProblemModel>>;
	// deleteMultiple: (problemIds:string[]) => Promise<AxiosResponse<null>>;
	delete: (
		problemId: string,
		accountId: string
	) => Promise<AxiosResponse<null>>;
	updateGroupPermissions: (
		problemId: string,
		accountId: string,
		groups: ProblemGroupPermissionCreateRequest[]
	) => Promise<AxiosResponse<ProblemModel>>;
	validateProgram: (
		request: ValidateProgramRequest
	) => Promise<AxiosResponse<ValidateProgramResponse>>;
	getPublic: (
		problemId: string
	) => Promise<AxiosResponse<ProblemModel>>;
};
