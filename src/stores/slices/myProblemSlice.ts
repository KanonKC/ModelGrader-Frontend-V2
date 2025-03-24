import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	ProgrammingLanguage,
	ProgrammingLanguageMonacoOptionList,
} from "../../constants/ProgrammingLanguage";
import ProblemAPI, {
	CreateProblemPayload,
	RuntimeOutput,
} from "../../services/Problem.service";
import { PlateEditorValueType } from "../../types/PlateEditorValueType";

export interface MyProblemState {
	id: string | null;
	title: string;
	instructionType: "plate" | "markdown" | "pdf";
	plateTextarea: PlateEditorValueType | undefined;
	markdownTextarea: string;
	pdfFile: File | null;
	pdfUrl: string | null;
	sourceCodeInput: string;
	sourceCodeLanguage: string;
	testcaseInputList: string[];
	runtimeOutputList: RuntimeOutput[];
	isLoading: boolean;
}

const initialState: MyProblemState = {
	id: null,
	title: "",
	instructionType: "plate",
	plateTextarea: undefined,
	markdownTextarea: "",
	pdfFile: null,
	pdfUrl: null,
	sourceCodeInput: "",
	sourceCodeLanguage: "py",
	testcaseInputList: [],
	runtimeOutputList: [],
	isLoading: false,
};

async function transformMyProblemStateToCreateProblemPayload(
	state: MyProblemState
): Promise<CreateProblemPayload> {
	let pdfUrl: string | undefined;

	if (state.pdfFile) {
		const formData = new FormData();
		formData.append("pdf", state.pdfFile);
		const pdfResponse = await ProblemAPI.uploadPDF(formData);
		pdfUrl = pdfResponse.data.url;
	}

	const correctedSourceCodeLanguage =
		ProgrammingLanguageMonacoOptionList.find(
			(option) => option.value === state.sourceCodeLanguage
		)?.defaultValue;

	if (!correctedSourceCodeLanguage) {
		console.log(
			"Invalid source code language",
			correctedSourceCodeLanguage,
			state.sourceCodeLanguage
		);
		throw new Error("Invalid source code language");
	}

	return {
		title: state.title,
		instruction: {
			type: state.instructionType,
			markdownContent: state.markdownTextarea,
			pdfUrl: pdfUrl ?? undefined,
			plateContent: JSON.stringify(state.plateTextarea),
		},
		solution: {
			code: state.sourceCodeInput,
			language: correctedSourceCodeLanguage as ProgrammingLanguage,
			timeLimitMs: 1000,
			memoryLimitKb: 256,
		},
		testcases: state.testcaseInputList.map((input) => ({ input })),
	};
}

export const loadMyProblem = createAsyncThunk(
	"myProblem/loadMyProblem",
	async (problemId: string) => {
		const response = await ProblemAPI.get(problemId);
		return response.data;
	}
);

export const createMyProblem = createAsyncThunk(
	"myProblem/createMyProblem",
	async (_, { getState }) => {
		const state = getState() as { myProblem: MyProblemState };
		const payload = await transformMyProblemStateToCreateProblemPayload(
			state.myProblem
		);
		const response = await ProblemAPI.create(payload);
		return response.data;
	}
);

export const updateMyProblem = createAsyncThunk(
	"myProblem/updateMyProblem",
	async (_, { getState }) => {
		const state = getState() as { myProblem: MyProblemState };
		console.log("updateMyProblem", state.myProblem.id);
		if (state.myProblem.id === null) {
			console.log("null");
			return;
		}
		console.log("Start transformMyProblemStateToCreateProblemPayload");
		const payload = await transformMyProblemStateToCreateProblemPayload(
			state.myProblem
		);
		console.log("updateMyProblem111", payload);
		await ProblemAPI.update(state.myProblem.id, payload);
	}
);

export const validateMyProblem = createAsyncThunk(
	"myProblem/validateMyProblem",
	async (_, { getState }) => {
		const state = getState() as { myProblem: MyProblemState };
		const payload = await transformMyProblemStateToCreateProblemPayload(
			state.myProblem
		);
		const response = await ProblemAPI.validate(payload);
		return response.data;
	}
);

