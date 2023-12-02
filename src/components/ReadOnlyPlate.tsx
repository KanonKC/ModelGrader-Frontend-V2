"use client";

import React, { useEffect, useRef } from "react";
import { CommentsProvider } from "@udecode/plate-comments";
import { Plate } from "@udecode/plate-common";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { commentsUsers, myUserId } from "../lib/plate/comments";
import { MENTIONABLES } from "../lib/plate/mentionables";
import { plugins } from "../lib/plate/plate-plugins";
import { cn } from "../lib/utils";
import { CommentsPopover } from "./plate-ui/comments-popover";
import { CursorOverlay } from "./plate-ui/cursor-overlay";
import { Editor } from "./plate-ui/editor";
import { FixedToolbar } from "./plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "./plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "./plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "./plate-ui/floating-toolbar-buttons";
import { MentionCombobox } from "./plate-ui/mention-combobox";
import { DummyEditorValue } from "../constants/DummyEditorValue";
import {
	useMyPlateActions,
	useMyPlateSelectors,
} from "../lib/plate/plate-types";

export default function ReadOnlyPlate({
	className,
	value = null,
}: {
	className?: string;
	value?: any;
}) {
	const containerRef = useRef(null);

	const initialValue = [
		{
			id: "1",
			type: ELEMENT_PARAGRAPH,
			children: [{ text: "Hello, World! 12345" }],
		},
	];

	const lazyFormat = (description: string) => {
		return [
			{
				id: "1",
				type: ELEMENT_PARAGRAPH,
				children: [{ text: description }],
			},
		];
	};

	useEffect(() => {
		if (value) {
			// const editorRef = useMyPlateSelectors("view-problem-plate")
			// editorRef.value = () => value
		}
	}, [value]);

	return (
		<DndProvider backend={HTML5Backend}>
			<CommentsProvider users={commentsUsers} myUserId={myUserId}>
				{value && (
					<Plate
						id="view-problem-plate"
						plugins={plugins}
						initialValue={value}
					>
						<div
							ref={containerRef}
							className={cn(
								// Block selection
								"[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4"
							)}
						>
							<Editor
								className={
									"px-[96px] py-0 overflow-y-scroll " +
									className
								}
								autoFocus
								focusRing={false}
								variant="ghost"
								size="md"
								readOnly
							/>

							{/* <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar> */}

							<MentionCombobox items={MENTIONABLES} />

							<CommentsPopover />

							<CursorOverlay containerRef={containerRef} />
						</div>
					</Plate>
				)}
			</CommentsProvider>
		</DndProvider>
	);
}
