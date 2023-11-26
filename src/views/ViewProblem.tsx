import React, { useState } from "react";
import NavbarMenuLayout from "../layout/NavbarMenuLayout";
import { useParams } from "react-router-dom";
import { Separator } from "../components/shadcn/Seperator";
import PlateEditor from "../components/PlateEditor";
import ReadOnlyPlate from "../components/ReadOnlyPlate";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { Label } from "../components/shadcn/Label";
import { Combobox } from "../components/shadcn/Combobox";
import { ProgrammingLanguageOptions } from "../constants/ProgrammingLanguage";
import { Button } from "../components/shadcn/Button";
import TestcasesGradingIndicator from "../components/TestcasesGradingIndicator";
import { styled } from "styled-components";

const ViewProblem = () => {
	const { problemId } = useParams();
	const [selectedLanguage, setSelectedLanguage] = useState("python");

	return (
		<NavbarMenuLayout xPad={false}>
			<div className="flex xxl:mt-10 md:mt-5">
				<div className="w-1/2">
					{/* <h1 className="text-3xl font-bold">Problem Name</h1> */}
					<ReadOnlyPlate className="h-[80vh]" />
				</div>
				<div className="mx-3">
					<Separator orientation="vertical" />
				</div>
				<div className="w-1/2 mr-5">
					<div className="flex justify-between mb-1 items-center">
						<div className="flex gap-2">
							<Combobox
								label="Select Language"
								options={ProgrammingLanguageOptions}
								onSelect={(value) => setSelectedLanguage(value)}
							/>
							<Combobox
								label="Previous Submission"
								placeholder="Select Submission"
							/>
						</div>
						<div>
							<TestcasesGradingIndicator />
						</div>
					</div>
					<div className="">
						<MonacoEditorWrapper>
							<MonacoEditor
								theme="vs-dark"
								defaultLanguage="python"
								language={selectedLanguage}
							/>
						</MonacoEditorWrapper>
					</div>

					<div className="flex justify-end mt-1">
						<Button className="px-10">Submit</Button>
					</div>
				</div>
			</div>
		</NavbarMenuLayout>
	);
};

const MonacoEditorWrapper = styled.div`
	height: 80vh;

	@media (max-height: 1000px) {
		height: 75vh;
	}
`;
export default ViewProblem;
