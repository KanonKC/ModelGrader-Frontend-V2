import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import {
    setInstructionType,
	setPlateTextarea,
	setTitle,
} from "../../../stores/slices/myProblemSlice";
import DetailPlateEditor from "../../DetailPlateEditor";
import { Input } from "../../shadcn/Input";
import { Label } from "../../shadcn/Label";
import { Tabs, TabsList, TabsTrigger } from "../../shadcn/Tabs";
import MarkdownInstructionEditor from "../../MarkdownInstructionEditor";
import PDFInstructionEditor from "../../PDFInstructionEditor";

const GeneralDetail = () => {

	const myProblem = useAppSelector((state) => state.myProblem);
	const instructionType = useAppSelector(state => state.myProblem.instructionType);
	const dispatch = useAppDispatch();

	const tabList: {
		value: "plate" | "markdown" | "pdf";
		label: string;
	}[] = [
		{
			value: "plate",
			label: "Plate",
		},
		{
			value: "markdown",
			label: "Markdown",
		},
		{
			value: "pdf",
			label: "PDF",
		},
	];

	return (
		<div>
			<Label>Title</Label>
			<Input
				value={myProblem.title}
				onChange={(e) => dispatch(setTitle(e.target.value))}
				type="text"
			/>

			<div className="flex items-end justify-between mb-1.5 mt-4">
				<Label className="">Instruction</Label>
				<div>
					<Tabs value={instructionType}>
						<TabsList>
							{tabList.map((tab) => (
								<TabsTrigger
									onClick={() =>
										dispatch(setInstructionType(tab.value))
									}
									value={tab.value}
									key={tab.value}
								>
									{tab.label}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
				</div>
			</div>
			{instructionType === "plate" && (
				<div className="rounded-lg border bg-background shadow">
					<DetailPlateEditor
						value={myProblem.plateTextarea}
						onChange={(e) => dispatch(setPlateTextarea(e))}
					/>
				</div>
			)}
			{instructionType === "markdown" && (
				<div>
					<MarkdownInstructionEditor />
				</div>
			)}
			{instructionType === "pdf" && (
				<div>
					<PDFInstructionEditor />
				</div>
			)}
		</div>
	);
};

export default GeneralDetail;
