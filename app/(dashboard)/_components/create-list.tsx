"use client";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../../../components/ui/button";
import { useEffect, useState } from "react";
import { createList } from "@/actions/create-list";
import { useAction } from "@/hooks/use-action";
import FormContent from "../../../components/form/form-content";
import FormSubmit from "../../../components/form/form-submit";

type CreateListProps = {
	listsLength: number;
};

const CreateList = ({ listsLength }: CreateListProps) => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(false);
	}, [listsLength]);

	const { execute, fieldErrors } = useAction(createList, {
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const onSubmit = (formData: FormData) => {
		const title = formData.get("title") as string;
		execute({ title });
	};

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
				<form
					action={onSubmit}
					className="relative grid grid-rows-[128px_1fr_40px] xxs:grid-rows-[100px_1fr_40px] place-items-start w-full max-w-sm"
				>
					<SheetHeader className="w-full">
						<SheetTitle>Create new list</SheetTitle>
						<SheetDescription>
							Add a title and a maximum of 10 tasks. Click create when
							you&apos;re done.
						</SheetDescription>
					</SheetHeader>
					<FormContent errors={fieldErrors} />
					<SheetFooter className="w-full">
						<FormSubmit className="w-full">Create new list</FormSubmit>
					</SheetFooter>
				</form>
			</SheetContent>
		</Sheet>
	);
};

export default CreateList;
