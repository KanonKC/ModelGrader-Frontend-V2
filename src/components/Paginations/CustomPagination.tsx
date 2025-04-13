import React, { useMemo } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../shadcn/Button";
import { Pagination } from "../../types/Pagination.type";

const CustomPagination = ({
	pagination,
	onNextClick,
	onPreviousClick,
    disabled = false,
}: {
	pagination: Pagination;
	onNextClick: () => void;
	onPreviousClick: () => void;
    disabled?: boolean;
}) => {
	const { start, end, total } = pagination;

	const isFirstPage = useMemo(() => start === 0, [start]);
	const isLastPage = useMemo(() => end >= total, [end, total]);
	const currentPage = useMemo(() => Math.floor(start / 10) + 1, [start]);

	return (
		<div className="flex items-center justify-between gap-4 px-4 py-2">
			<div className="cursor-pointer">
				<Button
					disabled={isFirstPage || disabled}
					variant="outline"
					size="icon"
					onClick={onPreviousClick}
				>
					<ChevronLeft className="h-4 w-4" />
				</Button>
			</div>

			<div className="cursor-pointer text-base">
				<span>
					{currentPage} / {total}
				</span>
			</div>

			<div className="cursor-pointer">
				<Button
					disabled={isLastPage || disabled}
					variant="outline"
					size="icon"
					onClick={onNextClick}
				>
					<ChevronRight className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};

export default CustomPagination;
