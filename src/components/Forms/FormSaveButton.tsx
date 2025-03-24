import { ArrowDownToLine, Loader2, Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "../shadcn/Button";
import { useMemo } from "react";

const FormSaveButton = ({
	disabled,
	onClick,
}: {
	disabled: boolean;
	onClick: () => void;
}) => {
	const { problemId, courseId, collectionId, groupId } = useParams();
	const isEdit = useMemo(
		() => problemId || courseId || collectionId || groupId,
		[problemId, courseId, collectionId, groupId]
	);

	return (
		<Button disabled={disabled} onClick={onClick} className="px-10 ml-5">
			{disabled ? (
				<>
					<Loader2 className="animate-spin mr-2" />
					{isEdit ? "Saving" : "Creating"}
				</>
			) : (
				<>
					{isEdit ? (
						<ArrowDownToLine size={20} className="mr-2" />
					) : (
						<Plus size={20} className="mr-2" />
					)}
					{isEdit ? "Save" : "Create"}
				</>
			)}
			{/* {loading ? "Saving..." : "Save"} */}
		</Button>
	);
};

export default FormSaveButton;
