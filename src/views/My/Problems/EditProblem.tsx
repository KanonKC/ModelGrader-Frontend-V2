import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateProblemForm from "../../../components/Forms/CreateProblemForm";
import NavbarSidebarLayout from "../../../layout/NavbarSidebarLayout";
import { useAppDispatch } from "../../../stores/hooks";
import { loadMyProblem } from "../../../stores/slices/myProblemSlice";

const EditProblem = () => {

	const { problemId } = useParams();

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!problemId) return
        dispatch(loadMyProblem(problemId))
        console.log("Hello")
    }, [dispatch, problemId])
    
	return (
		<NavbarSidebarLayout>
			<CreateProblemForm/>
		</NavbarSidebarLayout>
	);
};

export default EditProblem;
