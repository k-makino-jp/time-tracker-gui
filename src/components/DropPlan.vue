<template>
  <h2 class="pt-2 pb-2 mb-3 border-bottom">Drop Plan</h2>

  <div v-if="message" class="alert alert-danger" role="alert">
    {{message}}
  </div>

  <div class="card mb-3">
    <div class="card-header">
      <h4>Task List</h4>
    </div>
    <div class="card-body">
      <form @submit.prevent="add" class="row g-3">
        <div class="col-md-4">
          <label for="inputEmail4" class="form-label">Task Name</label>
          <input v-model="task.name" class="form-control" placeholder="e.g. Coding" pattern=".+" required>
        </div>
        <div class="col-md-4">
          <label for="inputPassword4" class="form-label">Start Date</label>
          <input v-model="task.start" class="form-control" placeholder="YYYY-MM-DD" pattern="\d{4}-\d{2}-\d{2}"
            required>
        </div>
        <div class="col-md-4">
          <label for="inputPassword4" class="form-label">End Date</label>
          <input v-model="task.end" class="form-control" placeholder="YYYY-MM-DD" pattern="\d{4}-\d{2}-\d{2}" required>
        </div>
        <div class="mb-3 pb-3 border-bottom">
          <button type="submit" class="btn btn-primary">Add</button>
        </div>
      </form>

      <table class="table table-hover table-striped align-middle">
        <thead>
          <tr>
            <th scope="col">Task Name</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
          </tr>
        </thead>
        <tbody class="border-bottom">
          <tr v-for="(task, key) in tasks" :key="key">
            <td>{{ task.name }}</td>
            <td>{{ task.start }}</td>
            <td>{{ task.end }}</td>
          </tr>
        </tbody>
      </table>

      <button type="button" @click="removeAll" class="btn btn-outline-danger mb-3">Clear All</button>
    </div>
  </div>

  <div class="card mb-3">
    <div class="card-header">
      <h4>Gantt Chart</h4>
    </div>
    <div class="card-body">
      <GChart :type="type" :data="data" :options="options" :settings="settings" />
    </div>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts';

import LocalStorage from "../infrastructure/LocalStorage"

const COLUMNS = [
  { type: 'string', label: 'Task ID' },
  { type: 'string', label: 'Task Name' },
  { type: 'date', label: 'Start Date' },
  { type: 'date', label: 'End Date' },
  { type: 'number', label: 'Duration' },
  { type: 'number', label: 'Percent Complete' },
  { type: 'string', label: 'Dependencies' },
];

const CHART_TYPE = 'Gantt';

const STORAGE_KEY = 'time-tracker-gui-drop-plan';

export default {
  name: 'GoogleChart',
  components: {
    GChart,
  },
  data() {
    return {
      type: CHART_TYPE,
      data: null,
      options: { height: 42 },
      settings: {
        packages: ['gantt'],
      },
      task: {},
      tasks: [],
      rows: [],
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
      console.log(this.tasks);
      console.log(this.tasks.length);
      this.rows = this.tasks.map(task => [
        task.name,
        task.name,
        new Date(task.start),
        new Date(task.end),
        null,
        0,
        null
      ]);
      this.data = [COLUMNS, ...this.rows];
      this.options = {
        height: 42 * (this.tasks.length + 1),
      };
    },
    add() {
      this.message = '';
      if (this.tasks.find(task => task.name === this.task.name)) {
        this.message = "ERROR: Same task name cannot be specified.";
        return;
      }
      this.tasks.push(Object.assign({}, this.task));
      const row = [
        this.task.name, // id
        this.task.name,
        new Date(this.task.start),
        new Date(this.task.end),
        null,
        0,
        null,
      ];
      this.rows.push(row);
      this.data = [COLUMNS, ...this.rows];
      this.options = {
        height: 42 * (this.tasks.length + 1),
      };
      LocalStorage.set(STORAGE_KEY, this.tasks);
    },
    removeAll() {
      this.message = '';

      LocalStorage.delete(STORAGE_KEY);
      this.tasks = [];
      this.rows = [];
      this.data = null;
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
