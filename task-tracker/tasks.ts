interface Task {
  id: number;
  name: string;
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  done: boolean;
}

class TaskManager {
  private tasks: Task[] = [];

  constructor() {
    this.load();
  }

  add(data: Omit<Task, "id" | "done">): Task {
    const newTask: Task = {
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

  getAll(): Task[] {
    return this.tasks;
  }

  clearAll(): void {
    this.tasks = [];
    this.save();
  }

  toggle(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.done = !task.done;
      this.save();
    }
  }

  filter(status: "all" | "done" | "pending"): Task[] {
    if (status === "done") return this.tasks.filter(t => t.done);
    if (status === "pending") return this.tasks.filter(t => !t.done);
    return this.tasks;
  }

  sortBy(field: keyof Pick<Task, "priority" | "dueDate">): Task[] {
    const weights = { "High": 3, "Medium": 2, "Low": 1 };
    return [...this.tasks].sort((a, b) => {
      if (field === "priority") {
        return weights[b.priority] - weights[a.priority];
      }
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }

  private save(): void {
    localStorage.setItem("tasks_data", JSON.stringify(this.tasks));
  }

  load(): void {
    const stored = localStorage.getItem("tasks_data");
    this.tasks = stored ? JSON.parse(stored) : [];
  }
}

function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

const globalManager = new TaskManager();
function addTask(name: string, priority: "Low" | "Medium" | "High", dueDate: string): Task {
  return globalManager.add({ name, priority, dueDate });
}
function toggleDone(id: number): void {
  globalManager.toggle(id);
}
