import { CollectionModel } from "./Collection.model"

export type TopicModel = {
    topic_id: string
    creator: string
    name: string
    description: string | null
    image_url: string | null
    is_active: boolean
    is_private: boolean
    created_date: string
    updated_date: string
    collections: TopicCollectionModel[]
}

export type TopicCollectionModel = {
    id: string;
    collection: CollectionModel;
    order: number;
    topic: number;
}

export type TopicSecureModel = {
    topic_id: string
    creator: string
    name: string
    description: string | null
    image_url: string | null
    is_active: boolean
    is_private: boolean
    created_date: string
    updated_date: string
}

// export type TopicCollectionModel = {
//     topic: TopicModel;
//     collection: CollectionModel[]
// }



export type TopicCollectionPopulateCollectionModel = {
    id: string;
    collection: CollectionModel;
    order: number;
    topic: number;
}

export type TopicPopulateTopicCollectionPopulateCollectionModel = TopicModel & {
    collections: TopicCollectionPopulateCollectionModel[]
}

export type TopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel = {
    id: string;
    collection: any; // CollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel;
    order: number;
    topic: number;
}

export type TopicPopulateTopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel = TopicSecureModel & {
    collections: TopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel[]
}

// export type TopicPopulateTopicCollectionPopulateCollectionAndTopicGroupPermissionPopulateGroupModel = TopicModel & {
//     collections: TopicCollectionPopulateCollectionModel[]
//     group_permissions: TopicGroupPermissionPopulateGroupModel[]
// }

// export type TopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemModel = TopicCollectionPopulateCollectionModel & {
//     collection: CollectionPopulateCollectionProblemPopulateProblemModel
// }

export type TopicGroupPermissionPopulateGroupModel = {
    topic_group_permission_id: string;
    group: any; // GroupModel
    permission_manage_topics: boolean;
    permission_view_topics: boolean;
    permission_view_topics_log: boolean;
    topic: string;
};

export type TopicPopulateTopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemAndTopicGroupPermissionPopulateGroupModel = TopicModel & {
    collections: any[] // TopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemModel[]
    group_permissions: TopicGroupPermissionPopulateGroupModel[]
}

export type TopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemAndCollectionGroupPermissionsPopulateGroupModel = {
    id: string;
    collection: any; // CollectionPopulateCollectionProblemsPopulateProblemAndCollectionGroupPermissionsPopulateGroupModel;
    order: number;
    topic: number;
}

export type TopicPopulateTopicCollectionPopulateCollectionPopulateCollectionProblemsPopulateProblemAndCollectionGroupPermissionsPopulateGroupAndTopicGroupPermissionPopulateGroupModel = TopicModel & {
    collections: TopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemAndCollectionGroupPermissionsPopulateGroupModel[]
    group_permissions: TopicGroupPermissionPopulateGroupModel[]
}