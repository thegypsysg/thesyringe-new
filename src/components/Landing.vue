<template>
  <div>
    <Banner />
    <JobCategories />
    <CardItem />
    <hr />
    <Footer />
  </div>
</template>

<script setup>
import Banner from '@/components/Banner.vue';
import Footer from '@/components/Footer.vue';
import JobCategories from './JobCategories.vue';
import CardItem from './CardItem.vue';
</script>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
    };
  },
  components: { JobCategories, CardItem },
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
