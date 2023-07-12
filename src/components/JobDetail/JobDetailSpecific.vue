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
        <!-- <div class="text-center mb-2">
          <h2>
            <span class="banner-header">{{ itemData.title }}</span> Specific
            Jobs
          </h2>
        </div>
        <div class="w-100 d-flex justify-center mx-auto pa-2">
          <v-select
            :label="`Select ${itemData.title} Specialization`"
            :items="skillsGroup"
            v-model="selectedTag"
            style="width: 200px !important"
            variant="outlined"
            clearable
          />
        </div> -->
      </div>
      <div v-if="!isSmall" class="banner-container-desktop text-center">
        <v-img cover :src="itemData.image" />
      </div>
      <div>
        <template v-if="!isSmall">
          <div class="text-center my-4">
            <!-- <h2>
              <span class="banner-header">{{ itemData.title }}</span> Specific
              Jobs
            </h2> -->
            <h1 class="font-weight-black">
              Trending Physiotherapist Positions
            </h1>
          </div>
          <v-container id="trending" class="wrapper-box">
            <div class="d-flex">
              <v-btn
                v-if="!isSmall"
                class="sub-menu-btn view-all-1"
                :size="isSmall ? 30 : 120"
                :class="{
                  active: isSelected,
                  'py-n4 ml-n14': !isSmall,
                }"
                style="box-shadow: 0 5px 25px rgba(0, 0, 0, 0)"
                @click="filterCards('')"
              >
                <p style="font-size: 12px" elevation>View All</p>
              </v-btn>
              <v-slide-group
                v-if="!isSmall"
                v-model="selectedTag"
                class="trending-slide my-slide"
              >
                <template #prev="{ on, attrs }">
                  <v-btn
                    v-if="activeIndex > 1"
                    color="#0596d5"
                    rounded
                    icon
                    size="40"
                    v-bind="attrs"
                    v-on="on"
                    @click="previousSlide"
                  >
                    <v-icon size="20" color="white"> mdi-arrow-left </v-icon>
                  </v-btn>
                </template>
                <template #next="{ on, attrs }">
                  <v-btn
                    v-if="activeIndex + 1 <= trendingBtn.length / 4"
                    color="#0596d5"
                    rounded
                    size="40"
                    icon
                    v-bind="attrs"
                    @click="nextSlide"
                    v-on="on"
                  >
                    <v-icon size="20" color="white"> mdi-arrow-right </v-icon>
                  </v-btn>
                </template>
                <v-slide-group-item
                  v-for="btn in trendingBtn"
                  :key="btn.tag"
                  v-slot="{ isSelected, toggle }"
                  :value="btn.tag"
                  class="my-slide-item"
                  @click="filterCards(btn.tag)"
                >
                  <v-btn
                    class="sub-menu-btn"
                    :size="isSmall ? 30 : 155"
                    :class="{
                      active: isSelected,
                      'py-4 mx-2': !isSmall,
                    }"
                    style="box-shadow: 0 5px 25px rgba(0, 0, 0, 0)"
                    @click="toggle"
                  >
                    <p style="font-size: 12px" elevation>
                      {{ btn.title }}
                      <!-- <span>{{
                      countCards(btn.tag) == 0 ? '' : `(${countCards(btn.tag)})`
                    }}</span> -->
                    </p>
                    <!-- <span class="badge" :class="isSelected ? 'active' : ''">2.7K</span> -->
                  </v-btn>
                </v-slide-group-item>
              </v-slide-group>
            </div>
          </v-container>
        </template>
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
            <h2 style="color: #000; font-weight: 700" v-if="!isSmall">
              {{ item.title }}
            </h2>
            <h3
              style="font-size: 16px !important; color: #000; font-weight: 700"
              v-if="isSmall"
            >
              {{ item.title }}
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
                    class="my-4 card-cont"
                    :class="{ 'mx-3 text-center': !isSmall, 'mx-1': isSmall }"
                    :height="!isSmall ? 290 : 280"
                    :width="!isSmall ? 280 : 250"
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
                        card.text.length >= 28
                          ? card.text.substring(0, 28) + '..'
                          : card.text
                      }}
                    </div>
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
                        card.text.length >= 32
                          ? card.text.substring(0, 32) + '..'
                          : card.text
                      }}
                    </div>
                    <div
                      class="trending__app"
                      :class="{
                        'card-image-cont-1': !isSmall,
                        'card-image-cont-2': isSmall,
                      }"
                    >
                      <!-- <div class="cart clearfix animate-effect">
                        <div class="action">
                          <div class="px-2 text-center">
                            <v-btn
                              elevation="4"
                              :to="`/${card.path}`"
                              style="
                                background-color: #fa2964;
                                border-radius: 50px;
                                padding-left: 8px;
                                padding-right: 6px;
                                padding-top: 4px;
                                padding-bottom: 4px;
                                font-weight: 600;
                                font-size: 12px;
                              "
                            >
                              <span class="text-white" style="">View Jobs</span>
                              <v-icon right style="color: #fff">
                                mdi-chevron-right
                              </v-icon>
                            </v-btn>
                          </div>
                        </div>
                      </div> -->
                      <!-- <div class="overlay"></div> -->
                      <v-img
                        :src="card.image"
                        class="card-image"
                        :height="isSmall ? 170 : 220"
                        cover
                        transition="fade-transition"
                      >
                        <template #placeholder>
                          <div class="skeleton skeleton-category ml-2" />
                        </template>
                      </v-img>
                    </div>
                    <div
                      :to="`/${card.path}`"
                      style="
                        position: absolute;
                        bottom: 90px;
                        left: 15px;
                        background-color: #fa2964;
                        border-radius: 5px;
                        padding-left: 8px;
                        padding-right: 6px;
                        padding-top: 4px;
                        padding-bottom: 4px;
                        font-weight: 600;
                        font-size: 12px;
                      "
                    >
                      <span class="text-white" style="">View Jobs</span>
                      <!-- <v-icon right style="color: #fff">
                                mdi-chevron-right
                              </v-icon> -->
                    </div>

                    <div
                      class="card-description d-flex flex-column mt-4"
                      style="position: relative; gap: 10px"
                    >
                      <div class="card-address d-flex align-center">
                        <div style="width: 25%">
                          <v-img src="@/assets/use-1.jpg" height="35" />
                        </div>
                        <div
                          style="width: 75 %"
                          class="card-address-info text-left"
                        >
                          <h4 style="font-weight: 600">
                            {{
                              card.place.length >= 32
                                ? card.place.substring(0, 32) + '..'
                                : card.place + ' Jobs'
                            }}
                          </h4>
                          <p style="font-weight: 400">
                            {{ card.address }}
                            <span class="text-red ml-2"
                              >{{ card.distance }} kms</span
                            ><span class="text-muted"> away</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      class="card-btn-container d-flex justify-space-between"
                    >
                      <v-btn
                        color="black"
                        class="card-btn"
                        :width="isSmall ? 40 : 32"
                        :height="isSmall ? 40 : 32"
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
                        :width="isSmall ? 40 : 32"
                        :height="isSmall ? 40 : 32"
                      >
                        <v-icon size="20" color="red">
                          mdi-heart-outline
                        </v-icon>
                      </v-btn>
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
    </template>
  </div>
