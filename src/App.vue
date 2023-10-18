<template>
  <v-app>
    <div>
      <Header :is-welcome="currentRoute === '/signup' ? true : false" />
      <RouterView v-slot="{ Component }">
        <Transition name="page-opacity" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
      <Footer v-if="currentRoute !== '/signup' && currentRoute !== '/resume-profile' && !token" />
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
      currentRoute: this.$route.path,
      token: null,
    };
  },
  watch: {
    $route: function () {
      this.currentRoute = this.$route.path;
    },
  },
  mounted() {
    const url = new URL(window.location.href);
      const tokenParam = url.searchParams.get("token");
      localStorage.setItem('token', tokenParam);
      
    this.getApplicant(tokenParam)

      
    app.config.globalProperties.$eventBus.$on(
      'getTrendingCardData2',
      this.getTrendingCardData2
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
  },
  methods: {
    getApplicant(tokenParam) {
    this.isLoading = true;
    axios
      .get(`/gypsy-applicant`, {
        headers: {
          Authorization: `Bearer ${tokenParam}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        console.log(data);
        if(data) {
        this.token = tokenParam
        app.config.globalProperties.$eventBus.$emit('getTokenStart', tokenParam);
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
