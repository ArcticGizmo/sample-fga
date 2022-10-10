import { createWebHistory, createRouter } from 'vue-router';

import HomePage from '@/pages/HomePage.vue';

const routes = [
  {
    path: '/',
    redirect: '/home',
    meta: {
      hide: true
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    meta: {
      icon: 'house'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
