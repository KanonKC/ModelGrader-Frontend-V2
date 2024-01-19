import { ColumnDef } from "@tanstack/react-table";
import { LibraryBig } from "lucide-react";
import { Link } from "react-router-dom";
import { ProgrammingLanguageOptions } from "../../constants/ProgrammingLanguage";
import { SubmissionPopulateSubmissionTestcaseAndProblemSecureModel } from "../../types/models/Submission.model";
import { readableDateFormat } from "../../utilities/ReadableDateFormat";
import TestcasesGradingIndicator from "../TestcasesGradingIndicator";
import { DataTable } from "./Prototype/DataTable";

const MyPreviousSubmissionsTable = ({
	submissions = [],
}: {
	submissions?: SubmissionPopulateSubmissionTestcaseAndProblemSecureModel[];
}) => {
	const columns: ColumnDef<SubmissionPopulateSubmissionTestcaseAndProblemSecureModel>[] =
		[
			{
				accessorKey: "problem",
				header: "Problem",
				cell: ({ row }) => (
					<div className="font-medium py-2 hover:underline hover:text-green-500">
						<Link
							to={
								row.original.topic
									? `/courses/${row.original.topic.topic_id}/problems/${row.original.problem.problem_id}`
									: `/problems/${row.original.problem.problem_id}`
							}
						>
							{row.original.problem.title}
						</Link>
					</div>
				),
			},
			{
				accessorKey: "course",
				header: "Course",
				cell: ({ row }) => (
					<div className="">
						{row.original.topic ? (
							<div className="font-medium hover:underline hover:text-green-500 flex items-center">
								<LibraryBig size={20} className="text-purple-400 mr-1"/>
								<Link
									to={`/courses/${row.original.topic.topic_id}`}
								>
									{row.original.topic.name}
								</Link>
							</div>
						) : (
							<div className="italic text-gray-400">
								Public Submitted
							</div>
						)}
					</div>
				),
			},
			{
				accessorKey: "language",
				header: () => <div className="text-center">Language</div>,
				cell: ({ row }) => (
					<div className="font-medium py-2 flex justify-center">
						{
							ProgrammingLanguageOptions.find(
								(language) =>
									language.value === row.original.language
							)?.badge
						}
					</div>
				),
			},
			{
				accessorKey: "runtime_result",
				header: "Runtime Result",
				cell: ({ row }) => (
					<div className="font-medium">
						<TestcasesGradingIndicator
							sizeX={1.5}
							sizeY={3}
							submissionTestcases={row.original.runtime_output}
						/>
					</div>
				),
			},
			{
				accessorKey: "date",
				header: "Submitted Date",
				cell: ({ row }) => (
					<div className="font-mono">
						{readableDateFormat(row.original.date)}
					</div>
				),
			},
			// {
			// 	accessorKey: "action",
			// 	header: "",
			// 	cell: ({ row }) => (
			// 		<div>
			// 			<ProblemSubmissionSourceCodeAndRuntimeResultDialog
			//                 submission={row.original}
			//                 problem={problem}
			//             >
			// 				<Button>
			// 					<Maximize2 size={15} className="mr-2" />
			// 					View More
			// 				</Button>
			// 			</ProblemSubmissionSourceCodeAndRuntimeResultDialog>
			// 		</div>
			// 	),
			// },
		];

	return (
		<div>
			<DataTable columns={columns} data={submissions} />
		</div>
	);
};

export default MyPreviousSubmissionsTable;
