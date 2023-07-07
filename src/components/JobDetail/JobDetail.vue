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
        <div class="text-center mb-2">
          <h2>
            <span class="banner-header">{{ itemData.title }}</span> Jobs
          </h2>
        </div>
        <div class="w-100 d-flex justify-center mx-auto pa-2">
          <v-select
            :label="`Select ${itemData.title} Specialization`"
            :items="skillsGroup"
            v-model="selectedSkill"
            style="width: 200px !important"
            variant="outlined"
            clearable
          />
        </div>
      </div>
      <div v-if="!isSmall" class="banner-container-desktop">
        <v-img cover :src="itemData.image" />
      </div>
      <div>
        <template v-if="!isSmall">
          <div class="text-center my-4">
            <h2>
              <span class="banner-header">{{ itemData.title }}</span> Jobs
            </h2>
          </div>
          <v-select
            v-if="!isSmall"
            :label="`Select ${itemData.title} Specialization`"
            :items="skillsGroup"
            v-model="selectedSkill"
            variant="outlined"
            class="section-select-desktop mb-12"
            clearable
          />
        </template>
        <div
          class="card-container mx-auto"
          :class="{
            'd-flex flex-wrap justify-center mb-2': isSmall,
            'card-container-desktop mb-8': !isSmall,
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
          <transition-group name="card-transition" mode="out-in">
            <div
              v-for="item in filteredSkills"
              :key="item.id"
              class="card-transition mx-auto"
              :class="{ 'card-item-2 mx-auto': isSmall }"
            >
              <v-lazy :options="{ threshold: 0.5 }" min-height="100">
                <v-card
                  :height="isSmall ? 200 : 250"
                  :width="isSmall ? '100%' : 300"
                  class="my-2 text-left card-cont"
                  :class="{ 'pa-2 mx-1': isSmall, ' mx-3': !isSmall }"
                  elevation="0"
                  @click="toggle"
                >
                  <div
                    v-if="!isSmall"
                    style="
                      font-size: 16px;
                      font-weight: 600;
                      margin-bottom: 10px;
                      line-height: 19.36px;
                    "
                    class="pt-2 text-left"
                  >
                    {{
                      item.text.length >= 35
                        ? item.text.substring(0, 35) + '..'
                        : item.text
                    }}
                  </div>
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
                      item.text.length >= 50
                        ? item.text.substring(0, 50) + '..'
                        : item.text
                    }}
                  </div>
                  <div
                    class="trending__app"
                    :class="{
                      'card-img-container': !isSmall,
                      'card-img-container-2': isSmall,
                    }"
                  >
                    <div class="cart clearfix animate-effect">
                      <div class="action">
                        <div class="px-2 text-center">
                          <v-btn
                            elevation="4"
                            :to="item.path"
                            style="
                              background-color: #fa2964;
                              border-radius: 0;
                              padding-left: 6px;
                              padding-right: 6px;
                              padding-top: 4px;
                              padding-bottom: 4px;
                              font-weight: 600;
                              font-size: 12px;
                            "
                          >
                            <span class="text-black" style="">VIEW JOBS</span>
                          </v-btn>
                        </div>
                      </div>
                    </div>
                    <div class="overlay"></div>
                    <v-img
                      :src="item.image"
                      :height="isSmall ? 120 : 170"
                      cover
                      class="card-img"
                      transition="fade-transition"
                    >
                      <template #placeholder>
                        <div class="skeleton" />
                      </template>
                    </v-img>
                  </div>
                  <div
                    style="
                      font-weight: 600;
                      font-size: 14px;
                      position: relative;
                    "
                    class="py-2 text-left"
                  >
                    <span style="color: #fa2964">24</span> Jobs
                  </div>

                  <div class="card-btn-container d-flex justify-space-between">
                    <v-btn
                      color="black"
                      class="card-btn"
                      width="32"
                      height="32"
                      icon="mdi-share-variant-outline"
                    >
                      <v-icon size="20" color="red">
                        mdi-share-variant-outline
                      </v-icon></v-btn
                    >
                    <v-btn
                      class="card-btn"
                      color="black"
                      icon="mdi-heart-outline"
                      width="32"
                      height="32"
                    >
                      <v-icon size="20" color="red"> mdi-heart-outline </v-icon>
                    </v-btn>
                  </div>
                </v-card>
              </v-lazy>
            </div>
          </transition-group>
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
      itemData: {},
      title: '',
      skillsGroup: [],
      skillsCard: [],
      selectedSkill: null,
      // totalData: 0,
    };
  },
  computed: {
    isSmall() {
      return this.screenWidth < 640;
    },
    filteredSkills() {
      if (!this.selectedSkill) {
        return this.skillsCard;
      } else {
        // const searchTextLower = this.search.toLowerCase();
        return this.skillsCard.filter((item) => {
          return item.text.includes(this.selectedSkill);
        });
      }
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
    filterCards(tag) {
      // console.log("ok");
      this.selectedSkill = tag;
    },
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
            id: filteredData[0].sgm_id || 1,
            title: filteredData[0].group_name || '',
            image: this.$fileURL + filteredData[0].image || '',
          };
          this.getListSkill(this.itemData.id);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getListSkill(id) {
      this.isLoading = true;
      axios
        .get(`/skills/group/${id}`)
        .then((response) => {
          const data = response.data.data;
          this.skillsGroup = data.map((item) => item.skills_name);
          this.skillsCard = data.map((item) => {
            return {
              id: item.skills_id || 1,
              text: item.skills_name || '',
              jobs: 20,
              image: item.image ? this.$fileURL + item.image : '',
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
  min-width: 280px;
  max-width: 400px;
  margin: 0 auto;
  color: black !important;
}

.card-item-2 {
  width: 95% !important;
}

.card-container {
  width: 100%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 100;
}

.trending__app:hover .overlay {
  opacity: 1;
}

.card-container-desktop {
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
}

.card-cont {
  position: relative;
}

.card-img-container {
  position: relative;
  overflow: hidden;
  height: 170px;
  width: 300px;
}
.card-img-container-2 {
  position: relative;
  overflow: hidden;
  height: 120px;
  width: 100%;
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
.card-img-container-2:hover .card-img {
  transform: scale(1.2);
}

.card-btn-container {
  position: absolute;
  gap: 10px;
  bottom: 25px;
  right: 20px;
  z-index: 100;
}

.card-btn {
  background: #fff !important;
  border: none !important;
  box-shadow: 1px rgba(0, 0, 0, 1) !important;
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

.card-transition-enter-active,
.card-transition-leave-active {
  transition: transform 0.5s, opacity 0.3s;
}

.card-transition-enter {
  opacity: 0;
  transform: translateX(-50%);
}

.card-transition-leave-to {
  opacity: 0;
  transform: scale(0.8);
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
