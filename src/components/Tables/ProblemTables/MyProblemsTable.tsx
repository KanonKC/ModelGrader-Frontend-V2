import { ColumnDef } from "@tanstack/react-table";
import {
	Check,
	ChevronLeft,
	ChevronRight,
	FileSpreadsheet,
	Tally4,
	Tally5,
	Timer,
	X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { Problem } from "../../../types/apis/Problem.api";
import { checkRuntimeStatus } from "../../../utilities/CheckRuntimeStatus";
import { readableDateFormat } from "../../../utilities/ReadableDateFormat";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "../../shadcn/Pagination";
import { DataTable } from "../Prototype/DataTable";
import DataTableSortableLayout from "../Prototype/DataTableSortableLayout";
import { useEffect, useMemo } from "react";
import { setCurrentPage } from "../../../stores/slices/myProblemListSlice";
import { cn } from "../../../lib/utils";
import { Button } from "../../shadcn/Button";

const columns: ColumnDef<Problem>[] = [
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
					<Link to={`/my/problems/${row.original.id}`}>
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
					{row.original.solution?.code !== "" ? (
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
				{row.original.solution?.timeLimitMs} ms
			</div>
		),
	},

	// {
	// 	accessorKey: "allowed_languages",
	// 	header: () => <div className="text-center">Allowed Languages</div>,
	// 	cell: ({ row }) => (
	// 		<div className="font-medium flex justify-center">
	// 			<div className="font-medium">
	// 				{row.original.allowed_languages
	// 					.split(",")
	// 					.slice(0, 2)
	// 					.map((lang) => (
	// 						<span className="mx-0.5">
	// 							{
	// 								ProgrammingLanguageOptions.find(
	// 									(option) => option.value === lang
	// 								)?.badge
	// 							}
	// 						</span>
	// 					))}

	// 				{row.original.allowed_languages.split(",").length > 2 && (
	// 					<span className="mx-0.5">
	// 						<HoverCard>
	// 							<HoverCardTrigger>
	// 								<Badge className="bg-neutral-200 text-black cursor-pointer">
	// 									...{" "}
	// 									{row.original.allowed_languages.split(
	// 										","
	// 									).length - 2}{" "}
	// 									more
	// 								</Badge>
	// 							</HoverCardTrigger>
	// 							<HoverCardContent>
	// 								<div className="flex gap-0.5">
	// 									{row.original.allowed_languages
	// 										.split(",")
	// 										.map((lang) => (
	// 											<div>
	// 												{
	// 													ProgrammingLanguageOptions.find(
	// 														(option) =>
	// 															option.value ===
	// 															lang
	// 													)?.badge
	// 												}
	// 											</div>
	// 										))}
	// 								</div>
	// 							</HoverCardContent>
	// 						</HoverCard>
	// 					</span>
	// 				)}
	// 			</div>
	// 		</div>
	// 	),
	// },
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
				{readableDateFormat(row.original.updatedAt)}
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
		cell: () => (
			<div className=" flex items-center justify-center">
				{/* <MyProblemDropdown problem={row.original}>
					<MoreHorizontal size={20} />
				</MyProblemDropdown> */}
			</div>
		),
	},
];

const MyProblemsTable = () => {
	const problemList = useAppSelector(
		(state) => state.myProblemList.problemList
	);
	const currentPage = useAppSelector(
		(state) => state.myProblemList.currentPage
	);
	const totalProblem = useAppSelector(
		(state) => state.myProblemList.totalProblem
	);

	const isFirstPage = useMemo(() => currentPage === 1, [currentPage]);
	const isLastPage = useMemo(
		() => totalProblem <= currentPage * 10,
		[totalProblem, currentPage]
	);

	const dispatch = useAppDispatch();
	const goToPrevPage = () => {
		dispatch(setCurrentPage(currentPage - 1));
	};
	const goToNextPage = () => {
		dispatch(setCurrentPage(currentPage + 1));
	};

	useEffect(() => {
		console.log("problemList", problemList);
	}, [problemList]);

	return (
		<div>
			<DataTable columns={columns} data={problemList} />
			<div className="flex justify-end mt-4">
				<div className="flex items-center gap-4">
					<Button
						variant="ghost"
						disabled={isFirstPage}
						onClick={goToPrevPage}
                        >
						<ChevronLeft size={16} />
					</Button>
                    <span className="text-sm font-bold">{currentPage}</span>
					<Button
						variant="ghost"
						disabled={isLastPage}
						onClick={goToNextPage}
					>
						<ChevronRight size={16} />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default MyProblemsTable;
