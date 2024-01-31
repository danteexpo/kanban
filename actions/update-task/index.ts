"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { UpdateTask } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId } = auth();

	if (!userId) {
		return {
			error: "Unauthorized",
		};
	}

	const { name, id } = data;

	let task;

	try {
		task = await prisma.task.update({
			where: {
				id,
			},
			data: {
				name,
			},
		});
	} catch (error) {
		return {
			error: "Failed to update.",
		};
	}

	revalidatePath("/");
	return { data: task };
};

export const updateTask = createSafeAction(UpdateTask, handler);
