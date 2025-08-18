import React, { useContext } from "react";
import NavbarMenuLayout from "./NavbarMenuLayout";
import CourseNavSidebar from "../components/NavigationBar/CourseNavSidebar";
import { Separator } from "../components/ui/Seperator";
import { CourseNavSidebarContext } from "../contexts/CourseNavSidebarContexnt";

const CourseNavbarSidebarLayout = ({
	children,
}: {
	children?: React.ReactNode;
}) => {

	const {isOpen} = useContext(CourseNavSidebarContext)

	const widthAdjuster = () => {
		if (isOpen) {
			return ["w-1/6 ", "w-5/6 "];
		}

		else {
			return ["", "w-full "];
		}
	}

	return (
		<NavbarMenuLayout xPad={false} yPad={false}>
			<div className="flex">
				<div className={widthAdjuster()[0]}>
					<CourseNavSidebar />
				</div>
				<div>
					<Separator orientation="vertical" className="" />
				</div>
				<div className={"pt-10 " + widthAdjuster()[1]}>{children}</div>
			</div>
		</NavbarMenuLayout>
	);
};

export default CourseNavbarSidebarLayout;
