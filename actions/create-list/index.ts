"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId } = auth();

	if (!userId) {
		return {
			error: "Unauthorized",
		};
	}

	const { title, tasks } = data;

	let list;

	try {
		list = await prisma.list.create({
			data: {
				title,
				tasks: {
					createMany: {
						data: tasks
							.filter((task) => task !== "")
							.map((task) => {
								return {
									name: task,
								};
							}),
					},
				},
			},
		});
	} catch (error) {
		return {
			error: "Failed to create.",
		};
	}

	revalidatePath("");
	return { data: list };
};

export const createList = createSafeAction(CreateList, handler);
