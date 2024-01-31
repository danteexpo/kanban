import { z } from "zod";

export const CreateList = z.object({
	title: z
		.string({
			required_error: "Title is required.",
			invalid_type_error: "Title is required.",
		})
		.min(3, {
			message: "Title is too short.",
		}),
	tasks: z.array(z.string()).max(10, {
		message: "Maximum of 10 tasks.",
	}),
});
