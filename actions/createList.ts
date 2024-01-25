"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type State = {
	errors?: {
		title?: string[];
	};
	message?: string;
};

const CreateList = z.object({
	title: z.string().min(3, {
		message: "Minimum length of 3 letters is required for the title",
	}),
});

export async function create(prevState: State, formData: FormData) {
	const validatedFields = CreateList.safeParse({
		title: formData.get("title"),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Missing fields.",
		};
	}

	const { title } = validatedFields.data;

	try {
		await prisma.list.create({
			data: {
				title,
			},
		});
	} catch (error) {
		return {
			message: "Database error.",
		};
	}

	revalidatePath("/");
	redirect("/");
}
