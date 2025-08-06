import { TestcaseStatusIndicatorColor } from '../constants/TestcaseStatusIndicatorColor';
// Simple type for testcase results
export type TestcaseResult = {
	runtime_status: string;
	is_passed: boolean;
};

const TestcaseGradingMiniResult = ({
	status,
}: {
	status: TestcaseGradingResultStatus;
}) => {
	return (
		<div
			className={
				"px-1 py-2 cursor-pointer " +
				"bg-" +
				TestcaseStatusIndicatorColor[status]
			}
		></div>
	);
};

const TestcasesGradingMiniIndicator = ({
	submissionTestcases,
}: {
	submissionTestcases?: TestcaseResult[];
}) => {
	return (
		<div className="flex gap-0.5 items-center">
			{submissionTestcases?.map((testcase, index) => (
				<TestcaseGradingMiniResult
					key={index}
					status={
						testcase.runtime_status as TestcaseGradingResultStatus
					}
				/>
			))}
		</div>
	);
};


export default TestcasesGradingMiniIndicator