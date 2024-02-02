import { z } from "zod";

export const UpdateTaskOrder = z.object({
	tasks: z.array(
		z.object({
			id: z.number(),
			name: z.string(),
			order: z.number(),
			listId: z.number(),
		})
	),
});
