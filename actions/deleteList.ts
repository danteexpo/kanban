"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function DeleteList(id: number) {
	await prisma.list.delete({
		where: {
			id,
		},
	});

	revalidatePath("/");
}
