<template>
  <div>
    <Banner />
    <div style="background-color: #f5f6ff">
      <JobCategories />
    </div>
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
</script>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
    };
  },
  components: { JobCategories, CardItem, WhoWillUse },
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
