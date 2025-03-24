import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { openPlugin } from "@react-pdf-viewer/open";
import "@react-pdf-viewer/open/lib/styles/index.css";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { setPdfFile, setPdfUrl } from "../stores/slices/myProblemSlice";
import { Input } from "./shadcn/Input";

const PDFInstructionEditor = () => {
	const openPluginInstance = openPlugin({});
	const defaultLayoutPluginInstance = defaultLayoutPlugin({});

    const pdfUrl = useAppSelector((state) => state.myProblem.pdfUrl);
    const dispatch = useAppDispatch();

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const url = URL.createObjectURL(file);
			dispatch(setPdfUrl(url));
            dispatch(setPdfFile(file));
		}
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="">
				<Input type="file" onChange={handleFileChange} />
			</div>
			<div className="h-[50vh]">
				{pdfUrl && (
					<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
						<Viewer
							plugins={[
								defaultLayoutPluginInstance,
								openPluginInstance,
							]}
							fileUrl={`${import.meta.env.VITE_BACKEND_URL}/${pdfUrl}`}
						/>
					</Worker>
				)}
			</div>
		</div>
	);
};

export default PDFInstructionEditor;
