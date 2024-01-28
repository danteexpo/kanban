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

type ListsProps = {
	lists: ListType[];
};

const Lists = ({ lists }: ListsProps) => {
	// const handleDragDrop = (result: DropResult) => {
	// 	const { source, destination, type } = result;

	// 	if (!destination) return;

	// 	if (
	// 		source.droppableId === destination.droppableId &&
	// 		source.index === destination.index
	// 	)
	// 		return;

	// 	if (type === "group") {
	// 		const orderedLists = [...lists];

	// 		const [removedList] = orderedLists.splice(source.index, 1);

	// 		orderedLists.splice(destination.index, 0, removedList);

	// 		api
	// 			.updateAll(orderedLists)
	// 			.then((updatedLists) => setLists([...updatedLists]));
	// 	} else {
	// 		const listSourceIndex = lists.findIndex(
	// 			(list) => `droppable-list-${list.id}` === source.droppableId
	// 		);

	// 		const listDestinationIndex = lists.findIndex(
	// 			(list) => `droppable-list-${list.id}` === destination.droppableId
	// 		);

	// 		const newSourceTasks = [...lists[listSourceIndex].tasks];

	// 		const newDestinationTasks =
	// 			source.droppableId !== destination.droppableId
	// 				? [...lists[listDestinationIndex].tasks]
	// 				: newSourceTasks;

	// 		const [deletedTask] = newSourceTasks.splice(source.index, 1);

	// 		newDestinationTasks.splice(destination.index, 0, deletedTask);

	// 		const newLists = [...lists];

	// 		newLists[listSourceIndex] = {
	// 			...lists[listSourceIndex],
	// 			tasks: newSourceTasks,
	// 		};

	// 		newLists[listDestinationIndex] = {
	// 			...lists[listDestinationIndex],
	// 			tasks: newDestinationTasks,
	// 		};

	// 		api
	// 			.updateAll(newLists)
	// 			.then((updatedLists) => setLists([...updatedLists]));
	// 	}
	// };

	return (
		<DragDropContext onDragEnd={(result: DropResult) => console.log(result)}>
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
