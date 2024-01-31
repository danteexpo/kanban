import { z } from "zod";

export const UpdateTask = z.object({
	name: z
		.string({
			required_error: "Title is required.",
			invalid_type_error: "Title is required.",
		})
		.min(1, {
			message: "Name is too short.",
		}),
	id: z.number(),
});
