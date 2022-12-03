<template>
  <h2 class="pt-2 pb-2 mb-3 border-bottom">Task List</h2>

  <div v-if="message" class="alert alert-danger" role="alert">
    {{message}}
  </div>

  <div class="card mb-3">
    <div class="card-header">
      <h4>New Task</h4>
    </div>
    <div class="card-body">
      <form @submit.prevent="add" class="row g-3">
        <div class="col-md-4">
          <label for="inputEmail4" class="form-label">Task Name</label>
          <input v-model="task.name" class="form-control" placeholder="breaktime, coding, etc " pattern=".+" required>
        </div>
        <div class="col-md-4">
          <label for="inputPassword4" class="form-label">Start Date (Optional)</label>
          <input v-model="task.start" class="form-control" placeholder="YYYY-MM-DD" pattern="\d{4}-\d{2}-\d{2}">
        </div>
        <div class="col-md-4">
          <label for="inputPassword4" class="form-label">End Date (Optional)</label>
          <input v-model="task.end" class="form-control" placeholder="YYYY-MM-DD" pattern="\d{4}-\d{2}-\d{2}">
        </div>
        <div>
          <button type="submit" class="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
  </div>

  <div class="card mb-3">
    <div class="card-header">
      <h4>Task List</h4>
    </div>
    <div class="card-body">
      <table class="table table-hover table-striped align-middle">
        <thead>
          <tr>
            <th scope="col" style="width: 31%">Task Name</th>
            <th scope="col" style="width: 31%">Start Date</th>
            <th scope="col" style="width: 31%">End Date</th>
            <th scope="col" style="width: 7%"></th>
          </tr>
        </thead>
        <tbody class="border-bottom">
          <tr v-for="(task, key) in tasks" :key="key">
            <td>{{ task.name }}</td>
            <td>{{ task.start }}</td>
            <td>{{ task.end }}</td>
            <td>
              <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton"
                data-bs-toggle="dropdown" aria-expanded="false">
                Action (does not work)
              </button>
              <ul class="dropdown-menu text-small shadow" style="">
                <li><a class="dropdown-item" @click="restart(key)">Restart</a></li>
                <li><a class="dropdown-item" @click="showModal(key)">Edit</a></li>
                <li><a class="dropdown-item text-danger" @click="remove(key)">Clear</a></li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>

      <button type="button" @click="removeAll" class="btn btn-outline-danger">Clear All</button>
    </div>

    
  </div>

</template>

<script>
import LocalStorage from "../infrastructure/LocalStorage"

const STORAGE_KEY = 'time-tracker-gui-work-item';

export default {
  data() {
    return {
      task: {},
      tasks: [],
      message: '',
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => { vm.init(); })
  },
  methods: {
    init() {
      const tasks = JSON.parse(LocalStorage.get(STORAGE_KEY));
      if (!tasks) {
        this.tasks = [];
        return;
      }
      this.tasks = tasks;
    },
    add() {
      this.message = '';
      if (this.tasks.find(task => task.name === this.task.name)) {
        this.message = "ERROR: Same task name cannot be specified.";
        return;
      }
      this.tasks.push(Object.assign({}, this.task));
      LocalStorage.set(STORAGE_KEY, this.tasks);
    },
    removeAll() {
      this.message = '';

      LocalStorage.delete(STORAGE_KEY);
      this.tasks = [];
    },
  }
};
</script>

<style scoped>
.alert {
  border-radius: 0%;  
}

.card {
  border-radius: 0%;
}

.card-header {
  background-color: #fff;
}

.btn {
  border-radius: 0%;
}

.form-control {
  border-radius: 0%;
}

.form-select {
  border-radius: 0%;
}
</style>
