import { saveToLocalStorage, loadFromLocalStorage, storageAvailable } from "../utils/localStorage";
import { List } from "../components/List";
import PubSub from "../utils/PubSub";

export class ListService {
	constructor() {
		this.initializeLists();
	}

	initializeLists() {
		if (storageAvailable("localStorage")) {
			this.lists = this.loadListsFromStorage();
		} else {
			this.lists = [new List("Inbox")];
			console.warn("localStorage is not available, data will not persist");
		}
		if (this.lists.length === 0) {
			this.lists.push(new List("Inbox"));
		}
	}

	loadListsFromStorage() {
		const savedLists = loadFromLocalStorage("lists");
		if (savedLists && Array.isArray(savedLists)) {
			return savedLists.map((listData) => new List(listData.name));
		}
		return [new List("Inbox")];
	}

	createList(name) {
		try {
			if (this.listExists(name)) {
				throw new Error(`List with name "${name}" already exists`);
			}
			const list = new List(name);
			this.lists.push(list);
			PubSub.publish("listCreated", { list });
			this.saveLists();
			return list;
		} catch (error) {
			console.error("Error creating list:", error);
			throw error;
		}
	}

	deleteList(name) {
		try {
			const index = this.lists.findIndex((list) => list.name === name);
			if (index !== -1 && this.lists[index].name !== "Inbox") {
				const deletedList = this.lists.splice(index, 1)[0];
				PubSub.publish("listDeleted", { list: deletedList });
				this.saveLists();
			} else if (this.lists[index].name === "Inbox") {
				throw new Error("Cannot delete Inbox list");
			} else {
				throw new Error(`List "${name}" not found`);
			}
		} catch (error) {
			console.error("Error deleting list:", error);
			throw error;
		}
	}

	getList(name) {
		const list = this.lists.find((list) => list.name === name);
		if (!list) {
			throw new Error(`List "${name}" not found`);
		}
		return list;
	}

	getAllLists() {
		return this.lists;
	}

	updateListName(oldName, newName) {
		try {
			const list = this.getList(oldName);
			if (this.listExists(newName)) {
				throw new Error(`List with name "${newName}" already exists`);
			}
			list.updateName(newName);
			PubSub.publish("listUpdated", { list });
			this.saveLists();
		} catch (error) {
			console.error("Error updating list name:", error);
			throw error;
		}
	}

	listExists(name) {
		return this.lists.some((list) => list.name === name);
	}

	sortLists(sortFunction) {
		try {
			this.lists.sort(sortFunction);
			PubSub.publish("listsSorted", { lists: this.lists });
			this.saveLists();
		} catch (error) {
			console.error("Error sorting lists:", error);
			throw error;
		}
	}

	saveLists() {
		saveToLocalStorage("lists", this.lists);
	}

	getCurrentList() {
		return this.lists.find((list) => list.name === this.currentListName) || this.lists[0];
	}
}
