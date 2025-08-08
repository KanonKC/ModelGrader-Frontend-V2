import { CollectionGroupPermissionCreateRequest } from "../apis/Collection.api";
import { ProblemGroupPermissionCreateRequest } from "../apis/Problem.api";
import { CreateCollectionRequestForm } from "../forms/CreateCollectionRequestForm";
import { CollectionCreateRequest } from "../models/Collection.model";

export function transformCreateCollectionRequestForm2CreateCollectionRequestForm(
	createRequest: CreateCollectionRequestForm
): {
	request: CollectionCreateRequest;
	problemIds: string[];
	groups: CollectionGroupPermissionCreateRequest[];
	problemGroupPermissions: {
		problem_id: string;
		groupPermissions: ProblemGroupPermissionCreateRequest[];
	}[];
} {
	const request = {
		name: createRequest.title,
		description: JSON.stringify(createRequest.description),
	};

	const problemIds = createRequest.problemsInterface.map(
		(problem) => problem.id as string
	);

	const groups = createRequest.groupPermissions.map((groupPermission) => ({
		group_id: groupPermission.group_id,
		permission_manage_collections: groupPermission.manageCollections,
		permission_view_collections: groupPermission.viewCollections,
	}));

	const problemGroupPermissions =
		createRequest.problemsInterface
			.filter((cp) => cp.problem.problem_id)
			.map((cp) => ({
				problem_id: cp.problem.problem_id || "",
				groupPermissions: cp.groupPermissions.map((gp) => ({
					group_id: gp.group.group_id,
					permission_manage_problems: gp.manageProblems,
					permission_view_problems: gp.viewProblems,
				})),
			})) ?? [];

	return { request, problemIds, groups, problemGroupPermissions };
}
