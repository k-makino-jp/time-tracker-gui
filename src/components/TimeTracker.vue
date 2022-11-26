<template>
  <h2 class="pt-2 pb-2 mb-3 border-bottom">Time Tracker</h2>

  <div class="card mb-3">
    <div class="card-header">
      <h4>Current Task</h4>
    </div>
    <div class="card-body">
      <form @submit.prevent="trigger">
        <div class="mb-3" id="commit-sha-src">
          <label for="exampleInputEmail1" class="form-label">Please enter current task
            name</label>
          <input v-model="task.name" class="form-control" list="datalistOptions" placeholder="e.g. Coding" pattern=".+"
            required>
          <datalist id="datalistOptions">
            <option value="Rest"></option>
            <option value="Meeting"></option>
            <option value="Research"></option>
            <option value="Designing"></option>
            <option value="Coding"></option>
            <option value="Testing"></option>
          </datalist>
        </div>

        <div class="mb-3 pb-3 border-bottom">
          <button type="submit" class="btn btn-primary">{{ button }}</button>
        </div>

        <div>
          <h6>Spend Time: {{ task.spendFormatted }}</h6>
        </div>
      </form>
    </div>
  </div>

  <div class="card mb-3">
    <div class="card-header d-flex justify-content-between">
      <h4>Today's Activities</h4>
      <div class="d-flex">
        <h4 style="color:#a9a9a9">Total Time Spend:&nbsp;</h4>
        <h4>{{ totalTimeSpend }}</h4>
      </div>
    </div>

    <div class="card-body">
      <table class="table table-hover table-striped align-middle">
        <thead>
          <tr>
            <th scope="col" style="width: 31%">Task Name</th>
            <th scope="col" style="width: 31%">Start Time - End Time</th>
            <th scope="col" style="width: 31%">Time Spend</th>
            <th scope="col" style="width: 7%"></th>
          </tr>
        </thead>
        <tbody class="border-bottom">
          <tr v-for="(task, key) in tasks" :key="key">
            <td>{{ task.name }}</td>
            <td class="each-task-spend-time">{{ task.startFormatted }} - {{ task.endFormatted }}</td>
            <td class="each-task-spend-time">{{ task.spendFormatted }}</td>
            <td>
              <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton"
                data-bs-toggle="dropdown" aria-expanded="false">
                Action
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

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Task: {{ editTask.name }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="edit">
                <div class="mb-3">
                  <label class="col-form-label">Task Name:</label>
                  <input v-model="editTask.name" class="form-control" pattern=".+" required>
                </div>
                <div class="mb-3">
                  <label class="col-form-label">Start Time (hh:mm:ss):</label>
                  <input v-model="editTask.startFormatted" class="form-control" pattern="\d{2}:\d{2}:\d{2}" required>
                </div>
                <div class="mb-3 pb-3">
                  <label class="col-form-label">End Time (hh:mm:ss):</label>
                  <input v-model="editTask.endFormatted" class="form-control" pattern="\d{2}:\d{2}:\d{2}" required>
                </div>

                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button type="submit" class="btn btn-primary">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <button type="button" @click="removeAll" class="btn btn-outline-danger mb-3">Clear All</button>
    </div>
  </div>

  <div class="card mb-3">
    <div class="card-header d-flex justify-content-between">
      <h4>Total Time Spend for Each Task</h4>
    </div>

    <div class="card-body">
      <table class="table table-hover table-striped align-middle">
        <thead>
          <tr>
            <th scope="col" style="width: 62%">Task Name</th>
            <th scope="col" style="width: 38%">Total Time Spend</th>
          </tr>
        </thead>
        <tbody class="border-bottom">
          <tr v-for="(task, key) in analyzedTasks" :key="key">
            <td>{{ task.name }}</td>
            <td class="each-task-spend-time">{{ task.spendFormatted }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>


</template>

<script>
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min.js"

import TaskRepository from "../repository/TaskRepository";
import { Task, calculateTotalTimeSpend, calculateTotalTimeSpendForEachTask } from "../entity/Task.js";

const BUTTON_START = 'Start';
const BUTTON_STOP = 'Stop';
const STORAGE_KEY = 'time-tracker-gui';

export default {
  data() {
    return {
      button: BUTTON_START,
      task: new Task(''),
      tasks: [],
      totalTimeSpend: '00:00:00',
      editTask: new Task(''),
      analyzedTasks: [],
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => { vm.init(); })
  },
  methods: {
    init() {
      this.tasks = TaskRepository.get(STORAGE_KEY);
      this.totalTimeSpend = calculateTotalTimeSpend(this.tasks);
      this.analyzedTasks = calculateTotalTimeSpendForEachTask(this.tasks);
    },
    trigger() {
      if (!this.task.start) {
        this.start();
      } else {
        this.stop();
      }
    },
    start() {
      this.button = BUTTON_STOP;
      this.task.setStart(new Date());
    },
    stop() {
      this.button = BUTTON_START;
      this.task.setEnd(new Date());
      this.tasks.push(Object.assign({}, this.task));
      this.totalTimeSpend = calculateTotalTimeSpend(this.tasks);
      this.analyzedTasks = calculateTotalTimeSpendForEachTask(this.tasks);
      TaskRepository.set(STORAGE_KEY, this.tasks);

      this.task.clear();
    },
    elapse() {
      if (this.task.start) {
        this.task.setEnd(new Date());
      }
    },
    removeAll() {
      TaskRepository.delete(STORAGE_KEY);
      this.tasks = [];
      this.totalTimeSpend = '00:00:00'
      this.analyzedTasks = [];
    },
    restart(index) {
      if (!this.task.start) {
        this.task.name = this.tasks[index].name;
        this.start();
      } else {
        alert("Another task already started.");
      }
    },
    remove(key) {
      this.tasks.splice(key, 1);
      this.totalTimeSpend = calculateTotalTimeSpend(this.tasks);
      this.analyzedTasks = calculateTotalTimeSpendForEachTask(this.tasks);
      TaskRepository.set(STORAGE_KEY, this.tasks);
    },
    showModal(index) {
      this.targetIndex = index;
      this.editTask.name = this.tasks[index].name;
      this.editTask.startFormatted = this.tasks[index].startFormatted;
      this.editTask.endFormatted = this.tasks[index].endFormatted;
      this.modal.show();
    },
    edit() {
      const task = this.tasks[this.targetIndex];
      // Concatenate 'YYYY-MM-DDT' and 'hh:mm:ss'.
      // In order to avoid locale, 'Z' should not be appended.
      const startFormatted = task.start.toISOString().substring(0, 11) + this.editTask.startFormatted;
      const endFormatted = task.end.toISOString().substring(0, 11) + this.editTask.endFormatted;

      this.editTask.setStart(new Date(startFormatted));
      this.editTask.setEnd(new Date(endFormatted));
      this.tasks[this.targetIndex] = Object.assign({}, this.editTask);

      this.totalTimeSpend = calculateTotalTimeSpend(this.tasks);
      this.analyzedTasks = calculateTotalTimeSpendForEachTask(this.tasks);
      TaskRepository.set(STORAGE_KEY, this.tasks);
      this.modal.hide();
    },
  },
  mounted() {
    const modal = document.getElementById('exampleModal')
    this.modal = new Modal(modal)

    setInterval(this.elapse, 1000);
  }
}
</script>

<style scoped>
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

.modal-content {
  border-radius: 0%;
}

.list-group .list-group-item.sidebaritem {
  background-color: #e7e7e7;
  border-top-color: #e7e7e7;
  border-bottom-color: #e7e7e7;
  /* or whatever color you'd like */
}

.list-group .list-group-item.sidebaritem:hover {
  background-color: #c0c0c0;
  border-top-color: #e7e7e7;
  border-bottom-color: #e7e7e7;
  /* or whatever color you'd like */
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, .1);
  border-color: rgba(255, 255, 255, .1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
}

.each-task-spend-time {
  font-family: SFMono-Regular;
}
</style>
