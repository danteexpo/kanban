type FormErrorProps = {
	errors?: {
		title?: string[];
	};
};

const FormError = ({ errors }: FormErrorProps) => {
	if (errors?.title) {
		return errors.title.map((error: string) => (
			<p
				key={error}
				className="absolute top-full left-0 text-lg font-semibold text-red-600"
			>
				Error: {error}
			</p>
		));
	}
};

export default FormError;
