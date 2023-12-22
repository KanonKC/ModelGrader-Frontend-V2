import React from "react";
import { Card } from "./shadcn/Card";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./shadcn/Accordion";
import { FileSpreadsheet, Folder } from "lucide-react";
import PublicProblemCard from "./PublicProblemCard";
import { CollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel } from "../types/models/Collection.model";
import CardContainer from "./CardContainer";
import { ScrollArea } from "./shadcn/ScrollArea";
import PublicProblemMiniCard from "./PublicProblemMiniCard";
import { TopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel } from "../types/models/Topic.model";

const TopicCollectionsAccordian = ({
	collections,
}: {
	collections: TopicCollectionPopulateCollectionPopulateCollectionProblemPopulateProblemPopulateAccountAndSubmissionPopulateSubmissionTestcasesSecureModel[];
}) => {
	return (
		<Accordion type="multiple" className="">
			{collections?.map((tp,index) => (
				<AccordionItem id={String(`collection-${index+1}`)} value={String(index+1)} className="border-none">
					<AccordionTrigger className="flex items-center">
						<div className="flex items-center text-2xl w-1/2">
							<Folder size={28} className="text-yellow-400 mr-5" />
							{tp.collection.name}
						</div>

						<div className="flex items-center font-bold">
							<FileSpreadsheet className="text-blue-400 mr-2" />(
							{
								tp.collection.problems.filter(
									(collectionProblem) =>
										collectionProblem.problem
											.best_submission?.is_passed
								).length
							}
							/{tp.collection.problems.length})
						</div>
						
					</AccordionTrigger>
					<AccordionContent>
						<ScrollArea className="mt-6 pr-5">
							<div className="grid gap-y-2">
								{tp.collection.problems.map((problem) => (
									<PublicProblemMiniCard
										problem={problem.problem}
									/>
								))}
							</div>
						</ScrollArea>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
};

export default TopicCollectionsAccordian;