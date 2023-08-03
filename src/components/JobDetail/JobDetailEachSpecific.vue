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
        <!-- <div class="banner-title mx-auto" style="width: 40%">
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
        </div> -->
      </div>
      <v-container>
        <div
          v-if="!isSmall"
          class="info-1 d-flex justify-space-between w-100 mt-6"
          style="height: 80px"
        >
          <div class="info-title d-flex align-center justify-start">
            <v-img height="80" :src="itemData.logo"
              ><template #placeholder> <div class="skeleton" /> </template
            ></v-img>
            <div class="divider ml-10 mr-4"></div>
            <div class="web">
              <h4>{{ itemData.partner }}</h4>
              <a class="text-decoration-none" :href="itemData.website"
                ><p class="text-blue-darken-4 font-weight-bold">
                  {{ itemData.website }}
                </p></a
              >
            </div>
            <div class="divider ml-10 mr-4"></div>
            <div class="group">
              <span>{{ itemData.industry }}</span> |
              <span>{{ itemData.subIndustry }}</span>
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
        <div
          :class="{ 'info-2-mobile': isSmall }"
          class="info-2 d-flex align-center mt-6"
          style="height: 20px"
        >
          <span class="text-grey">{{ itemData.dated }}</span>
          <div class="divider mx-6" style="background: #a7a7a7"></div>
          <span class="text-grey">{{ itemData.numPositions }} Position</span>
          <div class="divider mx-6" style="background: #a7a7a7"></div>
          <span class="text-grey">{{ itemData.jobType }}</span>
        </div>
        <div class="info-3 mt-4">
          <div class="address d-flex mb-2">
            <v-icon class="mr-4 mt-1" size="20" color="#808080">
              mdi-map-marker
            </v-icon>
            <span
              >{{ itemData.city + ' (' }}
              <span>{{ itemData.zone + ')' }}</span></span
            >
          </div>
          <div class="time d-flex mb-2">
            <v-icon class="mr-4 mt-1" size="20" color="#808080">
              mdi-clock-outline
            </v-icon>
            <div class="time-desc">
              <p>Work Schedule</p>
              <p>
                {{ itemData.work }}
              </p>
            </div>
          </div>
          <div class="price d-flex">
            <v-icon class="mr-4 mt-1" size="20" color="#808080">
              mdi-currency-usd
            </v-icon>
            <span>{{ itemData.salary }}</span>
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
          <div v-html="detailHeader.desc" class="description-desc"></div>
          <!-- <div v-if="itemData.desc != '-'" class="description-list">
            <ul>
              <li>
                {{ itemData.desc }}
              </li>
            </ul>
          </div> -->
        </div>
        <div
          v-if="itemData.requirement"
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
            <p v-for="item in itemData.benefits" :key="item">{{ item }}</p>
            <!-- <ul v-if="itemData.benefits !== '-'">
              <li v-for="(benefit, index) in itemData.benefits" :key="index">
                {{ benefit }}
              </li>
            </ul> -->
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
              About
              <span class="text-blue-accent-4">{{ itemData.partner }}</span>
            </h1>
            <h2 v-if="isSmall">
              About
              <span class="text-blue-accent-4">{{ itemData.partner }}</span>
            </h2>
          </div>
          <div class="description-desc">
            <p>
              {{ itemData.about }}
            </p>
          </div>
        </div>
        <div
          class="connected mt-16 mb-16"
          :class="{ 'w-25': !isSmall, 'w-100': isSmall }"
        >
          <div class="connected-title mb-6">
            <h1 v-if="!isSmall">Get Connected</h1>
            <h2 v-if="isSmall">Get Connected</h2>
          </div>
          <div style="gap: 10px" class="connected-link d-flex">
            <v-btn
              v-if="itemData.tiktok != null"
              :href="itemData.tiktok"
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
              v-if="itemData.facebook != null"
              :href="itemData.facebook"
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
              v-if="itemData.instagram != null"
              :href="itemData.instagram"
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
              v-if="itemData.google != null"
              :href="itemData.google"
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
              v-if="itemData.youtube != null"
              :href="itemData.youtube"
              :size="!isSmall ? '40' : '50'"
              variant="text"
              style="background: #cd201f"
              color="white"
              icon
            >
              <v-icon :size="!isSmall ? '18' : '24'">
                <i class="fa-brands fa-youtube" />
              </v-icon>
            </v-btn>

            <v-btn
              v-if="itemData.twitter != null"
              :href="itemData.twitter"
              :size="!isSmall ? '40' : '50'"
              variant="text"
              style="background: #55acee"
              color="white"
              icon
            >
              <v-icon :size="!isSmall ? '18' : '24'">
                <i class="fa-brands fa-twitter" />
              </v-icon>
            </v-btn>
          </div>
        </div>

        <div v-if="skillSlug.registrable == 'Y'" :class="{ 'w-75': !isSmall }">
          <div
            :class="{
              ' mt-10 mb-14  d-flex justify-space-between': !isSmall,
              ' my-6 d-flex justify-space-between': isSmall,
            }"
          >
            <div
              :class="{
                'registrable-desc': !isSmall,
                'registrable-desc-2': isSmall,
              }"
            >
              <div class="registrable-info mb-10">
                <h1 v-if="!isSmall" class="registrable-title mb-4">
                  <span class="text-blue-darken-4">{{ skillSlug.name }}</span>
                  is Registrable
                </h1>
                <h3 v-if="isSmall" class="registrable-title mb-4">
                  <span class="text-blue-darken-4">{{ skillSlug.name }}</span>
                  is Registrable
                </h3>
                <p :class="{ 'regist-desktop': !isSmall }">
                  Your Qualifications must be registrable with
                  <span class="text-blue-darken-4">{{
                    skillSlug.regulator
                  }}</span>
                  in Order for you to apply for a
                  <span class="text-blue-darken-4"
                    >{{ skillSlug.name }} Job</span
                  >
                  in
                  <span class="text-blue-darken-4">{{ itemSelected }}</span>
                </p>
              </div>
              <v-btn
                elevation="1"
                style="
                  background-color: #0865c2;
                  border-radius: 50px;
                  font-weight: 600;
                "
                :height="isSmall ? 50 : 60"
                :class="{
                  'regist-btn px-10': !isSmall,
                  'regist-btn-2 px-6': isSmall,
                }"
              >
                <span class="text-white" style="">Check Here</span>
              </v-btn>
            </div>
            <div
              class="d-flex justify-end"
              :class="{
                'regist-img': !isSmall,
                'regist-img-2': isSmall,
              }"
            >
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
                  :height="isSmall ? 145 : 250"
                  cover
                  :src="skillSlug.mainImage"
                >
                  <template #placeholder>
                    <div class="skeleton" />
                  </template>
                </v-img>
              </div>
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
import moment from 'moment';

