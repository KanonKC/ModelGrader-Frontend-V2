import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import { useNavigate } from "react-router-dom";
import CreateProblemForm, {
	OnProblemSaveCallback,
} from "../../../components/Forms/CreateProblemForm";
import { toast } from "../../../components/shadcn/UseToast";
import NavbarSidebarLayout from "../../../layout/NavbarSidebarLayout";
import { ProblemService } from "../../../services/Problem.service";
import { transformCreateProblemRequestForm2CreateProblemRequest, transformFile2ImportPdfRequest } from "../../../types/adapters/CreateProblemRequestForm.adapter";
import { CreateProblemRequestForm } from "../../../types/forms/CreateProblemRequestForm";

const formInitialValue: CreateProblemRequestForm = {
	title: "",
	description: [
		{
			id: "1",
			type: ELEMENT_PARAGRAPH,
			children: [{ text: "" }],
		},
	],
	language: "python",
	solution: "",
	testcases: "",
	testcase_delimeter: ":::",
	time_limit: 1.5,
	groupPermissions: [],
	allowedLanguage: [],
	view_mode: "plate",
	pdf_url: "",
};

const CreateProblem = () => {
	const accountId = String(localStorage.getItem("account_id"));
	const token = String(localStorage.getItem("token"));
	const navigate = useNavigate();

	const HandleSave: OnProblemSaveCallback = async (setLoading, createRequest, pdfFile) => {
		try {
			setLoading(true);

			const { request, groups } = transformCreateProblemRequestForm2CreateProblemRequest(
				createRequest
			);

			const createRes = await ProblemService.create(request, token)
			const updateGroupRes = await ProblemService.updateGroupPermissions(
				createRes.data.problem_id,
				accountId,
				groups,
			)

			if (pdfFile.size !== 0 && createRequest.view_mode === "pdf") {
				const pdfRequest = transformFile2ImportPdfRequest(pdfFile);
				await ProblemService.importPdf(updateGroupRes.data.problem_id, pdfRequest, token)
				console.log("Import Pdf complete")
			}
			toast({
					title: "Create Completed",
				});
			navigate(`/my/problems/${updateGroupRes.data.problem_id}/edit`);
			return updateGroupRes.data.problem_id
		} catch (e) {
			console.log(e);
			toast({ title: "Create failed" });
		} finally {
			setLoading(false)
		}
	};

	return (
		<NavbarSidebarLayout>
			<CreateProblemForm
				createRequestInitialValue={formInitialValue}
				onProblemSave={(setLoading, createRequest, pdfFile) =>
					HandleSave(setLoading, createRequest, pdfFile)
				}
			/>
		</NavbarSidebarLayout>
	);
};

export default CreateProblem;
