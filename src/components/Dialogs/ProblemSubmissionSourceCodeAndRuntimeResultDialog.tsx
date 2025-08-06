import { Editor as MonacoEditor } from "@monaco-editor/react";
import React from "react";
import TestcaseValidationAccordian from "../TestcaseValidationAccordion";
import { Dialog, DialogContent, DialogTrigger } from "../shadcn/Dialog";
import { ScrollArea } from "../shadcn/ScrollArea";
import { Separator } from "../shadcn/Seperator";
import { ProblemModel } from "../../types/models/Problem.model";
import { SubmissionModel } from "../../types/models/Submission.model";

const ProblemSubmissionSourceCodeAndRuntimeResultDialog = ({
	submission,
	children,
	problem,
}: {
	submission: SubmissionModel;
	children?: React.ReactNode;
	problem: ProblemModel;
}) => {
	const [sourceCode, setSourceCode] = React.useState<string>(
		submission.submission_code
	);

	return (
		<Dialog>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent className="max-w-[96%]">
				<div className="flex">
					<div className="w-1/2">
						<MonacoEditor
							theme="vs-dark"
							// height="35vh"
							value={sourceCode}
							onChange={() =>
								setSourceCode(submission.submission_code)
							}
							language={submission.language}
						/>
					</div>

					<div className="mx-3">
						<Separator orientation="vertical" />
					</div>

					<div className="w-1/2">
						<ScrollArea className=" h-[60vh] pr-5">
							{submission.runtime_output && <TestcaseValidationAccordian
								problem={problem}
								runtimeResults={submission.runtime_output.map(
									(output, index) => ({
										...output,
										input: problem.testcases?.[index]?.input || "",
									})
								)}
							/>}
						</ScrollArea>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ProblemSubmissionSourceCodeAndRuntimeResultDialog;
