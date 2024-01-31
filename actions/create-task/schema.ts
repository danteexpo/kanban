import { z } from "zod";

export const CreateTask = z.object({
	name: z
		.string({
			required_error: "Name is required.",
			invalid_type_error: "Name is required.",
		})
		.min(3, {
			message: "Name is too short.",
		}),
	listId: z.number(),
});
