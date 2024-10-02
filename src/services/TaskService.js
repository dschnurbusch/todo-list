import { saveToLocalStorage, loadFromLocalStorage, storageAvailable } from "../utils/localStorage";
import PubSub from "../utils/PubSub";

export class TaskService {
	constructor(listService) {
		this.listService = listService;
		if (storageAvailable("localStorage")) {
			this.loadTasks();
		} else {
			console.warn("localStorage is not available, tasks will not persist");
		}
	}

	loadTasks() {
		const savedTasks = loadFromLocalStorage("tasks") || [];
		savedTasks.forEach((taskData) => {
			const list = this.listService.getList(taskData.list);
			if (list) {
				list.addTask(taskData);
			}
		});
	}

	createTask(listName, taskData) {
		try {
			const list = this.listService.getList(listName);
			if (!list) {
				throw new Error(`List "${listName}" not found`);
			}
			const newTask = list.addTask(taskData);
			this.saveTasks();
			return newTask;
		} catch (error) {
			console.error("Error creating task:", error);
			throw error;
		}
	}

	deleteTask(listName, task) {
		try {
			const list = this.listService.getList(listName);
			if (list) {
				list.removeTask(task);
				this.saveTasks();
			} else {
				throw new Error(`List "${listName}" not found`);
			}
		} catch (error) {
			console.error("Error deleting task:", error);
			throw error;
		}
	}

	updateTask(listName, task, updatedData) {
		try {
			const list = this.listService.getList(listName);
			if (list && list.tasks.includes(task)) {
				task.update(updatedData);
				this.saveTasks();
				PubSub.publish("taskUpdated", { task: task, listName: listName });
			} else {
				throw new Error(`Task not found in list "${listName}"`);
			}
		} catch (error) {
			console.error("Error updating task:", error);
			throw error;
		}
	}

	toggleTaskComplete(listName, task) {
		try {
			const list = this.listService.getList(listName);
			if (list && list.tasks.includes(task)) {
				task.toggleComplete();
				this.saveTasks();
			} else {
				throw new Error(`Task not found in list "${listName}"`);
			}
		} catch (error) {
			console.error("Error toggling task completion:", error);
			throw error;
		}
	}

	moveTask(task, fromListName, toListName) {
		try {
			const fromList = this.listService.getList(fromListName);
			const toList = this.listService.getList(toListName);
			if (fromList && toList) {
				fromList.removeTask(task);
				task.setList(toListName); // Update the task's list property
				toList.addTask(task);
				this.saveTasks();
				PubSub.publish("taskMoved", { task, fromList: fromListName, toList: toListName });
			} else {
				throw new Error("Source or destination list not found");
			}
		} catch (error) {
			console.error("Error moving task:", error);
			throw error;
		}
	}

	getTasksForList(listName) {
		try {
			const list = this.listService.getList(listName);
			return list ? list.getAllTasks() : [];
		} catch (error) {
			console.error("Error getting tasks for list:", error);
			throw error;
		}
	}

	getAllTasks() {
		try {
			const allLists = this.listService.getAllLists();
			const allTaskArrays = allLists.map((list) => list.getAllTasks());
			return allTaskArrays.flat();
		} catch (error) {
			console.error("Error getting all tasks:", error);
			throw error;
		}
	}

	getTaskById(taskId) {
		try {
			const allTasks = this.getAllTasks();
			const foundTask = allTasks.find((task) => task.id === taskId);

			if (!foundTask) {
				console.warn(`Task with ID ${taskId} not found.`);
			}

			return foundTask;
		} catch (error) {
			console.error("Error getting task by ID:", error);
			throw error;
		}
	}

	filterTasks(criteria) {
		try {
			return this.getAllTasks().filter((task) => {
				return Object.entries(criteria).every(([key, value]) => {
					return task[key] === value;
				});
			});
		} catch (error) {
			console.error("Error filtering tasks:", error);
			throw error;
		}
	}

	addMultipleTasks(listName, tasksData) {
		try {
			const list = this.listService.getList(listName) || this.listService.getList("Inbox");
			const newTasks = tasksData.map((taskData) => list.addTask(taskData));
			this.saveTasks();
			return newTasks;
		} catch (error) {
			console.error("Error adding multiple tasks:", error);
			throw error;
		}
	}

	saveTasks() {
		const allTasks = this.getAllTasks();
		saveToLocalStorage("tasks", allTasks);
	}
}
