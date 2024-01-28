import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../../../components/ui/button";
import Form from "./form";
import { useEffect, useState } from "react";

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
			<SheetContent className="grid grid-rows-[128px_1fr_40px] xxs:grid-rows-[100px_1fr_40px] place-items-start w-full max-w-sm">
				<Form />
			</SheetContent>
		</Sheet>
	);
};

export default CreateList;
