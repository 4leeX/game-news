import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/Home.vue';
import GameDetails from '../pages/GameDetails.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/games/:slug',
    name: 'details',
    component: GameDetails
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;