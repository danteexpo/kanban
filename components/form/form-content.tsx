"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { FormInput } from "./form-input";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import ActionButton from "../action-button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormError } from "./form-error";

type FormContentProps = {
	tasks: string[];
	setTasks: Dispatch<SetStateAction<string[]>>;
	errors?: Record<string, string[] | undefined>;
};

const FormContent = ({ tasks, setTasks, errors }: FormContentProps) => {
	const { pending } = useFormStatus();

	const handleAddTask = () => {
		setTasks((tasks) => {
			return [...tasks, ""];
		});
	};

	const handleDeleteTask = (index: number) => {
		setTasks((tasks) => tasks.filter((_task, i) => i !== index));
	};

	const handleUpdateTask = (
		index: number,
		e: ChangeEvent<HTMLInputElement>
	) => {
		setTasks((tasks) =>
			tasks.map((task, i) => {
				if (i === index) {
					return e.target.value;
				}
				return task;
			})
		);
	};

	return (
		<div className="flex flex-col gap-4 py-4 w-full h-full max-h-full overflow-y-auto pr-4">
			<FormInput
				id="title"
				label="Title"
				placeholder="Title..."
				disabled={pending}
				errors={errors}
				labelClassName="text-right"
				inputClassName="col-span-3"
				errorClassName="col-start-2 col-span-3"
				maxLength={32}
			/>
			{tasks.map((task, index) => (
				<div
					key={index}
					className="relative grid grid-cols-4 items-center gap-4"
				>
					{index === 0 && (
						<Label htmlFor={`task-${index}`} className="text-right">
							Tasks
						</Label>
					)}
					<Input
						id={`task-${index}`}
						placeholder={`New task...`}
						value={task}
						onChange={(e) => handleUpdateTask(index, e)}
						className="col-start-2 col-span-3 min-h-11"
						maxLength={192}
						disabled={pending}
					/>
					<ActionButton
						type="button"
						icon="delete"
						onClick={() => handleDeleteTask(index)}
					/>
				</div>
			))}
			<div className="grid grid-cols-4 items-center gap-4">
				<FormError
					id="tasks"
					errors={errors}
					className="col-start-2 col-span-3"
				/>
				<Button
					type="button"
					onClick={handleAddTask}
					className="w-full col-start-2 col-span-3"
					disabled={pending || tasks.length > 9}
				>
					Add new task
				</Button>
			</div>
		</div>
	);
};

export default FormContent;
