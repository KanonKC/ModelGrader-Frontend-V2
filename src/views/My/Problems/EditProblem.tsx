import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateProblemForm, {
	OnProblemSaveCallback,
} from "../../../components/Forms/CreateProblemForm";
import { toast } from "../../../components/shadcn/UseToast";
import NavbarSidebarLayout from "../../../layout/NavbarSidebarLayout";
import { ProblemService } from "../../../services/Problem.service";
import { transformCreateProblemRequestForm2CreateProblemRequest, transformFile2ImportPdfRequest } from "../../../types/adapters/CreateProblemRequestForm.adapter";
import { transformProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel2CreateProblemRequestForm } from "../../../types/adapters/Problem.adapter";
import { CreateProblemRequestForm } from "../../../types/forms/CreateProblemRequestForm";
import { ProblemPoplulateCreatorModel } from "../../../types/models/Problem.model";

const EditProblem = () => {
	const accountId = String(localStorage.getItem("account_id"));
	const token = String(localStorage.getItem("token"));

	const { problemId } = useParams();
	const editProblemId = String(problemId);

	const [problem, setProblem] = useState<ProblemPoplulateCreatorModel>();

	const [createRequest, setCreateRequest] =
		useState<CreateProblemRequestForm>();

	const newHandleSave: OnProblemSaveCallback = async (setLoading, createRequest, pdfFile) => {
		try {
			setLoading(true);

			const { request, groups } = transformCreateProblemRequestForm2CreateProblemRequest(
				createRequest
			);

			const updateRes = await ProblemService.update(String(editProblemId), request, token);
			const updateGroupRes = await ProblemService.updateGroupPermissions(
					updateRes.data.problem_id,
					accountId,
					groups,
				)

			if (pdfFile.size !== 0 && createRequest.view_mode === "PDF") {
					const pdfRequest = transformFile2ImportPdfRequest(pdfFile);
					ProblemService.importPdf(updateGroupRes.data.problem_id, pdfRequest, token)
					console.log("Import Pdf complete")
			}
			toast({
				title: "Problem Updated",
			});
		} catch (e) {
			console.log(e)
			toast({ title: "Create failed" });
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		ProblemService.getv1(editProblemId, token).then((response) => {
			setProblem(response.data);
			setCreateRequest(
				transformProblemPopulateAccountAndTestcasesAndProblemGroupPermissionsPopulateGroupModel2CreateProblemRequestForm(
					response.data
				)
			);
            document.title = `${response.data.title} - Edit`;
		});


	}, [accountId, editProblemId]);
	return (
		<NavbarSidebarLayout>
			{createRequest && (
				<CreateProblemForm
					createRequestInitialValue={createRequest}
					validatedTestcases={problem?.testcases}
					onProblemSave={(
						setLoading,
						createRequest,
						pdfFile
					) =>
						newHandleSave(
							setLoading,
							createRequest,
							pdfFile
						)
					}
				/>
			)}
		</NavbarSidebarLayout>
	);
};

export default EditProblem;
