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
    created_date: string;
    updated_date: string;
    allowed_languages: string
    solution: string
    creator: AccountModel
    difficulty: number;
    is_active?: boolean
    is_private?: boolean
    submission_regex?: string
    testcases?: TestcaseModel[]
    best_submission?: SubmissionModel | null
    has_source_code: boolean
    testcase_count: number
    no_runtime_error: boolean
}

export type ProblemHashedTable = {
    [id:string]: ProblemModel
}