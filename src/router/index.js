import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import JobDetail from '@/components/JobDetail/JobDetail.vue';
import JobDetailSpecific from '@/components/JobDetail/JobDetailSpecific.vue';
import ViewAllFromSpecific from '@/components/JobDetail/ViewAllFromSpecific.vue';
import JobDetailEachSpecific from '@/components/JobDetail/JobDetailEachSpecific.vue';
import RecognisedQualifications from '@/components/RecognisedQualifications.vue';
import SignUp from '../views/SignUpForm.vue';
import PrivacyTerms from "../views/PrivacyTerms.vue";
import MyProfile from "../views/MyProfile.vue";
import ResumeProfile from "../views/ResumeProfile.vue";

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: "/my-profile",
    component: MyProfile,
  },
  {
    path: "/resume-profile",
    component: ResumeProfile,
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
    name: 'view all specific',
    path: '/view-all/:id',
    component: ViewAllFromSpecific,
  },
  {
    name: 'detail page each specific',
    path: '/detail/:id',
    component: JobDetailEachSpecific,
  },
  {
    name: 'recognised qualifications',
    path: '/recognised-qualifications',
    component: RecognisedQualifications,
  },
  {
    path: "/privacy-policy",
    name: "Privacy Policy",
    component: PrivacyTerms,
  },
  {
    path: "/our-terms",
    name: "OurTerms",
    component: PrivacyTerms,
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
