import { ItemInterface } from "react-sortablejs";
import { PlateEditorValueType } from "../PlateEditorValueType";
import { CollectionModel } from "../models/Collection.model";
import { GroupModel } from "../models/Group.model";
import { ProblemModel } from "../models/Problem.model";
import { CollectionPermissionRequestForm } from "./CreateGroupRequestForm";
import { ProblemGroupPermissionRequestForm } from "./CreateProblemRequestForm";

export type CollectionGroupPermissionRequestForm = {
    group_id: string;
    group: GroupModel;
} & CollectionPermissionRequestForm

export type ProblemItemInterface = ItemInterface & {
    problem: ProblemModel;
    groupPermissions: ProblemGroupPermissionRequestForm[];
}

export type CreateCollectionRequestForm = {
    title: string;
    description: PlateEditorValueType;
    problemsInterface: ProblemItemInterface[];
    groupPermissions: CollectionGroupPermissionRequestForm[];
    collection: CollectionModel | null;
}