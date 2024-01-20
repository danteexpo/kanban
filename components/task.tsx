import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TaskType } from "@/api/api";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";

type TaskProps = {
	task: TaskType;
	listId: number;
	handleDeleteTask: (listId: number, taskId: number) => void;
	handleUpdateTask: (listId: number, taskId: number, taskName: string) => void;
	editTaskId: number | null;
	setEditTaskId: Dispatch<SetStateAction<number | null>>;
};

const Task = ({
	task,
	listId,
	handleDeleteTask,
	handleUpdateTask,
	editTaskId,
	setEditTaskId,
}: TaskProps) => {
	const [input, setInput] = useState(task.name);

	const onClick = () => {
		setEditTaskId(null);
		handleUpdateTask(listId, task.id, input);
	};

	return (
		<Card className="group max-w-[206px]">
			<CardContent className="relative p-0">
				{editTaskId === task.id ? (
					<>
						<Input
							className="min-h-11 pr-16"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							autoFocus
							maxLength={192}
						/>
						<Button
							className="absolute h-min text-base top-0 right-7 rounded-t-none p-1"
							onClick={onClick}
						>
							<Image
								src="/static/check.svg"
								alt="confirm task"
								width={16}
								height={16}
								className="invert dark:invert-0"
							/>
						</Button>
					</>
				) : (
					<>
						<p className="break-words p-2 pr-6">{task.name}</p>
						<Button
							className="absolute h-min text-base top-0 right-7 rounded-t-none p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
							onClick={() => setEditTaskId(task.id)}
						>
							<Image
								src="/static/pencil.svg"
								alt="edit task"
								width={16}
								height={16}
								className="invert dark:invert-0"
							/>
						</Button>
					</>
				)}
				<Button
					className="absolute h-min text-base top-0 right-0 p-1 rounded-tl-none rounded-br-none"
					onClick={() => handleDeleteTask(listId, task.id)}
				>
					<Image
						src="/static/trash.svg"
						alt="delete task"
						width={16}
						height={16}
						className="invert dark:invert-0"
					/>
				</Button>
			</CardContent>
		</Card>
	);
};

export default Task;