export const myProblemSlice = createSlice({
	name: "myProblem",
	initialState,
	reducers: {
		setId: (state, action) => {
			state.id = action.payload;
		},
		setTitle: (state, action) => {
			state.title = action.payload;
		},
		setPlateTextarea: (state, action) => {
			state.plateTextarea = action.payload;
		},
		setSourceCodeInput: (state, action) => {
			state.sourceCodeInput = action.payload;
		},
		setSourceCodeLanguage: (state, action) => {
			state.sourceCodeLanguage = action.payload;
		},
		setTestcaseInputList: (state, action) => {
			state.testcaseInputList = action.payload;
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		clearMyProblemState: (state) => {
			state.id = null;
			state.title = "";
			state.plateTextarea = [];
			state.sourceCodeInput = "";
			state.sourceCodeLanguage = "python";
			state.testcaseInputList = [];
			state.isLoading = false;
			state.pdfFile = null;
			state.pdfUrl = null;
			state.markdownTextarea = "";
		},
		setInstructionType: (state, action) => {
			state.instructionType = action.payload;
		},
		setMarkdownTextarea: (state, action) => {
			state.markdownTextarea = action.payload;
		},
		setPdfFile: (state, action) => {
			state.pdfFile = action.payload;
		},
		setPdfUrl: (state, action) => {
			state.pdfUrl = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loadMyProblem.fulfilled, (state, { payload }) => {
			let correctedSourceCodeLanguage =
				ProgrammingLanguageMonacoOptionList.find(
					(option) =>
						option.defaultValue === payload.solution?.language
				)?.value;

			if (!correctedSourceCodeLanguage) {
				correctedSourceCodeLanguage = "python";
			}

			(state.id = payload.id),
				(state.title = payload.title),
				(state.instructionType = payload.instruction.type),
				(state.markdownTextarea =
					payload.instruction.markdownContent ?? ""),
				(state.pdfUrl = payload.instruction.pdfUrl ?? null),
				(state.plateTextarea = JSON.parse(
					payload.instruction.plateContent || "[]"
				)),
				(state.sourceCodeInput = payload.solution?.code ?? ""),
				(state.sourceCodeLanguage =
					correctedSourceCodeLanguage as ProgrammingLanguage),
				(state.runtimeOutputList = payload.testcases
					.filter((testcase) => !testcase.isDeprecated)
					.map((testcase) => ({
						isError: testcase.isError,
						isTimeout: testcase.isTimeLimitExceeded,
						isMemoryExceeded: testcase.isMemoryLimitExceeded,
						inputFilename: testcase.inputFilename,
						outputFilename: testcase.outputFilename,
						inputFileUrl: testcase.inputFileUrl,
						outputFileUrl: testcase.outputFileUrl,
						executionTimeMs: 0,
					})));
			state.isLoading = false;
			// state.testcaseInputList = payload.testcases.map((testcase) => testcase.inputFilename);
		});
		builder.addCase(loadMyProblem.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(loadMyProblem.rejected, (state) => {
			state.isLoading = false;
		});
		builder.addCase(createMyProblem.fulfilled, (state) => {
			state.isLoading = false;
		});
		builder.addCase(createMyProblem.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(createMyProblem.rejected, (state) => {
			state.isLoading = false;
		});
		builder.addCase(updateMyProblem.fulfilled, (state) => {
			state.isLoading = false;
			console.log("updateMyProblem.fulfilled");
		});
		builder.addCase(updateMyProblem.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(updateMyProblem.rejected, (state) => {
			state.isLoading = false;
		});
		builder.addCase(validateMyProblem.fulfilled, (state, action) => {
			state.isLoading = false;
			state.runtimeOutputList = action.payload.outputList;
		});
		builder.addCase(validateMyProblem.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(validateMyProblem.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export const {
	setId,
	setTitle,
	setPlateTextarea,
	setSourceCodeInput,
	setSourceCodeLanguage,
	setTestcaseInputList,
	setIsLoading,
	clearMyProblemState,
	setInstructionType,
	setMarkdownTextarea,
	setPdfFile,
	setPdfUrl,
} = myProblemSlice.actions;
