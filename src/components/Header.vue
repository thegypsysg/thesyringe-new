<template>
  <v-app-bar
    :class="{
      'app-bar-mobile-1': isSmall && isHome,
      'app-bar-mobile-2': isSmall && !isHome,
      'app-bar-mobile-3': isSmall && isWelcome,
      'app-bar-mobile-4': isSmall && isDetailPage,
      'app-bar-mobile-5': isSmall && isSpecific,
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
      <span :class="{ 'header-info-span': isSmall }">{{
        isDetailPage
          ? detailHeader.title
          : isDetail
          ? skillSlug.name
          : titleHeader
      }}</span>
    </div>
    <v-spacer v-if="!isSmall && (isWelcome || isDetail)" />
    <form
      v-if="!isWelcome && !isDetail"
      class="navbar__search navbar__search__desktop"
    >
      <v-autocomplete
        id="product_name"
        class="form-control mr-sm-2 ml-md-n3 mt-md-n1 search-input"
        item-title="name"
        item-value="slug"
        v-model="search"
        :items="searchItems"
        style="font-style: italic"
        placeholder="Nurse, Physio, Consultants, Oncologist, Medical, Executives"
        density="compact"
        chips
        closable-chips
        color="blue-grey-lighten-2"
      >
        <template v-slot:chip="{ props, item }">
          <v-chip
            v-bind="props"
            :to="`/${item.raw.slug}`"
            :prepend-avatar="item.raw.image"
            :text="item.raw.name"
          ></v-chip>
        </template>

        <template v-slot:item="{ props, item }">
          <v-list-item
            :to="`/${item.raw.slug}`"
            v-bind="props"
            :prepend-avatar="item?.raw?.image"
            :title="item?.raw?.name"
          ></v-list-item>
        </template>
      </v-autocomplete>
      <!-- data-autocompleturl="https://boozards.com/merchant-product/search" -->
      <button class="btn btn--search" type="submit">
        <v-icon color="white"> mdi-magnify </v-icon>
      </button>
    </form>
    <div class="mr-4" v-if="isDetailPage">
      <span v-if="detailHeader.location">{{
        detailHeader.town + ' ' + detailHeader.city
      }}</span>
    </div>
    <div v-if="isSpecific" class="desktop__app">
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
            v-for="(item, index) in country"
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
        :class="{ 'mb-n10': !isHome, 'mobile-specific': isSpecific }"
      >
        <div v-if="isSpecific">
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
                v-for="(item, index) in country"
                :key="index"
                :value="index"
                @click="changeItemSelected(item.title)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div
          class="mb-n2"
          :class="{ 'mt-1 mb-n4': isDetailPage }"
          v-if="isDetail"
        >
          <h2>
            {{
              isDetailPage
                ? detailHeader.title
                : isDetail
                ? skillSlug.name
                : titleHeader
            }}
          </h2>
        </div>
        <div v-if="isDetailPage">
          <span v-if="detailHeader.location">{{
            detailHeader.town + ' ' + detailHeader.city
          }}</span>
        </div>
        <!-- <div v-if="isHome">
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
                v-for="(item, index) in country"
                :key="index"
                :value="index"
                @click="changeItemSelected(item.title)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div> -->
        <div
          v-if="isDetailPage"
          style="height: 50px"
          class="info-title d-flex align-center mb-4 mt-n4"
        >
          <v-img height="40" :src="detailHeader.logo">
            <!-- <template #placeholder> <div class="skeleton" /> </template
          > -->
          </v-img>
          <div v-if="!isSmall" class="divider-2 ml-10 mr-4"></div>
          <div class="web" style="font-size: 12px">
            <h4>{{ detailHeader.partner }}</h4>
            <a class="text-decoration-none" :href="detailHeader.website"
              ><p class="text-blue-darken-4 font-weight-bold">
                {{ detailHeader.website }}
              </p></a
            >
          </div>
        </div>
        <form
          v-if="!isDetail"
          class="navbar__search navbar__search__mobile mx-auto"
          @submit="preventSubmit"
        >
          <v-autocomplete
            id="product_name"
            class="form-control mr-sm-2 ml-md-n3 mt-md-n1 search-input"
            item-title="name"
            item-value="slug"
            v-model="search"
            :items="searchItems"
            style="font-style: italic"
            placeholder="Nurse, Physio, Consultants, Oncologist, Medical, Executives"
            density="compact"
            chips
            closable-chips
            color="blue-grey-lighten-2"
          >
            <template v-slot:chip="{ props, item }">
              <v-chip
                v-bind="props"
                :to="`/${item.raw.slug}`"
                :prepend-avatar="item.raw.image"
                :text="item.raw.name"
              ></v-chip>
            </template>

            <template v-slot:item="{ props, item }">
              <v-list-item
                :to="`/${item.raw.slug}`"
                v-bind="props"
                :prepend-avatar="item?.raw?.image"
                :title="item?.raw?.name"
              ></v-list-item>
            </template>
          </v-autocomplete>
          <!-- <input
            id="product_name"
            class="form-control mr-sm-2"
            type="text"
            placeholder="Nurse, Physio, Consultants, Oncologist, Medical, Executives"
            aria-label="Search"
            data-autocompleturl="https://boozards.com/merchant-product/search"
          /> -->
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
                @click="selectTag(btn.id)"
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
      skillSlug: {},
      countryId: null,
      search: null,
      searchItems: [
        {
          name: 'Physiotherapist',
          image: require('@/assets/allied-jobs.jpg'),
          slug: 'physiojobs',
        },
        {
          name: 'Occupational Therapist',
          image: require('@/assets/allied-jobs.jpg'),
          slug: 'occupational-physio-jobs',
        },
      ],

      drawer: false,
      // itemSelected: 'Singapore',
      country: [],

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
    ...mapState(['detailHeader']),
    isSmall() {
      return this.screenWidth < 640;
    },
    isHome() {
      return this.$route.path === '/';
    },
    isSpecific() {
      return this.$route.params.name;
    },
    isDetailPage() {
      return this.$route.path.includes('detail');
    },
    ...mapState(['activeTag']),
    titleHeader() {
      let path = this.$route.path;
      let name = this.$route.path.split('/')[1];
      let name2 = this.$route.params.name.split('-').join(' ');
      let title = '';
      if (path.includes('detail')) {
        title = this.capitalizeFirstLetter(name2);
      } else {
        title = this.capitalizeFirstLetter(name);
      }
      return title;
    },
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  mounted() {
    this.getLogo();
    this.getCountry();
    this.getTrendingCardData();
    // app.config.globalProperties.$eventBus.$on(
    //   'getHeaderDetail',
    //   this.getHeaderDetail
    // );
    app.config.globalProperties.$eventBus.$on(
      'getHeaderDetail',
      this.getSkillBySlug
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
    // app.config.globalProperties.$eventBus.$off(
    //   'getHeaderDetail',
    //   this.getHeaderDetail
    // );
    app.config.globalProperties.$eventBus.$off(
      'getHeaderDetail',
      this.getSkillBySlug
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
    getSkillBySlug() {
      this.isDetail = true;
      const slug = this.$route.params.name;
      this.isLoading = true;
      axios
        .get(`/skills/slug/${slug}`)
        .then((response) => {
          const data = response.data.data;
          // console.log(data);
          this.skillSlug = {
            ...data,
            name: `${data.skills_name} Jobs ` || '',
          };
          // console.log(this.skillSlug);
          this.getHeaderDetail();
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getHeaderDetail() {
      // this.trendingBtn = [
      //   {
      //     id: 1,
      //     title: 'Physiotherapist',
      //     tag: 'Physiotherapist',
      //   },
      // ];
      axios
        .get(`/job-positions/${this.skillSlug.skills_id}/${this.countryId}`)
        .then((response) => {
          const data = response.data.data;
          // console.log(data);
          this.trendingBtn = data.map((group) => {
            return {
              id: group.position_id,
              title: group.position_name,
              tag: group.position_name,
            };
          });
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    capitalizeFirstLetter(sentence) {
      const words = sentence.split(' ');
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        words[i] = word.charAt(0).toUpperCase() + word.slice(1);
      }
      const capitalizedSentence = words.join(' ');
      return capitalizedSentence;
    },
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

      if (this.isDetail) {
        app.config.globalProperties.$eventBus.$emit('filterSpecificJobs', tag);
      } else {
        app.config.globalProperties.$eventBus.$emit('scrollToCardSection');
      }
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
    getCountry() {
      axios
        .get(`/country`)
        .then((response) => {
          const data = response.data.data;
          // console.log(data);
          this.country = data.map((country) => {
            return {
              id: country.country_id,
              title: country.country_name,
              path: '#',
            };
          });
          this.countryId = data
            .filter((d) => d.country_name == this.itemSelected)
            .map((country) => country.country_id)[0];
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
.app-bar-mobile-4 {
  height: 26vh;
}
.app-bar-mobile-5 {
  height: 20vh;
}

.divider {
  background: rgb(173, 173, 173);
  width: 2px;
  height: 70px;
}
.divider-2 {
  background: rgb(173, 173, 173);
  width: 1px;
  height: 50px;
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

.mobile-specific {
  height: 100px !important;
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
