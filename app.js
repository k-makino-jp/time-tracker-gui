
Vue.createApp({
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


Vue.createApp({
    data() {
        return {
            buttonContent: 'Calculate',
            result: 0,
            inputTime: '',
            selectedUnit: 'hour'
        }
    },
    methods: {
        calculate() {
            const inputTimeElements = this.inputTime.split(':');
            const hours = parseInt(inputTimeElements[0]);
            const minutes = parseInt(inputTimeElements[1]);
            const seconds = parseInt(inputTimeElements[2]);
            if (this.selectedUnit == 'hour') {
                this.result = hours + minutes / 60 + seconds / 3600;
            } else if (this.selectedUnit == 'minute') {
                this.result = hours * 60 + minutes + seconds / 60;
            } else {
                this.result = hours * 3600 + minutes * 60 + seconds;
            }
        },
    }
}).mount('#app-time-calculator')


Vue.createApp({
    data() {
        const sidebarContentsBase = `
        <div class="position-sticky list-group list-group-flush scrollarea" id="sidebarMenu">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <h6 class="d-flex justify-content-between px-3 mt-3 mb-3 text-muted"> <span>Tools</span> </h6>
                    <a class="nav-link list-group-item sidebaritem list-group-item-action px-4 py-3 lh-tight IsActiveTimeTracker" href="index.html">
                        <span data-feather="clock"></span>Time Tracker </a>
                    <a class="nav-link list-group-item sidebaritem list-group-item-action px-4 py-3 lh-tight IsActiveTimeConverter" href="time-calculator.html">
                        <span data-feather="activity"></span>Time Converter
                    </a>
        
                    <h6 class="d-flex justify-content-between px-3 mt-3 mb-3 text-muted"> <span>References</span> </h6>
                    <a class="nav-link list-group-item sidebaritem list-group-item-action px-4 py-3 lh-tight IsActiveUsage" href="usage.html">
                        <span data-feather="file"></span>Usage </a>
                    <a class="nav-link list-group-item sidebaritem list-group-item-action px-4 py-3 lh-tight" href="https://v3.ja.vuejs.org/guide/introduction.html">
                        <span data-feather="github"></span>Git Repository </a>
                </li>
            </ul>
        </div>`
        return {
            isActiveUsage: '',
            sidebarContents: {
                isActiveTimeTracker: sidebarContentsBase.replace('IsActiveTimeTracker', 'active'),
                isActiveTimeConverter: sidebarContentsBase.replace('IsActiveTimeConverter', 'active'),
                isActiveUsage: sidebarContentsBase.replace('IsActiveUsage', 'active'),
            }
        }
    },
}).mount('#app-sidebar')
