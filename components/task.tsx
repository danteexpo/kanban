import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TaskType } from "@/api/api";
import { useState } from "react";
import ActionButton from "./action-button";
import useEditStore from "@/stores/useEditStore";

type TaskProps = {
	task: TaskType;
	listId: number;
	handleDelete: (listId: number, taskId?: number) => void;
	handleUpdateTask: (listId: number, taskId: number, taskName: string) => void;
};

const Task = ({ task, listId, handleDelete, handleUpdateTask }: TaskProps) => {
	const [name, setName] = useState(task.name);
	const { editTaskId, setEditTaskId } = useEditStore();
	console.log(editTaskId);

	const onClick = () => {
		setEditTaskId(null);
		handleUpdateTask(listId, task.id, name);
	};

	return (
		<Card className="max-w-[206px]">
			<CardContent className="group relative p-0">
				{editTaskId === task.id ? (
					<>
						<Input
							className="min-h-11 pr-16"
							value={name}
							onChange={(e) => setName(e.target.value)}
							autoFocus
							maxLength={192}
						/>
						<ActionButton type="confirm" onClick={onClick} />
					</>
				) : (
					<>
						<p className="break-words p-2 pr-6">{task.name}</p>
						<ActionButton
							type="edit"
							onClick={() => setEditTaskId(task.id)}
							changesOpacity
						/>
					</>
				)}
				<ActionButton
					type="delete"
					onClick={() => handleDelete(listId, task.id)}
				/>
			</CardContent>
		</Card>
	);
};

export default Task;
