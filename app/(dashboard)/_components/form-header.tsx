import {
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import React from "react";

const FormHeader = () => {
	return (
		<SheetHeader className="w-full">
			<SheetTitle>Create new list</SheetTitle>
			<SheetDescription>
				Add a title and a maximum of 10 tasks. Click create when you&apos;re
				done.
			</SheetDescription>
		</SheetHeader>
	);
};

export default FormHeader;
