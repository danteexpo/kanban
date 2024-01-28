import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import Task from "./task";
import ActionButton from "../../../components/action-button";
import useEditStore from "@/stores/useEditStore";
import { cn } from "@/lib/utils";
import { ListType } from "@/types/types";
import { DeleteList } from "@/actions/deleteList";

type ListProps = {
	list: ListType;
};

const List = ({ list }: ListProps) => {
	const [title, setTitle] = useState(list.title);
	const [newTask, setNewTask] = useState("");
	const { editListId, setEditListId } = useEditStore();

	return (
		<Droppable droppableId={`droppable-list-${list.id}`}>
			{(provided) => (
				<div
					className="h-full"
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<Card
						className={cn(
							"min-w-[240px] max-w-[240px] grid h-min max-h-full",
							list.tasks.length > 0
								? "grid-rows-[68px_1fr_72px]"
								: "grid-rows-[68px_72px] "
						)}
					>
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
									<ActionButton
										type="confirm"
										// onClick={handleUpdate}
										onClick={() => console.log("handleUpdate")}
										isBig
									/>
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
								onClick={() => DeleteList(list.id)}
								isBig
							/>
						</CardHeader>
						{list.tasks.length > 0 && (
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
												<Task key={task.id} task={task} />
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</CardContent>
						)}
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
								onClick={() => console.log("handleCreate")}
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
