import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import ActionButton from "../../../components/action-button";
import useEditStore from "@/stores/useEditStore";
import { TaskType } from "@/types/types";
import { updateTask } from "@/actions/update-task";
import { useAction } from "@/hooks/use-action";
import { toast } from "@/components/ui/use-toast";
import { deleteTask } from "@/actions/delete-task";

type TaskProps = {
	task: TaskType;
};

const Task = ({ task }: TaskProps) => {
	const [name, setName] = useState(task.name);
	const { editTaskId, setEditTaskId } = useEditStore();

	const { execute: updateTaskExecute, fieldErrors } = useAction(updateTask, {
		onSuccess: () => {
			toast({ title: "Task successfully updated!" });
			setEditTaskId(null);
		},
		onError: (error) => {
			toast({ title: error });
		},
	});

	const updateTaskSubmit = (formData: FormData) => {
		const name = formData.get("name") as string;
		updateTaskExecute({ name, id: task.id });
	};

	useEffect(() => {
		if (fieldErrors?.name) {
			toast({ title: fieldErrors.name[0] });
		}
	}, [fieldErrors]);

	const { execute: deleteTaskExecute } = useAction(deleteTask, {
		onSuccess: () => {
			toast({ title: "Task successfully deleted!" });
		},
		onError: (error) => {
			toast({ title: error });
		},
	});

	const deleteTaskSubmit = (formData: FormData) => {
		const id = formData.get("id") as string;
		deleteTaskExecute({ id: Number(id) });
	};

	return (
		<Card className="max-w-[206px]">
			<CardContent className="group relative p-0">
				{editTaskId === task.id ? (
					<form action={updateTaskSubmit}>
						<Input
							id="name"
							name="name"
							className="min-h-11 pr-16"
							value={name}
							onChange={(e) => setName(e.target.value)}
							autoFocus
							maxLength={192}
						/>
						<ActionButton type="submit" icon="confirm" />
					</form>
				) : (
					<>
						<p className="break-words p-2 pr-6">{task.name}</p>
						<ActionButton
							type="button"
							icon="edit"
							onClick={() => setEditTaskId(task.id)}
							changesOpacity
						/>
					</>
				)}
				<form action={deleteTaskSubmit}>
					<input hidden readOnly name="id" id="id" value={task.id} />
					<ActionButton type="submit" icon="delete" />
				</form>
			</CardContent>
		</Card>
	);
};

export default Task;
