import { PlateEditorValueType } from "../../types/PlateEditorValueType";
import DetailPlateEditor from "../DetailPlateEditor";
import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./MultiTextEditor.css";

const MultiTextEditor = ({
	value,
	onChange = () => {},
	type = "plate",
}: {
	value?: PlateEditorValueType | string | undefined;
	onChange?: (value: PlateEditorValueType) => void;
	type?: "plate" | "markdown";
}) => {
	const [plateValue, setPlateValue] = useState<
		PlateEditorValueType | undefined
	>(value as PlateEditorValueType | undefined);
	const [markdownValue, setMarkdownValue] = useState<string | undefined>(
		"" as string | undefined
	);

	if (type === "plate") {
		return (
			<div className="rounded-lg border bg-background shadow">
				<DetailPlateEditor
					value={plateValue}
					onChange={setPlateValue}
				/>
			</div>
		);
	}

	if (type === "markdown") {
		return (
			<div className="rounded-lg border bg-background shadow">
				<MDEditor value={markdownValue} onChange={setMarkdownValue} 
                height={650}/>
				{/* <MDEditor.Markdown
					source={markdownValue}
					style={{ whiteSpace: "pre-wrap" }}
				/> */}
			</div>
		);
	}
};

export default MultiTextEditor;
