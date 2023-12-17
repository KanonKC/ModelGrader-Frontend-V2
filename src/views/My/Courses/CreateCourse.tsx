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
import { transformCreateCourseRequestForm2CreateTopicRequestFormData } from "../../../types/adapters/CreateCourseRequestForm.adapter";
import { TopicService } from "../../../services/Topic.service";

const formInitialValue: CreateCourseRequestForm = {
	title: "",
	description: [
		{
			id: "1",
			type: ELEMENT_PARAGRAPH,
			children: [{ text: "" }],
		},
	],
	image: null,
	isPrivate: false,
	collectionsInterface: [],
};

const CreateCourse = () => {
	const accountId = Number(localStorage.getItem("account_id"));

	const handleSave = ({
		setLoading,
		createRequest,
		courseId,
		setCourseId,
	}: OnCourseSavedCallback) => {
		if (!setCourseId || !setLoading || !createRequest || !courseId) {
			return;
		}

		const formData = transformCreateCourseRequestForm2CreateTopicRequestFormData(createRequest)
		const collectionIds = createRequest.collectionsInterface.map((collection) => collection.id as number)
		TopicService.create(accountId, formData).then((response) => {
			return TopicService.updateCollections(response.data.topic_id,collectionIds)
		}).then((response) => {
			console.log("OK!")
		})
	};

	return (
		<NavbarSidebarLayout>
			<CreateCourseForm
				// onCollectionSave={({ createRequest,collectionId,setCollectionId,setLoading }) =>
				// 	handleSave({ createRequest,collectionId,setCollectionId,setLoading })
				// }
				onCourseSave={({
					createRequest,
					courseId,
					setCourseId,
					setLoading,
				}) =>
					handleSave({
						createRequest,
						courseId,
						setCourseId,
						setLoading,
					})
				}
				createRequestInitialValue={formInitialValue}
			/>
		</NavbarSidebarLayout>
	);
};

export default CreateCourse;