import React, { useContext } from "react";
import NavSidebar from "../components/NavigationBar/NavSidebar";
import { Separator } from "../components/ui/Seperator";
import { LoginContext } from "../contexts/LoginContext";
import NavbarMenuLayout from "./NavbarMenuLayout";

const NavbarSidebarLayout = ({ children }: { children: React.ReactNode }) => {
	const { isLogin } = useContext(LoginContext);

	return (
		<NavbarMenuLayout xPad={false} yPad={false}>
			{
				isLogin ? (
					<div className="flex">
				<NavSidebar />
				<div>
					<Separator orientation="vertical" className="" />
				</div>
				<div className="w-full pt-10">{children}</div>
			</div>
				) : (
					<p>No Access</p>
				)
			}
		</NavbarMenuLayout>
	);
};

export default NavbarSidebarLayout;
