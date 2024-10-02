import PubSub from "../utils/PubSub";

export class ListUI {
	constructor(listService) {
		this.listService = listService;
		this.createListContainer();
		this.setupEventListeners();
		this.renderAllLists();
	}

	createListContainer() {
		this.listContainerElement = document.createElement("div");
		this.listContainerElement.id = "listContainer";
		document.body.appendChild(this.listContainerElement);

		const topBar = document.createElement("div");
		topBar.className = "top-bar";

		this.listSelector = document.createElement("select");
		this.listSelector.id = "listSelector";
		topBar.appendChild(this.listSelector);

		const newListForm = this.createNewListForm();
		topBar.appendChild(newListForm);

		const createTaskButton = document.createElement("button");
		createTaskButton.textContent = "Create New Task";
		createTaskButton.id = "createTaskButton";
		createTaskButton.addEventListener("click", () => {
			const currentListName = this.listSelector.value;
			PubSub.publish("openCreateTaskModal", { listName: currentListName });
		});
		topBar.appendChild(createTaskButton);

		this.listContainerElement.appendChild(topBar);

		this.listNameDisplay = document.createElement("h2");
		this.listNameDisplay.id = "listNameDisplay";
		this.listContainerElement.appendChild(this.listNameDisplay);
	}

	setupEventListeners() {
		PubSub.subscribe("listCreated", () => this.renderAllLists());
		PubSub.subscribe("listDeleted", this.removeListElement.bind(this));
		PubSub.subscribe("listUpdated", this.updateListElement.bind(this));
		PubSub.subscribe("listsSorted", this.renderAllLists.bind(this));

		this.listSelector.addEventListener("change", (e) => {
			const selectedListName = e.target.value;
			this.listNameDisplay.textContent = selectedListName;
			this.listService.currentListName = selectedListName;
			PubSub.publish("listSelected", { listName: selectedListName });
		});
	}

	renderAllLists() {
		const lists = this.listService.getAllLists();
		this.listSelector.innerHTML = "";
		lists.forEach((list) => {
			const option = document.createElement("option");
			option.value = list.name;
			option.textContent = list.name;
			this.listSelector.appendChild(option);
		});
		if (lists.length > 0) {
			this.listSelector.value = lists[0].name;
			this.listNameDisplay.textContent = lists[0].name;
			PubSub.publish("listSelected", { listName: lists[0].name });
		}
	}

	updateListElement({ list }) {
		const option = this.listSelector.querySelector(`option[value="${list.name}"]`);
		if (option) {
			option.textContent = list.name;
		}
	}

	removeListElement({ list }) {
		const option = this.listSelector.querySelector(`option[value="${list.name}"]`);
		if (option) {
			option.remove();
		}
	}

	showEditListForm(list) {
		const newName = prompt("Enter new name for the list:", list.name);
		if (newName && newName !== list.name) {
			this.listService.updateListName(list.name, newName);
		}
	}

	createNewListForm() {
		const form = document.createElement("form");
		form.id = "new-list-form";

		const input = document.createElement("input");
		input.type = "text";
		input.placeholder = "New List Name";
		input.required = true;

		const submitButton = document.createElement("button");
		submitButton.type = "submit";
		submitButton.textContent = "Create List";

		form.appendChild(input);
		form.appendChild(submitButton);

		form.addEventListener("submit", (e) => {
			e.preventDefault();
			const newListName = input.value.trim();
			if (newListName) {
				this.listService.createList(newListName);
				input.value = "";
				this.renderAllLists();
			}
		});

		return form;
	}
}
