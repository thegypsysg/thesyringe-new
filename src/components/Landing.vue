<template>
  <div>
    <div v-if="isLoading" class="text-center loading-page">
      <v-progress-circular :size="50" color="#fa2964" indeterminate />
    </div>
    <div v-if="!isLoading && !token">
      <Banner />
      <div style="background-color: #f5f6ff" class="mb-10">
        <JobCategories :trending-card="trendingCard" />
      </div>
      <SpecificJobs :specific-jobs="specificJobs" />
      <CardItem :card1="card1" :card2="card2" :card3="card3" />
      <div style="background-color: #f5f6ff">
        <WhoWillUse />
      </div>
    </div>
    <div v-if="!isLoading && token">
      <SignUpForm />
    </div>
  </div>
</template>

<script setup>
import Banner from '@/components/Banner.vue';
import JobCategories from './JobCategories.vue';
import CardItem from './CardItem.vue';
import WhoWillUse from './whoWillUse.vue';
import SpecificJobs from './SpecificJobs.vue';
import SignUpForm from './SignUpForm.vue';
import axios from '@/util/axios';
import app from '@/util/eventBus';
</script>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLoading: false,
      drawer: false,
      trendingCard: [],
      specificJobs: [],
      card1: [],
      card2: [],
      card3: [],
      token: null,
    };
  },
  mounted() {
    this.getTrendingCardData();
    this.getSpecificJobs();
    this.getHealthWeb();
    this.checkNotDetail();
    app.config.globalProperties.$eventBus.$on(
      'getTrendingCardData2',
      this.getTrendingCardData2
    );
    app.config.globalProperties.$eventBus.$on(
      'getTokenStart',
      this.getTokenStart
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
      'getTokenStart',
      this.getTokenStart
    );
  },
  methods: {
    getTokenStart(tokenParam) {
      this.token = tokenParam;
    },
    checkNotDetail() {
      app.config.globalProperties.$eventBus.$emit('getHeaderLanding');
    },
    getTrendingCardData2() {
      this.token = null;
      this.getTrendingCardData();
    this.getSpecificJobs();
    this.getHealthWeb();
    this.checkNotDetail();
    },
    getTrendingCardData() {
      this.isLoading = true;
      axios
        .get(`/skillgroups/${this.$appId}`)
        .then((response) => {
          const data = response.data.data;
          // console.log(data);
          this.trendingCard = data.map((item) => {
            return {
              id: item.sgm_id || 1,
              img: item.image || '',
              title: item.group_name || '',
              tag: item.group_name || '',
              desc: item.description || '',
              path: item.slug ? `/${item.slug}` : '#',
            };
          });
          // console.log(this.trendingCard);

          // app.config.globalProperties.$eventBus.$emit(
          //   'update-image',
          //   this.items
          // );
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getSpecificJobs() {
      this.isLoading = true;
      axios
        .get(`/skills-by-groups/6/${this.$appId}`)
        .then((response) => {
          const data = response.data.data;
          // console.log(data);
          this.specificJobs = data.map((item) => {
            return {
              id: item.sgm_id || 1,
              title: item.group_name ? item.group_name + ' Jobs' : '',
              btn: item.group_name || '',
              path: item.slug ? `/${item.slug}` : '#',
              list: item.skills.map((skill) => {
                return {
                  id: skill.skills_id || 1,
                  text: skill.skills_name || '',
                  image: skill.image ? this.$fileURL + skill.image : '',
                  count: skill.jobs_count != null ? skill.jobs_count : '-',
                  // path:
                  //   skill.description.split(' ').join('').toLowerCase() +
                  //   'jobs',
                  path: skill.slug || '#',
                };
              }),
            };
          });
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getHealthWeb() {
      this.isLoading = true;
      axios
        .get(`/health/website-list`)
        .then((response) => {
          const data = response.data.data;
          const dataItem = data.map((item) => {
            return {
              img: this.$fileURL + item.image || '',
              title: item.settings_name || '',
            };
          });

          const cardOne = [dataItem[0]];
          const cardTwo = dataItem.slice(1, dataItem.length - 1);
          const cardThree = [dataItem[dataItem.length - 1]];

          this.card1 = cardOne.map((item) => {
            return {
              ...item,
              jobs: 12,
            };
          });
          this.card2 = cardTwo.map((item) => {
            return {
              ...item,
              jobs: Math.floor(Math.random() * 5) + 1,
            };
          });
          this.card3 = cardThree.map((item) => {
            return {
              ...item,
              jobs: 15,
            };
          });
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  components: { JobCategories, CardItem, WhoWillUse, SpecificJobs },
};
</script>

<style>
@font-face {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: normal;
  src: url('@/assets/font/nunito/Nunito-VariableFont_wght.ttf')
    format('opentype');
}

.loading-page {
  height: 100vh;
  margin-top: 300px;
}

@media (max-width: 599px) {
  .loading-page {
    margin-top: 450px;
  }
}
</style>
