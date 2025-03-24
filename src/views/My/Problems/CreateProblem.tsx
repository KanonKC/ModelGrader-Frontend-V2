import { useEffect } from "react";
import CreateProblemForm from "../../../components/Forms/CreateProblemForm";
import NavbarSidebarLayout from "../../../layout/NavbarSidebarLayout";
import { useAppDispatch } from "../../../stores/hooks";
import { clearMyProblemState } from "../../../stores/slices/myProblemSlice";

const CreateProblem = () => {
	
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(clearMyProblemState())
    }, [dispatch])

	return (
		<NavbarSidebarLayout>
			<CreateProblemForm/>
		</NavbarSidebarLayout>
	);
};

export default CreateProblem;
