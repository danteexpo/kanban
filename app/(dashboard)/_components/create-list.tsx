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
import { useToast } from "@/components/ui/use-toast";

type CreateListProps = {
	listsLength: number;
};

const CreateList = ({ listsLength }: CreateListProps) => {
	const { toast } = useToast();
	const [open, setOpen] = useState(false);
	const [tasks, setTasks] = useState<string[]>([""]);

	useEffect(() => {
		setOpen(false);
		setTasks([""]);
	}, [listsLength]);

	const { execute, fieldErrors } = useAction(createList, {
		onSuccess: (data) => {
			toast({ title: `'${data.title}' successfully created!` });
		},
		onError: (error) => {
			toast({ title: error });
		},
	});

	const onSubmit = (formData: FormData) => {
		const title = formData.get("title") as string;
		execute({ title, tasks });
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
					className="relative grid grid-rows-[128px_1fr_40px] xxs:grid-rows-[100px_1fr_40px] place-items-start w-full h-full max-w-sm"
				>
					<SheetHeader className="w-full">
						<SheetTitle>Create new list</SheetTitle>
						<SheetDescription>
							Add a title and a maximum of 10 tasks. Click create when
							you&apos;re done.
						</SheetDescription>
					</SheetHeader>
					<FormContent tasks={tasks} setTasks={setTasks} errors={fieldErrors} />
					<SheetFooter className="w-full">
						<FormSubmit className="w-full">Create new list</FormSubmit>
					</SheetFooter>
				</form>
			</SheetContent>
		</Sheet>
	);
};

export default CreateList;
