import LocalStorage from "../infrastructure/LocalStorage"
import { Task } from "../entity/Task"

class TaskRepository {
  constructor(storage = LocalStorage) {
    this.storage = storage;
  }

  get(key) {
    const tasks = JSON.parse(this.storage.get(key));
    if (!tasks) {
      return [];
    }
    return tasks.map(task => {
      const t = new Task(task.name);
      t.setStart(new Date(task.start));
      t.setEnd(new Date(task.end));
      return t;
    })
  }

  set(key, value) {
    return this.storage.set(key, value);
  }

  delete(key) {
    return this.storage.delete(key);
  }
}

export default new TaskRepository();