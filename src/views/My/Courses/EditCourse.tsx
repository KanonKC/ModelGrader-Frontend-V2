import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import { ItemInterface } from "react-sortablejs";

const EditCourse = () => {
	const { courseId } = useParams();
	const editCourseId = String(courseId);
	const accountId = String(localStorage.getItem("account_id"));

	const [createRequest, setCreateRequest] =
		useState<CreateCourseRequestForm>();

	const handleSave = ({
		setLoading,
		createRequest,
		
	}: OnCourseSavedCallback) => {
		if ( !setLoading || !createRequest || !courseId) {
			return;
		}

		const formData =
			transformCreateCourseRequestForm2CreateTopicRequestFormData(
				createRequest
			);
		const collectionIds = createRequest.collectionsInterface.map(
			(collection) => collection.id as string
		);

		setLoading(true);
		TopicService.update(editCourseId, formData)
			.then(() => {
				return TopicService.updateCollections(
					editCourseId,
					collectionIds
				);
			})
			.then(() => {
				console.log("OK!");
				setLoading(false);
				toast({
					title: "Update Completed",
				})
			});
	};

	useEffect(() => {
		TopicService.get(accountId,editCourseId).then((response) => {
			const { data } = response;
			setCreateRequest({
				title: data.name,
				description: JSON.parse(String(data.description)),
				isPrivate: data.is_private,
				collectionsInterface: data.collections.map(
					(topicCollection) =>
						({
							id: topicCollection.collection.collection_id,
							name: topicCollection.collection.name,
						} as ItemInterface)
				),
			});
		});
	}, [editCourseId]);

	return (
		<NavbarSidebarLayout>
			{createRequest && (
				<CreateCourseForm
					onCourseSave={({
						createRequest,
						
						setLoading,
					}) =>
						handleSave({
							createRequest,
							
							setLoading,
						})
					}
					createRequestInitialValue={
						createRequest as CreateCourseRequestForm
					}
				/>
			)}
		</NavbarSidebarLayout>
	);
};

export default EditCourse;
