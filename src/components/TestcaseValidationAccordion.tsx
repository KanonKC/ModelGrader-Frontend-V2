import { FileDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { TestcaseStatusIndicatorColor } from "../constants/TestcaseStatusIndicatorColor";
import { backendAPI } from "../services";
import { RuntimeOutput } from "../services/Problem.service";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./shadcn/Accordion";
import { Badge } from "./shadcn/Badge";
import { Label } from "./shadcn/Label";
import { Textarea } from "./shadcn/Textarea";
import { useAppSelector } from "../stores/hooks";

const minimizer = (text: string | null): string => {
	const LIMIT = 250;

    if (!text) return "";

	if (text.length > LIMIT) {
		return text.slice(0, LIMIT) + ` ... (${text.length - LIMIT} more)`;
	}
	return text;
};

const downloadTextfile = (url: string, filename: string) => {
	backendAPI.get(url).then((res) => {
		const url = window.URL.createObjectURL(new Blob([res.data]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", filename);
		document.body.appendChild(link);
		link.click();
	});
};

const DownloadMiniButton = ({
	...args
}: {
	className?: string;
	onClick?: React.MouseEventHandler<HTMLParagraphElement>;
}) => {
	return (
		<p
			className="flex items-center cursor-pointer hover:text-green-500"
			{...args}
		>
			<FileDown size={16} className="mr-1" /> Download .txt
		</p>
	);
};

const TestcaseValidationInstance = ({
	runtimeOutput,
	index,
}: {
	index: number;
	runtimeOutput: RuntimeOutput;
}) => {
	const title = useAppSelector((state) => state.myProblem.title);

	const [inputTextContent, setInputTextContent] = useState<string>("");
	const [outputTextContent, setOutputTextContent] = useState<string>("");

	function toSnakeCase(str: string) {
		return str.replace(/\s+/g, "_").toLowerCase();
	}

	const downloadInputFilename = useMemo(
		() => `${toSnakeCase(title)}_testcase_input_${index + 1}.txt`,
		[title, index]
	);
	const downloadOutputFilename = useMemo(
		() => `${toSnakeCase(title)}_testcase_output_${index + 1}.txt`,
		[title, index]
	);

	useEffect(() => {
		backendAPI.get(runtimeOutput.inputFileUrl).then((res) => {
			setInputTextContent(String(res.data));
		});
		backendAPI.get(runtimeOutput.outputFileUrl).then((res) => {
			setOutputTextContent(String(res.data));
		});
	}, [runtimeOutput]);

	return (
		<AccordionItem value={String(index)}>
			<AccordionTrigger>
				Testcase #{index + 1}
				{runtimeOutput.isError ? (
					<Badge className="bg-gray-500">ERROR</Badge>
				) : runtimeOutput.isTimeout ||
				  runtimeOutput.isMemoryExceeded ? (
					<Badge className="bg-yellow-400">TIMEOUT</Badge>
				) : runtimeOutput.isError ? (
					<Badge className="bg-red-400">FAILED</Badge>
				) : (
					<Badge className="bg-green-500">OK</Badge>
				)}
			</AccordionTrigger>
			<AccordionContent>
				<div className="flex gap-5 px-1">
					<div className="w-1/2">
						<div className="flex justify-between">
							<Label>Input</Label>
							<DownloadMiniButton
								onClick={() =>
									downloadTextfile(
										runtimeOutput.inputFileUrl,
										downloadInputFilename
									)
								}
							/>
						</div>
						<Textarea
							rows={
								minimizer(inputTextContent).split("\n").length
							}
							readOnly
							className="mt-1 font-mono cursor-pointer"
							value={minimizer(inputTextContent)}
							onClick={() =>
								navigator.clipboard.writeText(inputTextContent)
							}
						/>
					</div>
					<div className="w-1/2">
						<div className="flex justify-between">
							<Label>Output</Label>
							<DownloadMiniButton
								onClick={() =>
									downloadTextfile(
										runtimeOutput.outputFileUrl,
										downloadOutputFilename
									)
								}
							/>
						</div>
						<Textarea
							rows={
								minimizer(outputTextContent).split("\n").length
							}
							readOnly
							className="mt-1 font-mono cursor-pointer"
							value={minimizer(outputTextContent)}
							onClick={() =>
								navigator.clipboard.writeText(
									outputTextContent ?? ""
								)
							}
						/>
					</div>
				</div>
			</AccordionContent>
		</AccordionItem>
	);
};

const TestcaseValidationAccordian = ({
	runtimeOutputList = [],
}: {
	runtimeOutputList?: RuntimeOutput[];
}) => {
	return (
		<Accordion type="multiple">
			{runtimeOutputList.map((output, index) => (
				<TestcaseValidationInstance
					key={index}
					index={index}
					runtimeOutput={output}
				/>
			))}
		</Accordion>
	);
};

export default TestcaseValidationAccordian;
