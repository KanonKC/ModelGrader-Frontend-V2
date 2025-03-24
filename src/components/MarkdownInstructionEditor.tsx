import MDEditor from "@uiw/react-md-editor";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { setMarkdownTextarea } from "../stores/slices/myProblemSlice";

const MarkdownInstructionEditor = () => {

    const value = useAppSelector((state) => state.myProblem.markdownTextarea);
    const dispatch = useAppDispatch();

	return (
		<div className="flex">
			<div data-color-mode="light" className="w-full">
				<MDEditor
                    className="font-mono"
					height="60vh"
					value={value}
					onChange={(v) => dispatch(setMarkdownTextarea(v ?? ""))}
				/>
			</div>
		</div>
	);
};

export default MarkdownInstructionEditor;
