<template>
  <div>
    <div v-if="isLoading" class="text-center loading-page">
      <v-progress-circular :size="50" color="#fa2964" indeterminate />
    </div>
    <template v-if="!isLoading">
      <div v-if="isSmall" class="banner-container">
        <!-- <div class="btn-container d-flex justify-space-between pt-2 px-4">
        <v-btn
          size="40"
          to="/"
          variant="text"
          icon
          color="black"
          style="background: white"
        >
          <v-icon> mdi-chevron-left </v-icon>
        </v-btn>
        <div class="d-flex" style="gap: 20px">
          <v-btn
            size="40"
            variant="text"
            icon
            color="black"
            style="background: white"
          >
            <v-icon> mdi-share-variant-outline </v-icon>
          </v-btn>
          <v-btn
            size="40"
            variant="text"
            icon
            color="black"
            style="background: white"
          >
            <v-icon> mdi-heart-outline </v-icon>
          </v-btn>
        </div>
      </div> -->
        <!-- <v-img src="@/assets/job-detail-banner.jpg" /> -->
        <div class="banner-header text-center">
          <h1>{{ itemData.title }}</h1>
        </div>
        <div class="w-100 d-flex justify-center mx-auto pa-2">
          <v-select
            :label="`Select ${itemData.title} Specialization`"
            :items="[
              'California',
              'Colorado',
              'Florida',
              'Georgia',
              'Texas',
              'Wyoming',
            ]"
            style="width: 200px !important"
            variant="outlined"
          />
        </div>
      </div>
      <div v-if="!isSmall" class="banner-container-desktop">
        <v-img cover :src="itemData.image" />
      </div>
      <div>
        <v-select
          v-if="!isSmall"
          :label="`Select ${itemData.title} Specialization`"
          :items="[
            'California',
            'Colorado',
            'Florida',
            'Georgia',
            'Texas',
            'Wyoming',
          ]"
          variant="outlined"
          class="section-select-desktop my-12"
        />
        <div
          class="card-container d-flex flex-wrap"
          :class="{
            'mb-2 justify-space-between': isSmall,
            'justify-space-around mb-8': !isSmall,
          }"
        >
          <!-- <v-card
        v-for="n in 18"
        :key="n"
        class="my-4 pa-4 mx-3"
        elevation="1"
        width="13%"
        @click="toggle"
      >
        <div class="d-flex fill-height align-center flex-column">
          <div class="mb-1 card-text">20% off</div>
          <img src="@/assets/images/icons/off-20.png" height="100" />
          <div class="mt-3 card-text">
            <span class="text-red">32</span> Promos
          </div>
        </div>
      </v-card> -->
          <div
            v-for="item in itemData.list"
            :key="item.id"
            :class="{ 'card-item-2': isSmall, 'card-item': !isSmall }"
          >
            <v-lazy :options="{ threshold: 0.5 }" min-height="100">
              <v-card
                :height="isSmall ? 200 : 220"
                :width="isSmall ? 180 : 250"
                class="my-1 text-left"
                :class="{ 'pa-2 mx-1': isSmall, ' mx-3': !isSmall }"
                elevation="0"
                @click="toggle"
              >
                <div
                  v-if="!isSmall"
                  style="
                    font-size: 14px;
                    font-weight: 600;
                    margin-bottom: 10px;
                    line-height: 19.36px;
                  "
                  class="pt-2"
                >
                  {{ item.text + ' ('
                  }}<span style="color: #fa2964">{{ item.jobs }}</span> Jobs{{
                    ')'
                  }}
                </div>
                <div
                  v-if="isSmall"
                  style="
                    font-size: 14px;
                    font-weight: 600;
                    margin-bottom: 10px;
                    line-height: 19.36px;
                  "
                  class="pt-2 fw-700"
                >
                  {{ item.text.substring(0, 19) + '..' }}
                </div>
                <div
                  :class="{
                    'card-img-container': !isSmall,
                    'card-img-container-2': isSmall,
                  }"
                >
                  <v-img
                    :src="item.image"
                    :height="isSmall ? 200 : 220"
                    cover
                    class="card-img"
                    transition="fade-transition"
                  >
                    <template #placeholder>
                      <div class="skeleton" />
                    </template>
                  </v-img>
                </div>
              </v-card>
            </v-lazy>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import axios from '@/util/axios';

export default {
  // eslint-disable-next-line vue/no-reserved-component-names

  data() {
    return {
      isLoading: false,
      screenWidth: window.innerWidth,
      itemData: [],
      title: '',
      // totalData: 0,
    };
  },
  computed: {
    isSmall() {
      return this.screenWidth < 640;
    },
    totalData() {
      let tData = 0;
      this.screenWidth < 640 ? (tData = 12) : (tData = 18);
      return tData;
    },
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  mounted() {
    this.getSpecificJobs();
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.screenWidth = window.innerWidth;
    },
    getSpecificJobs() {
      this.isLoading = true;
      axios
        .get(`/skills-by-groups`)
        .then((response) => {
          const data = response.data.data;
          const filterKey = this.$route.path.split('/')[1];
          const filteredData = data.filter((d) => d.slug === filterKey);

          this.itemData = {
            title: filteredData[0].group_name || '',
            image: this.$fileURL + filteredData[0].image || '',
            list: filteredData[0].skills.map((item) => {
              return {
                id: item.skills_id || 1,
                text: item.skills_name || '',
                jobs: 20,
                image: item.image ? this.$fileURL + item.image : '',
              };
            }),
          };
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
};
</script>

<style scoped>
.banner-header {
  color: #fa2964;
  font-weight: 900;
}
.banner-container {
  margin-top: 150px;
  position: relative;
}
.btn-container {
  position: absolute;
  top: 0;
  width: 100%;
}
.banner-container img {
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
}

.section-select {
  width: 230px;
  margin: 0 auto;
  color: black !important;
  position: absolute;
  top: 25%;
  left: 50%;
  z-index: 1000;
  background: white;
  border-radius: 5px;
  transform: translate(-50%, -50%);
}
.banner-container-desktop {
  height: 500px;
  margin-top: 90px;
}
.banner-container-desktop img {
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
}

.section-select-desktop {
  width: 280px;
  margin: 0 auto;
  color: black !important;
}

.card-container {
  width: 100%;
}

.card-img-container {
  position: relative;
  overflow: hidden;
  height: 220px;
  width: 250px;
}
.card-img-container-2 {
  overflow: hidden;
  height: 200px;
  width: 180px;
  margin: auto;
}

.card-img {
  transition: all 0.3s;
  transform: scale(1);
  width: 100%;
  height: 100%;
}
.card-img-container:hover .card-img {
  transform: scale(1.2);
}

.card-text {
  font-size: 14px;
  font-weight: 700;
}

.fw-700 {
  font-weight: 700;
}
.fs-10 {
  font-size: 10px;
}
.fs-14 {
  font-size: 14px;
}

.skeleton {
  width: 100%;
  height: 100%;
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
</style>
