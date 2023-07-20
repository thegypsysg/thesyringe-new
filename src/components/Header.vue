<template>
  <v-app-bar
    :class="{
      'app-bar-mobile-1': isSmall && isHome,
      'app-bar-mobile-2': isSmall && !isHome,
      'app-bar-mobile-3': isSmall && isWelcome,
    }"
    color="white"
    elevation="1"
    fixed
  >
    <router-link to="/">
      <div class="logo-img-container d-flex align-center">
        <v-img class="logo-img" :src="$fileURL + logo" height="50">
          <template #placeholder>
            <div class="skeleton" />
          </template>
        </v-img>
      </div>
    </router-link>
    <div v-if="isWelcome" class="ml-10 d-flex flex-row header-info">
      <div v-if="!isSmall" class="divider" />
      <span :class="{ 'header-info-span': isSmall }">Sign Up / Login</span>
    </div>
    <div v-if="isDetail && !isSmall" class="ml-10 d-flex flex-row header-info">
      <div v-if="!isSmall" class="divider" />
      <span :class="{ 'header-info-span': isSmall }">Physiotherapist Jobs</span>
    </div>
    <v-spacer v-if="!isSmall && (isWelcome || isDetail)" />
    <form
      v-if="!isWelcome && !isDetail"
      class="navbar__search navbar__search__desktop"
    >
      <input
        id="product_name"
        class="form-control mr-sm-2"
        type="text"
        style="font-style: italic"
        placeholder="Nurse, Physio, Consultants, Oncologist, Medical, Executives"
        aria-label="Search"
        data-autocompleturl="https://boozards.com/merchant-product/search"
      />
      <button class="btn btn--search" type="submit">
        <v-icon color="white"> mdi-magnify </v-icon>
      </button>
    </form>
    <div v-if="!isWelcome" class="desktop__app">
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            style="
              margin-left: 30px;
              margin-right: 30px;
              font-size: 16px;
              color: #494949;
            "
            v-bind="props"
            variant="text"
          >
            {{ itemSelected }}
            <v-icon right dark> mdi-menu-down </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in city"
            :key="index"
            :value="index"
            @click="changeItemSelected(item.title)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <v-btn v-if="!isWelcome" elevation="0" class="btn_sign__up" to="/signup">
      Sign up / Register
    </v-btn>
    <v-btn icon @click="drawer = !drawer">
      <v-img src="@/assets/user_icon.png" style="height: 48px; width: auto" />
    </v-btn>

    <template v-if="!isWelcome" #extension>
      <div
        class="mobile__app text-center scroll-container d-flex flex-column justify-center align-content-space-between mx-2"
        :class="{ 'mb-n10': !isHome }"
      >
        <div class="mb-n2" v-if="isDetail">
          <h2>Physiotherapist Jobs</h2>
        </div>
        <div v-if="isHome">
          <v-menu>
            <template #activator="{ props }">
              <v-btn
                style="
                  margin-left: 30px;
                  margin-right: 30px;
                  font-size: 16px;
                  color: #494949;
                "
                v-bind="props"
                variant="text"
              >
                {{ itemSelected }}
                <v-icon right dark> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in city"
                :key="index"
                :value="index"
                @click="changeItemSelected(item.title)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <form
          v-if="!isDetail"
          class="navbar__search navbar__search__mobile mx-auto"
          @submit="preventSubmit"
        >
          <input
            id="product_name"
            class="form-control mr-sm-2"
            type="text"
            placeholder="Nurse, Physio, Consultants, Oncologist, Medical, Executives"
            aria-label="Search"
            data-autocompleturl="https://boozards.com/merchant-product/search"
          />
          <button class="btn btn--search" type="submit">
            <v-icon color="white"> mdi-magnify </v-icon>
          </button>
        </form>

        <div v-if="isHome" class="my-slide d-flex">
          <v-btn
            class="sub-menu-btn view-all"
            :class="{
              active: isSelected,
            }"
            style="box-shadow: 0 5px 25px rgba(0, 0, 0, 0)"
            @click="selectTag('')"
          >
            <p style="font-size: 12px" elevation>View All</p>
            <!-- <span class="badge" :class="isSelected ? 'active' : ''"
            >2.7K</span
          > -->
          </v-btn>
          <v-slide-group v-model="activeTag">
            <v-slide-group-item
              v-for="btn in trendingBtn"
              :key="btn.id"
              v-slot="{ isSelected }"
              :value="btn.tag"
            >
              <v-btn
                class="sub-menu-btn"
                :class="{
                  active: isSelected,
                }"
                style="box-shadow: 0 5px 25px rgba(0, 0, 0, 0)"
                @click="selectTag(btn.tag)"
              >
                <p style="font-size: 12px" elevation>
                  {{ btn.title }} Jobs
                  <span>{{
                    countCards(btn.tag) == 0 ? '' : `(${countCards(btn.tag)})`
                  }}</span>
                </p>
                <!-- <span class="badge" :class="isSelected ? 'active' : ''"
                >2.7K</span
              > -->
              </v-btn>
            </v-slide-group-item>
          </v-slide-group>
        </div>
      </div>
    </template>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" temporary location="right">
    <div class="drawer__top">
      <a style="font-size: 1.125rem; color: white">Sign up / Register</a>
    </div>
    <ul class="v-list-cont d-flex mt-4" nav dense>
      <li class="v-list-item">
        <router-link class="text-decoration-none text-black" to="/">
          <v-list-item-title>Home</v-list-item-title>
        </router-link>
      </li>

      <li class="v-list-item">
        <v-list-item-title>Employer</v-list-item-title>
      </li>

      <li class="v-list-item">
        <v-list-item-title>Agency</v-list-item-title>
      </li>
    </ul>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import app from '@/util/eventBus';

