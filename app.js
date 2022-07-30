
Vue.createApp({
    data() {
        return {
            buttonContent: 'Start',
            currentSpendTime: '00:00:00',
            totalTimeSpend: '',
            taskName: '',
            tasks: [],
            isConvertToJson: false,
            isActive: true
        }
    },
    methods: {
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
    destroyed() {
        window.removeEventListener("beforeunload", this.confirmSave);
    },
    mounted() {
        setInterval(this.updateCurrentTime, 1000);
    }
}).mount('#app-time-tracking')
