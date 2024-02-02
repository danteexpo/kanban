import { z } from "zod";

export const CreateTask = z.object({
	name: z
		.string({
			required_error: "Name is required.",
			invalid_type_error: "Name is required.",
		})
		.min(1, {
			message: "Name is too short.",
		})
		.max(192, {
			message: "Name is too large.",
		}),
	listId: z.number(),
});
