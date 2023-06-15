<template>
  <div>
    <Banner />
    <div style="background-color: #f5f6ff" class="mb-10">
      <JobCategories />
    </div>
    <SpecificJobs />
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
</script>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
    };
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
