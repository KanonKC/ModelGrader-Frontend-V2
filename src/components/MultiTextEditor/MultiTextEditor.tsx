import { PlateEditorValueType } from "../../types/PlateEditorValueType";
import DetailPlateEditor from "../DetailPlateEditor";
import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./MultiTextEditor.css";
import { Tabs, TabsList, TabsTrigger } from "../shadcn/Tabs";

export type MultiTextEditorType = "plate" | "markdown";
export interface MultiTextEditorOnChange {
	plateValue: PlateEditorValueType | undefined;
	markdownValue: string | undefined;
	type: MultiTextEditorType;
}

const MultiTextEditor = ({
	value,
	onChange = () => {},
	type = "plate",
}: {
	value?: PlateEditorValueType | string | undefined;
	onChange?: ({
		plateValue,
		markdownValue,
		type,
	}: MultiTextEditorOnChange) => void;
	type?: MultiTextEditorType;
}) => {
	const [selectedType, setSelectedType] = useState<MultiTextEditorType>(type);
	const [plateValue, setPlateValue] = useState<
		PlateEditorValueType | undefined
	>(value as PlateEditorValueType | undefined);
	const [markdownValue, setMarkdownValue] = useState<string | undefined>(
		value as string | undefined
	);

	useEffect(() => {
		onChange({
			plateValue: plateValue,
			markdownValue: markdownValue,
			type: selectedType,
		});
	}, [plateValue, markdownValue, selectedType, onChange]);

	return (
		<div>
			<Tabs defaultValue="plate">
				<TabsList>
					<TabsTrigger
						onClick={() => setSelectedType("plate")}
						value="plate"
					>
						Plate
					</TabsTrigger>
					<TabsTrigger
						onClick={() => setSelectedType("markdown")}
						value="markdown"
					>
						Markdown
					</TabsTrigger>
				</TabsList>
			</Tabs>
			<div className="rounded-lg border bg-background shadow">
				{selectedType === "plate" && (
					<DetailPlateEditor
						value={plateValue}
						onChange={setPlateValue}
					/>
				)}
				{selectedType === "markdown" && (
					<MDEditor
						value={markdownValue}
						onChange={setMarkdownValue}
						height={650}
					/>
				)}
			</div>
		</div>
	);
};

export default MultiTextEditor;
