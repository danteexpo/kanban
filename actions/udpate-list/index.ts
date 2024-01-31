"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { UpdateList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId } = auth();

	if (!userId) {
		return {
			error: "Unauthorized",
		};
	}

	const { title, id } = data;

	let list;

	try {
		list = await prisma.list.update({
			where: {
				id,
			},
			data: {
				title,
			},
		});
	} catch (error) {
		return {
			error: "Failed to update.",
		};
	}

	revalidatePath("/");
	return { data: list };
};

export const updateList = createSafeAction(UpdateList, handler);
