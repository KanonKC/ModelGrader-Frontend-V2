import React, { useEffect, useState } from "react";
import NavbarSidebarLayout from "../../layout/NavbarSidebarLayout";
import MyProblemSubmissionsTable from "../../components/Tables/MyPreviousSubmissionsTable";
import { SubmissionService } from "../../services/Submission.service";
import { set } from "react-hook-form";
import { SubmissionPopulateSubmissionTestcaseAndProblemSecureModel } from "../../types/models/Submission.model";
import MyPreviousSubmissionsTable from "../../components/Tables/MyPreviousSubmissionsTable";

const MyPreviousSubmissions = () => {

    const accountId = String(localStorage.getItem("account_id"));
    const [submissions,setSubmissions] = useState<SubmissionPopulateSubmissionTestcaseAndProblemSecureModel[]>([])

    useEffect(() => {
        SubmissionService.getAll({account_id: accountId,sort_date:1}).then((response) => {
            setSubmissions(response.data.submissions)
        })
    },[accountId])

	return (
		<NavbarSidebarLayout>
			<div className="mt-10 w-[96%] mx-auto">
				<div className="font-bold text-3xl">
					My Previous Submissions
				</div>
                
                <div className="mt-5">
                <MyPreviousSubmissionsTable
                    submissions={submissions}
                />
                </div>
			</div>
		</NavbarSidebarLayout>
	);
};

export default MyPreviousSubmissions;
