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

let lists: List[] = [
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
			{
				id: 1,
				name: "Buy groceries",
			},
			{ id: 2, name: "Clean room" },
			{ id: 3, name: "Fix keyboard" },
		],
	},
	{
		id: 3,
		title: "Waitingggggggggggggggggggggggggggggggggggggggg",
		tasks: [
			{
				id: 1,
				name: "Buy groceriesssssssssssssssssssssssssssssssssssssssssssssss",
			},
			{ id: 2, name: "Clean room" },
			{ id: 3, name: "Fix keyboard" },
			{
				id: 4,
				name: "Daaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa sssssssssssssss aaaaaaaaaas sssssssssssssssaaaaaaaaaaaaa aaaaaaaaaaaaa aaa dsfa fsdafsafsa fdsafs adfsad fsad fdas fasd fsadfsadf asdf sadfsdafasfsadfasfsdaf asfas fsafsafsdfsafasfsaf fas sdasssssssssssssssssssf f dsaf sdaf sadfsadfsdaf sad fsadfsadfsadfsdafasdfsdafsadf sda df f sd fsadf sda fasd fasd fds fsda fsadf sda f saf sadf sadasdfsdafasd",
			},
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
	delete: async (id: number) => {
		await sleep(750);

		lists = lists.filter((list) => list.id !== id);

		return lists;
	},
	update: async (updatedListData: List) => {
		await sleep(750);

		lists = lists.map((list) => {
			if (list.id === updatedListData.id) {
				return updatedListData;
			}
			return list;
		});

		return lists;
	},
};

export default api;
