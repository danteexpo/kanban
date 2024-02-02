"use client";

import List from "./list";
import { ListType } from "@/types/types";
import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
} from "@hello-pangea/dnd";
import CreateList from "./create-list";
import { useEffect, useState } from "react";
import { useAction } from "@/hooks/use-action";
import { toast } from "@/components/ui/use-toast";
import { updateListOrder } from "@/actions/update-list-order";
import { updateTaskOrder } from "@/actions/update-task-order";

type ListsProps = {
	lists: ListType[];
};

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
}

const Lists = ({ lists: initialLists }: ListsProps) => {
	const [lists, setLists] = useState(initialLists);

	useEffect(() => {
		setLists(initialLists);
	}, [initialLists]);

	const { execute: updateListOrderExecute } = useAction(updateListOrder, {
		onError: (error) => {
			toast({ title: error });
		},
	});

	const { execute: updateTaskOrderExecute } = useAction(updateTaskOrder, {
		onError: (error) => {
			toast({ title: error });
		},
	});

	const handleDragDrop = (result: DropResult) => {
		const { destination, source, type } = result;

		if (!destination) {
			return;
		}

		// if dropped in the same position
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		// User moves a list
		if (type === "group") {
			const orderedLists = reorder(lists, source.index, destination.index).map(
				(item, index) => ({ ...item, order: index })
			);

			setLists(orderedLists);
			updateListOrderExecute({ lists: orderedLists });
		}
		// User moves a task
		else {
			let newOrderedLists = [...lists];
			// Source and destination list
			const sourceList = newOrderedLists.find(
				(list) => `droppable-list-${list.id}` === source.droppableId
			);
			const destList = newOrderedLists.find(
				(list) => `droppable-list-${list.id}` === destination.droppableId
			);
			if (!sourceList || !destList) {
				return;
			}
			// Check if tasks exists on the sourceList
			if (!sourceList.tasks) {
				sourceList.tasks = [];
			}
			// Check if tasks exists on the destList
			if (!destList.tasks) {
				destList.tasks = [];
			}
			// Moving the task in the same list
			if (source.droppableId === destination.droppableId) {
				const reorderedTasks = reorder(
					sourceList.tasks,
					source.index,
					destination.index
				);
				reorderedTasks.forEach((task, idx) => {
					task.order = idx;
				});
				sourceList.tasks = reorderedTasks;
				setLists(newOrderedLists);
				updateTaskOrderExecute({
					tasks: reorderedTasks,
				});
			}
			// User moves the task to another list
			else {
				// Remove task from the source list
				const [movedTask] = sourceList.tasks.splice(source.index, 1);
				// Assign the new listId to the moved task
				movedTask.listId = Number(destination.droppableId.split("-")[2]);
				// Add task to the destination list
				destList.tasks.splice(destination.index, 0, movedTask);
				sourceList.tasks.forEach((task, idx) => {
					task.order = idx;
				});
				// Update the order for each task in the destination list
				destList.tasks.forEach((task, idx) => {
					task.order = idx;
				});
				setLists(newOrderedLists);
				updateTaskOrderExecute({
					tasks: destList.tasks,
				});
			}
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
												<List list={list} />
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
								<CreateList listsLength={lists.length} />
							</>
						</main>
					</>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default Lists;
