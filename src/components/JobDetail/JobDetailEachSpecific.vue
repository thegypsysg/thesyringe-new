<template>
  <div>
    <div v-if="isLoading" class="text-center loading-page">
      <v-progress-circular :size="50" color="#fa2964" indeterminate />
    </div>
    <template v-if="!isLoading">
      <div v-if="isSmall" class="banner-container"></div>
      <div
        v-if="!isSmall"
        class="banner-container-desktop text-center d-flex justify-center w-100"
      >
        <v-img cover :src="itemData.image" />
        <div class="banner-title mx-auto" style="width: 40%">
          <h1 class="mb-4" style="font-size: 40px">
            Prehab and post-surgical rehabilitation
          </h1>
          <v-btn
            elevation="4"
            style="
              background-color: #226397;
              border-radius: 50px;
              padding-left: 15px;
              padding-right: 15px;
              padding-top: 4px;
              padding-bottom: 4px;
              font-weight: 600;
              font-size: 12px;
            "
          >
            <span class="text-white" style="">FIND OUT MORE</span>
          </v-btn>
        </div>
      </div>
      <v-container>
        <div
          v-if="!isSmall"
          class="info-1 d-flex justify-space-between w-100 mt-6"
          style="height: 80px"
        >
          <div class="info-title d-flex align-center justify-start">
            <v-img height="80" src="@/assets/exec-jobs.jpg"></v-img>
            <div class="divider ml-10 mr-4"></div>
            <div class="web">
              <h4>BMJ Therapy Pte Ltd</h4>
              <p class="text-blue-darken-4 font-weight-bold">
                www.bmjtherapy.com
              </p>
            </div>
            <div class="divider ml-10 mr-4"></div>
            <div class="group">
              <span>Healthcare</span>|<span>Private Physio CLinic</span>
            </div>
          </div>
          <div class="share pa-2">
            <p>Share this job with your friends</p>
            <div class="share-link d-flex justify-space-between mt-2">
              <v-btn
                :size="!isSmall ? '30' : '35'"
                variant="text"
                style="background: #4267b2"
                color="white"
                icon
              >
                <v-icon :size="!isSmall ? '16' : '19'">
                  <i class="fa-brands fa-facebook-f" />
                </v-icon>
              </v-btn>
              <v-btn
                v-if="!isSmall"
                :size="!isSmall ? '30' : '35'"
                variant="text"
                style="background: #25d366"
                color="white"
                icon
              >
                <v-icon :size="!isSmall ? '16' : '19'">
                  <i class="fa-brands fa-whatsapp" />
                </v-icon>
              </v-btn>

              <v-btn
                :size="!isSmall ? '30' : '35'"
                variant="text"
                style="background: #448aff"
                color="white"
                icon
              >
                <v-icon :size="!isSmall ? '16' : '19'">
                  <i class="fa-brands fa-facebook-messenger"></i>
                </v-icon>
              </v-btn>

              <v-btn
                :size="!isSmall ? '30' : '35'"
                variant="text"
                color="white"
                style="background: #0088cc"
                icon
              >
                <v-icon :size="!isSmall ? '16' : '19'">
                  <i class="fa-brands fa-telegram"></i>
                </v-icon>
              </v-btn>

              <v-btn
                :size="!isSmall ? '30' : '35'"
                variant="text"
                style="background: #55acee"
                color="white"
                icon
              >
                <v-icon :size="!isSmall ? '16' : '19'">
                  <i class="fa-brands fa-twitter"></i>
                </v-icon>
              </v-btn>
            </div>
          </div>
        </div>
        <div class="info-2 d-flex align-center mt-6" style="height: 20px">
          <span class="text-grey">15th July 2023</span>
          <div class="divider mx-6" style="background: #a7a7a7"></div>
          <span class="text-grey">1 Position</span>
          <div class="divider mx-6" style="background: #a7a7a7"></div>
          <span class="text-grey">Full Time</span>
        </div>
        <div class="info-3 mt-4">
          <div class="address d-flex mb-2">
            <v-icon class="mr-4 mt-1" size="20" color="#808080">
              mdi-map-marker
            </v-icon>
            <span
              >{{ 'Tampines' + ' (' }} <span>{{ 'East' + ')' }}</span></span
            >
          </div>
          <div class="time d-flex mb-2">
            <v-icon class="mr-4 mt-1" size="20" color="#808080">
              mdi-clock-outline
            </v-icon>
            <div class="time-desc">
              <p>Work Schedule</p>
              <p>9am to 6pm (Mon to Friday)</p>
              <p>9am to 12pm (Saturday)</p>
            </div>
          </div>
          <div class="price d-flex">
            <v-icon class="mr-4 mt-1" size="20" color="#808080">
              mdi-currency-usd
            </v-icon>
            <span>Negotiable</span>
          </div>
        </div>
        <div
          :class="{
            'description mt-10': !isSmall,
            'description-2 mt-8': isSmall,
          }"
        >
          <div class="description-title mb-4">
            <h1 v-if="!isSmall">Job Description</h1>
            <h2 v-if="isSmall">Job Description</h2>
          </div>
          <div class="description-desc">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              maiores quisquam dignissimos! Mollitia placeat quasi facere harum,
              suscipit magnam amet.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              maiores quisquam dignissimos! Mollitia placeat quasi facere harum,
              suscipit magnam amet.
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Consequatur sint dolore, laboriosam nobis nemo accusamus! Quos,
              recusandae ad maxime blanditiis iure alias possimus facilis quis.
            </p>
          </div>
          <div class="description-list">
            <ul>
              <li>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Delectus, voluptatibus.
              </li>
              <li>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Delectus, voluptatibus.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Cupiditate excepturi accusantium totam, nemo ipsum maxime.
              </li>
            </ul>
          </div>
        </div>
        <div
          :class="{
            'description mt-10': !isSmall,
            'description-2 mt-8': isSmall,
          }"
        >
          <div class="description-title mb-4">
            <h1 v-if="!isSmall">Requirements</h1>
            <h2 v-if="isSmall">Requirements</h2>
          </div>
          <div class="description-list">
            <ul>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Lorem ipsum dolor sit amet</li>
            </ul>
          </div>
        </div>
        <div
          :class="{
            'description mt-10': !isSmall,
            'description-2 mt-8': isSmall,
          }"
        >
          <div class="description-title mb-4">
            <h1 v-if="!isSmall">Benefits</h1>
            <h2 v-if="isSmall">Benefits</h2>
          </div>
          <div class="description-list">
            <ul>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Lorem ipsum dolor sit amet</li>
            </ul>
          </div>
        </div>
        <div
          :class="{
            'description my-10': !isSmall,
            'description-2 my-8': isSmall,
          }"
        >
          <div class="description-title mb-4">
            <h1 v-if="!isSmall">
              About <span class="text-blue-accent-4">BMJ THERAPY</span>
            </h1>
            <h2 v-if="isSmall">
              About <span class="text-blue-accent-4">BMJ THERAPY</span>
            </h2>
          </div>
          <div class="description-desc">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
              dolore magnam corrupti nam facere! Atque suscipit doloribus,
              reprehenderit nesciunt rem perspiciatis voluptas velit totam
              animi, voluptatem commodi assumenda blanditiis numquam.
            </p>
          </div>
        </div>
        <div
          class="connected mt-16"
          :class="{ 'w-25': !isSmall, 'w-100': isSmall }"
        >
          <div class="connected-title mb-6">
            <h1 v-if="!isSmall">Get Connected</h1>
            <h2 v-if="isSmall">Get Connected</h2>
          </div>
          <div class="connected-link d-flex justify-space-between">
            <v-btn
              :size="!isSmall ? '40' : '50'"
              variant="text"
              style="background: black"
              color="white"
              icon
            >
              <v-icon :size="!isSmall ? '18' : '24'">
                <i class="fa-brands fa-tiktok" />
              </v-icon>
            </v-btn>

            <v-btn
              :size="!isSmall ? '40' : '50'"
              variant="text"
              style="background: #4267b2"
              color="white"
              icon
            >
              <v-icon :size="!isSmall ? '18' : '24'">
                <i class="fa-brands fa-facebook-f" />
              </v-icon>
            </v-btn>

            <v-btn
              :size="!isSmall ? '40' : '50'"
              variant="text"
              style="background: #fc2145"
              color="white"
              icon
            >
              <v-icon :size="!isSmall ? '18' : '24'">
                <i class="fa-brands fa-instagram" />
              </v-icon>
            </v-btn>

            <v-btn
              :size="!isSmall ? '40' : '50'"
              variant="text"
              color="white"
              style="background: #db4a39"
              icon
            >
              <v-icon :size="!isSmall ? '18' : '24'">
                <i class="fa-brands fa-google-plus-g" />
              </v-icon>
            </v-btn>

            <v-btn
              :size="!isSmall ? '40' : '50'"
              variant="text"
              style="background: #0072b1"
              color="white"
              icon
            >
              <v-icon :size="!isSmall ? '18' : '24'">
                <i class="fa-brands fa-linkedin-in" />
              </v-icon>
            </v-btn>
          </div>
        </div>
        <div
          :class="{
            'description mt-16  d-flex justify-space-between': !isSmall,
            'description-2 mt-12  d-flex justify-space-between': isSmall,
          }"
        >
          <div
            :class="{
              'registrable-desc': !isSmall,
              'registrable-desc-2': isSmall,
            }"
          >
            <div class="registrable-info mb-10">
              <p class="registrable-title mb-4">
                <span class="text-blue-darken-4">Physiotherapist</span> is
                Registrable
              </p>
              <p>
                Your Qualifications must be registrable with
                <span class="text-blue-darken-4">AHPC</span> in Order for you to
                apply for a
                <span class="text-blue-darken-4">Physioterapist Job</span> in
                <span class="text-blue-darken-4">Singapore</span>
              </p>
            </div>
            <v-btn
              elevation="1"
              style="
                background-color: #0865c2;
                border-radius: 50px;
                font-weight: 600;
              "
              :height="isSmall ? 50 : ''"
              :class="{ 'regist-btn': !isSmall, 'regist-btn-2': isSmall }"
            >
              <span class="text-white" style="">Check Here</span>
            </v-btn>
          </div>
          <div class="regist-img d-flex">
            <div
              :class="{
                'registrable-img-cont': !isSmall,
                'registrable-img-cont-2': isSmall,
              }"
            >
              <v-img
                :class="{
                  'registrable-img': !isSmall,
                  'registrable-img-2': isSmall,
                }"
                :height="isSmall ? 130 : 150"
                cover
                src="@/assets/use-1.jpg"
              ></v-img>
            </div>
          </div>
        </div>
      </v-container>
    </template>
  </div>
