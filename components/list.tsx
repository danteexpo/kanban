import { List } from "@/api/api";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

type ListProps = {
	list: List;
	handleDeleteList: (listId: number) => void;
	handleDeleteTask: (listId: number, taskId: number) => void;
	handleAddTask: (listId: number, input: string) => void;
};

const List = ({
	list,
	handleDeleteList,
	handleDeleteTask,
	handleAddTask,
}: ListProps) => {
	const [input, setInput] = useState("");

	return (
		<Card className="min-w-[240px] max-w-[240px] grid grid-rows-[68px_1fr_72px] h-min max-h-full">
			<CardHeader className="max-w-[238px] relative pr-8 space-y-0">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<CardTitle className="text-3xl overflow-hidden text-ellipsis whitespace-nowrap">
								{list.title}
							</CardTitle>
						</TooltipTrigger>
						<TooltipContent>
							<p className="text-xl">{list.title}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<Button
					className="absolute h-min text-2xl top-0 right-0 px-2 py-0 rounded-tl-none rounded-br-none"
					onClick={() => handleDeleteList(list.id)}
				>
					X
				</Button>
			</CardHeader>
			<CardContent className="flex flex-col gap-2 overflow-y-auto">
				{list.tasks.map((task) => (
					<Card key={task.id} className="max-w-[206px]">
						<CardContent className="relative p-2 pr-8">
							<p className="break-words">{task.name}</p>
							<Button
								className="absolute h-min text-base top-0 right-0 px-1.5 py-0 rounded-tl-none rounded-br-none"
								onClick={() => handleDeleteTask(list.id, task.id)}
							>
								X
							</Button>
						</CardContent>
					</Card>
				))}
			</CardContent>
			<CardFooter className="flex gap-2">
				<Input
					type="text"
					placeholder="New task..."
					value={input}
					onChange={(e) => setInput(e.target.value)}
					maxLength={192}
					disabled={list.tasks.length > 9}
				/>
				<Button
					onClick={() => {
						handleAddTask(list.id, input);
						setInput("");
					}}
					disabled={input === ""}
				>
					Add
				</Button>
			</CardFooter>
		</Card>
	);
};

export default List;
