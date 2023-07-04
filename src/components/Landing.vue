<template>
  <div>
    <Banner />
    <div style="background-color: #f5f6ff" class="mb-10">
      <JobCategories :trending-card="trendingCard" />
    </div>
    <SpecificJobs :specific-jobs="specificJobs" />
    <CardItem />
    <div style="background-color: #f5f6ff">
      <WhoWillUse />
    </div>
  </div>
</template>

<script setup>
import Banner from '@/components/Banner.vue';
import JobCategories from './JobCategories.vue';
import CardItem from './CardItem.vue';
import WhoWillUse from './whoWillUse.vue';
import SpecificJobs from './SpecificJobs.vue';
import axios from '@/util/axios';
</script>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      trendingCard: [],
      specificJobs: [],
    };
  },
  mounted() {
    this.getTrendingCardData();
    this.getSpecificJobs();
  },
  methods: {
    getTrendingCardData() {
      // this.isLoading = true;
      axios
        .get(`/skillgroups`)
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
        });
      // .finally(() => {
      //   this.isLoading = false;
      // });
    },
    getSpecificJobs() {
      axios
        .get(`/skills-by-groups`)
        .then((response) => {
          const data = response.data.data;
          // console.log(data);
          this.specificJobs = data.map((item) => {
            return {
              id: item.sgm_id || 1,
              title: item.group_name
                ? item.group_name.toUpperCase() + ' JOBS'
                : '',
              btn: item.group_name || '',
              path: item.slug ? `/${item.slug}` : '#',
              list: item.skills.slice(0, 6).map((skill) => {
                return {
                  text: skill.skills_name || '',
                  image: skill.image ? this.$fileURL + skill.image : '',
                };
              }),
            };
          });
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
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
</style>
