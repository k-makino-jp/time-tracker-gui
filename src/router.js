import { createRouter, createWebHashHistory } from 'vue-router'
import TimeTracker from './components/TimeTracker.vue'
import TimeConverter from './components/TimeConverter.vue'
import PomodoroTimer from './components/PomodoroTimer.vue'
import DropPlan from './components/DropPlan.vue'
import TimeTrackerUsage from './components/TimeTrackerUsage.vue'

const routes = [
    {
        path: '/',
        component: TimeTracker
    },
    {
        path: '/timeconverter',
        component: TimeConverter
    },
    {
        path: '/pomodorotimer',
        component: PomodoroTimer
    },
    {
        path: '/dropplan',
        component: DropPlan,
    },
    {
        path: '/usage',
        component: TimeTrackerUsage
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
