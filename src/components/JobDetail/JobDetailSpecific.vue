<template>
  <div>
    <div v-if="isLoading" class="text-center loading-page">
      <v-progress-circular :size="50" color="#fa2964" indeterminate />
    </div>
    <template v-if="!isLoading">
      <template v-if="!isSmall">
        <div class="banner-container-desktop text-center">
          <v-img cover :src="skillSlug.image" />
        </div>
        <div class="text-center my-4">
          <!-- <h2>
              <span class="banner-header">{{ itemData.title }}</span> Specific
              Jobs
            </h2> -->
          <h1 class="font-weight-black">
            Trending {{ skillSlug.name }} Positions
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
              @click="filterSpecificJobs('')"
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
              >
                <v-btn
                  class="sub-menu-btn"
                  :size="isSmall ? 30 : 155"
                  :class="{
                    active: isSelected,
                    'py-4 mx-2': !isSmall,
                  }"
                  style="
                    box-shadow: 0 5px 25px rgba(0, 0, 0, 0);
                    height: 50px !important;
                  "
                  @click="
                    () => {
                      filterSpecificJobs(btn.id);
                      toggle;
                    }
                  "
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
        <div
          v-if="!isCardLoading && internationalCountry.length > 0"
          class="international-cont w-100"
        >
          <v-container>
            <h3 class="ml-8">
              International {{ skillSlug.name }} Jobs (<span>{{
                internationalCard.length
              }}</span
              >)
            </h3>
            <div class="d-flex mt-4">
              <v-btn
                class="sub-menu-btn view-all-1"
                :class="{
                  active: isSelected,
                  'py-4 px-4 mx-2': !isSmall,
                }"
                style="
                  box-shadow: 0 5px 25px rgba(0, 0, 0, 0);
                  height: 40px !important;
                "
                @click="
                  () => {
                    filterInternationalCard('');
                    toggle;
                  }
                "
              >
                <p style="font-size: 12px" elevation>View All</p>
              </v-btn>
              <v-slide-group
                v-if="!isSmall"
                v-model="selectedInter"
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
                    v-if="activeIndex + 1 <= internationalCountry.length / 4"
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
                  v-for="btn in internationalCountry"
                  :key="btn.id"
                  v-slot="{ isSelected, toggle }"
                  :value="btn.id"
                  class="my-slide-item"
                >
                  <v-btn
                    class="sub-menu-btn"
                    :class="{
                      active: isSelected,
                      'py-4 px-4 mx-2': !isSmall,
                    }"
                    style="
                      box-shadow: 0 5px 25px rgba(0, 0, 0, 0);
                      height: 40px !important;
                    "
                    @click="
                      () => {
                        filterInternationalCard(btn.title);
                        toggle;
                      }
                    "
                  >
                    <p style="font-size: 12px" elevation>
                      {{ btn.title }} ({{ btn.count }})
                    </p>
                  </v-btn>
                </v-slide-group-item>
              </v-slide-group>
            </div>
            <div>
              <v-sheet
                class="d-flex justify-start international-cont"
                elevation="0"
              >
                <v-slide-group v-model="model" class="pa-4">
                  <v-slide-group-item
                    v-for="card in filteredInternational"
                    :key="card"
                    v-slot="{ toggle }"
                    class="mx-4"
                  >
                    <v-lazy :options="{ threshold: 0.5 }" min-height="100">
                      <v-card
                        class="my-4 card-cont"
                        :class="{
                          'mx-3 text-center': !isSmall,
                          'mx-1': isSmall,
                        }"
                        :height="!isSmall ? 140 : 100"
                        :width="!isSmall ? 350 : 320"
                        elevation="0"
                        @click="toggle"
                      >
                        <div class="card-description">
                          <div
                            class="w-100 card-address d-flex justify-space-between align-center pa-4"
                          >
                            <div style="width: 15%" class="mr-2">
                              <v-img :src="$fileURL + card.logo" height="35"
                                ><template #placeholder>
                                  <div class="skeleton" /> </template
                              ></v-img>
                            </div>
                            <div
                              style="width: 65%"
                              class="card-address-info text-left mr-2"
                            >
                              <h4 class="mt-4" style="font-weight: 600">
                                {{
                                  card.text.length >= 32
                                    ? card.text.substring(0, 32) + '..'
                                    : card.text
                                }}
                              </h4>
                              <h4 class="mt-2" style="font-weight: 600">
                                {{
                                  card.place.length >= 32
                                    ? card.place.substring(0, 32) + '..'
                                    : card.place
                                }}
                              </h4>

                              <div class="mt-2" style="font-weight: 400">
                                <p>{{ card.address }}</p>
                              </div>
                            </div>
                            <div style="width: 20%">
                              <v-btn
                                :to="`/detail/${card.id}`"
                                elevation="4"
                                style="
                                  background-color: #0596d5;
                                  border-radius: 5px;
                                  padding-left: 8px;
                                  padding-right: 6px;
                                  padding-top: 4px;
                                  padding-bottom: 4px;
                                  font-weight: 600;
                                  font-size: 12px;
                                "
                              >
                                <span class="text-white" style=""
                                  >View Job</span
                                >
                              </v-btn>
                            </div>
                          </div>
                        </div>
                      </v-card>
                    </v-lazy>
                  </v-slide-group-item>
                </v-slide-group>
              </v-sheet>
            </div>
          </v-container>
        </div>
        <v-container
          v-if="!isCardLoading && privilegedJob"
        >
        <h1 v-if="privilegedJob?.length > 0" class="text-blue-darken-4 text-center mb-4">
          Privileged Partner Featured Job
        </h1>
        <div class="d-flex flex-column w-100 justify-center mx-auto text-center">
          <template v-for="card in privilegedJob" :key="card.id">
          
          <v-lazy :options="{ threshold: 0.5 }" min-height="100">
            <v-card
              class="my-4 card-cont px-8 pb-2"
              :class="{ 'mx-auto text-center': !isSmall, 'mx-1': isSmall }"
              :height="!isSmall ? 500 : 320"
              :width="!isSmall ? 650 : 270"
              elevation="1"
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
                  font-size: 20px;
                  font-weight: 700;
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
                  'card-image-cont-priv-desktop': !isSmall,
                  'card-image-cont-2': isSmall,
                }"
              >
                <v-img
                  :src="card.image"
                  class="card-image"
                  :height="isSmall ? 170 : 300"
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
                  position: absolute;
                  top: 30px;
                  right: 55px;
                  background-color: #7C007C;
                  padding-left: 6px;
                  padding-right: 20px;
                  padding-top: 4px;
                  padding-bottom: 4px;
                  gap:10px;
                  font-size: 12px;
                "
              class=" d-flex justify-start mt-8"
            >
              <span class="text-white">Privileged Featured Job</span>
          </div>
          <div
          style="
            position: absolute;
            top: 30px;
            left: 55px;
            background-color: #fff;
            padding-left: 8px;
            padding-right: 20px;
            padding-top: 4px;
            padding-bottom: 4px;
            font-weight: 600;
            font-size: 12px;
          "
          class='mt-8'
        >
          <span class="text-brown" style="">Physio Clinic</span>
        </div>

              <v-btn
                elevation="4"
                :to="`/detail/${card.id}`"
                style="
                  position: absolute;
                  bottom: 180px;
                  left: 55px;
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
                <span class="text-white" style="">View Job</span>
              </v-btn>

              <div
                class="card-description d-flex flex-column mt-6"
                style="position: relative; gap: 10px"
              >
                
                <div class="card-address d-flex align-center">
                  <div style="width: 25%">
                    <v-img :src="card.locationImg" height="60"
                      ><template #placeholder>
                        <div class="skeleton" /> </template
                    ></v-img>
                  </div>
                  <div style="width: 50%" class="card-address-info pl-2 d-flex flex-column justify-center text-left">
                    <div>
                    <h4 class="" style="font-weight: 600">
                      {{
                        card.place.length >= 32
                          ? card.place.substring(0, 32) + '..'
                          : card.place
                      }}
                    </h4>

                    <div class="my-2" style="font-weight: 400">
                      <p>{{ card.address }}</p>
                    </div>
                    <a target="_blank" class="text-decoration-none mt-3" :href="card.website">{{card.website}}</a>
                  </div>
                  </div>
                  <div
                  class="card-address-info text-left mt-n4 mb-n2"
                  style="font-weight: 400; width: 25%"
                >
                  <p>
                    <span class="text-red">{{ card.distanceText }}</span
                    ><span class="text-muted"> away</span>
                  </p>
                </div>
                </div>
              </div>

              <div class="w-25"></div>
              <div
              style="
                  gap:20px
                "
              class=" d-flex justify-center w-75 mt-6"
            >
              <v-btn
              v-if="card.google"
                :size="!isSmall ? '35' : '50'"
                variant="text"
                color="white"
                style="background: transparent"
                icon
                :href="card.google"
              >
                <v-icon :size="!isSmall ? '25' : '40'">
                  <v-img
                    src="@/assets/google.png"
                    alt="Google Logo"
                  />
                </v-icon>
              </v-btn>
              <v-btn
              v-if="card.instagram"
              :size="!isSmall ? '35' : '50'"
                variant="text"
                style="background: #fc2145"
                color="white"
                icon
                :href="card.instagram"
              >
              <v-icon :size="!isSmall ? '20' : '24'">
                  <i class="fa-brands fa-instagram" />
                </v-icon>
              </v-btn>

              <v-btn
              v-if="card.facebook"
                :size="!isSmall ? '35' : '50'"
                variant="text"
                style="background: #4267b2"
                color="white"
                icon
                :href="card.facebook"
              >
                <v-icon :size="!isSmall ? '20' : '24'">
                  <i class="fa-brands fa-facebook-f" />
                </v-icon>
              </v-btn>

              <v-btn
              v-if="card.linkedin"
                :size="!isSmall ? '35' : '50'"
                variant="text"
                style="background: #0072b1"
                color="white"
                icon
                :href="card.linkedin"
              >
                <v-icon :size="!isSmall ? '20' : '24'">
                  <i class="fa-brands fa-linkedin-in" />
                </v-icon>
              </v-btn>
              <v-btn
              v-if="card.tiktok"
                :size="!isSmall ? '35' : '50'"
                variant="text"
                style="background: black"
                color="white"
                icon
                :href="card.tiktok"
              >
                <v-icon :size="!isSmall ? '20' : '24'">
                  <i class="fa-brands fa-tiktok" />
                </v-icon>
              </v-btn>

              <v-btn
              v-if="card.youtube"
              :size="!isSmall ? '35' : '50'"
              variant="text"
              style="background: #cd201f"
              color="white"
              icon
              :href="card.youtube"
            >
            <v-icon :size="!isSmall ? '21' : '24'">
                <i class="fa-brands fa-youtube" />
              </v-icon>
            </v-btn>

              <v-btn
              v-if="card.twitter"
                :size="!isSmall ? '35' : '50'"
                variant="text"
                style="background: #1c96e8"
                color="white"
                icon="mdi-twitter"
                :href="card.twitter"
              >
              <v-icon :size="!isSmall ? '21' : '24'">
                <i class="fa-brands fa-twitter" />
              </v-icon>
            </v-btn>
            </div>

              <div class="card-btn-container-priv-desktop d-flex justify-space-between">
                <v-btn
                  color="black"
                  class="card-btn"
                  :width="isSmall ? 40 : 40"
                  :height="isSmall ? 40 : 40"
                  icon="mdi-share-variant-outline"
                >
                  <v-icon size="25" color="red">
                    mdi-share-variant-outline
                  </v-icon>
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
                  </v-btn
                >
                <v-btn
                  class="card-btn"
                  color="black"
                  icon="mdi-heart-outline"
                  :width="isSmall ? 40 : 40"
                  :height="isSmall ? 40 : 40"
                  @click="card.isFav = !card.isFav"
                >
                  <v-icon size="25" color="red"> {{ card.isFav ? 'mdi-heart' : 'mdi-heart-outline'}} </v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-lazy>
        </template>
        </div>
        </v-container>
        <v-container
        v-if="!isCardLoading && platinumJob"
        
      >
      <h1 v-if="platinumJob?.length > 0" style="color: #B2641D" class=" text-center my-2">
        Platinum Partner Featured Job
      </h1>
      <div class="d-flex w-100 justify-start flex-wrap">
        <template v-for="card in platinumJob" :key="card.id">
        
        <v-lazy :options="{ threshold: 0.5 }" min-height="100">
          <v-card
            class="my-4 card-cont pa-2"
            :class="{ 'mx-3 text-center': !isSmall, 'mx-1': isSmall }"
            :height="!isSmall ? 510 : 320"
            :width="!isSmall ? 300 : 270"
            elevation="1"
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
                font-weight: 700;
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
                'card-image-cont-4': !isSmall,
                'card-image-cont-2': isSmall,
              }"
            >
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
                  position: absolute;
                  top: 30px;
                  right: 15px;
                  background-color: #E2FF02;
                  padding-left: 15px;
                  padding-right: 15px;
                  padding-top: 4px;
                  padding-bottom: 4px;
                  gap:10px;
                  font-size: 12px;
                  font-weight: 600;
                "
              class=" d-flex justify-start mt-8"
            >
              <span >Platinum Featured Job</span>
          </div>
            <div
              style="
                position: absolute;
                bottom: 300px;
                left: 15px;
                background-color: #fff;
                padding-left: 8px;
                padding-right: 20px;
                padding-top: 4px;
                padding-bottom: 4px;
                font-weight: 600;
                font-size: 12px;
              "
            >
              <span class="text-brown" style="">Physio Clinic</span>
            </div>

            <div
              class="card-description d-flex flex-column mt-6"
              style="position: relative; gap: 10px"
            >
              <div
                class="card-address-info text-left mt-n4 mb-n2"
                style="font-weight: 400"
              >
                <p>
                  <span class="text-red">{{ card.distanceText }}</span
                  ><span class="text-muted"> away</span>
                </p>
              </div>
              <div class="card-address">
                <div style="width: 100%">
                  <v-img :src="card.locationImg" height="50"
                    ><template #placeholder>
                      <div class="skeleton" /> </template
                  ></v-img>
                </div>
                <div style="width: 100%" class="card-address-info text-center">
                  <h4 class="mt-4" style="font-weight: 600">
                    {{
                      card.place.length >= 32
                        ? card.place.substring(0, 32) + '..'
                        : card.place
                    }}
                  </h4>

                  <div class="mt-2" style="font-weight: 400">
                    <p>{{ card.address }}</p>
                  </div>
                  
                  <a class="text-decoration-none mt-3" :href="card.website">{{card.website}}</a>
                </div>
              </div>
            </div>
            <div
            style="
                gap:10px
              "
            class="w-100 d-flex justify-center mt-4 mb-8"
          >
            <v-btn
            v-if="card.google"
              :size="!isSmall ? '35' : '50'"
              variant="text"
              color="white"
              style="background: transparent"
              icon
              :href="card.google"
            >
              <v-icon :size="!isSmall ? '25' : '40'">
                <v-img
                  src="@/assets/google.png"
                  alt="Google Logo"
                />
              </v-icon>
            </v-btn>

            <v-btn
            v-if="card.instagram"
              :size="!isSmall ? '35' : '50'"
              variant="text"
              style="background: #fc2145"
              color="white"
              icon
              :href="card.instagram"
            >
            <v-icon :size="!isSmall ? '20' : '24'">
                <i class="fa-brands fa-instagram" />
              </v-icon>
            </v-btn>

            <v-btn
            v-if="card.facebook"
              :size="!isSmall ? '35' : '50'"
              variant="text"
              style="background: #4267b2"
              color="white"
              icon
              :href="card.facebook"
            >
              <v-icon :size="!isSmall ? '20' : '24'">
                <i class="fa-brands fa-facebook-f" />
              </v-icon>
            </v-btn>

            <v-btn
            v-if="card.linkedin"
              :size="!isSmall ? '35' : '50'"
              variant="text"
              style="background: #0072b1"
              color="white"
              icon
              :href="card.linkedin"
            >
              <v-icon :size="!isSmall ? '20' : '24'">
                <i class="fa-brands fa-linkedin-in" />
              </v-icon>
            </v-btn>
            <v-btn
            v-if="card.tiktok"
              :size="!isSmall ? '35' : '50'"
              variant="text"
              style="background: black"
              color="white"
              icon
              :href="card.tiktok"
            >
              <v-icon :size="!isSmall ? '20' : '24'">
                <i class="fa-brands fa-tiktok" />
              </v-icon>
            </v-btn>

            <v-btn
            v-if="card.youtube"
            :size="!isSmall ? '35' : '50'"
            variant="text"
            style="background: #cd201f"
            color="white"
            icon
            :href="card.youtube"
          >
          <v-icon :size="!isSmall ? '21' : '24'">
              <i class="fa-brands fa-youtube" />
            </v-icon>
          </v-btn>

            <v-btn
            v-if="card.twitter"
              :size="!isSmall ? '35' : '50'"
              variant="text"
              style="background: #1c96e8"
              color="white"
              icon="mdi-twitter"
              :href="card.twitter"
            >
            <v-icon :size="!isSmall ? '21' : '24'">
              <i class="fa-brands fa-twitter" />
            </v-icon>
          </v-btn>
          </div>
          <div class="d-flex justify-center">
          <v-btn
          elevation="4"
          :to="`/detail/${card.id}`"
          style="
            
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
          <span class="text-white" style="">View Job</span>
        </v-btn>
      </div>
            <div class="card-btn-container-4 d-flex justify-space-between">
              <v-btn
                color="black"
                class="card-btn"
                :width="isSmall ? 40 : 32"
                :height="isSmall ? 40 : 32"
                icon="mdi-share-variant-outline"
              >
                <v-icon size="20" color="red">
                  mdi-share-variant-outline
                </v-icon>
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
                </v-btn
              >
              <v-btn
                class="card-btn"
                color="black"
                icon="mdi-heart-outline"
                :width="isSmall ? 40 : 32"
                :height="isSmall ? 40 : 32"
                @click="card.isFav = !card.isFav"
              >
                <v-icon size="20" color="red"> {{ card.isFav ? 'mdi-heart' : 'mdi-heart-outline'}} </v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-lazy>
      </template>
    </div>
      </v-container>
        <template v-if="isCardLoading">
          <v-container>
            <p class="ml-8 my-10">Loading...</p>
          </v-container>
        </template>
        <template v-if="!isCardLoading">
          <div
            class="promotion-container"
            v-for="item in filteredItemsDesktop"
            :key="item.id"
          >
            <div
              class="w-100 d-flex justify-space-between"
              :class="{
                'px-16': !isSmall,
                'px-5 section-head mt-n8 mb-n4': isSmall,
              }"
            >
              <h2
                style="font-weight: 700"
                v-if="!isSmall"
                class="text-blue-darken-4"
              >
                {{ item.title }}
              </h2>
              <h3
                style="
                  font-size: 16px !important;
                  color: #000;
                  font-weight: 700;
                "
                v-if="isSmall"
              >
                {{ item.title }}
              </h3>
              <router-link
                :to="`/view-all/${item.id}`"
                class="text-decoration-none"
              >
                <h1 class="view-all">View all</h1>
              </router-link>
            </div>
            <v-sheet
              class="d-flex justify-start"
              :class="{ 'ml-12': filteredItemsDesktop[0].list.length <= 4 }"
              elevation="0"
            >
              <v-slide-group v-model="model" class="pa-4">
                <v-slide-group-item
                  v-for="card in item.list.slice(0, 6)"
                  :key="card"
                  v-slot="{ toggle }"
                  class="mx-4"
                >
                  <v-lazy :options="{ threshold: 0.5 }" min-height="100">
                    <v-card
                      class="my-4 card-cont"
                      :class="{ 'mx-3 text-center': !isSmall, 'mx-1': isSmall }"
                      :height="!isSmall ? 320 : 280"
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
                      <v-btn
                        elevation="4"
                        :to="`/detail/${card.id}`"
                        style="
                          position: absolute;
                          bottom: 110px;
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
                        <span class="text-white" style="">View Job</span>
                      </v-btn>
                      <div
                        v-if="card.featured == 'Y'"
                        style="
                          position: absolute;
                          top: 50px;
                          right: 15px;
                          background-color: #f69400;
                          border-radius: 5px;
                          padding-left: 10px;
                          padding-right: 10px;
                          padding-top: 4px;
                          padding-bottom: 4px;
                          font-weight: 600;
                          font-size: 12px;
                          text-align: left !important;
                        "
                      >
                        <span class="text-white text-left" style=""
                          >Featured Jobs</span
                        >
                      </div>
                                <div
          style="
            position: absolute;
            top: 50px;
            left: 15px;
            background-color: #fff;
            padding-left: 8px;
            padding-right: 8px;
            padding-top: 4px;
            padding-bottom: 4px;
            font-weight: 600;
            font-size: 12px;
          "
        >
          <span class="text-brown" style="">{{item.btn}}</span>
        </div>

                      <div
                        class="card-description d-flex flex-column mt-6"
                        style="position: relative; gap: 10px"
                      >
                        <div
                          class="card-address-info text-left mt-n4 mb-n2"
                          style="font-weight: 400"
                        >
                          <p>
                            <span class="text-red">{{ card.distanceText }}</span
                            ><span class="text-muted"> away</span>
                          </p>
                        </div>
                        <div
                          style="gap: 5px"
                          class="card-address d-flex align-center"
                        >
                          <div style="width: 25%">
                            <v-img :src="card.locationImg" height="35"
                              ><template #placeholder>
                                <div class="skeleton" /> </template
                            ></v-img>
                          </div>
                          <div
                            style="width: 75%"
                            class="card-address-info text-left"
                          >
                            <h4 class="mt-4" style="font-weight: 600">
                              {{
                                card.place.length >= 32
                                  ? card.place.substring(0, 32) + '..'
                                  : card.place
                              }}
                            </h4>

                            <div class="mt-2" style="font-weight: 400">
                              <p>{{ card.address }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="card-btn-container-1 d-flex justify-space-between"
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
                <v-slide-group-item
                  v-if="item.list.length >= 6"
                  v-slot="{ toggle }"
                >
                  <v-lazy :options="{ threshold: 0.5 }" min-height="100">
                    <v-card
                      class="my-4 text-center mx-3 d-flex flex-column align-center justify-center px-4 py-10"
                      height="220"
                      width="180"
                      elevation="0"
                      :to="`/view-all/${item.id}`"
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
                        :to="`/view-all/${item.id}`"
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
        </template>
      </template>
      <template v-if="isSmall">
        <div class="banner-container"></div>
        <div
          v-if="!isCardLoading && internationalCountry.length > 0"
          class="international-cont w-100"
        >
          <v-container>
            <h4 class="ml-8">
              International {{ skillSlug.name }} Jobs (<span>{{
                internationalCard.length
              }}</span
              >)
            </h4>
            <div class="d-flex mt-4">
              <v-btn
                class="sub-menu-btn view-all-1"
                height="30"
                :class="{
                  active: isSelected,
                  'py-2 px-2 mx-2': !isSmall,
                }"
                style="
                  box-shadow: 0 5px 25px rgba(0, 0, 0, 0);
                  height: 30px !important;
                "
                @click="
                  () => {
                    filterInternationalCard('');
                    toggle;
                  }
                "
              >
                <p style="font-size: 12px" elevation>View All</p>
              </v-btn>
              <v-slide-group
                v-model="selectedTag"
                class="trending-slide my-slide"
              >
                <v-slide-group-item
                  v-for="btn in internationalCountry"
                  :key="btn.id"
                  v-slot="{ isSelected, toggle }"
                  :value="btn.id"
                  class="my-slide-item"
                >
                  <v-btn
                    class="sub-menu-btn"
                    height="30"
                    :class="{
                      active: isSelected,
                      'py-4 px-2 mx-2': !isSmall,
                    }"
                    style="
                      box-shadow: 0 5px 25px rgba(0, 0, 0, 0);
                      height: 30px !important;
                    "
                    @click="
                      () => {
                        filterInternationalCard(btn.title);
                        toggle;
                      }
                    "
                  >
                    <p style="font-size: 10px" elevation>
                      {{ btn.title }} ({{ btn.count }})
                    </p>
                  </v-btn>
                </v-slide-group-item>
              </v-slide-group>
            </div>
            <div>
              <v-sheet
                class="d-flex justify-start mt-n16 international-cont"
                elevation="0"
              >
                <v-slide-group v-model="model" class="pa-0">
                  <v-slide-group-item
                    v-for="card in filteredInternational"
                    :key="card"
                    v-slot="{ toggle }"
                    class="mx-4"
                  >
                    <v-lazy :options="{ threshold: 0.5 }" min-height="100">
                      <v-card
                        class="my-2 card-cont"
                        :class="{
                          'mx-3 text-center': !isSmall,
                          'mx-1': isSmall,
                        }"
                        :height="!isSmall ? 140 : 100"
                        :width="!isSmall ? 350 : 280"
                        elevation="0"
                        @click="toggle"
                      >
                        <div class="card-description">
                          <div
                            class="w-100 card-address d-flex justify-space-between align-center pa-2"
                          >
                            <div style="width: 15%" class="mr-2">
                              <v-img :src="$fileURL + card.logo" height="35"
                                ><template #placeholder>
                                  <div class="skeleton" /> </template
                              ></v-img>
                            </div>
                            <div
                              style="width: 55%"
                              class="card-address-info-mobile text-left mr-2"
                            >
                              <h4 class="mt-2" style="font-weight: 600">
                                {{
                                  card.text.length >= 32
                                    ? card.text.substring(0, 32) + '..'
                                    : card.text
                                }}
                              </h4>
                              <h4 class="mt-2" style="font-weight: 600">
                                {{
                                  card.place.length >= 40
                                    ? card.place.substring(0, 40) + '..'
                                    : card.place
                                }}
                              </h4>

                              <div class="mt-2" style="font-weight: 400">
                                <p>{{ card.address }}</p>
                              </div>
                            </div>
                            <div style="width: 30%">
                              <v-btn
                                :to="`/detail/${card.id}`"
                                elevation="4"
                                style="
                                  background-color: #0596d5;
                                  border-radius: 5px;
                                  padding-left: 8px;
                                  padding-right: 6px;
                                  padding-top: 4px;
                                  padding-bottom: 4px;
                                  font-weight: 600;
                                  font-size: 10px;
                                "
                              >
                                <span class="text-white" style=""
                                  >View Job</span
                                >
                              </v-btn>
                            </div>
                          </div>
                        </div>
                      </v-card>
                    </v-lazy>
                  </v-slide-group-item>
                </v-slide-group>
              </v-sheet>
            </div>
          </v-container>
        </div>
        <div
          v-if="!isCardLoading && privilegedJob"
          style="width: 100% !important"
          class="px-2"
        >
        <h2 v-if="privilegedJob?.length > 0" class="text-purple-accent-4 text-center mt-4 mb-6">
          Privileged Partner Featured Job
        </h2>
        <div class="d-flex justify-center flex-wrap">
          <template v-for="card in privilegedJob" :key="card.id">
          <v-lazy :options="{ threshold: 0.5 }" min-height="100">
            <v-card
              class="mb-4 card-cont"
              :class="{ 'mx-3 text-center': !isSmall, 'mx-auto': isSmall }"
              :height="!isSmall ? 360 : 455"
              width="90%"
              elevation="1"
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
                class="pt-2 px-2"
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
                  'card-image-cont-3': isSmall,
                }"
              >
                <v-img
                  :src="card.image"
                  class="card-image"
                  :height="isSmall ? 240 : 220"
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
                  position: absolute;
                  top: 30px;
                  right: 15px;
                  background-color: #7C007C;
                  padding-left: 6px;
                  padding-right: 20px;
                  padding-top: 4px;
                  padding-bottom: 4px;
                  gap:10px;
                  font-size: 12px;
                "
              class=" d-flex justify-start mt-8"
            >
              <span class="text-white">Privileged Featured Job</span>
          </div>
              <v-btn
                elevation="4"
                :to="`/detail/${card.id}`"
                style="
                  position: absolute;
                  bottom: 190px;
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
                <span class="text-white" style="">View Job</span>
              </v-btn>

              <div
                class="card-description px-2 d-flex flex-column mt-6"
                style="position: relative; gap: 10px"
              >
                <div
                  class="card-address-info text-left mt-n4 mb-n2"
                  style="font-weight: 400"
                >
                  <p>
                    <span class="text-red">{{ card.distanceText }}</span
                    ><span class="text-muted"> away</span>
                  </p>
                </div>
                <div class="card-address d-flex align-center">
                  <div style="width: 25%">
                    <v-img :src="card.locationImg" height="35"
                      ><template #placeholder>
                        <div class="skeleton" /> </template
                    ></v-img>
                  </div>
                  <div style="width: 75%" class="card-address-info text-left">
                    <h4 class="mt-4" style="font-weight: 600">
                      {{
                        card.place.length >= 32
                          ? card.place.substring(0, 32) + '..'
                          : card.place
                      }}
                    </h4>

                    <div class="mt-2 w-75" style="font-weight: 400">
                      <p>{{ card.address }}</p>
                    </div>
                    <a class="text-decoration-none mt-3" :href="card.website">{{card.website}}</a>
                  </div>
                </div>
              </div>

              <div
              style="
                  gap:10px
                "
              class="w-100 px-2 d-flex justify-center mt-4 mb-4"
            >
              <v-btn
              v-if="card.google"
                :size="!isSmall ? '35' : '40'"
                variant="text"
                color="white"
                style="background: transparent"
                icon
                :href="card.google"
              >
                <v-icon :size="!isSmall ? '25' : '30'">
                  <v-img
                    src="@/assets/google.png"
                    alt="Google Logo"
                  />
                </v-icon>
              </v-btn>
              <v-btn
              v-if="card.instagram"
              :size="!isSmall ? '35' : '40'"
                variant="text"
                style="background: #fc2145"
                color="white"
                icon
                :href="card.instagram"
              >
              <v-icon :size="!isSmall ? '20' : '18'">
                  <i class="fa-brands fa-instagram" />
                </v-icon>
              </v-btn>
  
              <v-btn
              v-if="card.facebook"
                :size="!isSmall ? '35' : '40'"
                variant="text"
                style="background: #4267b2"
                color="white"
                icon
                :href="card.facebook"
              >
                <v-icon :size="!isSmall ? '20' : '18'">
                  <i class="fa-brands fa-facebook-f" />
                </v-icon>
              </v-btn>
  
              <v-btn
              v-if="card.linkedin"
                :size="!isSmall ? '35' : '40'"
                variant="text"
                style="background: #0072b1"
                color="white"
                icon
                :href="card.linkedin"
              >
                <v-icon :size="!isSmall ? '20' : '18'">
                  <i class="fa-brands fa-linkedin-in" />
                </v-icon>
              </v-btn>
              <v-btn
              v-if="card.tiktok"
                :size="!isSmall ? '35' : '40'"
                variant="text"
                style="background: black"
                color="white"
                icon
                :href="card.tiktok"
              >
                <v-icon :size="!isSmall ? '20' : '18'">
                  <i class="fa-brands fa-tiktok" />
                </v-icon>
              </v-btn>
              <v-btn
              v-if="card.youtube"
              :size="!isSmall ? '35' : '40'"
              variant="text"
              style="background: #cd201f"
              color="white"
              icon
              :href="card.youtube"
            >
            <v-icon :size="!isSmall ? '21' : '19'">
                <i class="fa-brands fa-youtube" />
              </v-icon>
            </v-btn>
              <v-btn
              v-if="card.twitter"
                :size="!isSmall ? '35' : '40'"
                variant="text"
                style="background: #1c96e8"
                color="white"
                icon="mdi-twitter"
                :href="card.twitter"
              >
              <v-icon :size="!isSmall ? '21' : '19'">
                <i class="fa-brands fa-twitter" />
              </v-icon>
            </v-btn>
            </div>

              <div class="card-btn-container-6 d-flex justify-space-between">
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
        </template>
        </div>
        </div>
        <div
          v-if="!isCardLoading && platinumJob"
          style="width: 100% !important"
          class="px-2"
        >
        <h2 v-if="platinumJob?.length > 0" style="color: #B2641D" class=" text-center my-4">
          Platinum Partner Featured Job
        </h2>
        <div class="d-flex justify-center flex-wrap">
          <template v-for="card in platinumJob" :key="card.id">
          <v-lazy :options="{ threshold: 0.5 }" min-height="100">
            <v-card
              class="mb-4 card-cont card-platinum"
              :class="{ 'mx-3 text-center': !isSmall, 'mx-auto': isSmall }"
              :height="!isSmall ? 360 : 570"
              elevation="1"
              @click="toggle"
            >
              <div
                v-if="isSmall"
                style="
                  font-size: 16px;
                  font-weight: 700;
                  margin-bottom: 10px;
                  line-height: 19.36px;
                "
                class="pt-2 px-2"
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
                  'card-image-cont-plat-mobile': isSmall,
                }"
              >
                <v-img
                  :src="card.image"
                  class="card-image"
                  :height="isSmall ? 240 : 220"
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
                  position: absolute;
                  top: 30px;
                  right: 15px;
                  background-color: #E2FF02;
                  padding-left: 15px;
                  padding-right: 15px;
                  padding-top: 4px;
                  padding-bottom: 4px;
                  gap:10px;
                  font-size: 12px;
                  font-weight: 600;
                "
              class=" d-flex justify-start mt-8"
            >
              <span >Platinum Featured Job</span>
          </div>
            <div
              style="
                position: absolute;
                bottom: 350px;
                left: 15px;
                background-color: #fff;
                padding-left: 8px;
                padding-right: 20px;
                padding-top: 4px;
                padding-bottom: 4px;
                font-weight: 600;
                font-size: 12px;
              "
            >
              <span class="text-brown" style="">Physio Clinic</span>
            </div>

              <div
                class="card-description px-2 d-flex flex-column mt-6"
                style="position: relative; gap: 10px"
              >
                <div
                  class="card-address-info text-left mt-n4 mb-n2"
                  style="font-weight: 400"
                >
                  <p>
                    <span class="text-red">{{ card.distanceText }}</span
                    ><span class="text-muted"> away</span>
                  </p>
                </div>
                <div class="card-address mt-4">
                  <div style="width: 100%">
                    <v-img :src="card.locationImg" height="50"
                      ><template #placeholder>
                        <div class="skeleton" /> </template
                    ></v-img>
                  </div>
                  <div style="width: 100%" class="card-address-info text-center">
                    <h2 class="mt-4" style="font-weight: 600">
                      {{
                        card.place.length >= 32
                          ? card.place.substring(0, 32) + '..'
                          : card.place
                      }}
                    </h2>

                    <div class="mt-2" style="font-weight: 400">
                      <p>{{ card.address }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
              style="
                  gap:10px
                "
              class="w-100 px-2 d-flex justify-center my-6"
            >
              <v-btn
              v-if="card.google"
                :size="!isSmall ? '35' : '40'"
                variant="text"
                color="white"
                style="background: transparent"
                icon
                :href="card.google"
              >
                <v-icon :size="!isSmall ? '25' : '30'">
                  <v-img
                    src="@/assets/google.png"
                    alt="Google Logo"
                  />
                </v-icon>
              </v-btn>
              <v-btn
              v-if="card.instagram"
              :size="!isSmall ? '35' : '40'"
                variant="text"
                style="background: #fc2145"
                color="white"
                icon
                :href="card.instagram"
              >
              <v-icon :size="!isSmall ? '20' : '18'">
                  <i class="fa-brands fa-instagram" />
                </v-icon>
              </v-btn>

              <v-btn
              v-if="card.facebook"
                :size="!isSmall ? '35' : '40'"
                variant="text"
                style="background: #4267b2"
                color="white"
                icon
                :href="card.facebook"
              >
                <v-icon :size="!isSmall ? '20' : '18'">
                  <i class="fa-brands fa-facebook-f" />
                </v-icon>
              </v-btn>
  
              <v-btn
              v-if="card.linkedin"
                :size="!isSmall ? '35' : '40'"
                variant="text"
                style="background: #0072b1"
                color="white"
                icon
                :href="card.linkedin"
              >
                <v-icon :size="!isSmall ? '20' : '18'">
                  <i class="fa-brands fa-linkedin-in" />
                </v-icon>
              </v-btn>
              <v-btn
              v-if="card.tiktok"
                :size="!isSmall ? '35' : '40'"
                variant="text"
                style="background: black"
                color="white"
                icon
                :href="card.tiktok"
              >
                <v-icon :size="!isSmall ? '20' : '18'">
                  <i class="fa-brands fa-tiktok" />
                </v-icon>
              </v-btn>

              <!-- v-if="itemData.youtube != null"
              :href="itemData.youtube" -->
              <v-btn
              v-if="card.youtube"
              :size="!isSmall ? '35' : '40'"
              variant="text"
              style="background: #cd201f"
              color="white"
              icon
              :href="card.youtube"
            >
            <v-icon :size="!isSmall ? '20' : '18'">
                <i class="fa-brands fa-youtube" />
              </v-icon>
            </v-btn>

              <v-btn
              v-if="card.twitter"
                :size="!isSmall ? '35' : '40'"
                variant="text"
                style="background: #1c96e8"
                color="white"
                icon="mdi-twitter"
                :href="card.twitter"
              >
              <v-icon :size="!isSmall ? '21' : '19'">
                <i class="fa-brands fa-twitter" />
              </v-icon>
            </v-btn>
            </div>
                <div class="w-100 my-4 d-flex justify-center">
                    <a class="text-decoration-none text-center" :href="card.website">{{card.website}}</a>
                  </div>
              <div class="d-flex mt-2 justify-center">
                <v-btn
                elevation="4"
                :to="`/detail/${card.id}`"
                style="
                  
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
                <span class="text-white" style="">View Job</span>
              </v-btn>
            </div>
              <div class="card-btn-container-plat-mobile d-flex justify-space-between">
                <v-btn
                  color="black"
                  class="card-btn"
                  :width="isSmall ? 40 : 32"
                  :height="isSmall ? 40 : 32"
                  icon="mdi-share-variant-outline"
                >
                  <v-icon size="20" color="red">
                    mdi-share-variant-outline
                  </v-icon>
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
                  </v-btn
                >
                <v-btn
                  class="card-btn"
                  color="black"
                  icon="mdi-heart-outline"
                  :width="isSmall ? 40 : 32"
                  :height="isSmall ? 40 : 32"
                  @click="card.isFav = !card.isFav"
                >
                  <v-icon size="20" color="red"> {{ card.isFav ? 'mdi-heart' : 'mdi-heart-outline'}} </v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-lazy>
          </template>
          </div>
        </div>
        <template v-if="isCardLoading">
          <v-container>
            <p class="ml-8 my-10">Loading...</p>
          </v-container>
        </template>
        <template v-if="!isCardLoading">
          <!-- <v-container class="mt-n16">
            <p class="font-weight-bold pb-4">
              In here you will find all
              <span class="text-blue-darken-4">{{ skillSlug.name }} Jobs</span>
              specifically in
              <span class="text-blue-darken-4">{{
                itemSelected2 == '---Select City---'
                  ? itemSelected
                  : itemSelected2
              }}</span>
            </p>
          </v-container> -->
          <div
            class="promotion-container"
            v-for="item in filteredItems"
            :key="item.id"
          >
            <hr />
            <div
              class="w-100 d-flex justify-space-between mt-6"
              :class="{
                'px-16': !isSmall,
                'px-5 section-head mb-n4': isSmall,
              }"
            >
              <h2 style="color: #000; font-weight: 700" v-if="!isSmall">
                {{ item.title }}
              </h2>
              <h2
                style="font-size: 20px !important; font-weight: 700"
                class="text-blue-darken-4"
                v-if="isSmall"
              >
                {{ item.title }}
              </h2>
              <router-link
                :to="`/view-all/${item.id}`"
                class="text-decoration-none"
              >
                <h1 class="view-all">View all</h1>
              </router-link>
            </div>
            <v-sheet
              class="mx-auto mb-2"
              :class="{ 'ml-n16': item.list.length <= 1 }"
              elevation="0"
            >
              <v-slide-group
                v-model="model"
                :class="{ 'ml-n8': item.list.length <= 1 }"
                class="pa-4"
              >
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
                      class="mt-4 card-cont"
                      :class="{ 'mx-3 text-center': !isSmall, 'mx-1': isSmall }"
                      :height="!isSmall ? 300 : 320"
                      :width="!isSmall ? 280 : 290"
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
                              <span class="text-white" style="">View Job</span>
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
                          :height="isSmall ? 190 : 220"
                          cover
                          transition="fade-transition"
                        >
                          <template #placeholder>
                            <div class="skeleton skeleton-category ml-2" />
                          </template>
                        </v-img>
                      </div>
                      <v-btn
                        elevation="4"
                        :to="`/detail/${card.id}`"
                        style="
                          position: absolute;
                          bottom: 100px;
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
                        <span class="text-white" style="">View Job</span>
                      </v-btn>
                      <div
                        v-if="card.featured == 'Y'"
                        style="
                          position: absolute;
                          top: 50px;
                          right: 15px;
                          background-color: #f79303;
                          border-radius: 5px;
                          padding-left: 8px;
                          padding-right: 8px;
                          padding-top: 4px;
                          padding-bottom: 4px;
                          font-weight: 600;
                          font-size: 12px;
                        "
                      >
                        <span class="text-white text-left" style=""
                          >Featured Jobs</span
                        >
                      </div>
                      <div
                      style="
                        position: absolute;
                        top: 50px;
                        left: 15px;
                        background-color: #fff;
                        padding-left: 8px;
                        padding-right: 8px;
                        padding-top: 4px;
                        padding-bottom: 4px;
                        font-weight: 600;
                        font-size: 12px;
                      "
                    >
                      <span class="text-brown" style="">{{item.btn}}</span>
                    </div>

                      <div
                        class="card-description d-flex flex-column mt-6"
                        style="position: relative; gap: 10px"
                      >
                        <div
                          class="card-address-info-mobile mt-n4 mb-n2"
                          style="font-weight: 400"
                        >
                          <p>
                            <span class="text-red">{{ card.distanceText }}</span
                            ><span class="text-muted"> away</span>
                          </p>
                        </div>
                        <div
                          style="gap: 5px"
                          class="card-address d-flex align-center"
                        >
                          <div style="width: 25%">
                            <v-img :src="card.locationImg" height="35"
                              ><template #placeholder>
                                <div class="skeleton" /> </template
                            ></v-img>
                          </div>
                          <div
                            style="width: 75%"
                            class="card-address-info-mobile mt-3 text-left"
                          >
                            <h4 style="font-weight: 600">
                              {{
                                card.place.length >= 33
                                  ? card.place.substring(0, 33) + '..'
                                  : card.place
                              }}
                            </h4>
                            <div style="font-weight: 400" class="mt-2">
                              <p>{{ card.address }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="card-btn-container-2 d-flex justify-space-between"
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
                <v-slide-group-item
                  v-if="item.list.length > 4"
                  v-slot="{ toggle }"
                >
                  <v-lazy :options="{ threshold: 0.5 }" min-height="100">
                    <v-card
                      class="my-4 text-center mx-3 d-flex flex-column align-center justify-center px-4 py-10"
                      height="220"
                      width="180"
                      elevation="0"
                      :to="`/view-all/${item.id}`"
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
                        :to="`/view-all/${item.id}`"
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
        </template>
      </template>
      <template v-if="!isSmall && filteredItemsDesktop.length > 0">
        <v-container
          v-if="skillSlug2.countryRegistrable == 'Y'"
          :class="{ 'w-75 mx-auto': !isSmall }"
        >
          <div
            :class="{
              'd-flex flex-column mt-10 mb-14': !isSmall,
              'd-flex flex-column my-6 d-flex': isSmall,
            }"
          >
            <h1 v-if="!isSmall" class="registrable-title mb-4">
              <span class="text-blue-darken-4">{{ skillSlug2.name }}</span> is
              Registrable
            </h1>
            <h3 v-if="isSmall" class="registrable-title mb-4">
              <span class="text-blue-darken-4">{{ skillSlug2.name }}</span> is
              Registrable
            </h3>
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
                  <p :class="{ 'regist-desktop': !isSmall }">
                    Your Qualifications must be registrable with
                    <span class="text-blue-darken-4">{{
                      skillSlug2.regulator
                    }}</span>
                    in Order for you to apply for a
                    <span class="text-blue-darken-4"
                      >{{ skillSlug2.name }} Job</span
                    >
                    in
                    <span class="text-blue-darken-4">{{ itemSelected }}</span>
                  </p>
                </div>
                <v-btn
                  to="/recognised-qualifications"
                  @click="goToRecognised(skillSlug2)"
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
                    :src="skillSlug2.mainImage"
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
      <template v-if="isSmall && filteredItems.length > 0">
        <v-container
          v-if="skillSlug2.countryRegistrable == 'Y'"
          :class="{ 'w-75': !isSmall }"
        >
          <div
            :class="{
              'd-flex flex-column mt-10 mb-14': !isSmall,
              'd-flex flex-column my-6 d-flex': isSmall,
            }"
          >
            <h1 v-if="!isSmall" class="registrable-title mb-4">
              <span class="text-blue-darken-4">{{ skillSlug2.name }}</span>
              is Registrable
            </h1>
            <h3 v-if="isSmall" class="registrable-title mb-4">
              <span class="text-blue-darken-4">{{ skillSlug2.name }}</span>
              is Registrable
            </h3>
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
                  :height="isSmall ? 245 : 250"
                  cover
                  :src="skillSlug2.mainImage"
                >
                  <template #placeholder>
                    <div class="skeleton" />
                  </template>
                </v-img>
              </div>
            </div>
            <div
              :class="{
                ' mt-10 mb-14  d-flex justify-space-between': !isSmall,
                ' my-6 d-flex justify-space-between': isSmall,
              }"
            >
              <div
                :class="{
                  'registrable-desc-2': isSmall,
                }"
              >
                <div class="registrable-info mb-4">
                  <p :class="{ 'regist-desktop': !isSmall }">
                    Your Qualifications must be registrable with
                    <span class="text-blue-darken-4">{{
                      skillSlug2.regulator
                    }}</span>
                    in Order for you to apply for a
                    <span class="text-blue-darken-4"
                      >{{ skillSlug2.name }} Job</span
                    >
                    in
                    <span class="text-blue-darken-4">{{ itemSelected }}</span>
                  </p>
                </div>
                <v-btn
                  to="/recognised-qualifications"
                  @click="goToRecognised(skillSlug2)"
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
            </div>
          </div>
        </v-container>
      </template>
    </template>
  </div>
