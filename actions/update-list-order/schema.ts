import { z } from "zod";

export const UpdateListOrder = z.object({
	lists: z.array(
		z.object({
			id: z.number(),
			title: z.string(),
			order: z.number(),
		})
	),
});
