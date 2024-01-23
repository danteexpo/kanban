import { create } from "zustand";

type EditStore = {
	editListId: number | null;
	setEditListId: (editListId: number | null) => void;
	editTaskId: number | null;
	setEditTaskId: (editTaskId: number | null) => void;
};

const useEditStore = create<EditStore>()((set) => ({
	editListId: null,
	setEditListId: (editListId) => set((state) => ({ ...state, editListId })),
	editTaskId: null,
	setEditTaskId: (editTaskId) => set((state) => ({ ...state, editTaskId })),
}));

export default useEditStore;
