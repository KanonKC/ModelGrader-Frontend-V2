import { FileSpreadsheet, Folder } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { onMiddleClickOpenInNewTab } from "../../../utilities/OnMiddleClickOpenInNewTab";
import { readableDateFormat } from "../../../utilities/ReadableDateFormat";
import Checkmark from "../../Checkmark";
import MyCollectionContextMenu from "../../ContextMenus/MyCollectionContextMenu";
import { Card, CardContent } from "../../shadcn/Card";
import { CollectionModel } from "../../../types/models/Collection.model";
import { ProblemModel } from "../../../types/models/Problem.model";

const MyCollectionCard = ({
	collection,
    problemList=[]
}:{
	collection: CollectionModel,
    problemList?: ProblemModel[]
}) => {
	const navigate = useNavigate();

	const [highlightTitle, setHighlightTitle] = useState(false);

	const handleMouseOver = () => {
		setHighlightTitle(true);
	};

	const handleMouseOut = () => {
		setHighlightTitle(false);
	};

	return (
		<MyCollectionContextMenu collection={collection}>
			<Card
			onMouseDown={(e) => onMiddleClickOpenInNewTab(e,`/my/collections/${collection.collection_id}/edit`)}
			onClick={() => navigate(`/my/collections/${collection.collection_id}/edit`)}
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
			className={`pt-6 px-5 cursor-pointer ${
				highlightTitle ? "border-green-500 bg-green-100" : ""
			}`}
		>
			<CardContent>
				<div className="flex items-center font-bold mb-2">
					<Folder className="text-yellow-400 mr-2" />
					{highlightTitle ? (
						<h1 className="text-green-600">{collection.name}</h1>
					): collection.name}
				</div>
				<div className="flex text-sm font-medium items-stretch">
					<div className="w-1/6 self-end grid gap-y-2">
						<div>
							<p className="">Lasted Updated</p>
							<p className="text-gray-400">{readableDateFormat(collection.updated_date)}</p>
						</div>

						<div>
							<p className="">Created Date</p>
							<p className="text-gray-400">{readableDateFormat(collection.created_date)}</p>
						</div>
					</div>

					<div className="w-2/6 grid gap-y-2">
						<div>
							<p className="">Visibility</p>
							<p className="text-gray-400">{collection.is_private ? "Private" : "Public"}</p>
						</div>
					</div>

					<div className="w-1/6 self-center">
						<p className="flex items-center">
							<FileSpreadsheet className="text-blue-400 mr-2" />
							Problems ({problemList.length})
						</p>
					</div>

					<div className="grid gap-y-1">
						<div className="flex items-center">
							<Checkmark status={problemList.filter(p => p.has_source_code).length === problemList.length} />
							Source Code ({problemList.filter(p => p.has_source_code).length}/{problemList.length})
						</div>
						<div className="flex items-center">
							<Checkmark status={problemList.filter(p => (p.testcase_count || 0) > 0).length === problemList.length} />
							Testcases ({problemList.filter(p => (p.testcase_count || 0) > 0).length}/{problemList.length})
						</div>
						<div className="flex items-center">
							<Checkmark status={problemList.filter(p => p.no_runtime_error).length === problemList.length} />
							No Runtime Error ({problemList.filter(p => p.no_runtime_error).length}/{problemList.length})
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
		</MyCollectionContextMenu>
	);
};

export default MyCollectionCard;
