"use client";

import api, { Task } from "@/api/api";
import CreateList from "@/components/create-list";
import List from "@/components/list";
import SkeletonList from "@/components/skeleton-list";
import { useEffect, useState } from "react";

export default function Dashboard() {
	const [lists, setLists] = useState<List[]>([]);
	const [initialLoad, setInitialLoad] = useState(false);

	useEffect(() => {
		api.lists().then((lists) => {
			setLists(lists);
			setInitialLoad(true);
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

	const handleDeleteList = (listId: number) => {
		api.delete(listId).then((newLists) => setLists([...newLists]));
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

	const handleAddTask = (listId: number, input: string) => {
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
		});
	};

	return (
		<main className="flex gap-4 overflow-x-auto pb-4">
			{!initialLoad ? (
				<>
					<SkeletonList tasks={8} />
					<SkeletonList tasks={6} />
					<SkeletonList tasks={4} />
				</>
			) : (
				<>
					{lists.map((list) => (
						<List
							key={list.id}
							list={list}
							handleDeleteList={handleDeleteList}
							handleDeleteTask={handleDeleteTask}
							handleAddTask={handleAddTask}
						/>
					))}
					<CreateList
						handleCreateList={handleCreateList}
						listsLength={lists.length}
					/>
				</>
			)}
		</main>
	);
}
