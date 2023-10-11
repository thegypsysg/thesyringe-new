<template>
  <div>
    <div v-if="isLoading" class="text-center loading-page">
      <v-progress-circular :size="50" color="#fa2964" indeterminate />
    </div>
    <template v-if="!isLoading">
      <div v-if="isSmall" class="banner-container">
        <div class="text-center mb-2">
          <h2>
            <span class="banner-header">{{ itemData.name }} Jobs</span>
          </h2>
        </div>
        <v-container style="width: 100%">
          <v-row>
            <v-col cols="12">
              <v-select
                :items="skillsGroup"
                v-model="selectedSkill"
                placeholder="------Show All------"
                variant="outlined"
                class="section-select-desktop mb-2"
                clearable
              />
            </v-col>
            <v-col cols="12">
              <v-select
                :items="zone"
                v-model="selectedZone"
                placeholder="---Select Zone---"
                variant="outlined"
                class="section-select-desktop mb-2"
                clearable
              />
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                :items="town"
                v-model="selectedTown"
                placeholder="---Select Town---"
                variant="outlined"
                class="section-select-desktop mb-10"
                clearable
              />
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div v-if="!isSmall" class="banner-container-desktop">
        <v-img cover :src="itemData.image" />
      </div>
      <div>
        <template v-if="!isSmall">
          <div class="text-center my-4">
            <h2>
              <span class="banner-header">{{ itemData.name }} Jobs</span>
            </h2>
          </div>
          <!-- :label="`Select ${itemData.name} Specialization`" -->
          <v-container style="width: 90%">
            <v-row v-if="!isSmall">
              <v-col cols="4">
                <v-select
                  :items="skillsGroup"
                  v-model="selectedSkill"
                  placeholder="------Show All------"
                  variant="outlined"
                  class="section-select-desktop mb-12"
                  clearable
                />
              </v-col>
              <v-col cols="4">
                <v-select
                  :items="zone"
                  v-model="selectedZone"
                  placeholder="---Select Zone---"
                  variant="outlined"
                  class="section-select-desktop mb-12"
                  clearable
                />
              </v-col>
              <v-col cols="4">
                <v-autocomplete
                  :items="town"
                  v-model="selectedTown"
                  placeholder="---Select Town---"
                  variant="outlined"
                  class="section-select-desktop mb-12"
                  clearable
                />
              </v-col>
            </v-row>
          </v-container>
        </template>
        <template v-if="!isSmall">
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
        </template>
        <template v-if="isSmall">
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
        </template>
        <h2 style="width: 85%;" class="mx-auto">Featured Jobs</h2>
        <div
          class="card-container mx-auto"
          :class="{
            'd-flex flex-wrap justify-center mb-2': isSmall,
            'card-container-desktop mb-8': !isSmall,
          }"
        >
          <transition-group name="card-transition" mode="out-in">
            <div
              v-for="card in filteredSkills.filter(i => i.featured == 'Y')"
              :key="card.id"
              class="card-transition mx-auto"
              :class="{ 'card-item-2 mx-auto': isSmall }"
            >
              <v-lazy :options="{ threshold: 0.5 }" min-height="100">
                <v-card
                  class="my-4 card-cont"
                  :class="{
                    'mx-3 text-center': !isSmall,
                    'mx-1 pa-2': isSmall,
                  }"
                  :height="isSmall ? 320 : 320"
                  :width="isSmall ? '100%' : 280"
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
                      card?.text.length >= 28
                        ? card?.text.substring(0, 28) + '..'
                        : card?.text
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
                      card?.text.length >= 32
                        ? card?.text.substring(0, 32) + '..'
                        : card?.text
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
                      :src="card?.image"
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
                  <v-btn
                    elevation="4"
                    :to="`/detail/${card?.id}`"
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
                    <span class="text-white" style="">View Jobs</span>
                  </v-btn>

                  <div
                  v-if="card.featured == 'Y'"
                  style="
                    width: 100px;
                    position: absolute;
                    top: 50px;
                    right: 15px;
                    background-color: #f79303;
                    border-radius: 5px;
                    padding-left: 8px;
                    padding-right: 6px;
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
                <span class="text-brown" style="">{{card.btn}}</span>
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
                        <span class="text-red">{{ card?.distanceText }}</span
                        ><span class="text-muted"> away</span>
                      </p>
                    </div>
                    <div class="card-address d-flex align-center">
                      <div style="width: 25%">
                        <v-img :src="card?.locationImg" height="35"
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
                            card?.place.length >= 32
                              ? card?.place.substring(0, 32) + '..'
                              : card?.place
                          }}
                        </h4>

                        <div class="mt-2" style="font-weight: 400">
                          <p>{{ card?.address }}</p>
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
                      <v-icon size="20" color="red"> mdi-heart-outline </v-icon>
                    </v-btn>
                  </div>
                </v-card>
              </v-lazy>
            </div>
          </transition-group>
        </div>
        <h2 style="width: 85%;" class="mx-auto">More {{ itemData.name }} Jobs</h2>
        <div
          class="card-container mx-auto"
          :class="{
            'd-flex flex-wrap justify-center mb-2': isSmall,
            'card-container-desktop mb-8': !isSmall,
          }"
        >
          <transition-group name="card-transition" mode="out-in">
            <div
              v-for="card in filteredSkills.filter(i => i.featured != 'Y')"
              :key="card.id"
              class="card-transition mx-auto"
              :class="{ 'card-item-2 mx-auto': isSmall }"
            >
              <v-lazy :options="{ threshold: 0.5 }" min-height="100">
                <v-card
                  class="my-4 card-cont"
                  :class="{
                    'mx-3 text-center': !isSmall,
                    'mx-1 pa-2': isSmall,
                  }"
                  :height="isSmall ? 320 : 320"
                  :width="isSmall ? '100%' : 280"
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
                      card?.text.length >= 28
                        ? card?.text.substring(0, 28) + '..'
                        : card?.text
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
                      card?.text.length >= 32
                        ? card?.text.substring(0, 32) + '..'
                        : card?.text
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
                      :src="card?.image"
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
                  <v-btn
                    elevation="4"
                    :to="`/detail/${card?.id}`"
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
                    <span class="text-white" style="">View Jobs</span>
                  </v-btn>

                  <div
                  v-if="card.featured == 'Y'"
                  style="
                    width: 100px;
                    position: absolute;
                    top: 50px;
                    right: 15px;
                    background-color: #f79303;
                    border-radius: 5px;
                    padding-left: 8px;
                    padding-right: 6px;
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
                <span class="text-brown" style="">{{card.btn}}</span>
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
                        <span class="text-red">{{ card?.distanceText }}</span
                        ><span class="text-muted"> away</span>
                      </p>
                    </div>
                    <div class="card-address d-flex align-center">
                      <div style="width: 25%">
                        <v-img :src="card?.locationImg" height="35"
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
                            card?.place.length >= 32
                              ? card?.place.substring(0, 32) + '..'
                              : card?.place
                          }}
                        </h4>

                        <div class="mt-2" style="font-weight: 400">
                          <p>{{ card?.address }}</p>
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
import { mapState } from 'vuex';

