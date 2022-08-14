import { createRouter, createWebHashHistory } from 'vue-router'
import TimeTracker from './components/TimeTracker.vue'
import TimeConverter from './components/TimeConverter.vue'
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
        path: '/usage',
        component: TimeTrackerUsage
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
