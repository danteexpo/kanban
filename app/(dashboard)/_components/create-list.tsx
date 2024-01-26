import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../../../components/ui/button";
import Form from "./form";
import { useEffect, useState } from "react";
// import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
// import { initialTask } from "@/lib/utils";
// import ActionButton from "../../../components/action-button";
// import { TaskType } from "@/types/types";

type CreateListProps = {
	// handleCreateList: (title: string, tasks: TaskType[]) => void;
	listsLength: number;
	// minimalId: number;
};

const CreateList = ({
	// handleCreateList,
	listsLength,
}: // minimalId,
CreateListProps) => {
	const [open, setOpen] = useState(false);
	useEffect(() => {
		setOpen(false);
	}, [listsLength]);
	// const [title, setTitle] = useState("");
	// const [tasks, setTasks] = useState<TaskType[]>([initialTask]);

	// const handleAdd = () => {
	// 	setTasks((tasks) => {
	// 		const newTask = {
	// 			id: Math.max(...tasks.map((t) => t.id)) + 1,
	// 			name: "",
	// 		};

	// 		return [...tasks, newTask];
	// 	});
	// };

	// const handleDelete = (id: number) => {
	// 	setTasks((tasks) => tasks.filter((task) => task.id !== id));
	// };

	// const handleTasks = (id: number, e: ChangeEvent<HTMLInputElement>) => {
	// 	setTasks((tasks) =>
	// 		tasks.map((task) => {
	// 			if (task.id === id) {
	// 				return {
	// 					...task,
	// 					name: e.target.value,
	// 				};
	// 			}
	// 			return task;
	// 		})
	// 	);
	// };

	// const handleCreate = () => {
	// 	const filteredTasks: TaskType[] = tasks.filter((task) => task.name !== "");
	// 	const orderedTasks: TaskType[] = filteredTasks.map((task, index) => {
	// 		return {
	// 			...task,
	// 			// id: minimalId + index,
	// 		};
	// 	});

	// 	// handleCreateList(title, orderedTasks);

	// 	setTitle("");
	// 	setTasks([initialTask]);
	// };

	// const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
	// 	if (e.key === "Enter") {
	// 		handleCreate();
	// 		setOpen(false);
	// 	}
	// };

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					type="button"
					variant="outline"
					className="min-w-[240px] text-3xl font-semibold h-16"
					disabled={listsLength > 9}
				>
					Create new list...
				</Button>
			</SheetTrigger>
			<SheetContent className="grid grid-rows-[128px_1fr_40px] xxs:grid-rows-[100px_1fr_40px] place-items-start w-full max-w-sm">
				<Form />
			</SheetContent>
		</Sheet>
	);
};

export default CreateList;
