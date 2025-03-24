import { Editor as MonacoEditor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { ProgrammingLanguageMonacoOptionList, ProgrammingLanguageOptionList } from "../../../constants/ProgrammingLanguage";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import {
    setSourceCodeInput,
    setSourceCodeLanguage,
    setTestcaseInputList,
    validateMyProblem
} from "../../../stores/slices/myProblemSlice";
import { Button } from "../../shadcn/Button";
import { Combobox } from "../../shadcn/Combobox";
import { Input } from "../../shadcn/Input";
import { Label } from "../../shadcn/Label";
import { ScrollArea } from "../../shadcn/ScrollArea";
import { Separator } from "../../shadcn/Seperator";
import { Tabs, TabsList, TabsTrigger } from "../../shadcn/Tabs";
import TestcaseValidationAccordian from "../../TestcaseValidationAccordion";

const Scoring = () => {
	const dispatch = useAppDispatch();

	const myProblem = useAppSelector((state) => state.myProblem);
	const runtimeOutputList = useAppSelector((state) => state.myProblem.runtimeOutputList);

	const [manualInput, setManualInput] = useState("");
	const [manualDelimeter, setManualDelimeter] = useState(":::");

	const [testcaseTab, setTestcaseTab] = useState("manually");
	const testcaseTabList = [
		{
			value: "manually",
			label: "Manually Text",
		},
		{
			value: "upload-file",
			label: "Upload File",
		},
		{
			value: "auto-generated",
			label: "Auto-Generated",
		},
	];

    const getInputListFromManualInput = () => {
        return manualInput.split(manualDelimeter).map((input) => input.trim());
    }

	const handleValidation = async () => {
		// ProblemAPI.validate()
        if (testcaseTab === "manually") {
            const inputList = getInputListFromManualInput();
            dispatch(setTestcaseInputList(inputList));
        }

        dispatch(validateMyProblem());
	};

    useEffect(() => {
        console.log("myProblem.testcaseInputList", myProblem.testcaseInputList);
        setManualInput(myProblem.testcaseInputList.join(manualDelimeter));
    }, [myProblem.testcaseInputList, manualDelimeter]);

	return (
		<div className="flex">
			<ScrollArea className="h-[75vh] w-1/2">
				<div className="mr-5">
					<div>
						<div className="flex justify-between items-center mb-2">
							<Label>Source Code</Label>
							<div>
								<Combobox
									label="Select Language"
									options={ProgrammingLanguageMonacoOptionList}
									onSelect={(value) =>
										dispatch(setSourceCodeLanguage(value))
									}
									// initialValue={selectedLanguage}
									value={myProblem.sourceCodeLanguage}
									setValue={setSourceCodeLanguage}
								/>
							</div>
						</div>
						<MonacoEditor
							theme="vs-dark"
							height="75vh"
							value={myProblem.sourceCodeInput}
							onChange={(e) => dispatch(setSourceCodeInput(e))}
							language={myProblem.sourceCodeLanguage}
                            // defaultLanguage={myProblem.sourceCodeLanguage}
						/>
					</div>
				</div>
			</ScrollArea>
			<div className="">
				<Separator className="mx-2" orientation="vertical" />
			</div>
			<ScrollArea className="h-[75vh] w-1/2">
				<div className="mr-5">
					<div>
						<div className="flex justify-between items-center mb-2">
							<Label>Testcase</Label>
							<div className="flex gap-2">
								<Tabs value={testcaseTab}>
									<TabsList>
										{testcaseTabList.map((tab, index) => (
											<TabsTrigger
												key={index}
												value={tab.value}
												onClick={() =>
													setTestcaseTab(tab.value)
												}
											>
												{tab.label}
											</TabsTrigger>
										))}
									</TabsList>
								</Tabs>

								<Button onClick={handleValidation}>
									Validate Testcase
								</Button>
							</div>
						</div>

						<div>
							{testcaseTab === "manually" && (
								<div className="flex flex-col">
									<div>
										<MonacoEditor
											value={manualInput}
											onChange={(e) =>
												setManualInput(e ?? "")
											}
											theme="vs-dark"
											height="60vh"
											defaultLanguage="python"
										/>
									</div>
									<div className="px-1 mb-2 ">
										<Label>
											Delimeter (For seperate each
											testcase)
										</Label>
										<Input
											className="font-mono"
											value={manualDelimeter}
											onChange={(e) =>
												setManualDelimeter(
													e.target.value
												)
											}
										/>
									</div>
                                    <TestcaseValidationAccordian runtimeOutputList={runtimeOutputList} />

								</div>
							)}
							{testcaseTab === "upload-file" && (
								<div>
									<Input type="file" multiple accept=".txt" />
								</div>
							)}
						</div>
					</div>
				</div>
			</ScrollArea>
		</div>
		// <div className="flex">
		// 	<ScrollArea className="w-1/2  overflow-y-scroll">
		// 		<div className="flex justify-between mb-1">
		// 			<div>
		// 				<Label>Source Code</Label>
		// 			</div>
		// 			<div>
		// 				<Combobox
		// 					label="Select Language"
		// 					options={ProgrammingLanguageOptionList}
		// 					onSelect={(value) =>
		// 						dispatch(setSourceCodeLanguage(value))
		// 					}
		// 					// initialValue={selectedLanguage}
		// 					value={myProblem.sourceCodeLanguage}
		// 					setValue={setSourceCodeLanguage}
		// 				/>
		// 			</div>
		// 		</div>
		// 		<MonacoEditor
		// 			theme="vs-dark"
		// 			// height="35vh"
		// 			value={myProblem.sourceCodeInput}
		// 			onChange={(e) => dispatch(setSourceCodeInput(e))}
		// 			language={myProblem.sourceCodeLanguage}
		// 		/>

		// 		<div className="my-1 flex justify-between items-center">
		// 			<Label className="">Testcase</Label>
		// 			<div className="flex w-1/2 items-center">
		// 				<Label className="mr-3">
		// 					Delimeter (For seperate each testcase)
		// 				</Label>
		// 				<Input
		// 					className="w-1/2"
		// 					value={myProblem.testcaseDelimeterInput}
		// 					onChange={(e) =>
		// 						dispatch(
		// 							setTestcaseDelimeterInput(e.target.value)
		// 						)
		// 					}
		// 				/>
		// 			</div>
		// 		</div>
		// 		<MonacoEditor
		// 			value={myProblem.testcaseInput}
		// 			onChange={(e) => dispatch(setTestcaseInput(e))}
		// 			theme="vs-dark"
		// 			// height="35vh"
		// 			defaultLanguage="python"
		// 		/>
		// 	</ScrollArea>
		// 	<div className="">
		// 		<Separator className="mx-2" orientation="vertical" />
		// 	</div>

		// 	<div className="w-1/2 grid content-between">
		// 		<div className="pr-5 overflow-y-scroll h-[70vh]">
		// 			<TestcaseValidationAccordian
		//                 runtimeOutputList={myProblem.runtimeOutputList}
		//             />
		// 		</div>
		// 		<div className="flex justify-end">
		// 			<Button
		// 				disabled={myProblem.isLoading}
		// 				onClick={handleValidation}
		// 				className="px-10"
		// 			>
		// 				{myProblem.isLoading ? (
		// 					<>
		// 						<Loader2 className="animate-spin mr-2" />
		// 						Validating
		// 					</>
		// 				) : (
		// 					<>Validate</>
		// 				)}
		// 			</Button>
		// 		</div>
		// 	</div>
		// </div>
	);
};

export default Scoring;
