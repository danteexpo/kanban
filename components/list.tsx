import { ListType } from "@/api/api";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import Task from "./task";
import Image from "next/image";
import ActionButton from "./action-button";

type ListProps = {
	list: ListType;
	handleDelete: (listId: number, taskId?: number) => void;
	handleUpdateList: (listId: number, title: string) => void;
	handleAddTask: (listId: number, input: string) => void;
	handleUpdateTask: (listId: number, taskId: number, taskName: string) => void;
	editListId: number | null;
	setEditListId: Dispatch<SetStateAction<number | null>>;
	editTaskId: number | null;
	setEditTaskId: Dispatch<SetStateAction<number | null>>;
};

const List = ({
	list,
	handleDelete,
	handleUpdateList,
	handleAddTask,
	handleUpdateTask,
	editListId,
	setEditListId,
	editTaskId,
	setEditTaskId,
}: ListProps) => {
	const [title, setTitle] = useState(list.title);
	const [newTask, setNewTask] = useState("");

	const onClick = () => {
		setEditListId(null);
		handleUpdateList(list.id, title);
	};

	return (
		<Droppable droppableId={`droppable-list-${list.id}`}>
			{(provided) => (
				<div
					className="h-full"
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<Card className="min-w-[240px] max-w-[240px] grid grid-rows-[68px_1fr_72px] h-min max-h-full">
						<CardHeader className="group max-w-[240px] relative space-y-0">
							{editListId === list.id ? (
								<>
									<Input
										className="min-h-11 pr-16 w-full"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										autoFocus
										maxLength={64}
									/>
									<ActionButton type="confirm" onClick={onClick} isBig />
								</>
							) : (
								<>
									<CardTitle className="text-3xl overflow-hidden text-ellipsis whitespace-nowrap">
										{list.title}
									</CardTitle>
									<ActionButton
										type="edit"
										onClick={() => setEditListId(list.id)}
										isBig
										changesOpacity
									/>
								</>
							)}
							<ActionButton
								type="delete"
								onClick={() => handleDelete(list.id)}
								isBig
							/>
						</CardHeader>
						<CardContent className="flex flex-col gap-2 overflow-y-auto">
							{list.tasks.map((task, index) => (
								<Draggable
									draggableId={`draggable-task-${task.id}`}
									index={index}
									key={`draggable-task-${task.id}`}
								>
									{(provided) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<Task
												key={task.id}
												task={task}
												listId={list.id}
												handleDelete={handleDelete}
												handleUpdateTask={handleUpdateTask}
												editTaskId={editTaskId}
												setEditTaskId={setEditTaskId}
											/>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</CardContent>
						<CardFooter className="flex gap-2">
							<Input
								type="text"
								placeholder="New task..."
								value={newTask}
								onChange={(e) => setNewTask(e.target.value)}
								maxLength={192}
								disabled={list.tasks.length > 9}
							/>
							<Button
								onClick={() => {
									handleAddTask(list.id, newTask);
									setNewTask("");
								}}
								disabled={newTask === ""}
							>
								Add
							</Button>
						</CardFooter>
					</Card>
				</div>
			)}
		</Droppable>
	);
};

export default List;
