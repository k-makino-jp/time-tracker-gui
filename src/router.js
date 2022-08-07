import { createRouter, createWebHashHistory } from 'vue-router'
import TimeTracker from './components/TimeTracker.vue'
import TimeConverter from './components/TimeConverter.vue'
import TimeTrackerUsage from './components/TimeTrackerUsage.vue'
import TimeTrackerForAzureDevOps from './components/TimeTrackerForAzureDevOps.vue'

const routes = [
    {
        path: '/',
        component: TimeTracker
    },
    {
        path: '/timetrackerforazuredevops',
        component: TimeTrackerForAzureDevOps
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
