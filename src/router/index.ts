import {createRouter,createWebHistory} from 'vue-router'
import powerView from '../views/power-view.vue'

const router = createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path:'/',
            name:'powerview',
            component:powerView
        }
    ]
})

export default router