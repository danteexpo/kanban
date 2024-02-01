"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { DeleteList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId } = auth();

	if (!userId) {
		return {
			error: "Unauthorized",
		};
	}

	const { id } = data;

	let list;

	try {
		list = await prisma.list.delete({
			where: {
				id,
			},
		});
	} catch (error) {
		return {
			error: "Failed to delete.",
		};
	}

	revalidatePath("/");
	return { data: list };
};

export const deleteList = createSafeAction(DeleteList, handler);
