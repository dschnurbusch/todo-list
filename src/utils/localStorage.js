export function storageAvailable(type) {
	let storage;
	try {
		storage = window[type];
		const x = "__storage_test__";
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	} catch (e) {
		return e instanceof DOMException && (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED") && storage && storage.length !== 0;
	}
}

export const saveToLocalStorage = (key, data) => {
	if (storageAvailable("localStorage")) {
		try {
			localStorage.setItem(key, JSON.stringify(data));
		} catch (error) {
			console.error("Error saving to localStorage:", error);
		}
	} else {
		console.warn("localStorage is not available");
	}
};

export const loadFromLocalStorage = (key) => {
	if (storageAvailable("localStorage")) {
		try {
			const data = localStorage.getItem(key);
			return data ? JSON.parse(data) : null;
		} catch (error) {
			console.error("Error loading from localStorage:", error);
			return null;
		}
	} else {
		console.warn("localStorage is not available");
		return null;
	}
};
