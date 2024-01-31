import { prisma } from "@/lib/prisma";
import Lists from "./_components/lists";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Page() {
	const { userId } = auth();

	if (!userId) {
		redirect("/sign-in");
	}

	const lists = await prisma.list.findMany({
		where: {
			authorId: userId,
		},
		include: {
			tasks: {
				orderBy: {
					order: "asc",
				},
			},
		},
		orderBy: {
			order: "asc",
		},
	});

	return <Lists lists={lists} />;
}
