"use client";

import api, { List } from "@/api/api";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function Dashboard() {
	const [lists, setLists] = useState<List[]>([]);
	const [status, setStatus] = useState(false);

	useEffect(() => {
		api.lists().then((lists) => {
			setLists(lists);
			setStatus(true);
		});
	}, []);

	const handleCreate = () => {
		api
			.create({
				title: "New one",
				tasks: [
					{
						id: 0,
						name: "New one 1",
					},
				],
			})
			.then((newLists) => setLists([...newLists]));
	};

	if (!status) return <p>Loading...</p>;

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
				onClick={handleCreate}
			>
				Create new list...
			</Button>
		</main>
	);
}