</template>

<script>
import axios from '@/util/axios';
import app from '@/util/eventBus';
import { mapState, mapMutations } from 'vuex';

export default {
  // eslint-disable-next-line vue/no-reserved-component-names

  data() {
    return {
      isLoading: false,
      isCardLoading: false,
      screenWidth: window.innerWidth,
      itemData: {},
      title: '',
      //latitude: null,
      //longitude: null,
      skillSlug: {},
      skillSlug2: {},
      countryId: null,
      skillsGroup: [],
      skillsCard: [],
      selectedTag: null,
      selectedInter: null,
      specificJobs: [],
      trendingBtn: [],
      internationalCountry: [],
      internationalCard: [],
      platinumJob: null,
      privilegedJob: null,
      activeIndex: 1,
      // totalData: 0,
      itemsTry: [
        {
          id: 26,
          text: 'Senior Physiotherapist',
          image:
            'https://admin1.the-gypsy.sg/img/app/5f2cc8275573274ca36aa20178722e8f.jpg',
          path: 'ouedowntownjobs',
          place: 'Strength Clinic Academy (SCA) - 2021',
          distance: 889.6629191087611,
          distanceText: '889.7 km',
          locationImg:
            'https://admin1.the-gypsy.sg/img/app/44d7fbc9888f3b7f80f3ec115a8d0c78.jpg',
          address: 'OUE Downtown (Central), Singapore City',
          tag: 'Senior Physiotherapist',
        },
      ],
      itemTry: {
        id: 26,
        text: 'Senior Physiotherapist',
        image:
          'https://admin1.the-gypsy.sg/img/app/5f2cc8275573274ca36aa20178722e8f.jpg',
        path: 'ouedowntownjobs',
        place: 'Strength Clinic Academy (SCA) - 2021',
        distance: 889.6629191087611,
        distanceText: '889.7 km',
        locationImg:
          'https://admin1.the-gypsy.sg/img/app/44d7fbc9888f3b7f80f3ec115a8d0c78.jpg',
        address: 'OUE Downtown (Central), Singapore City',
        tag: 'Senior Physiotherapist',
      },
    };
  },
  computed: {
    ...mapState(['activeTag']),
    ...mapState(['itemSelected']),
    ...mapState(['itemSelected2']),
    ...mapState(['itemSelectedComplete']),
    ...mapState(['itemSelected2Complete']),
    latitude() {
      return localStorage.getItem('latitude');
    },
    longitude() {
      return localStorage.getItem('longitude');
    },
    isSmall() {
      return this.screenWidth < 640;
    },
    filteredItems() {
      // console.log(this.activeTag);
      //if (!this.activeTag || this.activeTag == undefined) {
      //  return this.specificJobs;
      //} else {
      //  // const searchTextLower = this.search.toLowerCase();
      //  return this.specificJobs.map((s) => {
      //    return {
      //      ...s,
      //      list: s.list.filter((item) => {
      //        return item.tag.includes(this.activeTag);
      //      }),
      //    };
      //  });
      //}
      return this.specificJobs.filter(j => j.list.length > 0);
    },
    filteredItemsDesktop() {
      // console.log(this.activeTag);
      //if (!this.selectedTag || this.selectedTag == undefined) {
      //  return this.specificJobs;
      //} else {
      //  // const searchTextLower = this.search.toLowerCase();
      //  return this.specificJobs.map((s) => {
      //    return {
      //      ...s,
      //      list: s.list.filter((item) => {
      //        return item.tag.includes(this.selectedTag);
      //      }),
      //    };
      //  });
      //}
      return this.specificJobs.filter(j => j.list.length > 0);
    },
    filteredInternational() {
      if (!this.selectedInter || this.selectedInter == undefined) {
        return this.internationalCard;
      } else {
        return this.internationalCard.filter((item) => {
          return item.country.includes(this.selectedInter);
        });
      }
    },
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  mounted() {
    this.getSkillBySlugFirst();
    this.getSkillBySlug();
    this.checkDetail();

    app.config.globalProperties.$eventBus.$on(
      'filterSpecificJobs',
      this.filterSpecificJobs
    );
    app.config.globalProperties.$eventBus.$on(
      'getJobDetailSpecific1',
      this.getJobDetailSpecific1
    );
    app.config.globalProperties.$eventBus.$on(
      'getJobDetailSpecific2',
      this.getJobDetailSpecific2
    );
  },
  beforeUnmount() {
    app.config.globalProperties.$eventBus.$off(
      'filterSpecificJobs',
      this.filterSpecificJobs
    );
    app.config.globalProperties.$eventBus.$off(
      'getJobDetailSpecific1',
      this.getJobDetailSpecific1
    );
    app.config.globalProperties.$eventBus.$off(
      'getJobDetailSpecific2',
      this.getJobDetailSpecific2
    );
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
    app.config.globalProperties.$eventBus.$emit('removeDetail');
  },
  methods: {
    ...mapMutations([
      'setCountryRecognised',
      'setSkillRecognised',
      'setIdCountryRecognised',
      'setIdSkillRecognised',
      'setSkillSLug',
    ]),
    goToRecognised(skillSlug) {
      this.setCountryRecognised(this.itemSelected);
      this.setIdCountryRecognised(this.itemSelectedComplete.id);
      this.setSkillRecognised(skillSlug.name);
      this.setIdSkillRecognised(skillSlug.skills_id);
      app.config.globalProperties.$eventBus.$emit('getRegulatorInfo');
    },
    formatDistance(distance) {
      if (distance === 0 || distance === null) {
        return '0 km';
      } else {
        //const roundedDistance = Math.round(distance * 10) / 10;
        //const formattedDistance = roundedDistance.toLocaleString('en-US', {
        //  minimumFractionDigits: 1,
        //  maximumFractionDigits: 1,
        //});
        //return `${formattedDistance} km`;

        return distance.toFixed(1) + ' km';
      }
    },
    getJobDetailSpecific1() {
      this.getSkillBySlug2();
      //this.getSpecificJobs(
      //  this.skillSlug.skills_id,
      //  this.itemSelectedComplete.id
      //);
      //this.getGroups(this.skillSlug.skills_id, this.itemSelectedComplete.id);
    },
    getJobDetailSpecific2() {
      this.getGroups2(
        this.skillSlug.skills_id,
        this.itemSelectedComplete.id,
        this.itemSelected2Complete.id
      );
      this.getSpecificJobs2(
        this.skillSlug.skills_id,
        this.itemSelectedComplete.id,
        this.itemSelected2Complete.id
      );
      this.getPlatinumJob2(
        this.skillSlug.skills_id,
        this.itemSelectedComplete.id,
        this.itemSelected2Complete.id
      );
      this.getPrivilegedJob2(
        this.skillSlug.skills_id,
        this.itemSelectedComplete.id,
        this.itemSelected2Complete.id
      );
    },
    checkDetail() {
      app.config.globalProperties.$eventBus.$emit('getHeaderDetail');
    },
    getCountry() {
      this.isLoading = true;
      axios
        .get(`/country`)
        .then((response) => {
          const data = response.data.data;
          // console.log(data);
          this.countryId = data
            .filter((d) => d.country_name == this.itemSelected)
            .map((country) => country.country_id)[0];
          this.getGroups(this.skillSlug.skills_id, this.countryId);
          this.getSpecificJobs(this.skillSlug.skills_id, this.countryId);
          this.getPlatinumJob(this.skillSlug.skills_id, this.countryId);
          this.getPrivilegedJob(this.skillSlug.skills_id, this.countryId);
          // console.log(this.countryId);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getSkillBySlugFirst() {
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
            image: this.$fileURL + data.image || '',
            mainImage: this.$fileURL + data.main_image || '',
            regulator: data.partner_name || '',
            name: data.skills_name || '',
            registrable: data.registrable || 'N',
            countryRegistrable: data.country_registrable || 'N',
          };
          localStorage.setItem('skill_name', this.skillSlug.name);
          localStorage.setItem('skill_id', this.skillSlug.skills_id);
          localStorage.setItem('skill_image', this.skillSlug.image);
          this.getCountry();
          this.getInternationalSkills();
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getSkillBySlug() {
      const slug = this.$route.params.name;
      this.isLoading = true;
      axios
        .get(`/skills/slug/${slug}/${this.itemSelectedComplete.id}`)
        .then((response) => {
          const data = response.data.data;
          //console.log(data);
          this.skillSlug2 = {
            ...data,
            image: this.$fileURL + data.image || '',
            mainImage: this.$fileURL + data.main_image || '',
            regulator: data.partner_name || '',
            name: data.skills_name || '',
            registrable: data.registrable || 'N',
            countryRegistrable: data.country_registrable || 'N',
          };

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
    getSkillBySlugFromSearch() {
      const slug = this.$route.params.name;
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
            countryRegistrable: data.country_registrable || 'N',
          };

          localStorage.setItem('skill_name', this.skillSlug.name);
          localStorage.setItem('skill_id', this.skillSlug.skills_id);
          localStorage.setItem('skill_image', this.skillSlug.image);
          this.getCountry();
          this.getInternationalSkills();
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
    getSkillBySlug2() {
      const slug = this.$route.params.name;
      this.isLoading = true;
      axios
        .get(`/skills/slug/${slug}/${this.itemSelectedComplete.id}`)
        .then((response) => {
          const data = response.data.data;

          if (data == null) {
            this.specificJobs = [];
            this.trendingBtn = [];
            this.skillSlug = {};
          } else {
            this.skillSlug = {
              ...data,
              image: this.$fileURL + data.image || '',
              mainImage: this.$fileURL + data.main_image || '',
              regulator: data.partner_name || '',
              name: data.skills_name || '',
              registrable: data.registrable || 'N',
              countryRegistrable: data.country_registrable || 'N',
            };
            localStorage.setItem('skill_name', this.skillSlug.name);
            localStorage.setItem('skill_id', this.skillSlug.skills_id);
            localStorage.setItem('skill_image', this.skillSlug.image);
            this.getSpecificJobs(
              this.skillSlug.skills_id,
              this.itemSelectedComplete.id
            );
            this.getGroups(
              this.skillSlug.skills_id,
              this.itemSelectedComplete.id
            );
            this.getPlatinumJob(
              this.skillSlug.skills_id,
              this.itemSelectedComplete.id
            );
            this.getPrivilegedJob(
              this.skillSlug.skills_id,
              this.itemSelectedComplete.id
            );
            this.getInternationalSkills();
            //this.getGroups2(
            //  this.skillSlug.skills_id,
            //  this.itemSelectedComplete.id,
            //  ''
            //);
            //this.getSpecificJobs2(
            //  this.skillSlug.skills_id,
            //  this.itemSelectedComplete.id,
            //  ''
            //);
          }
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
    getGroups(skillId, countryId) {
      this.isCardLoading = true;
      // this.trendingBtn = [
      //   {
      //     id: 1,
      //     title: 'Physiotherapist',
      //     tag: 'Physiotherapist',
      //   },
      // ];
      axios
        .get(`/job-positions/${skillId}/${countryId}`)
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
        })
        .finally(() => {
          this.isCardLoading = false;
        });
    },
    getSpecificJobs(skillId, countryId) {
      this.isCardLoading = true;
      axios
        .get(
          `/sub-industries-jobs/${skillId}/${countryId}/-1/-1/${this.latitude}/${this.longitude}`
        )
        .then((response) => {
          const data = response.data.data;
          //console.log(data);
          // const filterKey = 'allied-health-jobs';
          // const filteredData = data.filter((d) => d.slug === filterKey);

          // this.itemData = {
          //   id: filteredData[0].sgm_id || 1,
          //   title: filteredData[0].group_name || '',
          //   slug: filteredData[0].slug || '',
          //   image: this.$fileURL + filteredData[0].image || '',
          // };

          this.specificJobs = data.map((item) => {
            return {
              id: item.sub_industry_id || 1,
              title: item.sub_industry_name
                ? item.sub_industry_name + ' Jobs'
                : '',
              btn: item.sub_industry_name || '',
              path: `/${item.sub_industry_name.split(' ').join('-')}` || '#',
              slug: `${item.sub_industry_name.split(' ')}` || '#',
              list: item.jobs
              .filter(i => i.featured == 'Y')
                .sort((a, b) => a.distance - b.distance)
                .map((skill) => {
                  return {
                    id: skill.job_id || 1,
                    text: skill.position_name || '',
                    image: skill.location_image
                      ? this.$fileURL + skill.location_image
                      : skill.partners_image
                      ? this.$fileURL + skill.partners_image
                      : '',
                    featured: skill.featured,
                    path: skill.location_name
                      ? skill.location_name.split(' ').join('').toLowerCase() +
                        'jobs'
                      : '',
                    place: skill.partner_name || '',
                    distance: skill.distance || 0,
                    distanceText: this.formatDistance(skill.distance),
                    locationImg: skill.logo ? this.$fileURL + skill.logo : '',
                    address:
                      skill.location_name && skill.zone_name && skill.city_name
                        ? `${skill.location_name} (${skill.zone_name}), ${skill.city_name}`
                        : skill.town_name &&
                          skill.zone_name &&
                          skill.city_name &&
                          skill.location_name == null
                        ? `${skill.town_name} (${skill.zone_name}), ${skill.city_name}`
                        : skill.zone_name &&
                          skill.location_name == null &&
                          skill.town_name == null &&
                          skill.city_name
                        ? `${skill.city_name} (${skill.zone_name})`
                        : skill.city_name &&
                          skill.location_name == null &&
                          skill.town_name &&
                          skill.zone_name == null
                        ? `${skill.town_name} , ${skill.city_name}`
                        : skill.city_name &&
                          skill.location_name == null &&
                          skill.town_name == null &&
                          skill.zone_name == null
                        ? `${skill.city_name}`
                        : '-',
                    tag: skill.position_name || '',
                  };
                }),
            };
          });

          // console.log(this.specificJobs);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isCardLoading = false;
        });
    },
    getPrivilegedJob(skillId, countryId) {
      this.isCardLoading = true;
      axios
        .get(
          `/jobs/get-jobs-by-type/privileged/${skillId}/${countryId}/-1/-1/${this.latitude}/${this.longitude}`
        )
        .then((response) => {
          const data = response.data.data;
          this.privilegedJob = data.map((skill) => {
            return {
              id: skill.job_id || 1,
              isFav: false,
              text: skill.position_name || '',
              image: skill.location_image
                ? this.$fileURL + skill.location_image
                : skill.partners_image
                ? this.$fileURL + skill.partners_image
                : '',
              path: skill.location_name
                ? skill.location_name.split(' ').join('').toLowerCase() + 'jobs'
                : '',
              place: skill.partner_name || '',
              distance: skill.distance || 0,
              distanceText: this.formatDistance(skill.distance),
              locationImg: skill.logo ? this.$fileURL + skill.logo : '',
              address:
                skill.location_name && skill.zone_name && skill.city_name
                  ? `${skill.location_name} (${skill.zone_name}), ${skill.city_name}`
                  : skill.town_name &&
                    skill.zone_name &&
                    skill.city_name &&
                    skill.location_name == null
                  ? `${skill.town_name} (${skill.zone_name}), ${skill.city_name}`
                  : skill.zone_name &&
                    skill.location_name == null &&
                    skill.town_name == null &&
                    skill.city_name
                  ? `${skill.city_name} (${skill.zone_name})`
                  : skill.city_name &&
                    skill.location_name == null &&
                    skill.town_name &&
                    skill.zone_name == null
                  ? `${skill.town_name} , ${skill.city_name}`
                  : '-',
              tag: skill.position_name || '',
              website: skill.website || '',
              google: skill.google || '',
              facebook: skill.facebook || '',
              linkedin: skill.linkedin || '',
              tiktok: skill.tiktok || '',
              twitter: skill.twitter || '',
              instagram: skill.instagram || '',
              youtube: skill.youtube || '',
            };
          });
         console.log(this.privilegedJob)
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isCardLoading = false;
        });
    },
    getPrivilegedJob2(skillId, countryId, cityId) {
      this.isCardLoading = true;
      axios
        .get(
          `/jobs/get-jobs-by-type/privileged/${skillId}/${countryId}/-1/${cityId}/${this.latitude}/${this.longitude}`
        )
        .then((response) => {
          const data = response.data.data;
          this.privilegedJob = data.map((skill) => {
            return {
              id: skill.job_id || 1,
              isFav: false,
              text: skill.position_name || '',
              image: skill.location_image
                ? this.$fileURL + skill.location_image
                : skill.partners_image
                ? this.$fileURL + skill.partners_image
                : '',
              path: skill.location_name
                ? skill.location_name.split(' ').join('').toLowerCase() + 'jobs'
                : '',
              place: skill.partner_name || '',
              distance: skill.distance || 0,
              distanceText: this.formatDistance(skill.distance),
              locationImg: skill.logo ? this.$fileURL + skill.logo : '',
              address:
                skill.location_name && skill.zone_name && skill.city_name
                  ? `${skill.location_name} (${skill.zone_name}), ${skill.city_name}`
                  : skill.town_name &&
                    skill.zone_name &&
                    skill.city_name &&
                    skill.location_name == null
                  ? `${skill.town_name} (${skill.zone_name}), ${skill.city_name}`
                  : skill.zone_name &&
                    skill.location_name == null &&
                    skill.town_name == null &&
                    skill.city_name
                  ? `${skill.city_name} (${skill.zone_name})`
                  : skill.city_name &&
                    skill.location_name == null &&
                    skill.town_name &&
                    skill.zone_name == null
                  ? `${skill.town_name} , ${skill.city_name}`
                  : '-',
              tag: skill.position_name || '',
              website: skill.website || '',
              google: skill.google || '',
              facebook: skill.facebook || '',
              linkedin: skill.linkedin || '',
              tiktok: skill.tiktok || '',
              twitter: skill.twitter || '',
              instagram: skill.instagram || '',
              youtube: skill.youtube || '',
            };
          });
          
         console.log(this.privilegedJob)
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isCardLoading = false;
        });
    },
    getPlatinumJob(skillId, countryId) {
      this.isCardLoading = true;
      axios
        .get(
          `/jobs/get-jobs-by-type/platinum/${skillId}/${countryId}/-1/-1/${this.latitude}/${this.longitude}`
        )
        .then((response) => {
          const data = response.data.data;
          this.platinumJob = data.map((skill) => {
            return {
              id: skill.job_id || 1,
              isFav: false,
              text: skill.position_name || '',
              image: skill.location_image
                ? this.$fileURL + skill.location_image
                : skill.partners_image
                ? this.$fileURL + skill.partners_image
                : '',
              path: skill.location_name
                ? skill.location_name.split(' ').join('').toLowerCase() + 'jobs'
                : '',
              place: skill.partner_name || '',
              distance: skill.distance || 0,
              distanceText: this.formatDistance(skill.distance),
              locationImg: skill.logo ? this.$fileURL + skill.logo : '',
              address:
                skill.location_name && skill.zone_name && skill.city_name
                  ? `${skill.location_name} (${skill.zone_name}), ${skill.city_name}`
                  : skill.town_name &&
                    skill.zone_name &&
                    skill.city_name &&
                    skill.location_name == null
                  ? `${skill.town_name} (${skill.zone_name}), ${skill.city_name}`
                  : skill.zone_name &&
                    skill.location_name == null &&
                    skill.town_name == null &&
                    skill.city_name
                  ? `${skill.city_name} (${skill.zone_name})`
                  : skill.city_name &&
                    skill.location_name == null &&
                    skill.town_name &&
                    skill.zone_name == null
                  ? `${skill.town_name} , ${skill.city_name}`
                  : '-',
              tag: skill.position_name || '',
              website: skill.website || '',
              google: skill.google || '',
              facebook: skill.facebook || '',
              linkedin: skill.linkedin || '',
              tiktok: skill.tiktok || '',
              twitter: skill.twitter || '',
              instagram: skill.instagram || '',
              youtube: skill.youtube || '',
            };
          });
         console.log(this.platinumJob)
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isCardLoading = false;
        });
    },
    getPlatinumJob2(skillId, countryId, cityId) {
      this.isCardLoading = true;
      axios
        .get(
          `/jobs/get-jobs-by-type/platinum/${skillId}/${countryId}/-1/${cityId}/${this.latitude}/${this.longitude}`
        )
        .then((response) => {
          const data = response.data.data;
          this.platinumJob = data.map((skill) => {
            return {
              id: skill.job_id || 1,
              isFav: false,
              text: skill.position_name || '',
              image: skill.location_image
                ? this.$fileURL + skill.location_image
                : skill.partners_image
                ? this.$fileURL + skill.partners_image
                : '',
              path: skill.location_name
                ? skill.location_name.split(' ').join('').toLowerCase() + 'jobs'
                : '',
              place: skill.partner_name || '',
              distance: skill.distance || 0,
              distanceText: this.formatDistance(skill.distance),
              locationImg: skill.logo ? this.$fileURL + skill.logo : '',
              address:
                skill.location_name && skill.zone_name && skill.city_name
                  ? `${skill.location_name} (${skill.zone_name}), ${skill.city_name}`
                  : skill.town_name &&
                    skill.zone_name &&
                    skill.city_name &&
                    skill.location_name == null
                  ? `${skill.town_name} (${skill.zone_name}), ${skill.city_name}`
                  : skill.zone_name &&
                    skill.location_name == null &&
                    skill.town_name == null &&
                    skill.city_name
                  ? `${skill.city_name} (${skill.zone_name})`
                  : skill.city_name &&
                    skill.location_name == null &&
                    skill.town_name &&
                    skill.zone_name == null
                  ? `${skill.town_name} , ${skill.city_name}`
                  : '-',
              tag: skill.position_name || '',
              website: skill.website || '',
              google: skill.google || '',
              facebook: skill.facebook || '',
              linkedin: skill.linkedin || '',
              tiktok: skill.tiktok || '',
              twitter: skill.twitter || '',
              instagram: skill.instagram || '',
              youtube: skill.youtube || '',
            };
          });
          
         console.log(this.platinumJob)
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isCardLoading = false;
        });
    },
    getGroups2(skillId, countryId, cityId) {
      this.isCardLoading = true;
      // this.trendingBtn = [
      //   {
      //     id: 1,
      //     title: 'Physiotherapist',
      //     tag: 'Physiotherapist',
      //   },
      // ];
      axios
        .get(
          cityId != ''
            ? `/job-positions/${skillId}/${countryId}/${cityId}`
            : `/job-positions/${skillId}/${countryId}`
        )
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
        })
        .finally(() => {
          this.isCardLoading = false;
        });
    },
    getSpecificJobs2(skillId, countryId, cityId) {
      this.isCardLoading = true;
      axios
        .get(
          cityId != ''
            ? `/sub-industries-jobs/${skillId}/${countryId}/-1/${cityId}/${this.latitude}/${this.longitude}`
            : `/sub-industries-jobs/${skillId}/${countryId}/-1/-1/${this.latitude}/${this.longitude}`
        )
        .then((response) => {
          const data = response.data.data;
          //console.log(data);
          // const filterKey = 'allied-health-jobs';
          // const filteredData = data.filter((d) => d.slug === filterKey);

          // this.itemData = {
          //   id: filteredData[0].sgm_id || 1,
          //   title: filteredData[0].group_name || '',
          //   slug: filteredData[0].slug || '',
          //   image: this.$fileURL + filteredData[0].image || '',
          // };

          this.specificJobs = data.map((item) => {
            return {
              id: item.sub_industry_id || 1,
              title: item.sub_industry_name
                ? item.sub_industry_name + ' Jobs'
                : '',
              btn: item.sub_industry_name || '',
              path: `/${item.sub_industry_name.split(' ').join('-')}` || '#',
              slug: `${item.sub_industry_name.split(' ')}` || '#',
              list: item.jobs
              .filter(i => i.featured == 'Y')
                .sort((a, b) => a.distance - b.distance)
                .map((skill) => {
                  return {
                    id: skill.job_id || 1,
                    text: skill.position_name || '',
                    image: skill.location_image
                      ? this.$fileURL + skill.location_image
                      : skill.partners_image
                      ? this.$fileURL + skill.partners_image
                      : '',
                    featured: skill.featured,
                    path: skill.location_name
                      ? skill.location_name.split(' ').join('').toLowerCase() +
                        'jobs'
                      : '',
                    place: skill.partner_name || '',
                    distance: skill.distance || 0,
                    distanceText: this.formatDistance(skill.distance),
                    locationImg: skill.logo ? this.$fileURL + skill.logo : '',
                    address:
                      skill.location_name && skill.zone_name && skill.city_name
                        ? `${skill.location_name} (${skill.zone_name}), ${skill.city_name}`
                        : skill.town_name &&
                          skill.zone_name &&
                          skill.city_name &&
                          skill.location_name == null
                        ? `${skill.town_name} (${skill.zone_name}), ${skill.city_name}`
                        : skill.zone_name &&
                          skill.location_name == null &&
                          skill.town_name == null &&
                          skill.city_name
                        ? `${skill.city_name} (${skill.zone_name})`
                        : skill.city_name &&
                          skill.location_name == null &&
                          skill.town_name &&
                          skill.zone_name == null
                        ? `${skill.town_name} , ${skill.city_name}`
                        : skill.city_name &&
                          skill.location_name == null &&
                          skill.town_name == null &&
                          skill.zone_name == null
                        ? `${skill.city_name}`
                        : '-',
                    tag: skill.position_name || '',
                  };
                }),
            };
          });

          // console.log(this.specificJobs);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isCardLoading = false;
        });
    },
    filterSpecificJobs(positionId) {
      this.isLoading = true;
      axios
        .get(
          positionId == ''
            ? `/sub-industries-jobs/${this.skillSlug.skills_id}/${
                this.countryId
              }/-1/${
                this.itemSelected2Complete
                  ? this.itemSelected2Complete.id
                  : '-1'
              }/${this.latitude}/${this.longitude}`
            : `/sub-industries-jobs/${this.skillSlug.skills_id}/${
                this.countryId
              }/${positionId}/${
                this.itemSelected2Complete
                  ? this.itemSelected2Complete.id
                  : '-1'
              }/${this.latitude}/${this.longitude}`
        )
        .then((response) => {
          const data = response.data.data;
          //console.log(data);
          // const filterKey = 'allied-health-jobs';
          // const filteredData = data.filter((d) => d.slug === filterKey);

          // this.itemData = {
          //   id: filteredData[0].sgm_id || 1,
          //   title: filteredData[0].group_name || '',
          //   slug: filteredData[0].slug || '',
          //   image: this.$fileURL + filteredData[0].image || '',
          // };

          this.specificJobs = data.map((item) => {
            return {
              id: item.sub_industry_id || 1,
              title: item.sub_industry_name
                ? item.sub_industry_name + ' Jobs'
                : '',
              btn: item.sub_industry_name || '',
              path: `/${item.sub_industry_name.split(' ').join('-')}` || '#',
              slug: `${item.sub_industry_name.split(' ')}` || '#',
              list: item.jobs
              .filter(i => i.featured == 'Y')
                .sort((a, b) => a.distance - b.distance)
                .map((skill) => {
                  return {
                    id: skill.job_id || 1,
                    text: skill.position_name || '',
                    image: skill.location_image
                      ? this.$fileURL + skill.location_image
                      : skill.partners_image
                      ? this.$fileURL + skill.partners_image
                      : '',
                    featured: skill.featured,
                    path: skill.location_name
                      ? skill.location_name.split(' ').join('').toLowerCase() +
                        'jobs'
                      : '',
                    place: skill.partner_name || '',
                    distance: skill.distance || 0,
                    distanceText: this.formatDistance(skill.distance),
                    locationImg: skill.logo ? this.$fileURL + skill.logo : '',
                    address:
                      skill.location_name && skill.zone_name && skill.city_name
                        ? `${skill.location_name} (${skill.zone_name}), ${skill.city_name}`
                        : skill.town_name &&
                          skill.zone_name &&
                          skill.city_name &&
                          skill.location_name == null
                        ? `${skill.town_name} (${skill.zone_name}), ${skill.city_name}`
                        : skill.zone_name &&
                          skill.location_name == null &&
                          skill.town_name == null &&
                          skill.city_name
                        ? `${skill.city_name} (${skill.zone_name})`
                        : skill.city_name &&
                          skill.location_name == null &&
                          skill.town_name &&
                          skill.zone_name == null
                        ? `${skill.town_name} , ${skill.city_name}`
                        : skill.city_name &&
                          skill.location_name == null &&
                          skill.town_name == null &&
                          skill.zone_name == null
                        ? `${skill.city_name}`
                        : '-',
                    tag: skill.position_name || '',
                  };
                }),
            };
          });

          // console.log(this.specificJobs);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getInternationalSkills() {
      this.isCardLoading = true;
      axios
        .get(
          `/job-international/skills/${this.skillSlug.skills_id}/${this.itemSelectedComplete.id}`
        )
        .then((response) => {
          const data = response.data.data;
          console.log('international ', data);

          //.filter((d) => d.country_id == this.itemSelectedComplete.id)
          const allJobs = data.reduce((accumulator, currentValue) => {
            const jobsWithInternationalData = currentValue.jobs.map((job) => {
              return {
                ...job,
              };
            });
            return accumulator.concat(jobsWithInternationalData);
          }, []);

          this.internationalCard = allJobs.map((job) => {
            return {
              id: job.job_id,
              text: job.position_name,
              logo: job.logo,
              locationImg: job.logo,
              place: job.partner_name,
              address: job.city_name + ', ' + job.country_name,
              country: job.country_name,
              countryId: job.country_id,
              positionId: job.position_id,
              plId: job.pl_id,
              partnerId: job.partner_id,
            };
          });
          this.internationalCountry = this.internationalCard.reduce(
            (accumulator, currentValue) => {
              const existingCountry = accumulator.find(
                (item) => item.title === currentValue.country
              );
              if (existingCountry) {
                existingCountry.count += 1;
              } else {
                accumulator.push({ title: currentValue.country, count: 1 });
              }
              return accumulator;
            },
            []
          );
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isCardLoading = false;
        });
    },
    filterInternationalCard(name) {
      // console.log("ok");
      this.selectedInter = name;
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
  },
};
</script>

<style scoped>
.banner-header {
  color: #fa2964;
  font-weight: 900;
}
.banner-container {
  margin-top: 270px;
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

.international-cont {
  background: #f8f8f8;
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

.card-cont:hover {
  background: white !important;
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
  width: 100%;
}
.card-image-cont-priv-desktop {
  position: relative;
  overflow: hidden;
  height: 300px;
  width: 100%;
}
.card-image-cont-4 {
  position: relative;
  overflow: hidden;
  height: 180px;
  width: 100%;
}
.card-image-cont-2 {
  position: relative;
  overflow: hidden;
  height: 190px;
  width: 100%;
}
.card-image-cont-3 {
  position: relative;
  overflow: hidden;
  height: 240px;
  width: 100%;
}
.card-image-cont-plat-mobile {
  position: relative;
  overflow: hidden;
  height: 200px;
  width: 100%;
}

.card-btn-container-1 {
  position: absolute;
  gap: 10px;
  bottom: 90px;
  right: 30px;
  z-index: 100;
}
.card-btn-container-2 {
  position: absolute;
  gap: 10px;
  bottom: 75px;
  right: 30px;
  z-index: 100;
}

.card-btn-container-3 {
  position: absolute;
  gap: 10px;
  bottom: 145px;
  right: 30px;
  z-index: 100;
}
.card-btn-container-priv-desktop {
  position: absolute;
  gap: 10px;
  bottom: 145px;
  right: 60px;
  z-index: 100;
}
.card-btn-container-4 {
  position: absolute;
  gap: 10px;
  bottom: 270px;
  right: 30px;
  z-index: 100;
}
.card-btn-container-plat-mobile {
  position: absolute;
  gap: 10px;
  bottom: 310px;
  right: 30px;
  z-index: 100;
}
.card-btn-container-6 {
  position: absolute;
  gap: 10px;
  bottom: 155px;
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
.card-image-cont-priv-desktop:hover .card-image {
  transform: scale(1.2);
}
.card-image-cont-2:hover .card-image {
  transform: scale(1.2);
}
.card-image-cont-3:hover .card-image {
  transform: scale(1.2);
}
.card-image-cont-plat-mobile:hover .card-image {
  transform: scale(1.2);
}
.card-image-cont-4:hover .card-image {
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
.card-address-info-mobile {
  font-weight: 600;
  font-size: 11px;
  line-height: 13px;
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
  width: 45%;
  font-size: 20px;
}
.registrable-desc-2 {
  width: 100%;
  font-size: 16px;
}

.regist-desktop {
  font-size: 22px;
}

.regist-img {
  width: 30%;
}
.regist-img-2 {
  width: 100%;
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
  height: 245px;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
.registrable-img-cont-2 {
  height: 245px;
  width: 100%;
}

.regist-btn {
  font-size: 20px;
}
.regist-btn-2 {
  font-size: 16px;
}

@media (max-width: 959px) {
  .card-platinum {
    max-width: 300px;
    margin: 0 auto;
  }
}
</style>
