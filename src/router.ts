import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Screen from './pages/Screen.vue'
import Complete from './pages/Complete.vue'
import Admin from './pages/Admin.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/screen', component: Screen },
    { path: '/complete', component: Complete },
    { path: '/admin', component: Admin },
  ],
})

export default router
