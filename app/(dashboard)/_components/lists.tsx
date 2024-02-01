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

type ListsProps = {
	lists: ListType[];
};

const Lists = ({ lists: initialLists }: ListsProps) => {
	const [lists, setLists] = useState(initialLists);

	useEffect(() => {
		setLists(lists);
	}, [lists]);

	const { execute: updateListOrderExecute } = useAction(updateListOrder, {
		onError: (error) => {
			toast({ title: error });
		},
	});

	const handleDragDrop = (result: DropResult) => {
		const { destination, source, type } = result;

		if (!destination) return;

		if (
			source.droppableId === destination.droppableId &&
			source.index === destination.index
		)
			return;

		if (type === "group") {
			let orderedLists = [...lists];

			const [removedList] = orderedLists.splice(source.index, 1);

			orderedLists.splice(destination.index, 0, removedList);

			orderedLists = orderedLists.map((item, index) => ({
				...item,
				order: index,
			}));

			setLists(orderedLists);
			updateListOrderExecute({ lists: orderedLists });
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

			let newLists = [...lists];

			newLists[listSourceIndex] = {
				...lists[listSourceIndex],
				tasks: newSourceTasks.map((task, index) => {
					return {
						...task,
						order: index,
					};
				}),
			};

			newLists[listDestinationIndex] = {
				...lists[listDestinationIndex],
				tasks: newDestinationTasks.map((task, index) => {
					return {
						...task,
						order: index,
					};
				}),
			};

			setLists(newLists);
			// Implement update-task-order
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
