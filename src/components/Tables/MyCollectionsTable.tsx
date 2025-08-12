import { ColumnDef } from "@tanstack/react-table";
import { FileSpreadsheet, Folder, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { CollectionModel } from "../../types/models/Collection.model";
import { readableDateFormat } from "../../utilities/ReadableDateFormat";
import MyCollectionDropdown from "../Dropdowns/MyCollectionDropdown";
import { DataTable } from "./Prototype/DataTable";

export type CollectionWithProblemsCount = CollectionModel & {
	problemCount: number;
};

const columns: ColumnDef<CollectionWithProblemsCount>[] =
	[
		{
			accessorKey: "name",
			header: "Title",
			cell: ({ row }) => (
				<div className="flex items-center font-medium py-2 hover:underline hover:text-green-500">
					<Folder className="mr-2 text-yellow-400" size={20} />
					<Link
						to={`/my/collections/${row.original.collection_id}/edit`}
						target="_blank"
					>
						{row.original.name}
					</Link>
				</div>
			),
		},
		{
			accessorKey: "problemCount",
			header: "Problems",
			cell: ({ row }) => (
				<div className="flex items-center font-medium">
					<FileSpreadsheet className="mr-2 text-blue-400" size={20} />
					{row.original.problemCount}
				</div>
			),
		},
		{
			accessorKey: "updated_date",
			header: "Updated Date",
			cell: ({ row }) => (
				<div className="font-mono">
					{readableDateFormat(row.original.updated_date)}
				</div>
			),
		},
		{
			accessorKey: "action",
			header: () => <div className="text-center">Action</div>,
			cell: ({ row }) => (
				<div className=" flex items-center justify-center">
					<MyCollectionDropdown collection={row.original}>
						<MoreHorizontal size={20} />
					</MyCollectionDropdown>
				</div>
			),
		},
		// {
		// 	accessorKey: "created_date",
		// 	header: "Created Date",
		// 	cell: ({ row }) => (
		// 		<div className="font-mono">
		// 			{readableDateFormat(row.original.created_date)}
		// 		</div>
		// 	),
		// },
	];

const MyCollectionsTable = ({
	collections = [],
}: {
	collections?: CollectionWithProblemsCount[];
}) => {
	return (
		<div>
			<DataTable columns={columns} data={collections} />
		</div>
	);
};

export default MyCollectionsTable;
