<template>
  <v-container class="mt-4">
    <div class="sec-title">
      <h2><span>EMPLOYER </span>SETTINGS</h2>
      <p>List of places where you can find work</p>
    </div>
    <v-row class="mb-8 d-flex" :class="{ 'flex-column': isSmall }">
      <v-col :cols="isSmall ? 12 : 4">
        <div>
          <div v-for="(card, i) in cardItem1" :key="i">
            <v-lazy :options="{ threshold: 0.5 }" min-height="200">
              <v-card
                class="mx-auto card-item"
                min-width="200"
                height="300"
                elevation="0"
              >
                <v-img
                  :src="card.img"
                  height="100%"
                  width="100%"
                  class="card-image"
                  cover
                >
                  <template #placeholder> <div class="skeleton" /> </template
                ></v-img>
                <div class="card-tag">{{ card.jobs }} Jobs</div>

                <v-card-title class="card-title">{{ card.title }}</v-card-title>
              </v-card>
            </v-lazy>
          </div>
        </div>
      </v-col>
      <v-col :cols="isSmall ? 12 : 4">
        <div
          class="card-container flex-wrap"
          :class="{ 'card-container-2': isSmall }"
        >
          <div v-for="(card, i) in cardItems" :key="i">
            <v-lazy :options="{ threshold: 0.5 }" min-height="140">
              <v-card
                class="mx-auto card-item"
                :class="{ 'my-2': isSmall }"
                :min-width="!isSmall ? 170 : 155"
                height="140"
                elevation="0"
              >
                <v-img
                  :src="card.img"
                  height="100%"
                  width="100%"
                  class="card-image"
                  cover
                >
                  <template #placeholder> <div class="skeleton" /> </template
                ></v-img>
                <div class="card-tag">{{ card.jobs }} Jobs</div>
                <v-card-title
                  class="card-title"
                  :class="{ 'card-title-2': isSmall }"
                  >{{ card.title }}</v-card-title
                >
              </v-card>
            </v-lazy>
          </div>
        </div>
      </v-col>
      <v-col :cols="isSmall ? 12 : 4">
        <div>
          <div v-for="(card, i) in cardItem2" :key="i">
            <v-lazy :options="{ threshold: 0.5 }" min-height="300">
              <v-card
                class="mx-auto card-item"
                min-width="200"
                height="300"
                elevation="0"
              >
                <v-img
                  :src="card.img"
                  height="100%"
                  width="100%"
                  class="card-image"
                  cover
                >
                  <template #placeholder> <div class="skeleton" /> </template
                ></v-img>
                <div class="card-tag">{{ card.jobs }} Jobs</div>

                <v-card-title class="card-title">{{ card.title }}</v-card-title>
              </v-card>
            </v-lazy>
          </div>
        </div>
      </v-col>
    </v-row>
    <div class="w-100 d-flex justify-center mb-4">
      <a href="#" class="btn btn-outline-light"
        >View All <i class="fa fa-circle-arrow-right"></i
      ></a>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cardItem1: [
        {
          img: require('@/assets/card-1.jpg'),
          title: 'Public Hospital',
          jobs: 12,
        },
      ],
      cardItems: [
        {
          img: require('@/assets/card-2a.jpg'),
          title: 'Clinics',
          jobs: 2,
        },
        {
          img: require('@/assets/card-2b.jpg'),
          title: 'Imaging Center',
          jobs: 1,
        },
        {
          img: require('@/assets/card-2c.jpg'),
          title: 'Nursing Home',
          jobs: 2,
        },
        {
          img: require('@/assets/card-2d.jpg'),
          title: 'Dialysis Center',
          jobs: 4,
        },
      ],
      cardItem2: [
        {
          img: require('@/assets/card-3.jpg'),
          title: 'Medical Centers',
          jobs: 15,
        },
      ],
      screenWidth: window.innerWidth,
    };
  },
  computed: {
    isSmall() {
      return this.screenWidth < 640;
    },
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.screenWidth = window.innerWidth;
    },
    previousSlideCategory() {
      this.activeIndexCategory--;
    },
    nextSlideCategory() {
      this.activeIndexCategory++;
    },
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  gap: 20px;
  width: 100%;
}
.card-container-2 {
  gap: 5px;
}

.card-item {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  flex-grow: 1;
  width: 100%;
}

.card-image {
  position: absolute;
  transition: all 0.3s;
  top: 0;
  left: 0;
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
  transform: scale(1);
}

.card-item:hover .card-image {
  transform: scale(1.2);
}

.card-title {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  text-align: center;
  width: 100%;
}

.card-title-2 {
  font-size: 14px;
}

.card-tag {
  background: #fa2964;
  color: #ffffff;
  position: absolute;
  top: 10px;
  left: 0;
  padding: 5px 15px;
  font-size: 11px;
}

.skeleton {
  width: 100%;
  height: 100%;
  border-radius: 0;

  background: linear-gradient(-90deg, #f2f2f2 0%, #e1e1e1 50%, #f2f2f2 100%);
  background-size: 400% 400%;
  animation: skeleton 1.6s ease infinite;
}

@keyframes skeleton {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}

@media (max-width: 1279px) {
  .card-container {
    flex-wrap: wrap;
  }
}
</style>
