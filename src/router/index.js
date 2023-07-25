import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import JobDetail from '@/components/JobDetail/JobDetail.vue';
import JobDetailSpecific from '@/components/JobDetail/JobDetailSpecific.vue';
import JobDetailEachSpecific from '@/components/JobDetail/JobDetailEachSpecific.vue';
import SignUp from '../views/SignUpForm.vue';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/nursing-jobs',
    component: JobDetail,
  },
  {
    path: '/allied-health-jobs',
    component: JobDetail,
  },
  {
    path: '/medical-doctor-jobs',
    component: JobDetail,
  },
  {
    path: '/executives-jobs',
    component: JobDetail,
  },
  {
    name: 'detail page specific',
    path: '/:name',
    component: JobDetailSpecific,
  },
  {
    name: 'detail page each specific',
    path: '/detail/:id',
    component: JobDetailEachSpecific,
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