// import eventBus from "@/util/eventBus";
// import eventBus from "@/util/eventBus";
import axios from '@/util/axios';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
  props: ['isWelcome'],
  data() {
    return {
      // selectedTag: null,
      trendingBtn: [],
      isDetail: false,

      drawer: false,
      // itemSelected: 'Singapore',
      city: [],

      trendingCard: [],

      logo: '',
      headerData: {},

      selectedType: 0,
      activeIndex: 1,
      screenWidth: window.innerWidth,
    };
  },
  computed: {
    ...mapState(['itemSelected']),
    isSmall() {
      return this.screenWidth < 640;
    },
    isHome() {
      return this.$route.path === '/' || this.$route.path === '/physiojobs';
    },
    ...mapState(['activeTag']),
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  mounted() {
    this.getLogo();
    this.getCity();
    this.getTrendingCardData();
    app.config.globalProperties.$eventBus.$on(
      'getHeaderDetail',
      this.getHeaderDetail
    );
    app.config.globalProperties.$eventBus.$on(
      'getHeaderLanding',
      this.getTrendingCardData
    );
    app.config.globalProperties.$eventBus.$on(
      'removeDetail',
      this.removeDetail
    );
  },
  beforeUnmount() {
    app.config.globalProperties.$eventBus.$off(
      'getHeaderDetail',
      this.getHeaderDetail
    );
    app.config.globalProperties.$eventBus.$off(
      'getHeaderLanding',
      this.getTrendingCardData
    );
    app.config.globalProperties.$eventBus.$on(
      'removeDetail',
      this.removeDetail
    );
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    removeDetail() {
      this.isDetail = false;
    },
    changeItemSelected(item) {
      this.$store.commit('setItemSelected', item);
    },
    ...mapMutations(['setActiveTag']),
    selectTag(tag) {
      this.setActiveTag(tag); // Menetapkan tag yang dipilih sebagai tag aktif
      // console.log('ok');

      app.config.globalProperties.$eventBus.$emit('scrollToCardSection');
    },
    getHeaderDetail() {
      this.isDetail = true;
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
      ];
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
              img: item.image || '',
              title: item.group_name || '',
              tag: item.group_name || '',
              desc: item.description || '',
            };
          });
          this.trendingBtn = data.map((item) => {
            return {
              id: item.sgm_id || 1,
              title: item.group_name || '',
              tag: item.group_name || '',
            };
          });
          // console.log(this.trendingBtn);

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
    getLogo() {
      axios
        .get(`/app/logo/${this.$appId}`)
        .then((response) => {
          const data = response.data.data;
          // console.log(data);
          this.logo = data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    getCity() {
      axios
        .get(`/city`)
        .then((response) => {
          const data = response.data.data;
          // console.log(data);
          this.city = data.map((city) => {
            return {
              id: city.city_id,
              title: city.city_name,
              path: '#',
            };
          });
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    // emitFilterEvent(tag) {
    //   this.$emit("filter-card", tag);
    // },
    // filterCards(tag) {
    //   this.selectedTag = tag;
    //   app.config.globalProperties.$eventBus.$emit("filter-card-header", tag);
    //   // eventBus.emit("filter-card-header", tag);
    // },
    countCards(tag) {
      const count = this.trendingCard.filter(
        (trend) => trend.tag === tag
      ).length;
      return count;
    },
    handleResize() {
      this.screenWidth = window.innerWidth;
    },
    previousSlide() {
      this.activeIndex--;
    },
    nextSlide() {
      this.activeIndex++;
    },
    preventSubmit(event) {
      event.preventDefault();
    },
  },
};
</script>

<style scoped>
.view-all {
  position: sticky !important;
  top: 0 !important;
  left: 0 !important;
  z-index: 1000 !important;
  /* Gaya view all yang sticky */
}
.scroll-container {
  margin-top: -80px;
  overflow-x: auto;
  white-space: nowrap;
  gap: 20px;
}
.v-app-bar.v-toolbar {
  max-width: 100%;
}
.app-bar-mobile-1 {
  height: 29vh;
}
.app-bar-mobile-2 {
  height: 17vh;
}
.app-bar-mobile-3 {
  height: 9vh;
}

.divider {
  background: rgb(173, 173, 173);
  width: 2px;
  height: 70px;
}

.header-info {
  align-items: center;
  gap: 25px;
  font-size: 30px;
  color: black;
  font-weight: 800;
}

.header-info-span {
  font-size: 25px;
  font-weight: 800;
}

.logo-img-container {
  height: 80px;
  min-width: 100px;
}

.logo-img {
  width: 100%;
  height: 100%;
}

.skeleton {
  width: 100%;
  height: 100%;
  border-radius: 0;
  z-index: 10000;
  background: linear-gradient(-90deg, #f2f2f2 0%, #e1e1e1 50%, #f2f2f2 100%);
  background-size: 400% 400%;
  animation: skeleton 1.6s ease infinite;
}

.v-list-cont {
  flex-direction: column;
  gap: 20px;
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
