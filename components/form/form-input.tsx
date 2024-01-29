"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormError } from "./form-error";

type FormInputProps = {
	id: string;
	label?: string;
	type?: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	errors?: Record<string, string[] | undefined>;
	labelClassName?: string;
	inputClassName?: string;
	errorClassName?: string;
	maxLength?: number;
	defaultValue?: string;
	onBlur?: () => void;
};

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
	(
		{
			id,
			label,
			type,
			placeholder,
			required,
			disabled,
			errors,
			labelClassName,
			inputClassName,
			errorClassName,
			maxLength,
			defaultValue = "",
			onBlur,
		},
		ref
	) => {
		const { pending } = useFormStatus();

		return (
			<div className="grid grid-cols-4 items-center gap-2">
				<div className="grid grid-cols-4 items-center gap-4 col-span-4">
					{label ? (
						<Label htmlFor={id} className={cn(labelClassName)}>
							{label}
						</Label>
					) : null}
					<Input
						onBlur={onBlur}
						defaultValue={defaultValue}
						ref={ref}
						required={required}
						name={id}
						id={id}
						placeholder={placeholder}
						type={type}
						disabled={pending || disabled}
						className={cn("min-h-11", inputClassName)}
						maxLength={maxLength}
						aria-describedby={`${id}-error`}
					/>
				</div>
				<FormError id={id} errors={errors} className={cn(errorClassName)} />
			</div>
		);
	}
);

FormInput.displayName = "FormInput";
