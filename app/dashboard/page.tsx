"use client";

import api, { ListType, TaskType } from "@/api/api";
import CreateList from "@/components/create-list";
import List from "@/components/list";
import SkeletonList from "@/components/skeleton-list";
import { useEffect, useState } from "react";
import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
} from "@hello-pangea/dnd";

export default function Dashboard() {
	const [lists, setLists] = useState<ListType[]>([]);
	const [initialLoad, setInitialLoad] = useState(false);
	const [editListId, setEditListId] = useState<number | null>(null);
	const [editTaskId, setEditTaskId] = useState<number | null>(null);

	useEffect(() => {
		api.lists().then((lists) => {
			setLists(lists);
			setInitialLoad(true);
		});
	}, []);

	const handleDeleteList = (listId: number) => {
		api.delete(listId).then((newLists) => setLists([...newLists]));
	};

	const handleCreateList = (title: string, tasks: TaskType[]) => {
		api
			.create({
				title: title,
				tasks: tasks,
			})
			.then((newLists) => setLists([...newLists]));
	};

	const handleUpdateList = (listId: number, title: string) => {
		let list = lists.find((list) => list.id === listId);

		if (!list) return;

		list = {
			...list,
			title: title,
		};

		api.update(list).then((newLists) => setLists([...newLists]));
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

	const handleUpdateTask = (
		listId: number,
		taskId: number,
		taskName: string
	) => {
		let list = lists.find((list) => list.id === listId);

		if (!list) return;

		list = {
			...list,
			tasks: list.tasks.map((task) => {
				if (task.id === taskId) {
					return {
						...task,
						name: taskName,
					};
				}
				return task;
			}),
		};

		api.update(list).then((newLists) => setLists([...newLists]));
	};

	const handleDragDrop = (result: DropResult) => {
		const { source, destination, type } = result;

		if (!destination) return;

		if (
			source.droppableId === destination.droppableId &&
			source.index === destination.index
		)
			return;

		if (type === "group") {
			const orderedLists = [...lists];

			const [removedList] = orderedLists.splice(source.index, 1);

			orderedLists.splice(destination.index, 0, removedList);

			setLists(orderedLists);
		} else {
			const listSourceIndex = lists.findIndex(
				(list) => `droppable-list-${list.id}` === source.droppableId
			);

			const listDestinationIndex = lists.findIndex(
				(list) => `droppable-list-${list.id}` === destination.droppableId
			);

			const newSourceTasks = [...lists[listSourceIndex].tasks];

			const newDestinationTasks =
				source.droppableId !== destination.droppableId
					? [...lists[listDestinationIndex].tasks]
					: newSourceTasks;

			const [deletedTask] = newSourceTasks.splice(source.index, 1);

			newDestinationTasks.splice(destination.index, 0, deletedTask);

			const newLists = [...lists];

			newLists[listSourceIndex] = {
				...lists[listSourceIndex],
				tasks: newSourceTasks,
			};

			newLists[listDestinationIndex] = {
				...lists[listDestinationIndex],
				tasks: newDestinationTasks,
			};

			setLists(newLists);
		}
	};

	return (
		<DragDropContext onDragEnd={handleDragDrop}>
			<Droppable
				droppableId="droppable-lists"
				type="group"
				direction="horizontal"
			>
				{(provided) => (
					<>
						<main
							className="flex gap-4 overflow-x-auto pt-1 px-1 pb-4"
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							{!initialLoad ? (
								<>
									<SkeletonList tasks={8} />
									<SkeletonList tasks={6} />
									<SkeletonList tasks={4} />
								</>
							) : (
								<>
									{lists.map((list, index) => (
										<Draggable
											draggableId={`draggable-list-${list.id}`}
											index={index}
											key={`draggable-list-${list.id}`}
										>
											{(provided) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													<List
														list={list}
														handleDeleteList={handleDeleteList}
														handleUpdateList={handleUpdateList}
														handleDeleteTask={handleDeleteTask}
														handleAddTask={handleAddTask}
														handleUpdateTask={handleUpdateTask}
														editListId={editListId}
														setEditListId={setEditListId}
														editTaskId={editTaskId}
														setEditTaskId={setEditTaskId}
													/>
												</div>
											)}
										</Draggable>
									))}
									{provided.placeholder}
									<CreateList
										handleCreateList={handleCreateList}
										listsLength={lists.length}
									/>
								</>
							)}
						</main>
					</>
				)}
			</Droppable>
		</DragDropContext>
	);
}
