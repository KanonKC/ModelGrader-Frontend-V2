import { AccountModel } from "./Account.model";

export type GroupModel = {
	group_id: string;
	creator: string;
	name: string;
	description: string | null;
	color: string;
	created_date: string;
	updated_date: string;
	permission_manage_topics: boolean;
	permission_view_topics: boolean;
	permission_view_topics_log: boolean;
	permission_manage_collections: boolean;
	permission_view_collections: boolean;
	permission_manage_problems: boolean;
	permission_view_problems: boolean;
	members?: AccountModel[];
};

// export type GroupMemberModel = {
// 	group_member_id: string;
// 	group: number;
// 	account: AccountModel | number;
// 	created_date: string;
// };

// export type GroupHashedTable = {
// 	[id: string]: GroupModel;
// };

// export type TopicGroupPermissionModel = {
// 	topic_group_permission_id: string;
// 	group: string | GroupModel;
// 	permission_manage_topics: boolean;
// 	permission_view_topics: boolean;
// 	permission_view_topics_log: boolean;
// 	topic: string;
// };

// export type ProblemGroupPermissionModel = {
// 	problem_group_permission_id: string;
// 	group: string;
// 	permission_manage_problems: boolean;
// 	permission_view_problems: boolean;
// 	problem: string;
// };
