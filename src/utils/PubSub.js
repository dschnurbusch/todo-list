class PubSub {
	constructor() {
		this.subscribers = {};
	}

	subscribe(event, callback) {
		if (!this.subscribers[event]) {
			this.subscribers[event] = [];
		}
		this.subscribers[event].push(callback);
		return () => this.unsubscribe(event, callback);
	}

	unsubscribe(event, callback) {
		if (this.subscribers[event]) {
			this.subscribers[event] = this.subscribers[event].filter((cb) => cb !== callback);
		}
	}

	publish(event, data) {
		if (this.subscribers[event]) {
			this.subscribers[event].forEach((callback) => callback(data));
		}
	}
}

export default new PubSub();
