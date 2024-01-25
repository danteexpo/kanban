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
												<List
													list={list}
													// handleDelete={handleDelete}
													// handleUpdateList={handleUpdateList}
													// handleAddTask={handleAddTask}
													// handleUpdateTask={handleUpdateTask}
												/>
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
