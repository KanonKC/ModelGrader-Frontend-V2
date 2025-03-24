import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProblemViewLayout from "../components/ProblemViewLayout";
import NavbarMenuLayout from "../layout/NavbarMenuLayout";
import { useAppDispatch } from "../stores/hooks";
import { loadProblem } from "../stores/slices/problemSlice";

const ViewProblem = () => {
	const { problemId } = useParams();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!problemId) return;
		dispatch(loadProblem(problemId));
	}, [problemId, dispatch]);

	return (
		<NavbarMenuLayout xPad={false}>
			<div className="ml-10">
				<ProblemViewLayout />
			</div>
		</NavbarMenuLayout>
	);
};

export default ViewProblem;
