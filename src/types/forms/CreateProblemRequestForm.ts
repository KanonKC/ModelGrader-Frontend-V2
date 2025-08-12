import { PlateEditorValueType } from "../PlateEditorValueType";
import { GroupModel } from "../models/Group.model";
import { SubmissionTestcaseModel } from "../models/Submission.model";
import { ProblemPermissionRequestForm } from "./CreateGroupRequestForm";

export type ProblemGroupPermissionRequestForm = {
	groupId: string;
	group: GroupModel
} & ProblemPermissionRequestForm

export type CreateProblemRequestForm = {
	title: string;
	description: PlateEditorValueType;
	language: string;
	solution: string;
	testcases: string;
	testcase_delimeter: string;
	time_limit: number;
	validated_testcases?: SubmissionTestcaseModel[];
	groupPermissions: ProblemGroupPermissionRequestForm[];
	allowedLanguage: string[];
};