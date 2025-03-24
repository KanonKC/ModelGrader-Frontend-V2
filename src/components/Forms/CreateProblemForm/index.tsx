import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CreateProblemRequestForm } from "../../../types/forms/CreateProblemRequestForm";
import { TestcaseModel } from "../../../types/models/Problem.model";
import { Tabs, TabsList, TabsTrigger } from "../../shadcn/Tabs";
import FormSaveButton from "../FormSaveButton";
import GeneralDetail from "./GeneralDetail";
import Privacy from "./Privacy";
import Requirement from "./Requirement";
import Scoring from "./Scoring";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import {
	createMyProblem,
	updateMyProblem,
} from "../../../stores/slices/myProblemSlice";
import { Card, CardContent, CardHeader, CardTitle } from "../../shadcn/Card";

const TabList = [
	{
		value: "general",
		label: "General Detail",
	},
	{
		value: "scoring",
		label: "Scoring",
	},
	{
		value: "requirement",
		label: "Requirement",
	},
	// {
	// 	value: "privacy",
	// 	label: "Privacy",
	// },
	{
		value: "groups",
		label: "Manage Groups & Permissions",
	},
];

export type OnProblemSaveCallback = (
	setLoading: React.Dispatch<React.SetStateAction<boolean>>,
	// problemid: string,
	// setProblemId: React.Dispatch<React.SetStateAction<number>>,
	createRequest: CreateProblemRequestForm
) => void;

const CreateProblemForm = () => {
	const myProblem = useAppSelector((state) => state.myProblem);
	const dispatch = useAppDispatch();
	// const navigate = useNavigate();

	const [currentForm, setCurrentForm] = useSearchParams();

	const handleOnClickSaveButton = () => {
		if (myProblem.id) {
			dispatch(updateMyProblem());
		} else {
			dispatch(createMyProblem());
		}
	};
1
	return (
		<div className="w-[96%] mx-auto mt-10">
			<div className="flex justify-between">
				<Tabs value={currentForm.get("section") || "general"}>
					<TabsList>
						{TabList.map((tab, index) => (
							<TabsTrigger
								key={index}
								value={tab.value}
								onClick={() =>
									setCurrentForm({
										section: tab.value,
									})
								}
							>
								{tab.label}
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>
				<FormSaveButton
					disabled={myProblem.isLoading}
					onClick={handleOnClickSaveButton}
				/>
			</div>

			<Card className="mt-3">
				<CardHeader>
					<CardTitle>
						{myProblem.title === ""
							? "Create Problem"
							: myProblem.title}
					</CardTitle>
				</CardHeader>
				<CardContent className="h-[75vh] mb-4">
					{(!currentForm.get("section") ||
						currentForm.get("section") === "general") && (
						<GeneralDetail />
					)}
					{currentForm.get("section") === "scoring" && <Scoring />}
					{/* {currentForm.get("section") === "requirement" && (
					<Requirement
						createRequest={createRequest}
						setCreateRequest={setCreateRequest}
					/>
				)} */}
					{/* {currentForm.get("section") === "privacy" && (
					<Privacy
						createRequest={createRequest}
						setCreateRequest={setCreateRequest}
					/>
				)} */}
					{/* {currentForm.get("section") === "groups" && (
					<ManageGroups
						createRequest={createRequest}
						setCreateRequest={setCreateRequest}
					/>
				)} */}
				</CardContent>
			</Card>
		</div>
	);
};

export default CreateProblemForm;
