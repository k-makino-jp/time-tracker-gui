<template>
  <h2 class="pt-2 pb-2 mb-3 border-bottom">Drop Plan (Beta)</h2>

  <div v-if="message" class="alert alert-danger" role="alert">
    {{ message }}
  </div>

  <div class="card mb-3">
    <div class="card-header">
      <h4>Iteration Length</h4>
    </div>
    <div class="card-body">
      <form @submit.prevent="updateIteration" class="row g-3">
        <div class="col-md-6">
          <label for="inputPassword4" class="form-label">Start Date</label>
          <input v-model="iterationStart" class="form-control" placeholder="YYYY-MM-DD" pattern="\d{4}-\d{2}-\d{2}"
            required>
        </div>
        <div class="col-md-6">
          <label for="inputPassword4" class="form-label">End Date</label>
          <input v-model="iterationEnd" class="form-control" placeholder="YYYY-MM-DD" pattern="\d{4}-\d{2}-\d{2}"
            required>
        </div>
        <div class="">
          <button type="submit" class="btn btn-primary">Update</button>
        </div>
      </form>
    </div>
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
      <h4>Timeline</h4>
    </div>
    <div class="card-body">
      <GChart :type="type" :data="data" :options="options" :settings="settings" />
    </div>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts';

import { Iteration } from "../entity/Iteration"
import LocalStorage from "../infrastructure/LocalStorage"
import { convertUnixTimeToLocaleDate } from "../utility/Date";

const COLUMNS = [
  { type: 'string', id: 'Role' },
  { type: 'string', id: 'Name' },
  { type: 'string', id: 'style', role: 'style' },
  { type: 'date', id: 'Start' },
  { type: 'date', id: 'End' },
];

const CHART_TYPE = 'Timeline';

const STORAGE_KEY = 'time-tracker-gui-drop-plan';
const STORAGE_KEY_ITERATION = 'time-tracker-gui-drop-plan-iteration'

const COLORCODE_GREEN = '#90ee90';
const COLORCODE_GRAY = '#d3d3d3';

const TIMELINE_OPTION = {
  timeline: {
    colorByRowLabel: true
  },
  alternatingRowStyle: false,
  backgroundColor: '#f8f8f8',
  hAxis: {
    count: -1,
    format: 'M/d\nEEE',
  },
}

export default {
  name: 'GoogleChart',
  components: {
    GChart,
  },
  data() {
    return {
      type: CHART_TYPE,
      data: null,
      options: {
        height: 45,
        ...TIMELINE_OPTION,
      },
      settings: {
        packages: ['timeline'],
      },
      task: {},
      tasks: [],
      rows: [],
      message: '',
      iterationStart: "",
      iterationEnd: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => { vm.init(); })
  },
  methods: {
    init() {
      const iteration = JSON.parse(LocalStorage.get(STORAGE_KEY_ITERATION));
      let iterationRow;
      if (iteration) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        iterationRow = [
          [
            "Current Iteration",
            "in the past",
            COLORCODE_GREEN,
            new Date(iteration.start),
            new Date(today),
          ],
          [
            "Current Iteration",
            "in the future",
            COLORCODE_GRAY,
            new Date(today),
            new Date(iteration.end),
          ],
          ...this.rows,
        ]
      }

      const tasks = JSON.parse(LocalStorage.get(STORAGE_KEY));
      if (!tasks) {
        this.tasks = [];
        this.rows = [...iterationRow];
        // return;
      } else {
        this.tasks = tasks;
        const rows = this.tasks.map(task => [
          task.name,
          "",
          COLORCODE_GRAY,
          convertUnixTimeToLocaleDate(new Date(task.start).getTime()),
          convertUnixTimeToLocaleDate(new Date(task.end).getTime()),
        ]);
        this.rows = [...iterationRow, ...rows];
      }

      this.data = [COLUMNS, ...this.rows];
      console.log(this.data)
      this.options = {
        height: 50 * (this.rows.length + 1),
        ...TIMELINE_OPTION,
      };
    },
    updateIteration() {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      const start = new Date(this.iterationStart);
      const end = new Date(this.iterationEnd);
      const iteration = new Iteration(start, end)

      this.rows = [
        [
          "Current Iteration",
          "in the past",
          COLORCODE_GREEN,
          iteration.start,
          today,
        ],
        [
          "Current Iteration",
          "in the future",
          COLORCODE_GRAY,
          today,
          iteration.end,
        ],
        ...this.rows,
      ];
      this.options = {
        height: 50 * (this.rows.length + 1),
        ...TIMELINE_OPTION,
      };
      this.data = [COLUMNS, ...this.rows];
      LocalStorage.set(STORAGE_KEY_ITERATION, iteration);
    },
    add() {
      this.message = '';
      if (this.tasks.find(task => task.name === this.task.name)) {
        this.message = "ERROR: Same task name cannot be specified.";
        return;
      }
      this.tasks.push(Object.assign({}, this.task));
      const row = [
        this.task.name,
        "",
        COLORCODE_GRAY,
        new Date(this.task.start),
        new Date(this.task.end),
      ];
      this.rows.push(row);
      this.data = [COLUMNS, ...this.rows];
      this.options = {
        height: 50 * (this.rows.length + 1),
      };
      LocalStorage.set(STORAGE_KEY, this.tasks);
    },
    removeAll() {
      this.message = '';

      LocalStorage.delete(STORAGE_KEY);
      LocalStorage.delete(STORAGE_KEY_ITERATION);
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