export default {
  name: 'ViewAllFromSpecific',
  data() {
    return {
      isLoading: false,
      screenWidth: window.innerWidth,
      itemData: {},
      title: '',
      skillsGroup: [],
      town: [],
      zone: [],
      privilegedJob: [],
      platinumJob: [],
      skillsCard: [],
      selectedSkill: null,
      selectedZone: null,
      selectedTown: null,
      // totalData: 0,
    };
  },
  computed: {
    ...mapState(['skillSlug']),
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
    filteredSkills() {
      if (this.selectedSkill === null && this.selectedTown === null) {
        //return this.skillsCard;
        const featuredFirst = this.skillsCard.filter(item => item.featured === 'Y');
      const featuredOther = this.skillsCard.filter(item => item.featured !== 'Y');

      return featuredFirst.concat(featuredOther);
      } else if (this.selectedSkill !== null && this.selectedTown === null) {
        const filteredData = this.skillsCard.filter((item) => {
          return this.selectedSkill
            ? item.text.toLowerCase() === this.selectedSkill.toLowerCase()
            : true;
        });
        //return filteredData;
        const featuredFirst = filteredData.filter(item => item.featured === 'Y');
      const featuredOther = filteredData.filter(item => item.featured !== 'Y');

      return featuredFirst.concat(featuredOther);
      } else if (this.selectedTown !== null && this.selectedSkill === null) {
        const filteredData = this.skillsCard.filter((item) => {
          return this.selectedTown
            ? item.town.toLowerCase() === this.selectedTown.toLowerCase()
            : true;
        });
        //return filteredData;
        const featuredFirst = filteredData.filter(item => item.featured === 'Y');
      const featuredOther = filteredData.filter(item => item.featured !== 'Y');

      return featuredFirst.concat(featuredOther);
      } else {
        const filteredData = this.skillsCard.filter((item) => {
          return (
            (this.selectedSkill
              ? item.text.toLowerCase() === this.selectedSkill.toLowerCase()
              : true) &&
            (this.selectedTown
              ? item.town.toLowerCase() === this.selectedTown.toLowerCase()
              : true)
          );
        });
        //return filteredData;
        const featuredFirst = filteredData.filter(item => item.featured === 'Y');
      const featuredOther = filteredData.filter(item => item.featured !== 'Y');

      return featuredFirst.concat(featuredOther);
      }
    },
    filteredSkills2() {
      if (!this.selectedSkill) {
        return this.skillsCard;
      } else {
        // const searchTextLower = this.search.toLowerCase();
        return this.skillsCard.filter((item) => {
          return item.text == this.selectedSkill;
        });
      }
    },
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  mounted() {
    this.itemData = {
      image: localStorage.getItem('skill_image'),
      skillId: localStorage.getItem('skill_id'),
    };
    this.getSpecificJobs();
    this.getPlatinumJob();
    this.getPrivilegedJob();
    this.getTown();
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
    getSpecificJobs() {
      this.isLoading = true;
      axios
        .get(
          this.itemSelected2Complete != null
            ? `/sub-industries-jobs/${this.itemData.skillId}/${this.itemSelectedComplete.id}/-1/${this.itemSelected2Complete.id}/${this.latitude}/${this.longitude}`
            : `/sub-industries-jobs/${this.itemData.skillId}/${this.itemSelectedComplete.id}/-1/-1/${this.latitude}/${this.longitude}`
        )
        .then((response) => {
          const data = response.data.data;
          console.log(data)
          const filtered = data.filter(
            (i) => i.sub_industry_id == this.$route.params.id
          );
          const filteredGroup = filtered[0].jobs.map(
            (item) => item.position_name
          );
          this.skillsGroup = [...new Set(filteredGroup)];
          this.itemData.name = filtered[0].sub_industry_name;
          this.skillsCard = filtered[0].jobs.map((skill) => {
            return {
              id: skill.job_id || 1,
              btn: filtered[0].sub_industry_name || '',
              text: skill.position_name || '',
              image: skill.location_image
                ? this.$fileURL + skill.location_image
                : skill.partners_image
                ? this.$fileURL + skill.partners_image
                : '',
              featured: skill.featured,
              path: skill.location_name
                ? skill.location_name.split(' ').join('').toLowerCase() + 'jobs'
                : '',
              place: skill.partner_name || '',
              distance: skill.distance || 0,
              distanceText: this.formatDistance(skill.distance),
              locationImg: skill.logo ? this.$fileURL + skill.logo : '',
              town: skill.town_name || '',
              zone: skill.zone_name || '',
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
    getPlatinumJob() {
      this.isCardLoading = true;
      axios
        .get(
          this.itemSelected2Complete != null ?
          `/jobs/get-jobs-by-type/platinum/${this.itemData.skillId}/${this.itemSelectedComplete.id}/-1/${this.itemSelected2Complete.id}/${this.latitude}/${this.longitude}/${this.$route.params.id}` :
          `/jobs/get-jobs-by-type/platinum/${this.itemData.skillId}/${this.itemSelectedComplete.id}/-1/-1/${this.latitude}/${this.longitude}/${this.$route.params.id}`
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
    getPrivilegedJob() {
      this.isCardLoading = true;
      axios
        .get(
          this.itemSelected2Complete != null ?
          `/jobs/get-jobs-by-type/privileged/${this.itemData.skillId}/${this.itemSelectedComplete.id}/-1/${this.itemSelected2Complete.id}/${this.latitude}/${this.longitude}/${this.$route.params.id}` :
          `/jobs/get-jobs-by-type/privileged/${this.itemData.skillId}/${this.itemSelectedComplete.id}/-1/-1/${this.latitude}/${this.longitude}/${this.$route.params.id}`
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
    getTown() {
      this.isLoading = true;
      axios
        .get(
          `/jobs/get-towns/${this.$route.params.id}/${this.itemData.skillId}/${this.itemSelectedComplete.id}`
        )
        .then((response) => {
          const data = response.data.data;
          this.town = data.map((item) => item.town_name);
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
  gap: 40px;
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
  width: 100%;
  margin: auto;
}
.card-img-container-2 {
  position: relative;
  overflow: hidden;
  height: 240px;
  width: 100%;
  margin: auto;
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






.banner-header {
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
