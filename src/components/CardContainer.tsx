import React from "react";
import { ScrollArea } from "./ui/ScrollArea";

const CardContainer = ({children,className=""}: {
    children: React.ReactNode
	className?: string
}) => {
	return (
		<ScrollArea className={"mt-6 h-[80vh] md:h-[75vh] pr-5 " + className}>
			<div className="grid gap-y-3">
                {children}
            </div>
		</ScrollArea>
				);
};

export default CardContainer;
