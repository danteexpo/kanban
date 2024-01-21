import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChangeEvent, useState } from "react";
import { TaskType } from "@/api/api";
import { initialTask } from "@/lib/utils";
import Image from "next/image";

type CreateListProps = {
	handleCreateList: (title: string, tasks: TaskType[]) => void;
	listsLength: number;
	minimalId: number;
};

const CreateList = ({
	handleCreateList,
	listsLength,
	minimalId,
}: CreateListProps) => {
	const [title, setTitle] = useState("");
	const [tasks, setTasks] = useState<TaskType[]>([initialTask]);

	const handleAdd = () => {
		setTasks((tasks) => {
			const newTask = {
				id: Math.max(...tasks.map((t) => t.id)) + 1,
				name: "",
			};

			return [...tasks, newTask];
		});
	};

	const handleDelete = (id: number) => {
		setTasks((tasks) => tasks.filter((task) => task.id !== id));
	};

	const handleInput = (id: number, e: ChangeEvent<HTMLInputElement>) => {
		setTasks((tasks) =>
			tasks.map((task) => {
				if (task.id === id) {
					return {
						...task,
						name: e.target.value,
					};
				}
				return task;
			})
		);
	};

	const onClick = () => {
		const filteredTasks: TaskType[] = tasks.filter((task) => task.name !== "");
		const orderedTasks: TaskType[] = filteredTasks.map((task, index) => {
			return {
				...task,
				id: minimalId + index,
			};
		});

		handleCreateList(title, orderedTasks);

		setTitle("");
		setTasks([initialTask]);
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant="outline"
					className="min-w-[240px] text-3xl font-semibold h-16"
					disabled={listsLength > 9}
				>
					Create new list...
				</Button>
			</SheetTrigger>
			<SheetContent className="grid grid-rows-[128px_1fr_40px] xxs:grid-rows-[100px_1fr_40px] place-items-start w-full max-w-sm">
				<SheetHeader className="w-full">
					<SheetTitle>Create new list</SheetTitle>
					<SheetDescription>
						Add a title and a maximum of 10 tasks. Click create when you&apos;re
						done.
					</SheetDescription>
				</SheetHeader>
				<div className="flex flex-col gap-4 py-4 w-full h-full overflow-y-auto pr-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="title" className="text-right">
							Title
						</Label>
						<div className="relative col-span-3">
							{title === "" && (
								<p className="absolute -top-6 right-1 text-lg font-semibold text-[hsl(0,62.8%,30.6%)]">
									*Add a title
								</p>
							)}
							<Input
								id="title"
								placeholder="Title..."
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="min-h-11"
								maxLength={64}
							/>
						</div>
					</div>
					{tasks.map((task, index) => (
						<div
							key={task.id}
							className="relative grid grid-cols-4 items-center gap-4"
						>
							{index === 0 && (
								<Label htmlFor={`task-${task.id}`} className="text-right">
									Tasks
								</Label>
							)}
							<Input
								id={`task-${task.id}`}
								placeholder={`New task...`}
								value={task.name}
								onChange={(e) => handleInput(task.id, e)}
								className="col-start-2 col-span-3 min-h-11"
								maxLength={192}
							/>
							<Button
								className="absolute h-min text-base top-0 right-0 p-1 rounded-tl-none rounded-br-none"
								onClick={() => handleDelete(task.id)}
								disabled={tasks.length < 2}
							>
								<Image
									src="/static/trash.svg"
									alt="delete task"
									width={16}
									height={16}
									className="invert dark:invert-0"
								/>
							</Button>
						</div>
					))}
					<div className="grid grid-cols-4 items-center gap-4">
						<Button
							className="w-full col-start-2 col-span-3"
							onClick={handleAdd}
							disabled={tasks.length > 9}
						>
							Add new task
						</Button>
					</div>
				</div>
				<SheetFooter className="w-full">
					<SheetClose asChild>
						<Button
							className="w-full"
							onClick={onClick}
							disabled={title === ""}
						>
							Create new list
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default CreateList;
