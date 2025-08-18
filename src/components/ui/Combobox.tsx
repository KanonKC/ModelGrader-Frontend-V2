"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";
import { Button } from "./Button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "./Command";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

// const options = [
//   {
//     value: "next.js",
//     label: "Next.js",
//   },
//   {
//     value: "sveltekit",
//     label: "SvelteKit",
//   },
//   {
//     value: "nuxt.js",
//     label: "Nuxt.js",
//   },
//   {
//     value: "remix",
//     label: "Remix",
//   },
//   {
//     value: "astro",
//     label: "Astro",
//   },
// ]

export type ComboboxOption = {
	value: string;
	label: string;
};

export function Combobox({
	label,
	options = [],
	placeholder,
	emptyMessage,
	onSelect,
	// initialValue,
	value,
	setValue
}: {
	label?: string;
	options?: ComboboxOption[];
	placeholder?: string;
	emptyMessage?: string;
	// initialValue?: string;
	onSelect?: (value: string) => void;
  value: string;
  setValue: (value: string) => void;
}) {
	const [open, setOpen] = React.useState(false);
  
  React.useEffect(()=>{
    console.log("value", value)
  },[value])

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					{value
						? options.find((option) => option.value === value)
								?.label
						: label}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder={placeholder} />
					<CommandEmpty>{emptyMessage}</CommandEmpty>
					<CommandGroup>
						{options.map((option) => (
							<CommandItem
								key={option.value}
								value={option.value}
								onSelect={(currentValue) => {
									if (onSelect) {
										onSelect(currentValue);
									}
									// setValue(currentValue === value ? "" : currentValue)
									setValue(currentValue);
									setOpen(false);
								}}
							>
								<Check
									className={cn(
										"mr-2 h-4 w-4",
										value === option.value
											? "opacity-100"
											: "opacity-0"
									)}
								/>
								{option.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
