
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
}).mount('#app-time-tracking')
