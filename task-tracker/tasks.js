"use strict";
class TaskManager {
    tasks = [];
    constructor() {
        this.load();
    }
    add(data) {
        const newTask = {
            id: Date.now() + Math.floor(Math.random() * 100),
            name: data.name,
            priority: data.priority,
            dueDate: data.dueDate,
            done: false
        };
        this.tasks.push(newTask);
        this.save();
        return newTask;
    }
    getAll() {
        return this.tasks;
    }
    clearAll() {
        this.tasks = [];
        this.save();
    }
    toggle(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.done = !task.done;
            this.save();
        }
    }
    filter(status) {
        if (status === "done")
            return this.tasks.filter(t => t.done);
        if (status === "pending")
            return this.tasks.filter(t => !t.done);
        return this.tasks;
    }
    sortBy(field) {
        const weights = { "High": 3, "Medium": 2, "Low": 1 };
        return [...this.tasks].sort((a, b) => {
            if (field === "priority") {
                return weights[b.priority] - weights[a.priority];
            }
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });
    }
    save() {
        localStorage.setItem("tasks_data", JSON.stringify(this.tasks));
    }
    load() {
        const stored = localStorage.getItem("tasks_data");
        this.tasks = stored ? JSON.parse(stored) : [];
    }
}
function groupBy(array, key) {
    return array.reduce((acc, item) => {
        const groupKey = String(item[key]);
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(item);
        return acc;
    }, {});
}
const globalManager = new TaskManager();
function addTask(name, priority, dueDate) {
    return globalManager.add({ name, priority, dueDate });
}
function toggleDone(id) {
    globalManager.toggle(id);
}
