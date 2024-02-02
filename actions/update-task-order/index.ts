"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateTaskOrder } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId } = auth();

	if (!userId) {
		return {
			error: "Unauthorized",
		};
	}

	const { tasks } = data;

	let newTasks;

	try {
		const transaction = tasks.map((task) =>
			prisma.task.update({
				where: {
					id: task.id,
				},
				data: {
					order: task.order,
					listId: task.listId,
				},
			})
		);

		newTasks = await prisma.$transaction(transaction);
	} catch (error) {
		return {
			error: "Failed to reorder.",
		};
	}

	revalidatePath("/");
	return { data: newTasks };
};

export const updateTaskOrder = createSafeAction(UpdateTaskOrder, handler);
