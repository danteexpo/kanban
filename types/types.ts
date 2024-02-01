export interface TaskType {
	id: number;
	name: string;
	order: number;
	listId: number;
}

export interface ListType {
	id: number;
	title: string;
	order: number;
	tasks: TaskType[];
}
