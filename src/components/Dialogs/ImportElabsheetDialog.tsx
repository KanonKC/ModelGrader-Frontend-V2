import { ChangeEvent, useState } from "react";
import { DialogContent } from "../plate-ui/dialog";
import { Button } from "../shadcn/Button";
import {
	Dialog,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../shadcn/Dialog";
import { Input } from "../shadcn/Input";

const ImportElabsheetDialog = ({ children }: { children: React.ReactNode }) => {
	
    const [files, setFiles] = useState<FileList | null>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFiles(e.target.files);
    }
    
    const importElabsheetProblem = () => {

        if (!files) {
            return;
        }

        const file = files[0];
        
        // Read file content
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result;
            console.log("Content", content);
        };

        reader.readAsText(file);
    };

	return (
		<Dialog>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Import from Elabsheet</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					<Input onChange={handleInputChange} type="file" multiple />
				</DialogDescription>
				<DialogFooter>
					<Button disabled={!files} onClick={importElabsheetProblem}>Import</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ImportElabsheetDialog;
