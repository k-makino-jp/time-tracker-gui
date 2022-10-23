<template>
  <h2 class="pt-2 pb-2 mb-3 border-bottom">Time Tracker</h2>

  <div class="card mb-3">
    <div class="card-header">
      <h4>Current Task</h4>
    </div>
    <div class="card-body">
      <form @submit.prevent="triggerTimeTracking">
        <div class="mb-3" id="commit-sha-src">
          <label for="exampleInputEmail1" class="form-label">Please enter current task
            name</label>
          <input v-model="taskName" class="form-control" list="datalistOptions" placeholder="e.g. Coding" pattern=".+"
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
          <button type="submit" class="btn btn-primary">{{ buttonContent }}</button>
        </div>

        <div>
          <h6>Spend Time: {{ currentSpendTime }}</h6>
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
      <table class="table table-striped align-middle">
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
            <td>{{ task.taskName }}</td>
            <td class="each-task-spend-time">{{ task.startTime }} - {{ task.endTime }}</td>
            <td class="each-task-spend-time">{{ task.spendTime }}</td>
            <td>
              <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton"
                data-bs-toggle="dropdown" aria-expanded="false">
                Action
              </button>
              <ul class="dropdown-menu text-small shadow" style="">
                <li><a class="dropdown-item" @click="restartTask(key)">Restart</a></li>
                <li><a class="dropdown-item" @click="showModal(key)">Edit</a></li>
                <li><a class="dropdown-item text-danger" @click="removeItem(key)">Clear</a></li>
              </ul>

            </td>
          </tr>
        </tbody>
      </table>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Task: {{modalTaskName}}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="editItem">
                <div class="mb-3">
                  <label class="col-form-label">Task Name:</label>
                  <input v-model="inputTaskName" class="form-control" pattern=".+" required>
                </div>
                <div class="mb-3">
                  <label class="col-form-label">Start Time (hh:mm):</label>
                  <input v-model="inputStartTime" class="form-control" pattern="\d{2}:\d{2}" required>
                </div>
                <div class="mb-3 pb-3">
                  <label class="col-form-label">End Time (hh:mm):</label>
                  <input v-model="inputEndTime" class="form-control" pattern="\d{2}:\d{2}" required>
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
      <button type="button" @click="removeLocalStorageItem" class="btn btn-outline-danger mb-3">Clear All</button>
    </div>
  </div>


</template>

<script>
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min.js"

