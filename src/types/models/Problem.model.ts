import { AccountModel } from "./Account.model"
import { SubmissionModel } from "./Submission.model"

export type TestcaseModel = {
    testcase_id: string
    input: string
    output: string | null
    problem: number
    runtime_status: string
}

export type ProblemModel = {
    problem_id: string
    language: string
    title: string
    description: string | null
    time_limit: number
    created_date?: string;
    updated_date?: string;
    allowed_languages?: string
    solution: string
    creator?: AccountModel
    difficulty?: number;
    is_active?: boolean
    is_private?: boolean
    submission_regex?: string
    testcases?: TestcaseModel[]
    best_submission?: SubmissionModel | null
    has_source_code?: boolean
    testcase_count?: number
    no_runtime_error?: boolean
    group_permissions?: any[] // ProblemGroupPermissionModel[]
}

export type ProblemHashedTable = {
    [id:string]: ProblemModel
}

export type ProblemSecureModel = {
    problem_id: string
    language: string
    title: string
    description: string | null
    time_limit: number
    created_date?: string;
    updated_date?: string;
    allowed_languages?: string
    difficulty?: number;
    is_active?: boolean
    is_private?: boolean
    submission_regex?: string
    testcase_count?: number
    no_runtime_error?: boolean
}

export type ProblemPopulateAccountSecureModel = ProblemModel & {
    creator?: AccountModel
}

export type ProblemPopulateTestcases = ProblemModel & {
    testcases?: TestcaseModel[]
}

export type ProblemPoplulateCreatorModel = ProblemModel & {
    creator?: AccountModel
}

export type ProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel = ProblemModel & {
    creator?: AccountModel
    testcases?: TestcaseModel[]
    group_permissions: any[] // ProblemGroupPermissionPopulateGroupModel[]
}

export type ProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel = ProblemModel & {
    creator?: AccountModel
    best_submission?: any // SubmissionModel with secure testcases
}