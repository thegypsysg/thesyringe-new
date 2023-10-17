<template>
  <Landing />
</template>

<script>
import Landing from '@/components/Landing.vue';

export default {
  components: { Landing },

  data() {
    return {
      latitude: null,
      longitude: null,
    };
  },
  mounted() {
    this.getLocation();
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position) {
              this.latitude = position.coords.latitude;
              this.longitude = position.coords.longitude;
              //console.log(this.latitude, this.longitude);
              localStorage.setItem('latitude', this.latitude);
              localStorage.setItem('longitude', this.longitude);
            }
          },
          (error) => {
            console.log('Error getting location:', error.message);
          }
        );
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