export default {
  data() {
    return {
      buttonContent: 'Start',
      currentSpendTime: '00:00:00',
      totalTimeSpend: '',
      taskName: '',
      tasks: [],
      inputTaskName: '',
      inputStartTime: '',
      inputEndTime: '',
      modal: null,
      modalTaskName: '',
      modalTargetTaskIndex: 0,
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => { vm.load(); })
  },
  methods: {
    createLocalStorageKey() {
      // const today = new Date();
      // return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '';
      return 'time-tracker-gui';
    },
    load() {
      this.tasks = JSON.parse(localStorage.getItem(this.createLocalStorageKey()));
      if (this.tasks == null) {
        this.tasks = []
      }
      let totalTime = 0;
      for (let i in this.tasks) {
        const spendTime = new Date('1970-01-01T' + this.tasks[i].spendTime + 'Z');
        totalTime += spendTime.getTime();
      }
      const total = new Date(totalTime);
      const totalHours = total.getHours() + (total.getTimezoneOffset() / 60) + '';
      const totalMinutes = total.getMinutes() + '';
      const totalSeconds = total.getSeconds() + '';
      this.totalTimeSpend = totalHours.padStart(2, '0') + ":" + totalMinutes.padStart(2, '0') + ":" + totalSeconds.padStart(2, '0');
    },
    removeLocalStorageItem() {
      localStorage.removeItem(this.createLocalStorageKey());
      this.tasks = [];
      this.totalTimeSpend = '00:00:00'
    },
    restartTask(key) {
      if (!this.isStarted) {
        this.taskName = this.tasks[key].taskName;
        this.startTimeTracking();
      } else {
        alert("Another task already started.");
      }
    },
    showModal(key) {
      this.inputTaskName = this.tasks[key].taskName;
      this.inputStartTime = this.tasks[key].startTime;
      this.inputEndTime = this.tasks[key].endTime;
      this.modalTargetTaskIndex = key;
      this.modalTaskName = this.tasks[key].taskName;
      // $('#exampleModal').show();
      this.modalObj.show();
    },
    editItem() {
      const key = this.modalTargetTaskIndex;
      const startElement = this.inputStartTime.split(':')
      const startTimeHours = startElement[0];
      const startTimeMinutes = startElement[1];
      const endElement = this.inputEndTime.split(':')
      const endTimeHours = endElement[0];
      const endTimeMinutes = endElement[1];

      // calc current spend time
      const now = new Date();
      const startTimeStr = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + 'T' + this.inputStartTime;
      const endTimeStr = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + 'T' + this.inputEndTime;
      const startTime = new Date(startTimeStr);
      const endTime = new Date(endTimeStr);

      const diffMilliSec = endTime - startTime;
      const diff = new Date(diffMilliSec);
      const diffHours = diff.getHours() + (diff.getTimezoneOffset() / 60) + '';
      const diffMinutes = diff.getMinutes() + '';
      const diffSeconds = diff.getSeconds() + '';
      this.currentSpendTime = diffHours.padStart(2, '0') + ":" + diffMinutes.padStart(2, '0') + ":" + diffSeconds.padStart(2, '0');

      const task = {
        taskName: this.inputTaskName,
        spendTime: this.currentSpendTime,
        startTime: startTimeHours.padStart(2, '0') + ':' + startTimeMinutes.padStart(2, '0'),
        endTime: endTimeHours.padStart(2, '0') + ':' + endTimeMinutes.padStart(2, '0'),
      };
      this.tasks.splice(key, 1, task);

      let totalTime = 0;
      for (let i in this.tasks) {
        const spendTime = new Date('1970-01-01T' + this.tasks[i].spendTime + 'Z');
        totalTime += spendTime.getTime();
      }
      const total = new Date(totalTime);
      const totalHours = total.getHours() + (total.getTimezoneOffset() / 60) + '';
      const totalMinutes = total.getMinutes() + '';
      const totalSeconds = total.getSeconds() + '';
      this.totalTimeSpend = totalHours.padStart(2, '0') + ":" + totalMinutes.padStart(2, '0') + ":" + totalSeconds.padStart(2, '0');

      localStorage.setItem(this.createLocalStorageKey(), JSON.stringify(this.tasks));
      // $('#exampleModal').hide();
      this.modalObj.hide();
    },
    removeItem(key) {
      console.log(key, this.tasks)
      this.tasks.splice(key, 1);

      let totalTime = 0;
      for (let i in this.tasks) {
        const spendTime = new Date('1970-01-01T' + this.tasks[i].spendTime + 'Z');
        totalTime += spendTime.getTime();
      }
      const total = new Date(totalTime);
      const totalHours = total.getHours() + (total.getTimezoneOffset() / 60) + '';
      const totalMinutes = total.getMinutes() + '';
      const totalSeconds = total.getSeconds() + '';
      this.totalTimeSpend = totalHours.padStart(2, '0') + ":" + totalMinutes.padStart(2, '0') + ":" + totalSeconds.padStart(2, '0');
      this.taskName = '';// clear task name for form
      this.currentSpendTime = '00:00:00'

      localStorage.setItem(this.createLocalStorageKey(), JSON.stringify(this.tasks));
    },
    canBeStarted() {
      return this.taskName.length > 0
    },
    triggerTimeTracking() {
      if (!this.isStarted) {
        this.startTimeTracking();
      } else {
        this.stopTimeTracking();
      }
    },
    startTimeTracking() {
      if (this.canBeStarted()) {
        this.isStarted = true;
        this.startTime = new Date();
        this.buttonContent = 'Stop';
      }
    },
    stopTimeTracking() {
      this.isStarted = false;
      this.buttonContent = 'Start';
      const startTimeHours = this.startTime.getHours() + '';
      const startTimeMinutes = this.startTime.getMinutes() + '';
      const endTimeHours = this.endTime.getHours() + '';
      const endTimeMinutes = this.endTime.getMinutes() + '';
      const task = {
        taskName: this.taskName,
        spendTime: this.currentSpendTime,
        startTime: startTimeHours.padStart(2, '0') + ':' + startTimeMinutes.padStart(2, '0'),
        endTime: endTimeHours.padStart(2, '0') + ':' + endTimeMinutes.padStart(2, '0'),
      }
      this.tasks.push(task)

      let totalTime = 0;
      for (let i in this.tasks) {
        const spendTime = new Date('1970-01-01T' + this.tasks[i].spendTime + 'Z');
        totalTime += spendTime.getTime();
      }
      const total = new Date(totalTime);
      const totalHours = total.getHours() + (total.getTimezoneOffset() / 60) + '';
      const totalMinutes = total.getMinutes() + '';
      const totalSeconds = total.getSeconds() + '';
      this.totalTimeSpend = totalHours.padStart(2, '0') + ":" + totalMinutes.padStart(2, '0') + ":" + totalSeconds.padStart(2, '0');
      this.taskName = '';// clear task name for form
      this.currentSpendTime = '00:00:00'

      localStorage.setItem(this.createLocalStorageKey(), JSON.stringify(this.tasks));
    },
    updateCurrentTime() {
      if (this.isStarted) {
        this.endTime = new Date();
        const diffMilliSec = this.endTime - this.startTime;
        const diff = new Date(diffMilliSec);
        const diffHours = diff.getHours() + (diff.getTimezoneOffset() / 60) + '';
        const diffMinutes = diff.getMinutes() + '';
        const diffSeconds = diff.getSeconds() + '';
        this.currentSpendTime = diffHours.padStart(2, '0') + ":" + diffMinutes.padStart(2, '0') + ":" + diffSeconds.padStart(2, '0');
      }
    },
  },
  mounted() {
    const modal = document.getElementById('exampleModal')
    this.modalObj = new Modal(modal)

    setInterval(this.updateCurrentTime, 1000);
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
