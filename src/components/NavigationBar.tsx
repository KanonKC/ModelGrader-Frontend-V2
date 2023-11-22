import React from "react";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "../components/shadcn/NevigationMenu";
import { cn } from "../lib/utils";
import { ListItem } from "./shadcn/ListItem";
import { components } from "../constants/NavigationBarData";
import Register from './../views/Register';

const NavigationBar = () => {
	return (
		<NavigationMenu className="">

			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuLink
						className={navigationMenuTriggerStyle()}
					>
						Home
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>

			<NavigationMenuList className="">
				<NavigationMenuItem>
					<NavigationMenuTrigger>
						Getting started
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
							<li className="row-span-3">
								<NavigationMenuLink asChild>
									<a
										className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
										href="/"
									>
										{/* <Icons.logo className="h-6 w-6" /> */}
										<div className="mb-2 mt-4 text-lg font-medium">
											shadcn/ui
										</div>
										<p className="text-sm leading-tight text-muted-foreground">
											Beautifully designed components
											built with Radix UI and Tailwind
											CSS.
										</p>
									</a>
								</NavigationMenuLink>
							</li>
							<ListItem href="/docs" title="Introduction">
								Re-usable components built using Radix UI and
								Tailwind CSS.
							</ListItem>
							<ListItem
								href="/docs/installation"
								title="Installation"
							>
								How to install dependencies and structure your
								app.
							</ListItem>
							<ListItem
								href="/docs/primitives/typography"
								title="Typography"
							>
								Styles for headings, paragraphs, lists...etc
							</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Components</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
							{components.map((component) => (
								<ListItem
									key={component.title}
									title={component.title}
									href={component.href}
								>
									{component.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem >
					<NavigationMenuLink
						href="/login"
						className={navigationMenuTriggerStyle()}
					>
						Login
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem >
					<NavigationMenuLink
						href="/register"
						className={navigationMenuTriggerStyle()}
					>
						Register
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
};

export default NavigationBar;