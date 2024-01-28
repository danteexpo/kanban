"use client";

import FormContent from "./form-content";
import { createList } from "@/actions/create-list";
import { useAction } from "@/hooks/use-action";
import FormError from "./form-error";
import {
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import FormSubmit from "./form-submit";

const SheetForm = () => {
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
		<form
			action={onSubmit}
			className="relative grid grid-rows-[128px_1fr_40px] xxs:grid-rows-[100px_1fr_40px] place-items-start w-full max-w-sm"
		>
			<SheetHeader className="w-full">
				<SheetTitle>Create new list</SheetTitle>
				<SheetDescription>
					Add a title and a maximum of 10 tasks. Click create when you&apos;re
					done.
				</SheetDescription>
			</SheetHeader>
			<FormContent />
			<SheetFooter className="w-full">
				<FormSubmit label="Create new list" />
				<FormError errors={fieldErrors} />
			</SheetFooter>
		</form>
	);
};

export default SheetForm;
