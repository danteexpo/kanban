import { Label } from "@/components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const FormContent = () => {
	const { pending } = useFormStatus();

	return (
		<div className="flex flex-col gap-4 py-4 w-full h-full overflow-y-auto">
			<div className="grid grid-cols-4 items-center gap-4">
				<Label htmlFor="title" className="text-right">
					Title
				</Label>
				<Input
					id="title"
					name="title"
					placeholder="Title..."
					className="min-h-11 col-span-3"
					maxLength={64}
					disabled={pending}
				/>
			</div>
			{/* {tasks.map((task, index) => (
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
									onChange={(e) => handleTasks(task.id, e)}
									onKeyDown={handleKeyDown}
									className="col-start-2 col-span-3 min-h-11"
									maxLength={192}
									disabled={pending}
								/>
								<ActionButton
									type="delete"
									onClick={() => handleDelete(task.id)}
									isDisabled={tasks.length < 2}
								/>
							</div>
						))} */}
			<div className="grid grid-cols-4 items-center gap-4">
				<Button
					type="button"
					className="w-full col-start-2 col-span-3"
					disabled={pending}
				>
					Add new task
				</Button>
			</div>
		</div>
	);
};

export default FormContent;
