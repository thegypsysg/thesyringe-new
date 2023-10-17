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
      this.token = tokenParam

      
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
