"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateListOrder } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId } = auth();

	if (!userId) {
		return {
			error: "Unauthorized",
		};
	}

	const { lists } = data;

	let newLists;

	try {
		const transaction = lists.map((list) =>
			prisma.list.update({
				where: {
					id: list.id,
				},
				data: {
					order: list.order,
				},
			})
		);

		newLists = await prisma.$transaction(transaction);
	} catch (error) {
		return {
			error: "Failed to reorder.",
		};
	}

	revalidatePath("/");
	return { data: newLists };
};

export const updateListOrder = createSafeAction(UpdateListOrder, handler);
