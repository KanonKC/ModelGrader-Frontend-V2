import { ItemInterface } from "react-sortablejs";
import { PlateEditorValueType } from "../PlateEditorValueType";
import { GroupModel } from "../models/Group.model";
import { TopicModel } from "../models/Topic.model";
import { CollectionGroupPermissionRequestForm } from "./CreateCollectionRequestForm";
import { CoursePermissionRequestForm } from "./CreateGroupRequestForm";
import { CollectionModel } from "../models/Collection.model";

export type CourseGroupPermissionRequestForm = {
    group_id: string;
    group: GroupModel;
} & CoursePermissionRequestForm

export type CourseCollectionsGroupPermissionRequestForm = {
    collection_id: string;
    collection: CollectionModel;
    groupPermissions: CollectionGroupPermissionRequestForm[];
}

export type CollectionItemInterface = ItemInterface & {
    collection: CollectionModel;
    groupPermissions: CollectionGroupPermissionRequestForm[];
}

export type CreateCourseRequestForm = {
    title: string;
    description: PlateEditorValueType;
    image?: File | string | null;
    isPrivate?: boolean;
    collectionsInterface: CollectionItemInterface[] //ItemInterface[];
    groupPermissions: CourseGroupPermissionRequestForm[];
    course: null | TopicModel;
}
