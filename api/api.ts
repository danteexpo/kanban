export interface Task {
	id: number;
	name: string;
}

export interface List {
	id: number;
	title: string;
	tasks: Task[];
}

type NewListData = Omit<List, "id">;

const lists: List[] = [
	{
		id: 1,
		title: "To Do",
		tasks: [
			{ id: 1, name: "Buy groceries" },
			{ id: 2, name: "Clean room" },
			{ id: 3, name: "Fix keyboard" },
		],
	},
	{
		id: 2,
		title: "Waiting",
		tasks: [
			{ id: 1, name: "Buy groceries" },
			{ id: 2, name: "Clean room" },
			{ id: 3, name: "Fix keyboard" },
		],
	},
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const api = {
	lists: async (): Promise<List[]> => {
		await sleep(750);

		return lists;
	},
	create: async (newListData: NewListData): Promise<List[]> => {
		await sleep(750);

		const newList: List = {
			id: Math.max(...lists.map((l) => l.id)) + 1,
			...newListData,
		};

		lists.push(newList);

		return lists;
	},
};

export default api;
