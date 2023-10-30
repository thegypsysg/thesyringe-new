<template>
  <v-container class="mt-6 footer_lks">
    <v-row class="d-flex justify-center">
      <v-col cols="12" sm="12" md="3">
        <h2 class="footer_title">About {{ footerData.company_name }}</h2>
        <p
          class="footer_paragraph"
          style="margin-bottom: 16px; margin-top: 34px"
        >
          The Syringe is a Market Place for Jobs that are specifically on
          Healthcare around the world.
        </p>
        <ul class="footer_social">
          <li>
            <v-icon
              color="#FA2964"
              size="20"
              class="mr-2 mdi mdi-map-marker"
              aria-hidden="true"
            ></v-icon>
            {{ footerData.location }}
          </li>
          <li>
            <v-icon
              color="#FA2964"
              size="20"
              class="mr-2 fa fa-phone"
              aria-hidden="true"
            ></v-icon>
            {{ footerData.mobile_number }}
          </li>
          <li>
            <v-icon
              color="#FA2964"
              size="20"
              class="mr-2 fab fa-whatsapp"
            ></v-icon>
            {{ footerData.whats_app }}
          </li>
          <li>
            <v-icon
              color="#FA2964"
              size="20"
              class="mr-2 fa fa-envelope"
              aria-hidden="true"
            ></v-icon>
            <a :href="`mailto:${footerData.email_id}`">{{
              footerData.email_id
            }}</a>
          </li>
        </ul>
      </v-col>
      <v-col cols="12" sm="12" md="3">
        <h2 class="footer_title" style="margin-bottom: 16px">Quick links</h2>
        <ul class="footer_links" style="margin-top: 37px">
          <li>
            <v-icon size="15" class="mr-2 fa fa-angle-double-right"></v-icon>
            Job Categories
          </li>
          <li>
            <v-icon size="15" class="mr-2 fa fa-angle-double-right"></v-icon>
            Sign Up/Register
          </li>
          <li>
            <v-icon size="15" class="mr-2 fa fa-angle-double-right"></v-icon>
            Agencies
          </li>
          <li>
            <v-icon size="15" class="mr-2 fa fa-angle-double-right"></v-icon>
            Employers
          </li>
        </ul>
      </v-col>
      <v-col cols="12" sm="12" md="3">
        <h2 class="footer_title">Job Categories</h2>
        <v-row
          class="footer_apps"
          style="margin-top: 37px; padding-right: 20px"
        >
          <v-col v-for="item in trendingCard" :key="item.id" cols="4">
            <p style="margin-bottom: 10px">
              {{ item.title.substring(0, 10) + '..' }}
            </p>
            <div class="our-apps">
              <v-img
                class="our-apps-img"
                cover
                transition="fade-transition"
                :src="item.img"
              >
                <template #placeholder>
                  <div class="skeleton" />
                </template>
              </v-img>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <a
              href="javascript:void(0)"
              style="
                color: #fa2964;
                font-size: 14px;
                font-weight: 600;
                line-height: 19px;
                text-decoration: none;
              "
              @click="scrollToTrending"
            >
              View all</a
            >
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="12" md="3">
        <h2 class="footer_title">Jobseekers</h2>
        <p
          class="footer_paragraph"
          style="margin-bottom: 16px; margin-top: 34px"
        >
          Sign Up and be part of our community of Healthcare Jobs around the
          world. Please type your email and press get started.
        </p>
        <input class="footer_input" placeholder="Type your email" />
        <v-btn
          style="
            width: inherit;
            border-radius: 0 !important;
            margin-top: 16px;
            background: #fa2964;
            color: white;
          "
        >
          Get started
        </v-btn>
      </v-col>
    </v-row>
  </v-container>

  <v-footer
    class="bg-black text-center footer__content"
    :class="{ 'footer-detail': isSmall && isDetailPage }"
  >
    <div class="footer_text">
      {{ footerData.copyright }}
    </div>
    <div v-if="isSmall" class="footer_text mt-4 mb-2">
      <router-link class="text-decoration-none text-white" to="/privacy-policy">
        Privacy Policy
      </router-link>
      |
      <router-link class="text-decoration-none text-white" to="/our-terms">
        Terms & Conditions
      </router-link>
    </div>
    <div style="display: flex; justify-content: center">
      <v-btn
        :href="footerData.facebook"
        variant="text"
        color="#FA2964"
        icon="mdi-facebook"
      />
      <v-btn
        :href="footerData.twitter"
        variant="text"
        color="#FA2964"
        icon="mdi-twitter"
      />
      <v-btn
        :href="footerData.instagram"
        variant="text"
        color="#FA2964"
        icon="mdi-instagram"
      />
      <v-btn
        :href="footerData.youtube"
        variant="text"
        color="#FA2964"
        icon="mdi-youtube"
      />
    </div>
    <div v-if="!isSmall" class="footer_text">
      <router-link class="text-decoration-none text-white" to="/privacy-policy">
        Privacy Policy
      </router-link>
      |
      <router-link class="text-decoration-none text-white" to="/our-terms">
        Terms & Conditions
      </router-link>
    </div>
  </v-footer>
  <a
    v-if="!isDetailPage && !isSpecific"
    onclick='window.scrollTo({top: 0, behavior: "smooth"});'
    class="go-up"
    :class="{ 'go-up-2': isSmall && isDetailPage }"
    style="display: inline"
  >
    <i class="fa fa-angle-double-up" aria-hidden="true"></i>
  </a>
  <!-- <v-container
    style="position: fixed; bottom: 0rem; left: 0; z-index: 99999"
    class="d-flex justify-space-between align-center"
    v-if="isSmall && isSpecific"
  >
    <div style="background: #a6fdf7" class="w-100 py-2 px-4">
      <h3>Physioterapist Jobs Globally</h3>
      <div
        class="d-flex mt-2"
        style="gap: 10px; font-size: 12px; font-weight: 600"
      >
        <div elevation="0">
          <span>U.A.E</span>
          <v-img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/255px-Flag_of_the_United_Arab_Emirates.svg.png"
            height="30"
          >
            <template #placeholder> <div class="skeleton" /> </template
          ></v-img>
          <p><span class="text-red">20</span> Jobs</p>
        </div>
        <div elevation="0">
          <span>Malaysia</span>
          <v-img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Malaya.svg/1280px-Flag_of_Malaya.svg.png"
            height="30"
          >
            <template #placeholder> <div class="skeleton" /> </template
          ></v-img>
          <p><span class="text-red">20</span> Jobs</p>
        </div>
      </div>
    </div>
  </v-container> -->
  <v-container
    style="position: fixed; bottom: 1.5rem; left: 0; z-index: 99999"
    class="d-flex justify-space-between align-center"
    v-if="isSmall && isDetailPage"
  >
    <v-btn
      class="apply"
      style="
        width: 75%;
        border-radius: 10px;
        background: #fa2964;
        color: white;
        font-size: 20px;
      "
      height="50"
      @click="applyJob()"
    >
      Apply
    </v-btn>
    <v-btn
      style="background: #c5c5c5; color: black"
      variant="text"
      color="black"
      icon="mdi-share-outline"
      width="40"
      height="40"
    >
      <v-icon color="black" size="18"> mdi-share-outline </v-icon>
      <v-menu activator="parent">
        <v-list>
          <v-list-item @click="console.log('share')">
            <v-list-item-title
              ><v-icon class="mr-4" color="black" size="18">
                mdi-email-outline </v-icon
              >Email</v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="console.log('share')">
            <v-list-item-title
              ><v-icon class="mr-4" size="18">
                <i class="fa-brands fa-facebook-f" /> </v-icon
              >Facebook</v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="console.log('share')">
            <v-list-item-title
              ><v-icon class="mr-4" color="black" size="18">
                mdi-twitter </v-icon
              >Twitter</v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="console.log('share')">
            <v-list-item-title
              ><v-icon class="mr-4" size="18">
                <i class="fa-brands fa-linkedin-in" /> </v-icon
              >Linkedin</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
    <!-- <v-btn
      class="apply"
      style="
        width: 20px;
        height: 40px;
        margin-top: 16px;
        background: #c5c5c5;
        color: black;
        border-radius: 100%;
      "
    >
      <v-icon size="20">mdi-share-outline</v-icon>
    </v-btn> -->
  </v-container>