export default {
  // eslint-disable-next-line vue/no-reserved-component-names

  data() {
    return {
      isLoading: false,
      screenWidth: window.innerWidth,
      itemData: {},
      skillSlug: {},
      idDetail: null,
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
    ...mapState(['itemSelected']),
    ...mapState(['detailHeader']),
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
    getSkillBySlug(slug) {
      this.isLoading = true;
      axios
        .get(`/skills/slug/${slug}`)
        .then((response) => {
          const data = response.data.data;
          //console.log(data);
          this.skillSlug = {
            ...data,
            image: this.$fileURL + data.image || '',
            mainImage: this.$fileURL + data.main_image || '',
            regulator: data.partner_name || '',
            name: data.skills_name || '',
            registrable: data.registrable || 'N',
          };
          this.getCountry();
          // console.log(this.skillSlug);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
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
      const id = this.$route.params.id;
      axios
        .get(`/jobs/get-details/${id}`)
        .then((response) => {
          const data = response.data.data;
          this.getSkillBySlug(data.slug);
          this.itemData = {
            ...data,
            id: data.job_id || 1,
            title: data.position_name || '',
            // slug: data.slug || '',
            image: this.$fileURL + data.location_image || '',
            logo: this.$fileURL + data.logo || '',
            partner: data.partner_name || '',
            website: data.website || '',
            industry: data.industry_name || '',
            subIndustry: data.sub_industry_name || '',
            dated:
              moment(data.job_dated, 'DD/MM/YYYY').format('DD MMMM YYYY') || '',
            numPositions: data.num_positions || '-',
            jobType: data.job_type || '-',
            workOption: data.working_option || '-',
            city: data.city_name || '',
            location: data.location_name || '',
            zone: data.zone_name || '',
            work:
              data.work_timings && data.shift
                ? `${data.work_timings} (${data.shift})`
                : data.work_timings && !data.shift
                ? `${data.work_timings}`
                : !data.work_timings && data.shift
                ? `- (${data.shift})`
                : '-',
            salary: data.salary_range || '-',
            desc: data.job_description || '-',
            benefits: data.benefits.split('\r\n') || '-',
            about: data.about_us || '-',
            slug: data.slug || '',
          };
          //console.log(this.itemData.desc);
          this.$store.commit('setDetailHeader', this.itemData);
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
  margin-top: 210px;
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

.info-2-mobile {
  font-size: 14px;
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

.description-desc li {
  margin-top: 20px !important;
  margin-left: 15px !important;
}

.registrable-desc {
  width: 45%;
  font-size: 20px;
}
.registrable-desc-2 {
  width: 50%;
  font-size: 16px;
}

.regist-desktop {
  font-size: 22px;
}

.regist-img {
  width: 30%;
}
.regist-img-2 {
  width: 40%;
}

.registrable-img {
  height: 250px;
  width: 250px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}
.registrable-img-cont {
  height: 250px;
  width: 250px;
  border-radius: 50%;
}
.registrable-img-2 {
  height: 145px;
  width: 145px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}
.registrable-img-cont-2 {
  height: 145px;
  width: 145px;
  border-radius: 50%;
}

.regist-btn {
  font-size: 20px;
}
.regist-btn-2 {
  font-size: 16px;
}
</style>
