import { SubmitProblemResponse } from "../apis/Submission.api";
import { GetSubmissionByAccountProblemSubmissionModel } from "../models/Submission.model";

export function SubmitProblemResponse2GetSubmissionByAccountProblemResponse(submission: SubmitProblemResponse):GetSubmissionByAccountProblemSubmissionModel  {
    return {
        submission_id: submission.submission_id,
        problem: submission.problem.problem_id,
        language: submission.language,
        submission_code: submission.submission_code,
        is_passed: submission.is_passed,
        date: submission.date,
        score: submission.score,
        max_score: submission.max_score,
        passed_ratio: submission.passed_ratio,
        account: submission.account,
        runtime_output: submission.runtime_output as any // Type conversion needed
    }
}