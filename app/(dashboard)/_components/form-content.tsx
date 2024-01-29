"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { FormInput } from "./form-input";

type FormContentProps = {
	errors?: Record<string, string[] | undefined>;
};

const FormContent = ({ errors }: FormContentProps) => {
	const { pending } = useFormStatus();

	return (
		<div className="flex flex-col gap-4 py-4 w-full h-full overflow-y-auto">
			<FormInput
				id="title"
				label="Title"
				disabled={pending}
				errors={errors}
				labelClassName="text-right"
				inputClassName="col-span-3"
				errorClassName="col-start-2 col-span-3"
				maxLength={64}
			/>
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
