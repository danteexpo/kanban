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
} from "react-beautiful-dnd";

export default function Dashboard() {
	const [lists, setLists] = useState<ListType[]>([]);
	const [initialLoad, setInitialLoad] = useState(false);

	useEffect(() => {
		api.lists().then((lists) => {
			setLists(lists);
			setInitialLoad(true);
		});
	}, []);

	const handleCreateList = (title: string, tasks: TaskType[]) => {
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

			api.updateAll(orderedLists).then((newLists) => {
				setLists(orderedLists);
			});
		}
	};

	return (
		<DragDropContext onDragEnd={handleDragDrop}>
			<Droppable droppableId="ROOT" type="group" direction="horizontal">
				{(provided) => (
					<>
						<main
							className="flex gap-4 overflow-x-auto pb-4"
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
											draggableId={`${list.id}`}
											index={index}
											key={list.id}
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
														handleDeleteTask={handleDeleteTask}
														handleAddTask={handleAddTask}
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
