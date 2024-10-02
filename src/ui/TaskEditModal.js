import PubSub from "../utils/PubSub";

export class TaskEditModal {
	constructor(taskService, listService) {
		this.taskService = taskService;
		this.listService = listService;
		this.modal = this.createModal();
		this.setupEventListeners();
	}

	createModal() {
		const modal = document.createElement("div");
		modal.className = "modal";
		const content = document.createElement("div");
		content.className = "modal-content";

		const closeSpan = document.createElement("span");
		closeSpan.className = "close";
		closeSpan.textContent = "×";

		this.modalHeading = document.createElement("h2");

		const form = document.createElement("form");
		form.id = "edit-task-form";

		const titleInput = this.createInput("text", "edit-task-title", "Task Title", true);
		const descriptionTextarea = this.createTextarea("edit-task-description", "Description");
		const dueDateInput = this.createInput("date", "edit-task-due-date", "Due Date");
		const prioritySelect = this.createSelect("edit-task-priority", "Priority", [
			["low", "Low"],
			["medium", "Medium"],
			["high", "High"],
		]);
		const listSelect = this.createSelect("edit-task-list", "List", []);

		this.submitButton = document.createElement("button");
		this.submitButton.type = "submit";

		form.append(titleInput, descriptionTextarea, dueDateInput, prioritySelect, listSelect, this.submitButton);
		content.append(closeSpan, this.modalHeading, form);
		modal.appendChild(content);

		document.body.appendChild(modal);
		return modal;
	}

	createInput(type, id, placeholder, required = false) {
		const input = document.createElement("input");
		input.type = type;
		input.id = id;
		input.placeholder = placeholder;
		input.required = required;
		return input;
	}

	createTextarea(id, placeholder) {
		const textarea = document.createElement("textarea");
		textarea.id = id;
		textarea.placeholder = placeholder;
		textarea.style.width = "100%";
		textarea.style.resize = "vertical";
		textarea.style.minHeight = "100px";
		textarea.style.maxHeight = "300px";
		return textarea;
	}

	createSelect(id, label, options) {
		const select = document.createElement("select");
		select.id = id;

		const defaultOption = document.createElement("option");
		defaultOption.value = "";
		defaultOption.textContent = `Select ${label}`;
		defaultOption.disabled = true;
		defaultOption.selected = true;
		select.appendChild(defaultOption);

		options.forEach(([value, text]) => {
			const option = document.createElement("option");
			option.value = value;
			option.textContent = text;
			select.appendChild(option);
		});

		return select;
	}

	setupEventListeners() {
		const closeBtn = this.modal.querySelector(".close");
		closeBtn.addEventListener("click", () => this.closeModal());

		const form = this.modal.querySelector("#edit-task-form");
		form.addEventListener("submit", (e) => this.handleSubmit(e));

		// Add event listener for clicks outside the modal
		window.addEventListener("click", (e) => this.handleOutsideClick(e));
	}

	openModal(task = null) {
		this.currentTask = task;
		if (task) {
			this.modalHeading.textContent = "Edit Task";
			this.submitButton.textContent = "Save Changes";
			this.populateForm(task);
		} else {
			this.modalHeading.textContent = "Create New Task";
			this.submitButton.textContent = "Create Task";
			this.resetForm();
		}
		this.populateListSelect();
		this.modal.style.display = "block";
	}

	closeModal() {
		this.modal.style.display = "none";
	}

	populateForm(task) {
		const titleInput = this.modal.querySelector("#edit-task-title");
		const descriptionInput = this.modal.querySelector("#edit-task-description");
		const dueDateInput = this.modal.querySelector("#edit-task-due-date");
		const priorityInput = this.modal.querySelector("#edit-task-priority");
		const listInput = this.modal.querySelector("#edit-task-list");

		titleInput.value = task.title;
		descriptionInput.value = task.description || "";
		dueDateInput.value = task.dueDate || "";
		priorityInput.value = task.priority;

		// Ensure the correct list is selected
		this.populateListSelect();
		listInput.value = task.list;
	}

	resetForm() {
		const form = this.modal.querySelector("#edit-task-form");
		form.reset();
	}

	populateListSelect() {
		const listSelect = this.modal.querySelector("#edit-task-list");
		const currentValue = listSelect.value;
		listSelect.innerHTML = "";
		const lists = this.listService.getAllLists();
		lists.forEach((list) => {
			const option = document.createElement("option");
			option.value = list.name;
			option.textContent = list.name;
			listSelect.appendChild(option);
		});
		if (currentValue) {
			listSelect.value = currentValue;
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		const taskData = {
			title: this.modal.querySelector("#edit-task-title").value,
			description: this.modal.querySelector("#edit-task-description").value,
			dueDate: this.modal.querySelector("#edit-task-due-date").value || null,
			priority: this.modal.querySelector("#edit-task-priority").value,
			list: this.modal.querySelector("#edit-task-list").value,
		};

		if (this.currentTask) {
			// Editing existing task
			const oldList = this.currentTask.list;
			if (taskData.list !== oldList) {
				this.taskService.moveTask(this.currentTask, oldList, taskData.list);
			}
			// Update the task after moving it
			this.currentTask.update(taskData);
			this.taskService.saveTasks();
			PubSub.publish("taskUpdated", { task: this.currentTask, listName: taskData.list });
		} else {
			// Creating new task
			const newTask = this.taskService.createTask(taskData.list, taskData);
			PubSub.publish("taskCreated", { task: newTask, listName: taskData.list });
		}
		this.closeModal();
	}

	handleOutsideClick(e) {
		if (e.target === this.modal) {
			this.closeModal();
		}
	}
}
