import React, { useEffect, useState } from "react";
import { CreateCollectionRequestForm } from "../../../types/forms/CreateCollectionRequestForm";
import { ReactSortable } from "react-sortablejs";
import { Button } from "../../shadcn/Button";
import AddProblemDialog from "../../AddProblemDialog";
import { Separator } from "../../shadcn/Seperator";
import { Input } from "../../shadcn/Input";
import { ProblemService } from "../../../services/Problem.service";
import {
	ProblemHashedTable,
	ProblemModel,
	ProblemSecureModel,
} from "../../../types/models/Problem.model";
import { ItemInterface } from "./../../../../node_modules/react-sortablejs/dist/index.d";
import MyProblemCard from "../../MyProblemCard";
import CardContainer from "../../CardContainer";
import SortableCardContainer from "../../SortableCardContainer";
import MyProblemMiniCard from "../../MyProblemMiniCard";
import { ScrollArea } from "../../shadcn/ScrollArea";
import { Item } from "@radix-ui/react-context-menu";
import { transformProblemModel2ProblemHashedTable } from "../../../types/adapters/Problem.adapter";

const ManageProblems = ({
	createRequest,
	setCreateRequest,
}: {
	createRequest: CreateCollectionRequestForm;
	setCreateRequest: React.Dispatch<
		React.SetStateAction<CreateCollectionRequestForm>
	>;
}) => {
	
	const accountId = String(localStorage.getItem("account_id"));

	const [allProblemsSortable, setAllProblemsSortable] = useState<
		ItemInterface[]
	>([]);
	const [selectedProblemsSortable, setSelectedProblemsSortable] = useState<
		ItemInterface[]
	>([]);
	const [allProblems, setAllProblems] = useState<
		ProblemHashedTable
	>({});

	const [initial, setInitial] = useState(true);
	const [selectedProblemSortableIds, setSelectedProblemSortableIds] = useState<string[]>([]);

	useEffect(() => {
		setSelectedProblemSortableIds(selectedProblemsSortable.map((item) => item.id as string));
	},[selectedProblemsSortable])

	const handleRemoveSelectedProblem = (id: string) => {
		setSelectedProblemsSortable(
			[...selectedProblemsSortable.filter((item) => item.id !== id)]
		);
	}

	const handleQuickToggleSelectedProblem = (item: ItemInterface) => {
		// if (selectedProblemsSortable.find((item1) => item1.id === item.id)) {
		// 	console.log("Remove");
		// 	handleRemoveSelectedProblem(item.id as string);
		// } else {
		// 	console.log("Add");
		// 	setSelectedProblemsSortable([...selectedProblemsSortable, item]);
		// }

		if (selectedProblemSortableIds.includes(item.id as string)) {
			handleRemoveSelectedProblem(item.id as string);
		}
		else {
			setSelectedProblemsSortable([...selectedProblemsSortable, item]);
		}
	}

	useEffect(() => {
		setCreateRequest({
			...createRequest,
			problemsInterface: [...selectedProblemsSortable],
		});
	}, [selectedProblemsSortable]);

	useEffect(() => {
		ProblemService.getAllByAccount(accountId).then((response) => {
			setAllProblems(transformProblemModel2ProblemHashedTable(response.data.problems));
			setAllProblemsSortable(
				response.data.problems.map((problem) => ({
					id: problem?.problem_id,
					name: problem?.title
				}))
			);
		});
	}, [accountId]);

	useEffect(() => {
		if (initial) {
			setSelectedProblemsSortable(createRequest.problemsInterface)
			setInitial(false);
		}

		console.log("Create Request", createRequest);
	},[createRequest])

	return (
		<div>
			<div className="flex justify-between">
				<h1 className="text-2xl font-bold">Manage Problems</h1>

				<Button>Add Problems</Button>
			</div>

			<div className="flex">
				<div className="w-1/2">
					<div className="mt-6 pr-5">
						<div className="grid gap-y-3">
							<ScrollArea className="mt-6 h-[80vh] md:h-[65vh] pr-5">
								<ReactSortable
									animation={150}
									group="shared"
									list={selectedProblemsSortable}
									setList={setSelectedProblemsSortable}
									className="grid gap-y-3 p-2 rounded-md"
								>
									{selectedProblemsSortable?.map((item) => (
										<MyProblemMiniCard
											disabledHighlight
											onClick={() => handleRemoveSelectedProblem(item.id as string)}
											key={item.id}
											problem={
												allProblems[item.id as string]
											}
										/>
									))}
								</ReactSortable>
							</ScrollArea>
						</div>
					</div>
				</div>

				<div className="mx-3">
					<Separator orientation="vertical" />
				</div>

				<div className="w-1/2">
					<Input className="mt-2" />
					<ScrollArea className="mt-6 h-[80vh] md:h-[65vh] pr-5">
						<ReactSortable
							group={{
								name: "shared",
								pull: "clone",
								put: false,
							}}
							animation={150}
							sort={false}
							list={allProblemsSortable}
							setList={setAllProblemsSortable}
							filter=".selected"
							className="grid gap-y-3 p-2 rounded-md"
						>
							{allProblemsSortable?.map((item) => (
								<div className={selectedProblemsSortable.includes(item) ? "selected" : ""}>
									<MyProblemMiniCard
										onClick={() => handleQuickToggleSelectedProblem(item)}
										disabled={selectedProblemSortableIds.includes(item.id as string)}
										key={item.id}
										problem={
											allProblems[item.id as string]
										}
									/>
								</div>
							))}
						</ReactSortable>
					</ScrollArea>
				</div>
			</div>
		</div>
	);
};

export default ManageProblems;
