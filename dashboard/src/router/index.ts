import { createWebHistory, createRouter } from 'vue-router';

import HomePage from '@/pages/HomePage.vue';
import TuplesPage from '@/pages/TuplesPage.vue';

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
  },
  {
    path: '/tuples',
    name: 'Tuples',
    component: TuplesPage,
    meta: {
      icon: 'code'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
