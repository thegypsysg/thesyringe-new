<template>
  <v-app>
    <div>
      <Header :is-welcome="currentRoute === '/signup' ? true : false" />
      <RouterView v-slot="{ Component }">
        <Transition name="page-opacity" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
      <Footer v-if="currentRoute !== '/signup' && currentRoute !== '/resume-profile' && !token && !isApply && !isEmployment && !isCheck" />
    </div>
  </v-app>
</template>

<script>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Footer from '@/components/Footer.vue';
import app from '@/util/eventBus';
import axios from '@/util/axios';

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { RouterView, Header, Footer },
  data() {
    return {
      isApply: false,
      isEmployment: false,
      isCheck: false,
      currentRoute: this.$route.path,
      token: null,
    };
  },
  created() {

    const url = new URL(window.location.href);
    const tokenParam = url.searchParams.get("token");
    if(tokenParam) {
      localStorage.setItem('token', tokenParam);
    }
    
    this.getApplicant(tokenParam)
  },
  watch: {
    $route: function () {
      this.currentRoute = this.$route.path;
    },
  },
  mounted() {
    app.config.globalProperties.$eventBus.$on(
      'getTrendingCardData2',
      this.getTrendingCardData2
    );
    app.config.globalProperties.$eventBus.$on(
      'applyJob',
      this.applyJob
    );
    app.config.globalProperties.$eventBus.$on(
      'applyJobFalse',
      this.applyJobFalse
    );
    app.config.globalProperties.$eventBus.$on(
      'employmentJob',
      this.employmentJob
    );
    app.config.globalProperties.$eventBus.$on(
      'employmentJobFalse',
      this.employmentJobFalse
    );
    app.config.globalProperties.$eventBus.$on(
      'checkJob',
      this.checkJob
    );
    app.config.globalProperties.$eventBus.$on(
      'checkJobFalse',
      this.checkJobFalse
    );
  },
  beforeUnmount() {
    // app.config.globalProperties.$eventBus.$off(
    //   'getHeaderDetail',
    //   this.getHeaderDetail
    // );
    app.config.globalProperties.$eventBus.$off(
      'getTrendingCardData2',
      this.getTrendingCardData2
    );
    app.config.globalProperties.$eventBus.$off(
      'applyJob',
      this.applyJob
    );
    app.config.globalProperties.$eventBus.$off(
      'applyJobFalse',
      this.applyJobFalse
    );
    app.config.globalProperties.$eventBus.$off(
      'employmentJob',
      this.employmentJob
    );
    app.config.globalProperties.$eventBus.$off(
      'employmentJobFalse',
      this.employmentJobFalse
    );
    app.config.globalProperties.$eventBus.$off(
      'checkJob',
      this.checkJob
    );
    app.config.globalProperties.$eventBus.$off(
      'checkJobFalse',
      this.checkJobFalse
    );
  },
  methods: {
    applyJob() {
      this.isApply = true;
    },
    applyJobFalse() {
      this.isApply = false;
    },
    employmentJob() {
      this.isEmployment = true;
    },
    employmentJobFalse() {
      this.isEmployment = false;
    },
    checkJob() {
      this.isCheck = true;
    },
    checkJobFalse() {
      this.isCheck = false;
    },
    getApplicant(tokenParam) {
    this.isLoading = true;
      const token = localStorage.getItem("token");
      axios
      .get(`/gypsy-applicant`, {
        headers: {
          Authorization: `Bearer ${tokenParam ? tokenParam : token}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        console.log(data);
        if(data && data.basic_steps == null) {
          this.token = tokenParam ? tokenParam : token;
          app.config.globalProperties.$eventBus.$emit('getTokenStart', tokenParam ? tokenParam : token);
          localStorage.setItem('applicant_data', JSON.stringify(data))
        } else if(data && data.basic_steps == 'C' && this.currentRoute == '/') {
          this.$router.push(`/${data.slug}`);
          app.config.globalProperties.$eventBus.$emit('getTrendingCardData2');
        } else if(data == null) {
          app.config.globalProperties.$eventBus.$emit('changeHeaderPath', "/");
        }
        
        if (data.slug) {
          this.path = `/${data.slug}`;
          app.config.globalProperties.$eventBus.$emit('changeHeaderPath', `/${data.slug}`);
        } else {
        this.path = "/";
          app.config.globalProperties.$eventBus.$emit('changeHeaderPath', "/");
      }
        // else {
        //   app.config.globalProperties.$eventBus.$emit('getTrendingCardData2');
        // }
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
        
        // app.config.globalProperties.$eventBus.$emit('getTrendingCardData2');
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
    getTrendingCardData2() {
      this.token = null;
    },
  },
};
</script>

<style>
@import '@/assets/style/App.scss';

.page-opacity-enter-active,
.page-opacity-leave-active {
  transition: 400ms ease all;
}

.page-opacity-enter-from,
.page-opacity-leave-to {
  opacity: 0;
}
</style>
