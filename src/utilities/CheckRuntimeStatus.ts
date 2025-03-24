import { Testcase } from "../types/apis/Problem.api";

export function checkRuntimeStatus(testcases: Testcase[]):boolean {
	for (const testcase of testcases) {
		if (testcase.isError) {
			return false;
		}
	}
	return true;
}