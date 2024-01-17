"use client";

import api, { List } from "@/api/api";
import CreateList from "@/components/create-list";
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
	const [sheet, setSheet] = useState(false);

	useEffect(() => {
		api.lists().then((lists) => {
			setLists(lists);
			setStatus(true);
		});
	}, []);

	const handleCreate = () => {
		return;
		api
			.create({
				title: "New one",
				tasks: [
					{
						id: 1,
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
					<CardHeader className="flex-row items-center justify-between">
						<CardTitle className="text-3xl">{list.title}</CardTitle>
						<Button variant="destructive">Del</Button>
					</CardHeader>
					<CardContent className="flex flex-col gap-2">
						{list.tasks.map((task) => (
							<Card key={task.id}>
								<CardContent className="p-2 flex items-center justify-between">
									<p>{task.name}</p>
									<Button variant="destructive">Del</Button>
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
			<CreateList onClick={handleCreate} />
		</main>
	);
}
