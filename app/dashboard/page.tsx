"use client";

import api, { List, Task } from "@/api/api";
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
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Dashboard() {
	const [lists, setLists] = useState<List[]>([]);
	const [input, setInput] = useState("");
	const [status, setStatus] = useState(false);

	useEffect(() => {
		api.lists().then((lists) => {
			setLists(lists);
			setStatus(true);
		});
	}, []);

	const handleCreateList = (title: string, tasks: Task[]) => {
		api
			.create({
				title: title,
				tasks: tasks,
			})
			.then((newLists) => setLists([...newLists]));
	};

	const handleDeleteList = (id: number) => {
		api.delete(id).then((newLists) => setLists([...newLists]));
	};

	const handleDeleteTask = (listId: number, taskId: number) => {
		let list = lists.find((list) => list.id === listId);

		if (!list) return;

		list = {
			...list,
			tasks: list.tasks.filter((task) => task.id !== taskId),
		};

		api.update(list).then((newLists) => setLists([...newLists]));
	};

	const handleAddTask = (listId: number) => {
		let list = lists.find((list) => list.id === listId);

		if (!list) return;

		list = {
			...list,
			tasks: [
				...list.tasks,
				{
					id: Math.max(...list.tasks.map((l) => l.id)) + 1,
					name: input,
				},
			],
		};

		api.update(list).then((newLists) => {
			setLists([...newLists]);
			setInput("");
		});
	};

	if (!status) return <p>Loading...</p>;

	return (
		<main className="flex gap-4 overflow-x-auto pb-4">
			{lists.map((list) => (
				<Card
					key={list.id}
					className="min-w-[240px] max-w-[240px] grid grid-rows-[68px_1fr_72px]"
				>
					<CardHeader className="max-w-[238px] relative pr-8 space-y-0">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<CardTitle className="text-3xl overflow-hidden text-ellipsis whitespace-nowrap">
										{list.title}
									</CardTitle>
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-xl">{list.title}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
						<Button
							className="absolute h-min text-2xl top-0 right-0 px-2 py-0 rounded-tl-none rounded-br-none"
							onClick={() => handleDeleteList(list.id)}
						>
							X
						</Button>
					</CardHeader>
					<CardContent className="flex flex-col gap-2 overflow-y-auto">
						{list.tasks.map((task) => (
							<Card key={task.id} className="max-w-[206px]">
								<CardContent className="relative p-2 pr-8">
									<p className="break-words">{task.name}</p>
									<Button
										className="absolute h-min text-base top-0 right-0 px-1.5 py-0 rounded-tl-none rounded-br-none"
										onClick={() => handleDeleteTask(list.id, task.id)}
									>
										X
									</Button>
								</CardContent>
							</Card>
						))}
					</CardContent>
					<CardFooter className="flex gap-2">
						<Input
							type="text"
							placeholder="New task..."
							value={input}
							onChange={(e) => setInput(e.target.value)}
							maxLength={192}
						/>
						<Button onClick={() => handleAddTask(list.id)}>Add</Button>
					</CardFooter>
				</Card>
			))}
			<CreateList onClick={handleCreateList} />
		</main>
	);
}
