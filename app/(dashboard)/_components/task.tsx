import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import ActionButton from "../../../components/action-button";
import useEditStore from "@/stores/useEditStore";
import { TaskType } from "@/types/types";
import { updateTask } from "@/actions/update-task";
import { useAction } from "@/hooks/use-action";
import { toast } from "@/components/ui/use-toast";

type TaskProps = {
	task: TaskType;
};

const Task = ({ task }: TaskProps) => {
	const [name, setName] = useState(task.name);
	const { editTaskId, setEditTaskId } = useEditStore();

	const { execute, fieldErrors } = useAction(updateTask, {
		onSuccess: () => {
			toast({ title: "Task successfully updated!" });
			setEditTaskId(null);
		},
		onError: (error) => {
			toast({ title: error });
		},
	});

	const onSubmit = (formData: FormData) => {
		const name = formData.get("name") as string;
		execute({ name, id: task.id });
	};

	useEffect(() => {
		if (fieldErrors?.name) {
			toast({ title: fieldErrors.name[0] });
		}
	}, [fieldErrors]);

	return (
		<Card className="max-w-[206px]">
			<CardContent className="group relative p-0">
				{editTaskId === task.id ? (
					<form action={onSubmit}>
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
				<ActionButton type="button" icon="delete" />
			</CardContent>
		</Card>
	);
};

export default Task;
