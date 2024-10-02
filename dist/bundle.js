(()=>{"use strict";function t(t){var e;try{e=window[t];var r="__storage_test__";return e.setItem(r,r),e.removeItem(r),!0}catch(t){return t instanceof DOMException&&("QuotaExceededError"===t.name||"NS_ERROR_DOM_QUOTA_REACHED"===t.name)&&e&&0!==e.length}}var e=function(e,r){if(t("localStorage"))try{localStorage.setItem(e,JSON.stringify(r))}catch(t){console.error("Error saving to localStorage:",t)}else console.warn("localStorage is not available")},r=function(e){if(!t("localStorage"))return console.warn("localStorage is not available"),null;try{var r=localStorage.getItem(e);return r?JSON.parse(r):null}catch(t){return console.error("Error loading from localStorage:",t),null}};function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function i(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,o(n.key),n)}}function o(t){var e=function(t){if("object"!=n(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var r=e.call(t,"string");if("object"!=n(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==n(e)?e:e+""}const s=new(function(){return t=function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.subscribers={}},(e=[{key:"subscribe",value:function(t,e){var r=this;return this.subscribers[t]||(this.subscribers[t]=[]),this.subscribers[t].push(e),function(){return r.unsubscribe(t,e)}}},{key:"unsubscribe",value:function(t,e){this.subscribers[t]&&(this.subscribers[t]=this.subscribers[t].filter((function(t){return t!==e})))}},{key:"publish",value:function(t,e){this.subscribers[t]&&this.subscribers[t].forEach((function(t){return t(e)}))}}])&&i(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,e}());function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}function l(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,c(n.key),n)}}function c(t){var e=function(t){if("object"!=a(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var r=e.call(t,"string");if("object"!=a(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==a(e)?e:e+""}var u=function(){return t=function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"medium",o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"Inbox";!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.id=Date.now().toString(),this.title=e,this.description=r,this.dueDate=n,this.priority=i,this.completed=!1,this.list=o},(e=[{key:"toggleComplete",value:function(){this.completed=!this.completed,s.publish("taskCompleted",{task:this,listName:this.list})}},{key:"update",value:function(t){"title"in t&&(this.title=t.title),"description"in t&&(this.description=t.description),"dueDate"in t&&(this.dueDate=t.dueDate),"priority"in t&&(this.priority=t.priority),s.publish("taskUpdated",{task:this,listName:this.list})}},{key:"setList",value:function(t){this.list=t,s.publish("taskMovedList",{task:this,listName:t})}}])&&l(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,e}();function d(t){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},d(t)}function f(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function m(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?f(Object(r),!0).forEach((function(e){v(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function v(t,e,r){return(e=h(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function y(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,h(n.key),n)}}function h(t){var e=function(t){if("object"!=d(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var r=e.call(t,"string");if("object"!=d(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==d(e)?e:e+""}var p=function(){return n=function e(r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.listService=r,t("localStorage")?this.loadTasks():console.warn("localStorage is not available, tasks will not persist")},(i=[{key:"loadTasks",value:function(){var t=this;(r("tasks")||[]).forEach((function(e){var r=t.listService.getList(e.list);r&&r.addTask(e)}))}},{key:"createTask",value:function(t,e){try{var r=(this.listService.getList(t)||this.listService.getList("Inbox")).addTask(e);return this.saveTasks(),r}catch(t){throw console.error("Error creating task:",t),t}}},{key:"deleteTask",value:function(t,e){try{var r=this.listService.getList(t);if(!r)throw new Error('List "'.concat(t,'" not found'));r.removeTask(e),this.saveTasks()}catch(t){throw console.error("Error deleting task:",t),t}}},{key:"updateTask",value:function(t,e,r){try{var n=this.listService.getList(t);if(!n||!n.tasks.includes(e))throw new Error('Task not found in list "'.concat(t,'"'));e.update(r),this.saveTasks()}catch(t){throw console.error("Error updating task:",t),t}}},{key:"toggleTaskComplete",value:function(t,e){try{var r=this.listService.getList(t);if(!r||!r.tasks.includes(e))throw new Error('Task not found in list "'.concat(t,'"'));e.toggleComplete(),this.saveTasks()}catch(t){throw console.error("Error toggling task completion:",t),t}}},{key:"moveTask",value:function(t,e,r){try{var n=this.listService.getList(e),i=this.listService.getList(r);if(!n||!i)throw new Error("Source or destination list not found");n.removeTask(t),i.addTask(m(m({},t),{},{list:r})),t.setList(r),this.saveTasks()}catch(t){throw console.error("Error moving task:",t),t}}},{key:"getTasksForList",value:function(t){try{var e=this.listService.getList(t);return e?e.getAllTasks():[]}catch(t){throw console.error("Error getting tasks for list:",t),t}}},{key:"getAllTasks",value:function(){try{return this.listService.getAllLists().map((function(t){return t.getAllTasks()})).flat()}catch(t){throw console.error("Error getting all tasks:",t),t}}},{key:"getTaskById",value:function(t){try{return this.getAllTasks().find((function(e){return e.id===t}))}catch(t){throw console.error("Error getting task by ID:",t),t}}},{key:"filterTasks",value:function(t){try{return this.getAllTasks().filter((function(e){for(var r in t)if(e[r]!==t[r])return!1;return!0}))}catch(t){throw console.error("Error filtering tasks:",t),t}}},{key:"addMultipleTasks",value:function(t,e){try{var r=this.listService.getList(t)||this.listService.getList("Inbox"),n=e.map((function(t){return r.addTask(t)}));return this.saveTasks(),n}catch(t){throw console.error("Error adding multiple tasks:",t),t}}},{key:"saveTasks",value:function(){var t=this.getAllTasks();e("tasks",t)}}])&&y(n.prototype,i),Object.defineProperty(n,"prototype",{writable:!1}),n;var n,i}();function b(t){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},b(t)}function k(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,g(n.key),n)}}function g(t){var e=function(t){if("object"!=b(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var r=e.call(t,"string");if("object"!=b(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==b(e)?e:e+""}var S=function(){return t=function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.name=e,this.tasks=[]},(e=[{key:"addTask",value:function(t){var e=new u(t.title,t.description,t.dueDate,t.priority,this.name);return this.tasks.push(e),s.publish("taskAdded",{listName:this.name,task:e}),e}},{key:"removeTask",value:function(t){var e=this.tasks.indexOf(t);-1!==e&&(this.tasks.splice(e,1),s.publish("taskRemoved",{listName:this.name,task:t}))}},{key:"getTask",value:function(t){return this.tasks[t]}},{key:"getAllTasks",value:function(){return this.tasks}},{key:"updateName",value:function(t){this.name=t,this.tasks.forEach((function(e){return e.setList(t)})),s.publish("listUpdated",this)}}])&&k(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,e}();function E(t){return E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},E(t)}function w(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,L(n.key),n)}}function L(t){var e=function(t){if("object"!=E(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var r=e.call(t,"string");if("object"!=E(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==E(e)?e:e+""}var T=function(){return n=function e(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),t("localStorage")?this.lists=r("lists")||[new S("Inbox")]:(this.lists=[new S("Inbox")],console.warn("localStorage is not available, data will not persist"))},(i=[{key:"createList",value:function(t){try{if(this.listExists(t))throw new Error('List with name "'.concat(t,'" already exists'));var e=new S(t);return this.lists.push(e),s.publish("listCreated",{list:e}),this.saveLists(),e}catch(t){throw console.error("Error creating list:",t),t}}},{key:"deleteList",value:function(t){try{var e=this.lists.findIndex((function(e){return e.name===t}));if(-1===e||"Inbox"===this.lists[e].name)throw"Inbox"===this.lists[e].name?new Error("Cannot delete Inbox list"):new Error('List "'.concat(t,'" not found'));var r=this.lists.splice(e,1)[0];s.publish("listDeleted",{list:r}),this.saveLists()}catch(t){throw console.error("Error deleting list:",t),t}}},{key:"getList",value:function(t){try{var e=this.lists.find((function(e){return e.name===t}));if(!e)throw new Error('List "'.concat(t,'" not found'));return e}catch(t){throw console.error("Error getting list:",t),t}}},{key:"getAllLists",value:function(){return this.lists}},{key:"updateListName",value:function(t,e){try{var r=this.getList(t);if(!r)throw new Error('List "'.concat(t,'" not found'));if(this.listExists(e))throw new Error('List with name "'.concat(e,'" already exists'));r.updateName(e),s.publish("listUpdated",{list:r}),this.saveLists()}catch(t){throw console.error("Error updating list name:",t),t}}},{key:"listExists",value:function(t){return this.lists.some((function(e){return e.name===t}))}},{key:"sortLists",value:function(t){try{this.lists.sort(t),s.publish("listsSorted",{lists:this.lists}),this.saveLists()}catch(t){throw console.error("Error sorting lists:",t),t}}},{key:"saveLists",value:function(){e("lists",this.lists)}}])&&w(n.prototype,i),Object.defineProperty(n,"prototype",{writable:!1}),n;var n,i}();function C(t){return C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},C(t)}function j(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}function O(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,x(n.key),n)}}function x(t){var e=function(t){if("object"!=C(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var r=e.call(t,"string");if("object"!=C(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==C(e)?e:e+""}var P=function(){return t=function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.taskService=e,this.listService=r,this.modal=this.createModal(),this.setupEventListeners()},e=[{key:"createModal",value:function(){var t=document.createElement("div");t.className="modal";var e=document.createElement("div");e.className="modal-content";var r=document.createElement("span");r.className="close",r.textContent="×";var n=document.createElement("h2");n.textContent="Edit Task";var i=document.createElement("form");i.id="edit-task-form";var o=this.createInput("text","edit-task-title","Task Title",!0),s=this.createTextarea("edit-task-description","Description"),a=this.createInput("date","edit-task-due-date","Due Date"),l=this.createSelect("edit-task-priority","Priority",[["low","Low"],["medium","Medium"],["high","High"]]),c=this.createSelect("edit-task-list","List",[]),u=document.createElement("button");return u.type="submit",u.textContent="Save Changes",i.append(o,s,a,l,c,u),e.append(r,n,i),t.appendChild(e),document.body.appendChild(t),t}},{key:"createInput",value:function(t,e,r){var n=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=document.createElement("input");return i.type=t,i.id=e,i.placeholder=r,i.required=n,i}},{key:"createTextarea",value:function(t,e){var r=document.createElement("textarea");return r.id=t,r.placeholder=e,r}},{key:"createSelect",value:function(t,e,r){var n=document.createElement("select");n.id=t;var i=document.createElement("option");return i.value="",i.textContent="Select ".concat(e),i.disabled=!0,i.selected=!0,n.appendChild(i),r.forEach((function(t){var e=function(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,i,o,s,a=[],l=!0,c=!1;try{if(o=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;l=!1}else for(;!(l=(n=o.call(r)).done)&&(a.push(n.value),a.length!==e);l=!0);}catch(t){c=!0,i=t}finally{try{if(!l&&null!=r.return&&(s=r.return(),Object(s)!==s))return}finally{if(c)throw i}}return a}}(t,e)||function(t,e){if(t){if("string"==typeof t)return j(t,e);var r={}.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?j(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(t,2),r=e[0],i=e[1],o=document.createElement("option");o.value=r,o.textContent=i,n.appendChild(o)})),n}},{key:"setupEventListeners",value:function(){var t=this;this.modal.querySelector(".close").addEventListener("click",(function(){return t.closeModal()})),this.modal.querySelector("#edit-task-form").addEventListener("submit",(function(e){return t.handleSubmit(e)}))}},{key:"openModal",value:function(t){this.currentTask=t,this.populateForm(t),this.populateListSelect(),this.modal.style.display="block"}},{key:"closeModal",value:function(){this.modal.style.display="none"}},{key:"populateForm",value:function(t){var e=this.modal.querySelector("#edit-task-title"),r=this.modal.querySelector("#edit-task-description"),n=this.modal.querySelector("#edit-task-due-date"),i=this.modal.querySelector("#edit-task-priority"),o=this.modal.querySelector("#edit-task-list");e.value=t.title,r.value=t.description||"",n.value=t.dueDate||"",i.value=t.priority,o.value=t.list}},{key:"populateListSelect",value:function(){var t=this.modal.querySelector("#edit-task-list");t.innerHTML="",this.listService.getAllLists().forEach((function(e){var r=document.createElement("option");r.value=e.name,r.textContent=e.name,t.appendChild(r)}))}},{key:"handleSubmit",value:function(t){t.preventDefault();var e={title:this.modal.querySelector("#edit-task-title").value,description:this.modal.querySelector("#edit-task-description").value,dueDate:this.modal.querySelector("#edit-task-due-date").value||null,priority:this.modal.querySelector("#edit-task-priority").value,list:this.modal.querySelector("#edit-task-list").value};e.list!==this.currentTask.list&&this.taskService.moveTask(this.currentTask,this.currentTask.list,e.list),this.taskService.updateTask(e.list,this.currentTask,e),this.closeModal()}}],e&&O(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,e}();function I(t){return I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},I(t)}function D(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,A(n.key),n)}}function A(t){var e=function(t){if("object"!=I(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var r=e.call(t,"string");if("object"!=I(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==I(e)?e:e+""}var N=function(){return t=function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.taskService=e,this.listService=r,this.taskListElement=document.getElementById("taskList"),this.taskEditModal=new P(e,r),this.setupEventListeners()},(e=[{key:"setupEventListeners",value:function(){s.subscribe("taskAdded",this.renderTask.bind(this)),s.subscribe("taskUpdated",this.updateTaskElement.bind(this)),s.subscribe("taskRemoved",this.removeTaskElement.bind(this))}},{key:"renderAllTasks",value:function(t){var e=this,r=this.taskService.getTasksForList(t);this.taskListElement.innerHTML="",r.forEach((function(t){return e.renderTask({task:t})}))}},{key:"renderTask",value:function(t){var e=this,r=t.task,n=document.createElement("div");n.className="task",n.id="task-".concat(r.id);var i=document.createElement("input");i.type="checkbox",i.checked=r.completed,i.addEventListener("change",(function(){e.taskService.toggleTaskComplete(r.list,r)}));var o=document.createElement("span");o.textContent=r.title;var s=document.createElement("button");s.className="edit-task",s.textContent="Edit",s.addEventListener("click",(function(){e.showEditTaskForm(r)}));var a=document.createElement("button");a.className="delete-task",a.textContent="Delete",a.addEventListener("click",(function(){e.taskService.deleteTask(r.list,r)})),n.appendChild(i),n.appendChild(o),n.appendChild(s),n.appendChild(a),this.taskListElement.appendChild(n)}},{key:"updateTaskElement",value:function(t){var e=t.task,r=document.getElementById("task-".concat(e.id));r&&(r.querySelector("span").textContent=e.title,r.querySelector('input[type="checkbox"]').checked=e.completed)}},{key:"removeTaskElement",value:function(t){var e=t.task,r=document.getElementById("task-".concat(e.id));r&&r.remove()}},{key:"showEditTaskForm",value:function(t){this.taskEditModal.openModal(t)}}])&&D(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,e}();function M(t){return M="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},M(t)}function q(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,F(n.key),n)}}function F(t){var e=function(t){if("object"!=M(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var r=e.call(t,"string");if("object"!=M(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==M(e)?e:e+""}var _=function(){return t=function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.listService=e,this.createListContainer(),this.setupEventListeners()},e=[{key:"createListContainer",value:function(){this.listContainerElement=document.createElement("div"),this.listContainerElement.id="listContainer",document.body.appendChild(this.listContainerElement),this.newListFormContainer=document.createElement("div"),this.newListFormContainer.id="newListFormContainer",document.body.appendChild(this.newListFormContainer),this.newListFormContainer.appendChild(this.createNewListForm())}},{key:"setupEventListeners",value:function(){s.subscribe("listCreated",this.renderList.bind(this)),s.subscribe("listDeleted",this.removeListElement.bind(this)),s.subscribe("listUpdated",this.updateListElement.bind(this)),s.subscribe("listsSorted",this.renderAllLists.bind(this))}},{key:"renderAllLists",value:function(){var t=this,e=this.listService.getAllLists();this.listContainerElement.innerHTML="",e.forEach((function(e){return t.renderList({list:e})}))}},{key:"renderList",value:function(t){var e=this,r=t.list,n=document.createElement("div");n.className="list",n.id="list-".concat(r.name);var i=document.createElement("span");i.textContent=r.name;var o=document.createElement("button");o.className="edit-list",o.textContent="Edit",o.addEventListener("click",(function(){return e.showEditListForm(r)}));var s=document.createElement("button");s.className="delete-list",s.textContent="Delete",s.addEventListener("click",(function(){return e.listService.deleteList(r.name)})),n.appendChild(i),n.appendChild(o),n.appendChild(s),this.listContainerElement.appendChild(n)}},{key:"updateListElement",value:function(t){var e=t.list,r=document.getElementById("list-".concat(e.name));r&&(r.querySelector("span").textContent=e.name)}},{key:"removeListElement",value:function(t){var e=t.list,r=document.getElementById("list-".concat(e.name));r&&r.remove()}},{key:"showEditListForm",value:function(t){var e=prompt("Enter new name for the list:",t.name);e&&e!==t.name&&this.listService.updateListName(t.name,e)}},{key:"createNewListForm",value:function(){var t=this,e=document.createElement("form");e.id="new-list-form";var r=document.createElement("input");r.type="text",r.placeholder="New List Name",r.required=!0;var n=document.createElement("button");return n.type="submit",n.textContent="Create List",e.appendChild(r),e.appendChild(n),e.addEventListener("submit",(function(e){e.preventDefault();var n=r.value.trim();n&&(t.listService.createList(n),r.value="")})),e}}],e&&q(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,e}();document.addEventListener("DOMContentLoaded",(function(){var e=new T,r=new p(e),n=new N(r,e);new _(e).renderAllLists(),t("localStorage")&&!localStorage.getItem("lists")&&(e.getList("Inbox"),r.createTask("Inbox",{title:"Demo Task 1",description:"This is a demo task"}),r.createTask("Inbox",{title:"Demo Task 2",description:"Another demo task"})),n.renderAllTasks("Inbox")}))})();