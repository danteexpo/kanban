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
		const lastList = await prisma.list.findFirst({
			orderBy: {
				order: "desc",
			},
			select: {
				order: true,
			},
		});

		const newOrder = lastList ? lastList.order + 1 : 1;

		list = await prisma.list.create({
			data: {
				title,
				order: newOrder,
				tasks: {
					createMany: {
						data: tasks
							.filter((task) => task !== "")
							.map((task, index) => {
								return {
									name: task,
									order: index,
								};
							}),
					},
				},
				authorId: userId,
			},
		});
	} catch (error) {
		return {
			error: "Failed to create.",
		};
	}

	revalidatePath("/");
	return { data: list };
};

export const createList = createSafeAction(CreateList, handler);
