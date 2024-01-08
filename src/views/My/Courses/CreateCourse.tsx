import React from "react";
import NavbarSidebarLayout from "../../../layout/NavbarSidebarLayout";
import CreateCollectionForm, {
	OnCollectionSavedCallback,
} from "../../../components/Forms/CreateCollectionForm";
import { CreateCollectionRequestForm } from "../../../types/forms/CreateCollectionRequestForm";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import { transformCreateCollectionRequestForm2CreateCollectionRequestForm } from "../../../types/adapters/CreateCollectionRequestForm.adapter";
import { CollectionService } from "../../../services/Collection.service";
import { toast } from "../../../components/shadcn/UseToast";
import { CreateCourseRequestForm } from "../../../types/forms/CreateCourseRequestForm";
import CreateCourseForm, {
	OnCourseSavedCallback,
} from "../../../components/Forms/CreateCourseForm";
import { transformCreateCourseRequestForm2CreateTopicRequest } from "../../../types/adapters/CreateCourseRequestForm.adapter";
import { TopicService } from "../../../services/Topic.service";
import { useNavigate } from "react-router-dom";
import { EmptyEditorValue } from "../../../constants/DummyEditorValue";

const formInitialValue: CreateCourseRequestForm = {
	title: "",
	description: EmptyEditorValue,
	image: null,
	isPrivate: false,
	collectionsInterface: [],
	groupPermissions: [],
	course: null,
	// collectionGroupPermissions: [],
};

const CreateCourse = () => {
	const navigate = useNavigate();
	const accountId = String(localStorage.getItem("account_id"));

	const handleSave = ({
		setLoading,
		createRequest,
	}: OnCourseSavedCallback) => {
		if (!setLoading || !createRequest) {
			return;
		}

		const { formData, collectionIds, groups, collectionGroupsPermissions } =
			transformCreateCourseRequestForm2CreateTopicRequest(createRequest);

		setLoading(true);
		TopicService.create(accountId, formData)
			.then((response) => {
				return TopicService.updateCollections(
					response.data.topic_id,
					collectionIds
				);
			})
			.then((response) => {
				return TopicService.updateGroupPermissions(
					response.data.topic_id,
					accountId,
					groups
				);
			})
			.then((response) => {
				let promise = [];
				for (const collection of collectionGroupsPermissions) {
					promise.push(
						CollectionService.updateGroupPermissions(
							collection.collection_id,
							accountId,
							collection.groupPermissions
						)
					);
				}

				return {
					promise: Promise.all(promise),
					topic_id: response.data.topic_id,
				};
			})
			.then(({ topic_id }) => {
				setLoading(false);
				toast({
					title: "Create Completed",
				});
				navigate(`/my/courses/${topic_id}`);
			});
	};

	return (
		<NavbarSidebarLayout>
			<CreateCourseForm
				// onCollectionSave={({ createRequest,collectionId,setCollectionId,setLoading }) =>
				// 	handleSave({ createRequest,collectionId,setCollectionId,setLoading })
				// }
				onCourseSave={({
					createRequest,

					setLoading,
				}) =>
					handleSave({
						createRequest,

						setLoading,
					})
				}
				createRequestInitialValue={formInitialValue}
			/>
		</NavbarSidebarLayout>
	);
};

export default CreateCourse;
