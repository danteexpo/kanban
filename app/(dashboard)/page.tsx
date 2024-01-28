import { prisma } from "@/lib/prisma";
import Lists from "./_components/lists";

export default async function Page() {
	const lists = await prisma.list.findMany({
		include: { tasks: true },
	});

	return <Lists lists={lists} />;
}