</template>

<script>
import axios from '@/util/axios';
import app from '@/util/eventBus';
import { mapState } from 'vuex';

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
    ...mapState(['activeTag']),
    isSmall() {
      return this.screenWidth < 640;
    },
    filteredItems() {
      // console.log(this.activeTag);
      if (!this.activeTag || this.activeTag == undefined) {
        return this.specificJobs;
      } else {
        // const searchTextLower = this.search.toLowerCase();
        return this.specificJobs.map((s) => {
          return {
            ...s,
            list: s.list.filter((item) => {
              return item.tag.includes(this.activeTag);
            }),
          };
        });
      }
    },
    filteredItemsDesktop() {
      // console.log(this.activeTag);
      if (!this.selectedTag || this.selectedTag == undefined) {
        return this.specificJobs;
      } else {
        // const searchTextLower = this.search.toLowerCase();
        return this.specificJobs.map((s) => {
          return {
            ...s,
            list: s.list.filter((item) => {
              return item.tag.includes(this.selectedTag);
            }),
          };
        });
      }
    },
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
        .get(`/skills-by-groups/100/${this.$appId}`)
        .then((response) => {
          const data = response.data.data;
          // console.log(data);
          const filterKey = 'allied-health-jobs';
          const filteredData = data.filter((d) => d.slug === filterKey);

          this.itemData = {
            id: filteredData[0].sgm_id || 1,
            title: filteredData[0].group_name || '',
            slug: filteredData[0].slug || '',
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
                  tag: 'Physiotherapist',
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
                  tag: 'Senior Physiotherapist',
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
                  tag: 'Principal Physiotherapist',
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
                  tag: 'Physio Assistants',
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
                  tag: 'Physiotherapist',
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
                  tag: 'Senior Physiotherapist',
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
                  tag: 'Physiotherapist',
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
                  tag: 'Senior Physiotherapist',
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
                  tag: 'Principal Physiotherapist',
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
                  tag: 'Physio Assistants',
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
                  tag: 'Physiotherapist',
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
                  tag: 'Senior Physiotherapist',
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
    getListSkill(slug) {
      this.isLoading = true;
      axios
        .get(`/skills/group/slug/${slug}`)
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
  margin-top: 190px;
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
  position: relative;
}

.banner-container-desktop img {
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
}

.banner-title {
  position: absolute;
  bottom: 20px;
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

.divider {
  width: 1px;
  height: 100%;
  background: #000;
}

.share {
  height: 100%;
  border: 1px solid #a2a2a2;
}

.description {
  width: 65%;
}
.description-2 {
  width: 100%;
}

.description-list li {
  margin-top: 20px;
  margin-left: 15px;
}

.registrable-desc {
  width: 55%;
  font-size: 20px;
}
.registrable-desc-2 {
  width: 50%;
  font-size: 16px;
}

.regist-img {
  width: 40%;
}

.registrable-img {
  height: 150px;
  width: 150px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}
.registrable-img-cont {
  height: 150px;
  width: 150px;
  border-radius: 50%;
}
.registrable-img-2 {
  height: 130px;
  width: 130px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}
.registrable-img-cont-2 {
  height: 130px;
  width: 130px;
  border-radius: 50%;
}

.regist-btn {
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: 14px;
}
.regist-btn-2 {
  padding-left: 35px;
  padding-right: 35px;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 16px;
}
</style>
