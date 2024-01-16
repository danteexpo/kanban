import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const lists = [
	{
		id: 0,
		title: "To Do",
		tasks: [
			{ id: 0, name: "Buy groceries" },
			{ id: 1, name: "Clean room" },
			{ id: 2, name: "Fix keyboard" },
		],
	},
	{
		id: 1,
		title: "Waiting",
		tasks: [
			{ id: 0, name: "Buy groceries" },
			{ id: 1, name: "Clean room" },
			{ id: 2, name: "Fix keyboard" },
		],
	},
];

export default function Dashboard() {
	return (
		<main className="flex gap-4 overflow-x-auto">
			{lists.map((list) => (
				<Card
					key={list.id}
					className="min-w-[240px] grid grid-rows-[68px_1fr_72px]"
				>
					<CardHeader>
						<CardTitle className="text-3xl">{list.title}</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col gap-2">
						{list.tasks.map((task) => (
							<Card key={task.id}>
								<CardContent className="p-2 flex items-center justify-between">
									<p>{task.name}</p>
									<Button>Del</Button>
								</CardContent>
							</Card>
						))}
					</CardContent>
					<CardFooter className="flex gap-2">
						<Input type="text" placeholder="New task..." />
						<Button>Add</Button>
					</CardFooter>
				</Card>
			))}
			<Button
				variant="outline"
				className="min-w-[240px] text-3xl font-semibold h-16"
			>
				Create new list...
			</Button>
		</main>
	);
}
