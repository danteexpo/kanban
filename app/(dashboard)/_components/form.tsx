"use client";

import FormHeader from "./form-header";
import FormContent from "./form-content";
import { createList } from "@/actions/create-list";
import { useAction } from "@/hooks/use-action";

const Form = () => {
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
		<form action={onSubmit}>
			<FormHeader />
			<FormContent errors={fieldErrors} />
		</form>
	);
};

export default Form;
