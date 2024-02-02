import { z } from "zod";

export const UpdateList = z.object({
	title: z
		.string({
			required_error: "Title is required.",
			invalid_type_error: "Title is required.",
		})
		.min(3, {
			message: "Title is too short.",
		})
		.max(32, {
			message: "Title is too large.",
		}),
	id: z.number(),
});
