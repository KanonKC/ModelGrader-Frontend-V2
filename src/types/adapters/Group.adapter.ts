import { CreateGroupRequestForm } from "../forms/CreateGroupRequestForm";
import { GroupPopulateGroupMemberPopulateAccountSecureModel } from "../models/Group.model";

export function transformGroupPopulateGroupMemberPopulateAccountSecureModel2CreateGroupRequestForm(group: GroupPopulateGroupMemberPopulateAccountSecureModel): CreateGroupRequestForm {
    return {
        name: group.name,
        description: group.description,
        color: group.color,
        membersInterface: group.members.map((member: any) => {
            return {
                id: typeof member.account === 'object' ? member.account.account_id : member.account,
                name: typeof member.account === 'object' ? member.account.username : '',
                group: member.group,
                created_date: member.created_date
            }
        }),
        manageCourses: group.permission_manage_topics,
        viewCourseLogs: group.permission_view_topics_log,
        viewCourses: group.permission_view_topics,
        manageCollections: group.permission_manage_collections,
        viewCollections: group.permission_view_collections,
        manageProblems: group.permission_manage_problems,
        viewProblems: group.permission_view_problems
    }
}