import { Task } from "./Task";
import PubSub from "../utils/PubSub";

export class List {
	constructor(name) {
		this.name = name;
		this.tasks = [];
	}

	addTask(taskData) {
		const task = new Task(taskData.title, taskData.description, taskData.dueDate, taskData.priority, this.name);
		this.tasks.push(task);
		PubSub.publish("taskAdded", { listName: this.name, task: task });
		return task;
	}

	removeTask(task) {
		const index = this.tasks.indexOf(task);
		if (index !== -1) {
			this.tasks.splice(index, 1);
			PubSub.publish("taskRemoved", { listName: this.name, task: task });
		}
	}

	getTask(index) {
		return this.tasks[index];
	}

	getAllTasks() {
		return this.tasks;
	}

	updateName(newName) {
		this.name = newName;
		this.tasks.forEach((task) => task.setList(newName));
		PubSub.publish("listUpdated", this);
	}
}
