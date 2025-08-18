import React from "react";
import { ScrollArea } from "../ui/ScrollArea";

const PermissionSwitchScrollArea = ({
	children,
	className = "",
	childrenClassName = "",
}: {
	children: React.ReactNode;
	className?: string;
	childrenClassName?: string;
}) => {
	return (
		<ScrollArea className={" " + className}>
			<div className={" " + childrenClassName}>{children}</div>
		</ScrollArea>
	);
};

export default PermissionSwitchScrollArea;
