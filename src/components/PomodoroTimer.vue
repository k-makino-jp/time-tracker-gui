<template>
  <h2 class="pt-2 pb-2 mb-3 border-bottom">Pomodoro Timer</h2>

  <div class="card mb-3">
    <div class="card-header">
      <h4>Timer</h4>
    </div>
    <div class="card-body">
      <form @submit.prevent="triggerPomodoroTimer">
        <div class="mb-3">
          <label class="form-label">Working Time [minutes]</label>
          <input v-model="workTime" class="form-control" list="datalistOptions" placeholder="25" pattern="\d+" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Rest Time [minutes]</label>
          <input v-model="restTime" class="form-control" list="datalistOptions" placeholder="5" pattern="\d+" required>
        </div>

        <div class="mb-3 pb-3 border-bottom">
          <button type="submit" class="btn btn-primary">{{ buttonContent }}</button>
        </div>

        <div>
          <h6 class="text-center">{{ state }}</h6>
          <h2 class="text-center">Remaining: {{ remainingTime }}</h2>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttonContent: 'Start',
      workTime: 25,
      restTime: 5,
      state: '',
      remainingTime: '00:00'
    }
  },
  methods: {
    triggerPomodoroTimer() {
      if (!this.isStarted) {
        this.startTimeTracking();
      } else {
        this.stopTimeTracking();
      }
    },
    startTimeTracking() {
      this.isStarted = true;
      let startTime = new Date();
      if (this.state == '' || this.state == 'working...') {
        this.state = 'working...';
        this.endTime = startTime.setMinutes(startTime.getMinutes() + parseInt(this.workTime, 10));
      } else {
        this.endTime = startTime.setMinutes(startTime.getMinutes() + parseInt(this.restTime, 10));
      }
      this.buttonContent = 'Reset';
    },
    stopTimeTracking() {
      this.isStarted = false;
      this.state = '';
      this.buttonContent = 'Start';
      this.remainingTime = '00:00';
    },
    updateCurrentTime() {
      if (this.isStarted) {
        const now = new Date();
        const remainingTimeMillSec = this.endTime - now;
        const elapsedTime = new Date(remainingTimeMillSec);
        if (remainingTimeMillSec <= 0) {
          if (this.state == '' || this.state == 'working...') {
            this.state = 'work break';
            this.startTimeTracking();
          } else {
            this.state = 'working...';
            this.startTimeTracking();
          }
          this.remainingTime = '00:00';
          return;
        }
        const diffMinutes = elapsedTime.getMinutes() + '';
        const diffSeconds = elapsedTime.getSeconds() + '';
        this.remainingTime = diffMinutes.padStart(2, '0') + ":" + diffSeconds.padStart(2, '0');
      }
    },
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
</style>
