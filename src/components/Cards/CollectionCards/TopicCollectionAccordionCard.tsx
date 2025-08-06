import { Check, FileCheck, Folder } from "lucide-react";
import { CollectionModel } from "../../../types/models/Collection.model";
import { handleDeprecatedDescription } from "../../../utilities/HandleDeprecatedDescription";
import ReadOnlyPlate from "../../ReadOnlyPlate";
import PublicProblemsTable from "../../Tables/ProblemTables/PublicProblemsTable";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../../shadcn/Accordion";
import { Badge } from "../../shadcn/Badge";
import { Card } from "../../shadcn/Card";
import { ProblemModel } from "../../../types/models/Problem.model";

const isPassed = (problemList: ProblemModel[]):boolean => {
	return problemList.filter(
		(problem) =>
			problem.best_submission
				?.is_passed
	).length === problemList.length
}
const TopicCollectionAccordianCard = ({
	collection,
    problemList=[]
}: {
	collection: CollectionModel;
    problemList?: ProblemModel[]
}) => {
	return (
		<Card className="px-5 cursor-pointer">
			<Accordion type="multiple" className="">
				<AccordionItem value="1" className="border-none">
					<AccordionTrigger className="flex items-center">
						<div className="flex items-center w-6/12">
							<Folder className="text-yellow-400 mr-2" />
							{collection.name}
						</div>

						<div className="flex text-base items-center font-mono w-4/12">
							<FileCheck
								size={20}
								className="text-green-600 mr-2"
							/>
							<div className={isPassed(problemList) ? "text-green-600 font-bold" : ""}>
								(
								{
									problemList.filter(
										(problem) =>
											problem.best_submission?.is_passed
									).length
								}
								/{problemList.length})
							</div>
						</div>

						<div className="w-2/12">
							{isPassed(problemList) && (
								<Badge>
									<Check className="mr-2" size={18} />
									Completed
								</Badge>
							)}
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<ReadOnlyPlate
							value={JSON.parse(handleDeprecatedDescription(String(collection.description)))}
						/>

						<PublicProblemsTable
							problems={problemList}
						/>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</Card>
	);
};

export default TopicCollectionAccordianCard;
