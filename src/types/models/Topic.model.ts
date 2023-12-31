import { CollectionModel, CollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel } from "./Collection.model"

export type TopicModel = {
    topic_id: string
    creator: number
    name: string
    description: string | null
    image_url: string | null
    is_active: boolean
    is_private: boolean
    created_date: string
    updated_date: string
}

export type TopicSecureModel = {
    topic_id: string
    creator: number
    name: string
    description: string | null
    image_url: string | null
    created_date: string
    updated_date: string
}

export type TopicCollectionModel = {
    topic: TopicModel;
    collection: CollectionModel[]
}

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
    collection: CollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel;
    order: number;
    topic: number;
}

export type TopicPopulateTopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel = TopicSecureModel & {
    collections: TopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel[]
}