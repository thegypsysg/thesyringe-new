<template>
  <v-container>
    <div
      id="trending-section"
      class="jumbotron-text"
      :class="{ 'mb-n4 mt-n10': isSmall }"
    >
      <h1
        align="center"
        class="header-title mb-n10"
        style="font-size: 56px; font-style: normal; font-weight: 700"
      >
        Trending Healthcare Jobs
      </h1>
    </div>
  </v-container>

  <v-container id="trending" class="mt-8 mx-4 mx-auto">
    <template v-if="isSmall">
      <v-row class="trending__app__wrapper">
        <transition-group name="card-transition" mode="out-in">
          <v-col
            v-for="card in filteredItemsMobile"
            :key="card.id"
            xs="6"
            sm="6"
            md="4"
            cols="6"
          >
            <v-lazy :options="{ threshold: 0.5 }" min-height="200">
              <div class="trending__app d-flex justify-center mb-8">
                <div class="title-card title-card-mobile text-center mx-auto">
                  <h1>{{ card.title }} Jobs</h1>
                </div>
                <v-card
                  style="
                    box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.15);
                    border-radius: 0px;
                  "
                >
                  <div class="img-cont">
                    <div class="cart clearfix animate-effect">
                      <div class="action">
                        <div class="card-desc-cont-mobile px-2 text-center">
                          <h2>{{ card.title }}</h2>
                          <p>{{ card.desc }}</p>
                          <v-btn
                            elevation="4"
                            :to="card.path"
                            style="
                              background-color: #fa2964;
                              border-radius: 50px;
                              padding-left: 6px;
                              padding-right: 4px;
                              padding-top: 2px;
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
                    </div>
                    <div class="overlay"></div>
                    <v-img
                      :src="$fileURL + card.img"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      cover
                      height="250"
                      class="img-item img-item-mobile"
                    >
                      <template #placeholder>
                        <div class="skeleton" />
                      </template>
                    </v-img>
                  </div>
                </v-card>
              </div>
            </v-lazy>
          </v-col>
        </transition-group>
      </v-row>
    </template>
    <template v-if="!isSmall">
      <v-row class="trending__app__wrapper">
        <transition-group name="card-transition" mode="out-in">
          <v-col
            v-for="(card, i) in trendingCard"
            :key="i"
            xs="6"
            sm="6"
            md="3"
            cols="12"
            class="card"
          >
            <v-lazy :options="{ threshold: 0.5 }" min-height="300">
              <div class="trending__app d-flex justify-center mb-8">
                <div class="title-card mx-auto text-center">
                  <h1>{{ card.title }} Jobs</h1>
                </div>
                <v-card
                  style="
                    box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.15);
                    border-radius: 10px;
                  "
                >
                  <div class="img-cont">
                    <div class="cart clearfix animate-effect">
                      <div class="action">
                        <div class="card-desc-cont px-2 text-center">
                          <h2>{{ card.title }}</h2>
                          <p>{{ card.desc }}</p>
                          <v-btn
                            elevation="4"
                            :to="card.path"
                            style="
                              background-color: #fa2964;
                              border-radius: 50px;
                              padding-left: 16px;
                              padding-right: 14px;
                              padding-top: 8px;
                              padding-bottom: 10px;
                            "
                          >
                            <span class="text-white" style="">View Jobs</span>
                            <v-icon right style="color: #fff">
                              mdi-chevron-right
                            </v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </div>
                    <div class="overlay"></div>
                    <v-img
                      :src="$fileURL + card.img"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      cover
                      class="img-item"
                    >
                      <template #placeholder>
                        <div class="skeleton" />
                      </template>
                    </v-img>
                  </div>
                </v-card>
              </div>
            </v-lazy>
          </v-col>
        </transition-group>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import app from '@/util/eventBus';
