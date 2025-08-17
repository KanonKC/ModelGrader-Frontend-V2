import React, { useEffect, useMemo } from 'react';
import { PlateEditorValueType } from '../../../types/PlateEditorValueType';
import { CreateProblemRequestForm } from '../../../types/forms/CreateProblemRequestForm';
import DetailPlateEditor from '../../DetailPlateEditor';
import { Input, FileInput } from '../../shadcn/Input';
import { Label } from '../../shadcn/Label';
import { Tabs, TabsList, TabsTrigger } from "../../shadcn/Tabs";
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const GeneralDetail = ({
	createRequest,
	setCreateRequest,
	pdfFile,
	setPdfFile,
}: {
	createRequest: CreateProblemRequestForm;
	setCreateRequest: React.Dispatch<React.SetStateAction<CreateProblemRequestForm>>;
	pdfFile: File;
	setPdfFile: React.Dispatch<React.SetStateAction<File>>;
}) => {
	// const [editorUpdateCooldown, setEditorUpdateCooldown] = useState(false);

	const handleEditorChange = (value: PlateEditorValueType) => {
		// if (!editorUpdateCooldown) {
			setCreateRequest({ ...createRequest, description: value });

			// setEditorUpdateCooldown(true);
			// setTimeout(() => {
			// 	setEditorUpdateCooldown(false);
			// }, 1000);
		// }
	};

	useEffect(()=>{
		console.log("General Detail",createRequest)
	},[createRequest])

	const handleViewModeChange = (value: string) => (
		setCreateRequest({ ...createRequest, view_mode: value })
	);

	const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setPdfFile(file);
		}
	};

	const isTempEmptyPdf = (f: File | null) => !f || f.size === 0;

	const pdfUrl = useMemo(() => {
  		if (isTempEmptyPdf(pdfFile)) return null;
  		return URL.createObjectURL(pdfFile!);
	}, [pdfFile]);

	const viewList = [
		{
			value: "plate",
			label: "Plate",
		},
		{
			value: "PDF",
			label: "PDF",
		}
	];

	return (
		<div>
			<div className="flex justify-between">
				<div className='flex'>
					<Tabs value={createRequest.view_mode} onValueChange={(value) => (handleViewModeChange(value))}>
  						<TabsList>
    						{viewList.map((tab) => (
      							<TabsTrigger key={tab.value} value={tab.value}>
        							{tab.label}
      							</TabsTrigger>
    						))}
  						</TabsList>
					</Tabs>
				</div>
			</div>
			
			{(createRequest.view_mode == "plate") && (
				<div>
					<Label>Title</Label>
					<Input
						value={createRequest.title}
						onChange={(e) =>
						setCreateRequest({
							...createRequest,
							title: e.target.value,
						})
						}
						type="text"
					/>

					<Label>Detail</Label>
					<div className="rounded-lg border bg-background shadow">
						<DetailPlateEditor
							value={createRequest.description}
							onChange={(e) => handleEditorChange(e)}
						/>
					</div>
				</div>
			)}

			{(createRequest.view_mode == "PDF") && (
				<div>
					<Label>Title</Label>
					<Input
						value={createRequest.title}
						onChange={(e) =>
						setCreateRequest({
							...createRequest,
							title: e.target.value,
						})
						}
						type="text"
					/>
					<Label>Upload File</Label>
					<FileInput
						accept="application/pdf"
						onChange={(e) => {handlePdfChange(e)}}
					/>
					<Label>Preview</Label>
					{pdfUrl ? (
  						<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
    						<Viewer fileUrl={pdfUrl} />
  						</Worker>
					) : (
  						<div className="flex h-full items-center justify-center text-sm text-muted-foreground">
    						No PDF selected
  						</div>
)}
				</div>
			)}
		</div>
	);
};

export default GeneralDetail