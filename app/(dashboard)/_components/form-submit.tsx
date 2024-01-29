"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

type FormButtonProps = {
	label: string;
};

const FormSubmit = ({ label }: FormButtonProps) => {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" className="w-full" disabled={pending}>
			{label}
		</Button>
	);
};

export default FormSubmit;
