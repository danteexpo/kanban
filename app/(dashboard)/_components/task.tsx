import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { KeyboardEvent, useState } from "react";
import ActionButton from "../../../components/action-button";
import useEditStore from "@/stores/useEditStore";
import { TaskType } from "@/types/types";

type TaskProps = {
	task: TaskType;
	listId: number;
	// handleDelete: (listId: number, taskId?: number) => void;
	// handleUpdateTask: (listId: number, taskId: number, taskName: string) => void;
};

const Task = ({
	task,
	listId,
}: // handleDelete,
// handleUpdateTask
TaskProps) => {
	const [name, setName] = useState(task.name);
	const { editTaskId, setEditTaskId } = useEditStore();

	// const handleUpdate = () => {
	// 	setEditTaskId(null);
	// 	handleUpdateTask(listId, task.id, name);
	// };

	// const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
	// 	if (e.key === "Enter") {
	// 		handleUpdate();
	// 	}
	// };

	return (
		<Card className="max-w-[206px]">
			<CardContent className="group relative p-0">
				{editTaskId === task.id ? (
					<>
						<Input
							className="min-h-11 pr-16"
							value={name}
							onChange={(e) => setName(e.target.value)}
							// onKeyDown={handleKeyDown}
							autoFocus
							maxLength={192}
						/>
						<ActionButton
							type="confirm"
							// onClick={handleUpdate}
							onClick={() => console.log("handleUpdate")}
						/>
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
					// onClick={() => handleDelete(listId, task.id)}
					onClick={() => console.log("handleDelete")}
				/>
			</CardContent>
		</Card>
	);
};

export default Task;
