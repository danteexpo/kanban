"use client";

import { create } from "@/actions/createList";
import { useFormState } from "react-dom";

type FormProps = {
	children: React.ReactNode;
};

const Form = ({ children }: FormProps) => {
	const initialState = { message: "", errors: {} };
	const [state, dispatch] = useFormState(create, initialState);

	return (
		<form action={dispatch}>
			{children}
			{state?.errors?.title &&
				state.errors.title.map((error: string) => (
					<p key={error} className="font-semibold text-[hsl(0,62.8%,30.6%)]">
						{error}
					</p>
				))}
		</form>
	);
};

export default Form;