import { mapState } from 'vuex';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'JobCategories',
  props: ['trendingCard'],
  data() {
    return {
      screenWidth: window.innerWidth,
      // trendingCard: [
      //   {
      //     img: require('@/assets/nurse.png'),
      //     title: 'Nursing Jobs',
      //   },
      //   {
      //     img: require('@/assets/doctor-jobs.jpg'),
      //     title: 'Doctor Jobs',
      //   },
      //   {
      //     img: require('@/assets/imaging.jpg'),
      //     title: 'Lab Jobs',
      //   },
      //   {
      //     img: require('@/assets/use-3.jpg'),
      //     title: 'Nursing Jobs',
      //   },
      // ],
    };
  },
  computed: {
    ...mapState(['activeTag']),
    isSmall() {
      return this.screenWidth < 640;
    },
    filteredItemsMobile() {
      // console.log(this.activeTag);
      if (!this.activeTag || this.activeTag == undefined) {
        return this.trendingCard;
      } else {
        // const searchTextLower = this.search.toLowerCase();
        return this.trendingCard.filter((item) => {
          return item.tag.includes(this.activeTag);
        });
      }
    },
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  mounted() {
    app.config.globalProperties.$eventBus.$on(
      'scrollToCardSection',
      this.scrollToCardSection
    );
    app.config.globalProperties.$eventBus.$on(
      'scrollToTrendingSection',
      this.scrollToTrendingSection
    );
  },
  beforeUnmount() {
    app.config.globalProperties.$eventBus.$off(
      'scrollToCardSection',
      this.scrollToCardSection
    );
    app.config.globalProperties.$eventBus.$off(
      'scrollToTrendingSection',
      this.scrollToTrendingSection
    );
    // eventBus.off("filter-card-header", this.filterCards);
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.screenWidth = window.innerWidth;
    },
    scrollToCardSection() {
      const cardSection = document.getElementById('trending');

      this.$nextTick(() => {
        if (cardSection) {
          const cardRect = cardSection.getBoundingClientRect();
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
          const offset = cardRect.top + scrollTop - 250; // Nilai offset yang diinginkan, dalam piksel

          window.scrollTo({
            top: offset,
            behavior: 'smooth',
          });
        }
      });
      // window.scrollBy(0, -scrollOffset);
    },
    scrollToTrendingSection() {
      const cardSection = document.getElementById('trending');
      const cardRect = cardSection.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const offset = this.isSmall
        ? cardRect.top + scrollTop - 330
        : cardRect.top + scrollTop - 230; // Nilai offset yang diinginkan, dalam piksel

      window.scrollTo({
        top: offset,
        behavior: 'smooth',
      });
      // window.scrollBy(0, -scrollOffset);
    },
  },
};
</script>

<style scoped>
.line-divider {
  height: 2px;
  width: 150px;
  background: #fa2964;
}

.title-card {
  position: absolute;
  top: -20px;
  width: 80%;
  color: white;
  background-color: #fa2964;
  padding: 5px;
  z-index: 100;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  font-size: 12px !important;
  border-radius: 30px;
}
.title-card-mobile {
  width: 90%;
  font-size: 10px !important;
}

.card-desc-cont h2 {
  color: white;
}
.card-desc-cont p {
  color: white;
  margin-bottom: 10px;
}
.card-desc-cont-mobile h2 {
  font-size: 16px;
  color: white;
}
.card-desc-cont-mobile p {
  font-size: 12px;
  color: white;
  margin-bottom: 10px;
}
.my-slide {
  position: relative !important;
}
.view-all {
  background: #0596d5;
  color: white;
  height: 50px !important;
  z-index: 100 !important;
  /* Gaya view all yang sticky */
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

.img-item {
  transition: all 0.3s;
  width: 100% !important;
  height: 400px;
  transform: scale(1);
}

.img-item-mobile {
  height: 200px;
}

.trending__app {
  position: relative;
}
.trending__app:hover .title-card {
  display: none;
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

.skeleton {
  width: 100%;
  height: 100%;
  border-radius: 0;

  background: linear-gradient(-90deg, #f2f2f2 0%, #e1e1e1 50%, #f2f2f2 100%);
  background-size: 400% 400%;
  animation: skeleton 1.6s ease infinite;
}

.desktop-card-desc {
  height: 70px !important;
}

.btn-section {
  background-color: #fa2964;
  border-color: #fa2964;
  font-weight: 400;
  font-size: 20px;
  border-radius: 50px;
}
.btn-section-2 {
  font-size: 14px;
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
