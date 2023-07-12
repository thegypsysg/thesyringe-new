<template>
  <div>
    <div :class="{ 'mt-16': isSmall }">
      <div class="promotion-container" v-for="item in items" :key="item.id">
        <div
          class="w-100 d-flex justify-space-between"
          :class="{
            'px-16': !isSmall,
            'px-5 section-head mt-n8 mb-n4': isSmall,
          }"
        >
          <h2 v-if="!isSmall">
            <span style="color: #ed1c2d; font-weight: 700">{{
              item.title
            }}</span>
            in {{ itemSelected }}
          </h2>
          <h3 style="font-size: 16px !important" v-if="isSmall">
            <span style="color: #ed1c2d; font-weight: 700">{{
              item.title
            }}</span>
            in {{ itemSelected }}
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
                  :height="!isSmall ? 250 : 240"
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
                        : card.text + ' Jobs'
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
                        : card.text + ' Jobs'
                    }}
                  </div>
                  <div
                    class="trending__app"
                    :class="{
                      'card-image-cont-1': !isSmall,
                      'card-image-cont-2': isSmall,
                    }"
                  >
                    <div class="cart clearfix animate-effect">
                      <div class="action">
                        <div class="px-2 text-center">
                          <v-btn
                            elevation="4"
                            :to="card.isLive ? `/${card.path}` : ''"
                            @click="card.isLive ? '' : openLive(card)"
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
                    </div>
                    <div class="overlay"></div>
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
                      <v-icon size="20" color="red"> mdi-heart-outline </v-icon>
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
    <v-dialog v-model="isOpenLive" persistent width="auto">
      <v-card width="450">
        <v-card-text class="text-center">
          <v-img height="100" :src="liveData.img" />
          <h2 class="my-4">{{ liveData.title }} would be Live Soon</h2>
          <v-btn class="mb-4" @click="closeLive()"> OK </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: ['specificJobs'],
  data() {
    return {
      isOpenLive: false,
      liveData: {
        img: '',
        title: '',
      },
      model: null,
      activeIndexCategory: 1,
      screenWidth: window.innerWidth,
    };
  },
  computed: {
    ...mapState(['itemSelected']),
    isSmall() {
      return this.screenWidth < 640;
    },
    items() {
      const itemMap = this.specificJobs.map((item) => {
        return {
          ...item,
          list: item.list.map((l) => {
            return {
              ...l,
              isLive: item.slug == null ? true : true,
            };
          }),
        };
      });
      return itemMap;
    },
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    openLive(item) {
      this.isOpenLive = true;
      this.liveData = {
        img: item.image,
        title: item.text,
      };
    },
    closeLive() {
      this.isOpenLive = false;
      this.liveData = {
        img: '',
        title: '',
      };
    },
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
  bottom: 20px;
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
