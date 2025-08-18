import { AccountModel } from "./Account.model";
import { ProblemModel } from "./Problem.model";
import { TopicModel } from "./Topic.model";

export type SubmissionTestcaseModel = {
    submission_testcase_id: string;
    submission: number;
    testcase: number;
    input: string;
    output: string | null;
    is_passed: boolean;
    runtime_status: string;
}

export type SubmissionTestcaseSecureModel = {
	is_passed: boolean;
	runtime_status: string;
};

export type SubmissionModel = {
	submission_id: string;
	problem: ProblemModel;
    topic: TopicModel | null;
    language: string;
	submission_code: string;
	is_passed: boolean;
	date: string;
	score: number;
	max_score: number;
	passed_ratio: number;
	account: AccountModel;
    runtime_output?: SubmissionTestcaseModel[];
};

// export type SubmissionPopulateProblemModel = {
//     submission_id: string;
//     account: string;
//     problem: ProblemModel;
//     language:  string;
//     submission_code: string;
//     is_passed: boolean;
//     date: string;
//     score: number;
//     max_score: number;
//     passed_ratio: number;
//     runtime_output: SubmissionTestcaseSecureModel[];
// }

// export type SubmissionPoplulateProblemSecureModel = {
//     submission_id: string;
// 	problem: ProblemModel;
// 	submission_code: string;
// 	is_passed: boolean;
// 	date: string;
// 	score: number;
// 	max_score: number;
// 	passed_ratio: number;
// 	account: number;
// }

// export type SubmissionPopulateSubmissionTestcaseSecureModel = {
//     submission_id: string
//     problem: number
//     language: string
//     submission_code: string
//     is_passed: boolean
//     date: string
//     score: number
//     max_score: number
//     passed_ratio: number
//     account: number
//     runtime_output: SubmissionTestcaseSecureModel[]
// }

export type GetSubmissionByAccountProblemSubmissionModel = {
    submission_id: string
    problem: string
    language: string
    submission_code: string
    is_passed: boolean
    date: string
    score: number
    max_score: number
    passed_ratio: number
    account: number
    runtime_output: SubmissionTestcaseModel[]
}

export type GetSubmissionByAccountProblemResponse = {
    best_submission: SubmissionModel
    submissions: SubmissionModel[]
}

export type SubmissionPopulateSubmissionTestcasesSecureModel = {
    submission_id: string
    problem: number
    language: string
    submission_code: string
    is_passed: boolean
    date: string
    score: number
    max_score: number
    passed_ratio: number
    runtime_output: SubmissionTestcaseSecureModel[]
}

export type SubmissionPopulateSubmissionTestcaseAndProblemSecureModel = SubmissionModel & {
    problem: any; // ProblemSecureModel;
    runtime_output: SubmissionTestcaseSecureModel[];
    topic: any | null; // TopicSecureModel | null;
}

export type SubmissionPopulateSubmissionTestcaseAndAccountModel = SubmissionModel & {
    account: any; // AccountSecureModel;
    runtime_output: SubmissionTestcaseModel[];
    topic: any | null; // TopicSecureModel | null;
}