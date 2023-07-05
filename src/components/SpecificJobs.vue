<template>
  <div>
    <div :class="{ 'mt-16': isSmall }">
      <div
        class="promotion-container"
        v-for="item in specificJobs"
        :key="item.id"
      >
        <div
          class="w-100 d-flex justify-space-between"
          :class="{
            'px-16': !isSmall,
            'px-5 section-head mt-n8 mb-n4': isSmall,
          }"
        >
          <h3>
            <span style="color: #fa2964; font-weight: 700">{{
              item.title
            }}</span>
            IN {{ itemSelected.toUpperCase() }}
          </h3>
          <router-link :to="item.path" class="text-decoration-none">
            <h1 class="view-all">View all</h1>
          </router-link>
        </div>
        <v-sheet class="mx-auto" elevation="0">
          <v-slide-group v-model="model" class="pa-4">
            <!-- <template #prev="{ on, attrs }">
              <v-btn
                v-if="activeIndexCategory > 1"
                color="black"
                rounded
                icon
                v-bind="attrs"
                v-on="on"
                @click="previousSlideCategory"
              >
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </template>
            <template #next="{ on, attrs }">
              <v-btn
                v-if="activeIndexCategory + 1 <= item.list.length / 6"
                color="black"
                rounded
                icon
                v-bind="attrs"
                @click="nextSlideCategory"
                v-on="on"
              >
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </template> -->
            <v-slide-group-item
              v-for="card in item.list"
              :key="card"
              v-slot="{ toggle }"
              class="mx-4"
            >
              <v-lazy :options="{ threshold: 0.5 }" min-height="100">
                <v-card
                  class="my-4"
                  :class="{ 'mx-3 text-center': !isSmall, 'mx-1': isSmall }"
                  :height="!isSmall ? 220 : 200"
                  :width="!isSmall ? 280 : 200"
                  elevation="0"
                  @click="toggle"
                >
                  <div
                    v-if="isSmall"
                    style="
                      font-size: 16px;
                      font-weight: 600;
                      margin-bottom: 10px;
                      line-height: 19.36px;
                    "
                    class="pt-2"
                  >
                    {{
                      card.text.length >= 14
                        ? card.text.substring(0, 14) + '..' + ' ('
                        : card.text + ' ('
                    }}<span style="color: #fa2964">20</span> Jobs{{ ')' }}
                  </div>
                  <div
                    v-if="!isSmall"
                    style="
                      font-size: 16px;
                      font-weight: 600;
                      margin-bottom: 10px;
                      line-height: 19.36px;
                    "
                    class="pt-2"
                  >
                    {{
                      card.text.length >= 30
                        ? card.text.substring(0, 30) + '..'
                        : card.text
                    }}
                  </div>
                  <div class="card-image-cont">
                    <v-img
                      :src="card.image"
                      class="card-image"
                      height="220"
                      cover
                      transition="fade-transition"
                    >
                      <template #placeholder>
                        <div class="skeleton skeleton-category ml-2" />
                      </template>
                    </v-img>
                  </div>
                </v-card>
              </v-lazy>
            </v-slide-group-item>
            <v-slide-group-item v-slot="{ toggle }">
              <v-lazy :options="{ threshold: 0.5 }" min-height="100">
                <v-card
                  class="my-4 text-center mx-3 d-flex flex-column align-center justify-center px-auto pa-10"
                  height="220"
                  width="180"
                  elevation="0"
                  :to="item.path"
                  style="border-radius: 12px; gap: 20px"
                  @click="toggle"
                >
                  <div
                    class="text-left"
                    style="font-weight: 600; font-size: 12px"
                  >
                    <p>View All {{ item.btn }}</p>
                  </div>
                  <v-btn
                    size="40"
                    color="#0197d5"
                    rounded
                    icon
                    v-bind="attrs"
                    :to="item.path"
                    v-on="on"
                  >
                    <v-icon color="white"> mdi-arrow-right </v-icon>
                  </v-btn>
                </v-card>
              </v-lazy>
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: ['specificJobs'],
  data() {
    return {
      model: null,
      activeIndexCategory: 1,
      // items: [
      //   {
      //     title: 'NURSING JOBS',
      //     btn: 'Nursing',
      //     path: '/nursing-jobs',
      //     list: [
      //       {
      //         text: 'ICU Nurse',
      //         image: require('@/assets/job-detail-1a.png'),
      //       },
      //       {
      //         text: 'Dialysis Nurse',
      //         image: require('@/assets/job-detail-1b.png'),
      //       },
      //       {
      //         text: 'Medical & Surgical Nurse',
      //         image: require('@/assets/job-detail-1c.png'),
      //       },
      //       {
      //         text: 'In-Patient / Out-Patient Nurse',
      //         image: require('@/assets/job-detail-1d.png'),
      //       },
      //       {
      //         text: 'Orthopedic Nurse',
      //         image: require('@/assets/job-detail-1e.png'),
      //       },
      //       {
      //         text: 'Infection Control Nurse',
      //         image: require('@/assets/job-detail-1f.png'),
      //       },
      //       {
      //         text: 'Radiologic Imaging Nurse',
      //         image: require('@/assets/job-detail-1g.png'),
      //       },
      //     ],
      //   },
      // ],
      screenWidth: window.innerWidth,
    };
  },
  computed: {
    ...mapState(['itemSelected']),
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

<style lang="scss" scoped>
.card-image-cont {
  position: relative;
  overflow: hidden;
  height: 220px;
  width: 280px;
}
.card-image {
  width: 100%;
  height: 100%;
  transition: all 0.3s;
  transform: scale(1);
}
.card-image-cont:hover .card-image {
  transform: scale(1.2);
}
.promotion-container {
  background: white;
}
.promotion-container .v-sheet {
  background: white;
  margin-bottom: 40px;
}
.promotion-container h3 {
  color: black;
  font-family: 'Inter', sans-serif;
}

.promotion-container .view-all {
  font-size: 16px;
  text-transform: none;
  color: #00cdcd;
}

.skeleton {
  height: 100%;
  background: linear-gradient(-90deg, #f2f2f2 0%, #e1e1e1 50%, #f2f2f2 100%);
  background-size: 400% 400%;
  animation: skeleton 1.6s ease infinite;
}

.skeleton-category {
  width: 280px !important;
}

.section-head {
  font-size: 12px !important;
}

@keyframes skeleton {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>
