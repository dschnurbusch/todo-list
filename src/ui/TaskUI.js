import PubSub from "../utils/PubSub";
import { TaskEditModal } from "./TaskEditModal";

export class TaskUI {
	constructor(taskService, listService) {
		this.taskService = taskService;
		this.listService = listService;
		this.taskListElement = document.getElementById("taskList");
		if (!this.taskListElement) {
			this.taskListElement = document.createElement("div");
			this.taskListElement.id = "taskList";
			const listContainer = document.getElementById("listContainer");
			if (listContainer) {
				listContainer.appendChild(this.taskListElement);
			} else {
				console.error("listContainer not found");
			}
		}
		this.taskEditModal = new TaskEditModal(taskService, listService);
		this.setupEventListeners();
	}

	setupEventListeners() {
		PubSub.subscribe("taskCreated", this.handleTaskCreated.bind(this));
		PubSub.subscribe("taskUpdated", this.updateTaskElement.bind(this));
		PubSub.subscribe("taskRemoved", this.removeTaskElement.bind(this));
		PubSub.subscribe("listSelected", ({ listName }) => this.renderAllTasks(listName));
		PubSub.subscribe("openCreateTaskModal", ({ listName }) => this.showCreateTaskForm(listName));
	}

	handleTaskCreated({ task, listName }) {
		const currentListName = this.listService.getCurrentList().name;
		if (listName === currentListName) {
			this.renderTask({ task });
		}
	}

	renderAllTasks(listName) {
		const tasks = this.taskService.getTasksForList(listName);
		this.taskListElement.innerHTML = "";
		tasks.forEach((task) => this.renderTask({ task }));
	}

	renderTask({ task }) {
		const taskElement = document.createElement("div");
		taskElement.className = "task";
		taskElement.id = `task-${task.id}`;

		const taskLeft = document.createElement("div");
		taskLeft.className = "task-left";

		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.checked = task.completed;
		checkbox.addEventListener("change", () => {
			this.taskService.toggleTaskComplete(task.list, task);
		});

		const titleSpan = document.createElement("span");
		titleSpan.textContent = task.title;

		taskLeft.appendChild(checkbox);
		taskLeft.appendChild(titleSpan);

		const taskRight = document.createElement("div");
		taskRight.className = "task-right";

		const editButton = document.createElement("button");
		editButton.className = "edit-task";
		editButton.textContent = "Edit";
		editButton.addEventListener("click", () => {
			this.showEditTaskForm(task);
		});

		const deleteButton = document.createElement("button");
		deleteButton.className = "delete-task";
		deleteButton.textContent = "Delete";
		deleteButton.addEventListener("click", () => {
			this.taskService.deleteTask(task.list, task);
		});

		taskRight.appendChild(editButton);
		taskRight.appendChild(deleteButton);

		taskElement.appendChild(taskLeft);
		taskElement.appendChild(taskRight);

		this.taskListElement.appendChild(taskElement);
	}

	updateTaskElement({ task }) {
		const taskElement = document.getElementById(`task-${task.id}`);
		const currentListName = this.listService.getCurrentList().name;

		if (taskElement) {
			if (task.list !== currentListName) {
				// If the task's list has changed and it's not in the current list, remove it
				taskElement.remove();
			} else {
				// Update the task element if it's still in the current list
				taskElement.querySelector("span").textContent = task.title;
				taskElement.querySelector('input[type="checkbox"]').checked = task.completed;
			}
		} else if (task.list === currentListName) {
			// If the task element doesn't exist but should be in the current list, render it
			this.renderTask({ task });
		}

		// Re-render all tasks in the current list to ensure correct order
		this.renderAllTasks(currentListName);
	}

	removeTaskElement({ task }) {
		const taskElement = document.getElementById(`task-${task.id}`);
		if (taskElement) {
			taskElement.remove();
		}
	}

	showEditTaskForm(task) {
		this.taskEditModal.openModal(task);
	}

	showCreateTaskForm(listName) {
		this.taskEditModal.openModal();
	}
}
