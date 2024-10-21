import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      alias: "/tutorials",
      component: HomeView
    },
    {
      path: "/tutorials/:id",
      name: "tutorial-details",
      component: () => import("../components/TutorialDetails.vue"),
    },
    {
      path: '/add',
      name: 'add',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AddTutorial.vue')
    }
  ]
})

export default router
