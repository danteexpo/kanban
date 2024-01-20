import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TaskType } from "@/api/api";

type TaskProps = {
	task: TaskType;
	listId: number;
	handleDeleteTask: (listId: number, taskId: number) => void;
};

const Task = ({ task, listId, handleDeleteTask }: TaskProps) => {
	return (
		<Card className="max-w-[206px]">
			<CardContent className="relative p-2 pr-8">
				<Input className="break-words" defaultValue={task.name} />
				<Button
					className="absolute h-min text-base top-0 right-0 px-1.5 py-0 rounded-tl-none rounded-br-none"
					onClick={() => handleDeleteTask(listId, task.id)}
				>
					X
				</Button>
			</CardContent>
		</Card>
	);
};

export default Task;
