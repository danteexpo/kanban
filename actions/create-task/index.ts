"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateTask } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId } = auth();

	if (!userId) {
		return {
			error: "Unauthorized",
		};
	}

	const { name, listId } = data;

	let task;

	try {
		const lastTask = await prisma.task.findFirst({
			where: { listId },
			orderBy: { order: "desc" },
			select: { order: true },
		});

		const newOrder = lastTask ? lastTask.order + 1 : 1;

		task = await prisma.task.create({
			data: {
				name,
				order: newOrder,
				listId,
			},
		});
	} catch (error) {
		return {
			error: "Failed to create.",
		};
	}

	revalidatePath("/");
	return { data: task };
};

export const createTask = createSafeAction(CreateTask, handler);
