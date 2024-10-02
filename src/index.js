import { TaskService } from "./services/TaskService";
import { ListService } from "./services/ListService";
import { TaskUI } from "./ui/TaskUI";
import { ListUI } from "./ui/ListUI";
import { storageAvailable } from "./utils/localStorage";
import PubSub from "./utils/PubSub";
import "./styles/styles.css";

document.addEventListener("DOMContentLoaded", () => {
	try {
		const listService = new ListService();
		const taskService = new TaskService(listService);

		// Create 'Inbox' list if it doesn't exist
		if (!listService.getList("Inbox")) {
			listService.createList("Inbox");
		}

		// Add demo tasks if localStorage is empty
		addDemoTasksIfNeeded(taskService);

		const listUI = new ListUI(listService);
		const taskUI = new TaskUI(taskService, listService);

		// Initial render of Inbox tasks
		PubSub.publish("listSelected", { listName: "Inbox" });

		// Debug services and logging (only in development mode)
		if (process.env.NODE_ENV === "development") {
			setupDebugServices(listService, taskService);
		}
	} catch (error) {
		console.error("Error initializing application:", error);
	}
});

function addDemoTasksIfNeeded(taskService) {
	if (storageAvailable("localStorage") && !localStorage.getItem("tasks")) {
		taskService.createTask("Inbox", { title: "Demo Task 1", description: "This is a demo task" });
		taskService.createTask("Inbox", { title: "Demo Task 2", description: "Another demo task" });
	}
}

function setupDebugServices(listService, taskService) {
	window.debugServices = { listService, taskService };
	console.log("All Lists:", listService.getAllLists());
	console.log("All Tasks:", taskService.getAllTasks());

	// Log tasks in the currently selected list
	PubSub.subscribe("listSelected", ({ listName }) => {
		console.log(`Tasks in ${listName}:`, taskService.getTasksForList(listName));
	});
}