</template>

<script>
import axios from '@/util/axios';
import app from '@/util/eventBus';

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
      selectedTag: null,
      specificJobs: [],
      trendingBtn: [],
      activeIndex: 1,
      // totalData: 0,
    };
  },
  computed: {
    isSmall() {
      return this.screenWidth < 640;
    },
    // filteredSkills() {
    //   if (!this.selectedTag) {
    //     return this.skillsCard;
    //   } else {
    //     // const searchTextLower = this.search.toLowerCase();
    //     return this.skillsCard.filter((item) => {
    //       return item.text.includes(this.selectedTag);
    //     });
    //   }
    // },
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  mounted() {
    this.getSpecificJobs();
    this.getGroups();
    this.checkDetail();
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
    app.config.globalProperties.$eventBus.$emit('removeDetail');
  },
  methods: {
    checkDetail() {
      app.config.globalProperties.$eventBus.$emit('getHeaderDetail');
    },
    getGroups() {
      this.trendingBtn = [
        {
          id: 1,
          title: 'Physiotherapist',
          tag: 'Physiotherapist',
        },
        {
          id: 2,
          title: 'Senior Physiotherapist',
          tag: 'Senior Physiotherapist',
        },
        {
          id: 3,
          title: 'Principal Physiotherapist',
          tag: 'Principal Physiotherapist',
        },
        {
          id: 4,
          title: 'Physio Assistants',
          tag: 'Physio Assistants',
        },
        {
          id: 0,
          title: '',
          tag: '',
        },
        {
          id: 0,
          title: '',
          tag: '',
        },
        {
          id: 0,
          title: '',
          tag: '',
        },
        {
          id: 0,
          title: '',
          tag: '',
        },
        {
          id: 0,
          title: '',
          tag: '',
        },
        {
          id: 0,
          title: '',
          tag: '',
        },
      ];
      // axios
      //   .get(`/groups`)
      //   .then((response) => {
      //     const data = response.data.data;
      //     // console.log(data);
      //     this.trendingBtn = data.map((group) => {
      //       return {
      //         id: group.app_group_id,
      //         title: group.app_group_name,
      //         tag: group.app_group_name,
      //       };
      //     });
      //   })
      //   .catch((error) => {
      //     // eslint-disable-next-line
      //     console.log(error);
      //   });
    },
    // countCards(tag) {
    //   const count = this.trendingCard.filter(
    //     (trend) => trend.tag === tag
    //   ).length;
    //   return count;
    // },
    filterCards(tag) {
      // console.log("ok");
      this.selectedTag = tag;
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
          // console.log(data);
          const filterKey = 'allied-health-jobs';
          const filteredData = data.filter((d) => d.slug === filterKey);

          this.itemData = {
            id: filteredData[0].sgm_id || 1,
            title: filteredData[0].group_name || '',
            image: this.$fileURL + filteredData[0].image || '',
          };

          // this.specificJobs = data
          //   .map((item) => {
          //     return {
          //       id: item.sgm_id || 1,
          //       title: item.group_name ? item.group_name + ' Jobs' : '',
          //       btn: item.group_name || '',
          //       path: item.slug ? `/${item.slug}` : '#',
          //       list: item.skills.slice(0, 6).map((skill) => {
          //         return {
          //           id: skill.skills_id || 1,
          //           text: skill.skills_name || '',
          //           image: skill.image ? this.$fileURL + skill.image : '',
          //           path:
          //             skill.description.split(' ').join('').toLowerCase() +
          //             'jobs',
          //         };
          //       }),
          //     };
          //   })
          //   .slice(0, 2);
          this.specificJobs = [
            {
              id: 1,
              title: 'Community Hospital',
              btn: 'Community Hospital',
              path: '/community-hospital',
              list: [
                {
                  id: 1,
                  text: 'Staff / Registered Nurse',
                  image:
                    'https://admin1.the-gypsy.sg/img/app/a5b27a1b0c59d0403b38388e2d3d570a.jpg',
                  path: 'registered-nurse',
                  place: 'Thye Hua Kwan Hospital',
                  address: 'Ang Mu Kuo',
                  distance: '4,5',
                },
                {
                  id: 2,
                  text: 'ICU Staff Nurse',
                  image:
                    'https://admin1.the-gypsy.sg/img/app/1ea540aea23e1fbdf7655bbc8c99002c.jpg',
                  path: 'icu-nurse',
                  place: 'Concorde Hospital',
                  address: 'Serangon Road',
                  distance: '2,3',
                },
                {
                  id: 3,
                  text: 'Enrolled Nurse',
                  image:
                    'https://admin1.the-gypsy.sg/img/app/52fd27c5a4ced4e49d1877b84b056391.JPG',
                  path: 'enrolled-nurse',
                  place: 'Tan Tock Seng Hospital',
                  address: 'Novena',
                  distance: '1,2',
                },
                {
                  id: 4,
                  text: 'Nurse Assistant',
                  image:
                    'https://admin1.the-gypsy.sg/img/app/ccfd28dfe81747c8e66aa827bde78eef.jpg',
                  path: 'nurse-assistant',
                  place: 'Singapore General Hospital',
                  address: 'Outram Road',
                  distance: '4,5',
                },
                {
                  id: 5,
                  text: 'Staff / Registered Nurse',
                  image:
                    'https://admin1.the-gypsy.sg/img/app/c4a51dfc6c1c83bc5400f0974b2bad26.png',
                  path: 'registered-nurse',
                  place: 'Thye Hua Kwan Hospital',
                  address: 'Ang Mu Kuo',
                  distance: '4,5',
                },
                {
                  id: 6,
                  text: 'ICU Staff Nurse',
                  image:
                    'https://admin1.the-gypsy.sg/img/app/406443d8b9bd02f87e6860fc79cff518.jpg',
                  path: 'icu-nurse',
                  place: 'Concorde Hospital',
                  address: 'Serangon Road',
                  distance: '2,3',
                },
              ],
            },
            {
              id: 2,
              title: 'Private Hospital',
              btn: 'Private Hospital',
              path: '/private-hospital',
              list: [
                {
                  id: 1,
                  text: 'Staff / Registered Nurse',
                  image:
                    'https://admin1.the-gypsy.sg/img/app/a5b27a1b0c59d0403b38388e2d3d570a.jpg',
                  path: 'registered-nurse',
                  place: 'Thye Hua Kwan Hospital',
                  address: 'Ang Mu Kuo',
                  distance: '4,5',
                },
                {
                  id: 2,
                  text: 'ICU Staff Nurse',
                  image:
                    'https://admin1.the-gypsy.sg/img/app/1ea540aea23e1fbdf7655bbc8c99002c.jpg',
                  path: 'icu-nurse',
                  place: 'Concorde Hospital',
                  address: 'Serangon Road',
                  distance: '2,3',
                },
                {
                  id: 3,
                  text: 'Enrolled Nurse',
                  image:
                    'https://admin1.the-gypsy.sg/img/app/52fd27c5a4ced4e49d1877b84b056391.JPG',
                  path: 'enrolled-nurse',
                  place: 'Tan Tock Seng Hospital',
                  address: 'Novena',
                  distance: '1,2',
                },
                {
                  id: 4,
                  text: 'Nurse Assistant',
                  image:
                    'https://admin1.the-gypsy.sg/img/app/ccfd28dfe81747c8e66aa827bde78eef.jpg',
                  path: 'nurse-assistant',
                  place: 'Singapore General Hospital',
                  address: 'Outram Road',
                  distance: '4,5',
                },
                {
                  id: 5,
                  text: 'Staff / Registered Nurse',
                  image:
                    'https://admin1.the-gypsy.sg/img/app/c4a51dfc6c1c83bc5400f0974b2bad26.png',
                  path: 'registered-nurse',
                  place: 'Thye Hua Kwan Hospital',
                  address: 'Ang Mu Kuo',
                  distance: '4,5',
                },
                {
                  id: 6,
                  text: 'ICU Staff Nurse',
                  image:
                    'https://admin1.the-gypsy.sg/img/app/406443d8b9bd02f87e6860fc79cff518.jpg',
                  path: 'icu-nurse',
                  place: 'Concorde Hospital',
                  address: 'Serangon Road',
                  distance: '2,3',
                },
              ],
            },
          ];

          console.log(this.specificJobs);
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

    previousSlide() {
      this.activeIndex--;
    },
    nextSlide() {
      this.activeIndex++;
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
  margin-top: 250px;
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
  height: 240px;
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
.card-btn-container-2 {
  gap: 20px;
  bottom: 15px;
  right: 30px;
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

.card-cont {
  position: relative;
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
.card-image-cont-1 {
  position: relative;
  overflow: hidden;
  height: 180px;
  width: 280px;
}
.card-image-cont-2 {
  position: relative;
  overflow: hidden;
  height: 170px;
  width: 250px;
}

.card-btn-container {
  position: absolute;
  gap: 10px;
  bottom: 55px;
  right: 30px;
  z-index: 100;
}

.card-btn {
  background: #fff !important;
  border: none !important;
  box-shadow: 1px rgba(0, 0, 0, 1) !important;
}
.card-image {
  width: 100%;
  height: 100%;
  transition: all 0.3s;
  transform: scale(1);
}
.card-image-cont-1:hover .card-image {
  transform: scale(1.2);
}
.card-image-cont-2:hover .card-image {
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
  font-size: 18px;
  text-transform: none;
  color: #636363;
}

.card-address-info {
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
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

.view-all-1 {
  background: #0596d5;
  color: white;
  height: 50px !important;
  z-index: 1000 !important;
  /* Gaya view all yang sticky */
}

.my-slide {
  position: relative !important;
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
