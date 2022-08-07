<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 mb-3 border-bottom">
    <h1>Time Tracker</h1>
  </div>

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
      <table class="table">
        <thead class="table-light">
          <tr class="bg-light">
            <th scope="col" style="width: 34%">Task Name</th>
            <th scope="col" style="width: 33%">Start Time - End Time</th>
            <th scope="col" style="width: 33%">Time Spend</th>
          </tr>
        </thead>
        <tbody class="border-bottom">
          <tr v-for="(task, key) in tasks" :key="key">
            <td>{{ task.taskName }}</td>
            <td class="each-task-spend-time">{{ task.startTime }} - {{ task.endTime }}</td>
            <td class="each-task-spend-time">{{ task.spendTime }}</td>
          </tr>
        </tbody>
      </table>

      <button type="button" @click="convertToJson" class="btn btn-secondary mb-3 mr-3">Convert to json</button>
      <button type="button" @click="removeLocalStorageItem" class="btn btn-secondary mb-3">Remove Cache</button>
      <div v-if="isConvertToJson" class="border">
        <pre><code>{{ tasks }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttonContent: 'Start',
      currentSpendTime: '00:00:00',
      totalTimeSpend: '',
      taskName: '',
      tasks: [],
      isConvertToJson: false
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
    },
    removeLocalStorageItem() {
      localStorage.removeItem(this.createLocalStorageKey());
      this.tasks = [];
      this.totalTimeSpend = ''
    },
    canBeStarted() {
      return this.taskName.length > 0
    },
    triggerTimeTracking() {
      this.isConvertToJson = false
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
    convertToJson() {
      this.isConvertToJson = true;
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
    confirmSave(event) {
      event.returnValue = "";
    },
  },
  created() {
    window.addEventListener("beforeunload", this.confirmSave);
  },
  unmounted() {
    window.removeEventListener("beforeunload", this.confirmSave);
  },
  mounted() {
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
