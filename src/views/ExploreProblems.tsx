import { useEffect, useState } from "react";
import CardContainer from "../components/CardContainer";
import PublicProblemsTable from "../components/Tables/ProblemTables/PublicProblemsTable";
import { Separator } from "../components/shadcn/Seperator";
import NavbarMenuLayout from "../layout/NavbarMenuLayout";
import ProblemAPI from "../services/Problem.service";
import { Problem } from "../types/apis/Problem.api";

const ExploreProblems = () => {
	
    const [problemList, setProblemList] = useState<Problem[]>([]);

	useEffect(() => {
		ProblemAPI.getAll().then((res) => {
            setProblemList(res.data.data);
        })
	}, []);

	return (
		<NavbarMenuLayout>
			<div className="mx-auto w-[90%] mt-10">
				<h1 className="text-3xl font-bold">Explore Problems</h1>
				<div>
					<CardContainer className="w-4/4">
						{/* {problems.map((problem) => (
							<PublicProblemCard problem={problem} />
						))} */}
					<PublicProblemsTable
						problems={problemList}
					/>
					</CardContainer>
          <Separator orientation="vertical"/>
				</div>
			</div>
		</NavbarMenuLayout>
	);
};

export default ExploreProblems;
