"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

type FormButtonProps = {
	children: React.ReactNode;
	className?: string;
};

const FormSubmit = ({ children, className }: FormButtonProps) => {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" className={cn(className)} disabled={pending}>
			{children}
		</Button>
	);
};

export default FormSubmit;
