import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import JobCategoriesdetail from '@/components/JobCategoriesdetail.vue';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/job-categories',
    component: JobCategoriesdetail,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
