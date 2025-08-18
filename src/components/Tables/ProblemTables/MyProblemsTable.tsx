import { ColumnDef } from "@tanstack/react-table";
import {
	Check,
	FileSpreadsheet,
	MoreHorizontal,
	Tally4,
	Tally5,
	Timer,
	X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ProgrammingLanguageOptions } from "../../../constants/ProgrammingLanguage";
import { ProblemPopulateTestcases } from "../../../types/models/Problem.model";
import { checkRuntimeStatus } from "../../../utilities/CheckRuntimeStatus";
import { readableDateFormat } from "../../../utilities/ReadableDateFormat";
import MyProblemDropdown from "../../Dropdowns/MyProblemDropdown";
import { DataTable } from "../Prototype/DataTable";
import DataTableSortableLayout from "../Prototype/DataTableSortableLayout";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "../../ui/HoverCard";
import { Badge } from "../../ui/Badge";

const columns: ColumnDef<ProblemPopulateTestcases>[] = [
	{
		accessorKey: "title",
		header: ({ column }) => (
			<DataTableSortableLayout
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === "asc")
				}
			>
				Title
			</DataTableSortableLayout>
		),
		cell: ({ row }) => {
			return (
				<div className="font-mono flex items-center py-2 hover:underline hover:text-green-500">
					<FileSpreadsheet className="mr-2 text-blue-400" size={20} />
					<Link
						target="_blank"
						to={`/my/problems/${row.original.problem_id}`}
					>
						{row.original.title}
					</Link>
				</div>
			);
		},
	},

	{
		accessorKey: "creator",
		header: ({ column }) => (
			<DataTableSortableLayout
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === "asc")
				}
			>
				Author
			</DataTableSortableLayout>
		),
		cell: ({ row }) => {
			return (
				<div className="font-medium">
					{row.original.creator.username}
				</div>
			);
		},
	},

	{
		accessorKey: "testcases",
		header: "Testcases",
		cell: ({ row }) => (
			<div className="font-medium">
				{row.original.testcases.length === 0 ? (
					<Tally5
						className="inline-block text-red-400 mr-2"
						size={20}
					/>
				) : (
					<Tally4
						className="inline-block text-green-400 mr-2"
						size={20}
					/>
				)}
				{row.original.testcases.length}
			</div>
		),
	},
	{
		accessorKey: "source_code",
		header: () => <div className="text-center">Source Code</div>,
		cell: ({ row }) => {
			return (
				<div className="flex justify-center">
					{row.original.solution !== "" ? (
						<Check className="text-green-500" />
					) : (
						<X className="text-red-500" />
					)}
				</div>
			);
		},
	},
	{
		accessorKey: "no_runtime_error",
		header: () => <div className="text-center">No Runtime Error</div>,
		cell: ({ row }) => {
			return (
				<div className="flex justify-center">
					{checkRuntimeStatus(row.original.testcases) ? (
						<Check className="text-green-500" />
					) : (
						<X className="text-red-500" />
					)}
				</div>
			);
		},
	},

	{
		accessorKey: "time_limit",
		header: "Time Limit",
		cell: ({ row }) => (
			<div className="font-medium">
				<Timer className="inline-block mr-2" size={20} />
				<span className="text-neutral-700">
					{row.original.time_limit.toFixed(3)}{" "}
					<span className="text-neutral-400">ms</span>
				</span>
			</div>
		),
	},

	{
		accessorKey: "allowed_languages",
		header: () => <div className="text-center">Allowed Languages</div>,
		cell: ({ row }) => (
			<div className="font-medium flex justify-center">
				<div className="font-medium">
					{row.original.allowed_languages
						.split(",")
						.slice(0, 2)
						.map((lang) => (
							<span className="mx-0.5">
								{
									ProgrammingLanguageOptions.find(
										(option) => option.value === lang
									)?.badge
								}
							</span>
						))}

					{row.original.allowed_languages.split(",").length > 2 && (
						<span className="mx-0.5">
							<HoverCard>
								<HoverCardTrigger>
									<Badge className="bg-neutral-200 text-black cursor-pointer">
										...{" "}
										{row.original.allowed_languages.split(
											","
										).length - 2}{" "}
										more
									</Badge>
								</HoverCardTrigger>
								<HoverCardContent>
									<div className="flex gap-0.5">
										{row.original.allowed_languages
											.split(",")
											.map((lang) => (
												<div>
													{
														ProgrammingLanguageOptions.find(
															(option) =>
																option.value ===
																lang
														)?.badge
													}
												</div>
											))}
									</div>
								</HoverCardContent>
							</HoverCard>
						</span>
					)}
				</div>
			</div>
		),
	},
	// Temporary hide this column
	// {
	// 	accessorKey: "difficulty",
	// 	header: ({ column }) => (
	// 		<DataTableSortableLayout onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
	// 			Difficulty
	// 		</DataTableSortableLayout>

	// 	),
	// 	cell: ({ row }) => (
	// 		<DifficultyBadge level={row.original.difficulty}/>
	// 	),
	// },

	{
		accessorKey: "updated_date",
		header: ({ column }) => (
			<DataTableSortableLayout
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === "asc")
				}
			>
				Updated Date
			</DataTableSortableLayout>
		),
		cell: ({ row }) => (
			<div className="font-mono">
				{readableDateFormat(row.original.updated_date)}
			</div>
		),
	},
	// {
	// 	accessorKey: "created_date",
	// 	header: ({ column }) => (
	// 		<DataTableSortableLayout onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
	// 			Created Date
	// 		</DataTableSortableLayout>

	// 	),
	// 	cell: ({ row }) => (
	// 		<div className="font-mono">
	// 			{readableDateFormat(row.original.created_date)}
	// 		</div>
	// 	),
	// },
	{
		accessorKey: "action",
		header: () => <div className="text-center">Action</div>,
		cell: ({ row }) => (
			<div className=" flex items-center justify-center">
				<MyProblemDropdown problem={row.original}>
					<MoreHorizontal size={20} />
				</MyProblemDropdown>
			</div>
		),
	},
];

const MyProblemsTable = ({
	problems,
}: {
	problems: ProblemPopulateTestcases[];
}) => {
	return (
		<div>
			<DataTable columns={columns} data={problems} />
		</div>
	);
};

export default MyProblemsTable;
