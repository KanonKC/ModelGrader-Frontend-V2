import { handleDeprecatedDescription } from "../../utilities/HandleDeprecatedDescription";
import { CreateProblemRequestForm } from "../forms/CreateProblemRequestForm";
import { ProblemHashedTable, ProblemModel } from "../models/Problem.model";

export function transformProblemModel2CreateProblemRequestForm(problem: ProblemModel): CreateProblemRequestForm {
    return {
        title: problem.title,
        description: JSON.parse(handleDeprecatedDescription(String(problem.description))),
        language: problem.language,
        solution: problem.solution,
        testcases: problem.testcases?.map(testcase => testcase.input).join(":::\n") || "",
        testcase_delimeter: ":::",
        time_limit: problem.time_limit,
        groupPermissions: [], // Will need to be populated separately
        allowedLanguage: problem.allowed_languages?.split(",") || []
    }
}

export function transformProblemModel2ProblemHashedTable(problems: ProblemModel[]): ProblemHashedTable {
    const result:ProblemHashedTable = {}
    for (const problem of problems) {
        result[problem.problem_id || ""] = problem
    }
    return result
}