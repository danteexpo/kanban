"use client";

import { createList } from "@/actions/createList";
import { useFormState } from "react-dom";
import FormHeader from "./form-header";
import FormContent from "./form-content";

const Form = () => {
	const initialState = { message: "", errors: {} };
	const [state, dispatch] = useFormState(createList, initialState);

	return (
		<form action={dispatch}>
			<FormHeader />
			<FormContent errors={state?.errors} />
		</form>
	);
};

export default Form;
