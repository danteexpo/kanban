"use client";

import { ListType } from "@/types/types";
import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
} from "@hello-pangea/dnd";

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
												<div className="border border-white p-4">
													<h4>{list.title}</h4>
													{/* {list.tasks.length > 0 &&
														list.tasks.map((task) => (
															<p key={task.id}>{task.name}</p>
														))} */}
												</div>
												{/* <List
														list={list}
														handleDelete={handleDelete}
														handleUpdateList={handleUpdateList}
														handleAddTask={handleAddTask}
														handleUpdateTask={handleUpdateTask}
													/> */}
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
								{/* {minimalId !== null && (
										<CreateList
											handleCreateList={handleCreateList}
											listsLength={lists.length}
											minimalId={minimalId}
										/>
									)} */}
							</>
						</main>
					</>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default Lists;
