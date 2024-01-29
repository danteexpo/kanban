"use client";

import { cn } from "@/lib/utils";

type FormErrorProps = {
	id: string;
	errors?: Record<string, string[] | undefined>;
	className?: string;
};

export const FormError = ({ id, errors, className }: FormErrorProps) => {
	if (!errors) {
		return null;
	}

	return (
		<div id={`${id}-error`} aria-live="polite" className={cn(className)}>
			{errors?.[id]?.map((error: string) => (
				<div
					key={error}
					className="flex items-center text-lg font-semibold p-2 border text-rose-500 border-rose-500 bg-rose-500/10 rounded-md"
				>
					{error}
				</div>
			))}
		</div>
	);
};
