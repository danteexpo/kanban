export interface TaskType {
	id: number;
	name: string;
}

export interface ListType {
	id: number;
	title: string;
	tasks: TaskType[];
}
