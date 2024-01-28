import { SheetFooter } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

type FormContentProps = {
	errors?: {
		title?: string[];
	};
};

const FormContent = ({ errors }: FormContentProps) => {
	const { pending } = useFormStatus();

	return (
		<>
			<div className="flex flex-col gap-4 py-4 w-full h-full overflow-y-auto pr-4">
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="title" className="text-right">
						Title
					</Label>
					<div className="relative col-span-3">
						<p className="absolute -top-6 right-1 text-lg font-semibold text-[hsl(0,62.8%,30.6%)]">
							*Add a title
						</p>
						<Input
							id="title"
							name="title"
							placeholder="Title..."
							className="min-h-11"
							maxLength={64}
							disabled={pending}
						/>
					</div>
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
						// onClick={handleAdd}
						// disabled={tasks.length > 9}
						disabled={pending}
					>
						Add new task
					</Button>
				</div>
			</div>
			<SheetFooter className="w-full flex flex-col sm:flex-col gap-2">
				<Button type="submit" className="w-full" disabled={pending}>
					Create new list
				</Button>
				{errors?.title &&
					errors.title.map((error: string) => (
						<p key={error} className="font-semibold text-[hsl(0,62.8%,30.6%)]">
							{error}
						</p>
					))}
			</SheetFooter>
		</>
	);
};

export default FormContent;