</template>

<script>
import axios from '@/util/axios';
import app from '@/util/eventBus';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Footer',
  data() {
    return {
      footerData: {
        company_name: '',
        location: '',
        mobile_number: '',
        whats_app: '',
        email_id: '',
        copyright: '',
        facebook: '',
        twitter: '',
        instagram: '',
        youtube: '',
      },
      trendingCard: [],
      screenWidth: window.innerWidth,
    };
  },
  computed: {
    isSmall() {
      return this.screenWidth < 640;
    },
    isDetailPage() {
      return this.$route.path.includes('detail');
    },
    isSpecific() {
      return this.$route.params.name;
    },
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  mounted() {
    this.getAppContact();
    this.getTrendingCardData();
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    applyJob() {
      this.isLoading = true;
      const token = localStorage.getItem("token");
      axios
      .get(`/gypsy-applicant`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        console.log(data);
        if(data && data.basic_steps == null) {
          app.config.globalProperties.$eventBus.$emit('getTokenStart', token);
          localStorage.setItem('applicant_data', JSON.stringify(data))
          window.location.href = '/'
        } else if(data && data.basic_steps == 'C' && data.qualifications_steps == null) {
          app.config.globalProperties.$eventBus.$emit('applyJob');
          app.config.globalProperties.$eventBus.$emit('applyJob2');
        } else if(data && data.basic_steps == 'C' && data.qualifications_steps == 'C' && data.employment_steps == null ) {
          app.config.globalProperties.$eventBus.$emit('employmentJob');
          app.config.globalProperties.$eventBus.$emit('employmentJob2');
        } else if(data == null) {
          app.config.globalProperties.$eventBus.$emit('changeHeaderPath', "/");
        }
        
        if (data.slug) {
          app.config.globalProperties.$eventBus.$emit('changeHeaderPath', `/${data.slug}`);
        } else {
          app.config.globalProperties.$eventBus.$emit('changeHeaderPath', "/");
        }
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
        
        // app.config.globalProperties.$eventBus.$emit('getTrendingCardData2');
      })
      .finally(() => {
        this.isLoading = false;
      });
    },
    handleResize() {
      this.screenWidth = window.innerWidth;
    },
    scrollToTrending() {
      app.config.globalProperties.$eventBus.$emit('scrollToTrendingSection');
    },
    getAppContact() {
      // this.isLoading = true;
      axios
        .get(`/app/contact/${this.$appId}`)
        .then((response) => {
          const data = response.data.data;
          // console.log(data);
          this.footerData = {
            company_name: data.company_name || '',
            location: data.location || '',
            mobile_number: data.mobile_number || '',
            whats_app: data.whats_app || '',
            email_id: data.email_id || '',
            copyright: data.copyright || '',
            facebook: data.facebook || '',
            twitter: data.twitter || '',
            instagram: data.instagram || '',
            youtube: data.youtube || '',
          };
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
      // .finally(() => {
      //   this.isLoading = false;
      // });
    },
    getTrendingCardData() {
      // this.isLoading = true;
      axios
        .get(`/skillgroups/${this.$appId}`)
        .then((response) => {
          const data = response.data.data;
          // console.log(data);
          this.trendingCard = data.map((item) => {
            return {
              id: item.sgm_id || 1,
              img: this.$fileURL + item.image || '',
              title: item.group_name || '',
            };
          });
          // console.log(this.trendingCard);

          // app.config.globalProperties.$eventBus.$emit(
          //   'update-image',
          //   this.items
          // );
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
      // .finally(() => {
      //   this.isLoading = false;
      // });
    },
  },
};
</script>

<style scoped>
.our-apps {
  position: relative;
  overflow: hidden;
  min-height: 10px;
  height: 70px;
}
.our-apps-img {
  transition: all 0.3s;
  transform: scale(1);
  width: 100% !important;
  height: 100% !important;
}

.our-apps:hover .our-apps-img {
  transform: scale(1.2);
  cursor: pointer;
}
.skeleton {
  width: 100%;
  height: 100%;
  border-radius: 0;
  background: linear-gradient(-90deg, #f2f2f2 0%, #e1e1e1 50%, #f2f2f2 100%);
  background-size: 400% 400%;
  animation: skeleton 1.6s ease infinite;
}

.footer-detail {
  height: 20vh;
}

.go-up {
  position: fixed;
  bottom: 5.7rem;
  z-index: 99999;
  right: 0.5rem;
  font-size: 1.5rem;
  background: #fa2964;
  padding: 0.4rem;
  color: #fff !important;
  border-radius: 5px;
  text-decoration: none;
  line-height: 0;
  display: none;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.go-up:hover,
.go-up:focus {
  outline: 0;
  text-decoration: none;
  color: #fff;
}

.go-up-2 {
  bottom: 2.8rem;
}
.go-up-2:hover,
.go-up-2:focus {
  outline: 0;
  text-decoration: none;
  color: #fff;
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
