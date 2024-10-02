import PubSub from "../utils/PubSub";

export class Task {
	constructor(title, description = "", dueDate = null, priority = "medium", list = "Inbox") {
		this.id = Date.now().toString();
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.completed = false;
		this.list = list;
	}

	toggleComplete() {
		this.completed = !this.completed;
		PubSub.publish("taskCompleted", { task: this, listName: this.list });
	}

	update(taskData) {
		if ("title" in taskData) this.title = taskData.title;
		if ("description" in taskData) this.description = taskData.description;
		if ("dueDate" in taskData) this.dueDate = taskData.dueDate;
		if ("priority" in taskData) this.priority = taskData.priority;
		if ("list" in taskData) this.list = taskData.list;
	}

	setList(list) {
		this.list = list;
		PubSub.publish("taskMovedList", { task: this, listName: list });
	}
}
