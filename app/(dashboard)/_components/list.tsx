"use client";

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
import { DeleteList } from "@/actions/delete-list";
import FormSubmit from "@/components/form/form-submit";
import { FormError } from "@/components/form/form-error";
import { useAction } from "@/hooks/use-action";
import { toast } from "@/components/ui/use-toast";
import { createTask } from "@/actions/create-task";

type ListProps = {
	list: ListType;
};

const List = ({ list }: ListProps) => {
	const [title, setTitle] = useState(list.title);
	const [name, setName] = useState("");
	const { editListId, setEditListId } = useEditStore();

	const { execute, fieldErrors } = useAction(createTask, {
		onSuccess: (data) => {
			toast({ title: "New task successfully created!" });
			setName("");
		},
		onError: (error) => {
			toast({ title: error });
		},
	});

	const onSubmit = (formData: FormData) => {
		const name = formData.get("name") as string;
		execute({ name, listId: list.id });
	};

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
							list.tasks.length > 0 &&
								fieldErrors &&
								"grid-rows-[68px_1fr_110px]",
							list.tasks.length > 0 &&
								!fieldErrors &&
								"grid-rows-[68px_1fr_56px]",
							list.tasks.length < 1 && fieldErrors && "grid-rows-[68px_110px]",
							list.tasks.length < 1 && !fieldErrors && "grid-rows-[68px_56px]"
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
										maxLength={32}
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
						<CardFooter className="pt-0">
							<form
								action={onSubmit}
								className="grid grid-cols-[1fr_56px] gap-2 h-min"
							>
								<Input
									id="name"
									name="name"
									placeholder="Name..."
									value={name}
									onChange={(e) => setName(e.target.value)}
									maxLength={192}
									disabled={list.tasks.length > 9}
								/>
								<FormSubmit disabled={name === ""}>Add</FormSubmit>
								<FormError
									id="name"
									errors={fieldErrors}
									className="col-span-2"
								/>
							</form>
						</CardFooter>
					</Card>
				</div>
			)}
		</Droppable>
	);
};

export default List;
