import { prisma } from "@/lib/prisma";
import Lists from "./_components/lists";

export default async function Page() {
	const lists = await prisma.list.findMany({
		include: { tasks: true },
	});
	// const [lists, setLists] = useState<ListType[]>([]);
	// const [initialLoad, setInitialLoad] = useState(false);
	// const [minimalId, setMinimalId] = useState<number | null>(null);

	// useEffect(() => {
	// 	api.lists().then((lists) => {
	// 		setLists(lists);
	// 		setInitialLoad(true);
	// 	});
	// }, []);

	// useEffect(() => {
	// 	const largestId = Math.max(
	// 		...lists.flatMap((list) => list.tasks.map((task) => task.id))
	// 	);

	// 	setMinimalId(largestId + 1);
	// }, [lists]);

	// const handleDelete = (listId: number, taskId?: number) => {
	// 	if (!taskId) {
	// 		api.delete(listId).then((newLists) => setLists([...newLists]));
	// 	}

	// 	let list = lists.find((list) => list.id === listId);

	// 	if (!list) return;

	// 	list = {
	// 		...list,
	// 		tasks: list.tasks.filter((task) => task.id !== taskId),
	// 	};

	// 	api.update(list).then((newLists) => setLists([...newLists]));
	// };

	// const handleCreateList = (title: string, tasks: TaskType[]) => {
	// 	api
	// 		.create({
	// 			title: title,
	// 			tasks: tasks,
	// 		})
	// 		.then((newLists) => setLists([...newLists]));
	// };

	// const handleUpdateList = (listId: number, title: string) => {
	// 	let list = lists.find((list) => list.id === listId);

	// 	if (!list) return;

	// 	list = {
	// 		...list,
	// 		title: title,
	// 	};

	// 	api.update(list).then((newLists) => setLists([...newLists]));
	// };

	// const handleAddTask = (listId: number, input: string) => {
	// 	let list = lists.find((list) => list.id === listId);

	// 	if (!minimalId) return;

	// 	if (!list) return;

	// 	list = {
	// 		...list,
	// 		tasks: [
	// 			...list.tasks,
	// 			{
	// 				id: minimalId,
	// 				name: input,
	// 			},
	// 		],
	// 	};

	// 	api.update(list).then((newLists) => {
	// 		setLists([...newLists]);
	// 		setMinimalId(minimalId + 1);
	// 	});
	// };

	// const handleUpdateTask = (
	// 	listId: number,
	// 	taskId: number,
	// 	taskName: string
	// ) => {
	// 	let list = lists.find((list) => list.id === listId);

	// 	if (!list) return;

	// 	list = {
	// 		...list,
	// 		tasks: list.tasks.map((task) => {
	// 			if (task.id === taskId) {
	// 				return {
	// 					...task,
	// 					name: taskName,
	// 				};
	// 			}
	// 			return task;
	// 		}),
	// 	};

	// 	api.update(list).then((updatedLists) => {
	// 		setLists([...updatedLists]);
	// 	});
	// };

	// const handleDragDrop = (result: DropResult) => {
	// 	const { source, destination, type } = result;

	// 	if (!destination) return;

	// 	if (
	// 		source.droppableId === destination.droppableId &&
	// 		source.index === destination.index
	// 	)
	// 		return;

	// 	if (type === "group") {
	// 		const orderedLists = [...lists];

	// 		const [removedList] = orderedLists.splice(source.index, 1);

	// 		orderedLists.splice(destination.index, 0, removedList);

	// 		api
	// 			.updateAll(orderedLists)
	// 			.then((updatedLists) => setLists([...updatedLists]));
	// 	} else {
	// 		const listSourceIndex = lists.findIndex(
	// 			(list) => `droppable-list-${list.id}` === source.droppableId
	// 		);

	// 		const listDestinationIndex = lists.findIndex(
	// 			(list) => `droppable-list-${list.id}` === destination.droppableId
	// 		);

	// 		const newSourceTasks = [...lists[listSourceIndex].tasks];

	// 		const newDestinationTasks =
	// 			source.droppableId !== destination.droppableId
	// 				? [...lists[listDestinationIndex].tasks]
	// 				: newSourceTasks;

	// 		const [deletedTask] = newSourceTasks.splice(source.index, 1);

	// 		newDestinationTasks.splice(destination.index, 0, deletedTask);

	// 		const newLists = [...lists];

	// 		newLists[listSourceIndex] = {
	// 			...lists[listSourceIndex],
	// 			tasks: newSourceTasks,
	// 		};

	// 		newLists[listDestinationIndex] = {
	// 			...lists[listDestinationIndex],
	// 			tasks: newDestinationTasks,
	// 		};

	// 		api
	// 			.updateAll(newLists)
	// 			.then((updatedLists) => setLists([...updatedLists]));
	// 	}
	// };

	return <Lists lists={lists} />;
}
