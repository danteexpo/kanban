import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../../../components/ui/button";
import { useEffect, useState } from "react";
import SheetForm from "./sheet-form";

type CreateListProps = {
	listsLength: number;
};

const CreateList = ({ listsLength }: CreateListProps) => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(false);
	}, [listsLength]);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					type="button"
					variant="outline"
					className="min-w-[240px] text-3xl font-semibold h-16"
					disabled={listsLength > 9}
				>
					Create new list...
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetForm />
			</SheetContent>
		</Sheet>
	);
};

export default CreateList;
