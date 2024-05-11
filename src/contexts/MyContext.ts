import { createContext, useState } from "react";
import { CollectionPopulateCollectionProblemPopulateProblemModel } from "../types/models/Collection.model";
import { GroupPopulateGroupMemberPopulateAccountSecureModel } from "../types/models/Group.model";
import { ProblemPopulateTestcases } from "../types/models/Problem.model";
import { TopicPopulateTopicCollectionPopulateCollectionModel } from "../types/models/Topic.model";
import { ProblemService } from "../services/Problem.service";
import { CollectionService } from "../services/Collection.service";
import { TopicService } from "../services/Topic.service";
import { GroupService } from "../services/Group.service";

export type MyContextType = {
	problems: ProblemPopulateTestcases[];
	setProblems: React.Dispatch<
		React.SetStateAction<ProblemPopulateTestcases[]>
	>;
	collections: CollectionPopulateCollectionProblemPopulateProblemModel[];
	setCollections: React.Dispatch<
		React.SetStateAction<
			CollectionPopulateCollectionProblemPopulateProblemModel[]
		>
	>;
	topics: TopicPopulateTopicCollectionPopulateCollectionModel[];
	setTopics: React.Dispatch<
		React.SetStateAction<
			TopicPopulateTopicCollectionPopulateCollectionModel[]
		>
	>;
	groups: GroupPopulateGroupMemberPopulateAccountSecureModel[];
	setGroups: React.Dispatch<
		React.SetStateAction<
			GroupPopulateGroupMemberPopulateAccountSecureModel[]
		>
	>;
	manageableProblems: ProblemPopulateTestcases[];
	setManageableProblems: React.Dispatch<
		React.SetStateAction<ProblemPopulateTestcases[]>
	>;
	manageableCollections: CollectionPopulateCollectionProblemPopulateProblemModel[];
	setManageableCollections: React.Dispatch<
		React.SetStateAction<
			CollectionPopulateCollectionProblemPopulateProblemModel[]
		>
	>;
	manageableTopics: TopicPopulateTopicCollectionPopulateCollectionModel[];
	setManageableTopics: React.Dispatch<
		React.SetStateAction<
			TopicPopulateTopicCollectionPopulateCollectionModel[]
		>
	>;

	loadProblems: () => void;
	loadCollections: () => void;
	loadTopics: () => void;
	loadGroups: () => void;
};

const iMyContextState: MyContextType = {
	problems: [],
	setProblems: () => {},
	collections: [],
	setCollections: () => {},
	topics: [],
	setTopics: () => {},
	groups: [],
	setGroups: () => {},
	manageableProblems: [],
	setManageableProblems: () => {},
	manageableCollections: [],
	setManageableCollections: () => {},
	manageableTopics: [],
	setManageableTopics: () => {},

	loadProblems: () => {},
	loadCollections: () => {},
	loadTopics: () => {},
	loadGroups: () => {},
};

export const getMyContextStateValue = (): MyContextType => {
	const [problems, setProblems] = useState<ProblemPopulateTestcases[]>([]);
	const [collections, setCollections] = useState<
		CollectionPopulateCollectionProblemPopulateProblemModel[]
	>([]);
	const [topics, setTopics] = useState<
		TopicPopulateTopicCollectionPopulateCollectionModel[]
	>([]);
	const [groups, setGroups] = useState<
		GroupPopulateGroupMemberPopulateAccountSecureModel[]
	>([]);
	const [manageableProblems, setManageableProblems] = useState<
		ProblemPopulateTestcases[]
	>([]);
	const [manageableCollections, setManageableCollections] = useState<
		CollectionPopulateCollectionProblemPopulateProblemModel[]
	>([]);
	const [manageableTopics, setManageableTopics] = useState<
		TopicPopulateTopicCollectionPopulateCollectionModel[]
	>([]);

	const loadProblems = () => {
		const localProblems = localStorage.getItem("my_problems");

        const getLightWeightProblems = (problems: ProblemPopulateTestcases[]) => {
            return problems.map((problem) => ({
                id: problem.problem_id,
                title: problem.title,
                difficulty: problem.difficulty,
                created_date: problem.created_date,
                updated_date: problem.updated_date,
            }))
        }

        if (localProblems) {
			setProblems(JSON.parse(localProblems).problems);
			setManageableProblems(
				JSON.parse(localProblems).manageable_problems
			);
		} else {
			const accountId = String(localStorage.getItem("account_id"));

			ProblemService.getAllAsCreator(accountId).then((response) => {
                console.log(response.data)
				setProblems(response.data.problems);
				setManageableProblems(response.data.manageable_problems);
				localStorage.setItem(
					"my_problems",
					JSON.stringify(response.data)
				);
			});
		}
	};

	const loadCollections = () => {
		const localCollections = localStorage.getItem("my_collections");

		if (localCollections) {
            console.log("Load from local")
			setCollections(JSON.parse(localCollections).collections);
			setManageableCollections(
				JSON.parse(localCollections).manageable_collections
			);
		} else {
            console.log("Fetch from server")
			const accountId = String(localStorage.getItem("account_id"));

			CollectionService.getAllAsCreator(accountId).then((response) => {
				setCollections(response.data.collections);
				setManageableCollections(response.data.manageable_collections);
				localStorage.setItem(
					"my_collections",
					JSON.stringify(response.data)
				);
			});
		}
	};

	const loadTopics = () => {
		const localTopics = localStorage.getItem("my_topics");

		if (localTopics) {
			setTopics(JSON.parse(localTopics).topics);
			setManageableTopics(JSON.parse(localTopics).manageable_topics);
		} else {
			const accountId = String(localStorage.getItem("account_id"));

			TopicService.getAllAsCreator(accountId).then((response) => {
				setTopics(response.data.topics);
				setManageableTopics(response.data.manageable_topics);
				localStorage.setItem(
					"my_topics",
					JSON.stringify(response.data)
				);
			});
		}
	};

	const loadGroups = () => {
		const localGroups = localStorage.getItem("my_groups");

		if (localGroups) {
			setGroups(JSON.parse(localGroups).groups);
		} else {
            const accountId = String(localStorage.getItem("account_id"));
			GroupService.getAllAsCreator(accountId, {
				populate_members: true,
			}).then((response) => {
				setGroups(
					response.data
						.groups as GroupPopulateGroupMemberPopulateAccountSecureModel[]
				);
				localStorage.setItem(
					"my_groups",
					JSON.stringify(response.data)
				);
			});
		}
	};

	return {
		problems,
		setProblems,
		collections,
		setCollections,
		topics,
		setTopics,
		groups,
		setGroups,
		manageableProblems,
		setManageableProblems,
		manageableCollections,
		setManageableCollections,
		manageableTopics,
		setManageableTopics,
		loadProblems,
		loadCollections,
		loadTopics,
		loadGroups,
	};
};

export const MyContext = createContext<MyContextType>(iMyContextState);
