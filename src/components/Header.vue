<template>
  <v-app-bar
    :class="{
      'app-bar-mobile-start': isSmall && isHome && tokenStart,
      'app-bar-mobile-1': isSmall && isHome && !isPrivacy && !isTerms && !isProfile && !tokenStart,
      'app-bar-mobile-2': isSmall && !isHome && !isPrivacy && !isTerms && !isProfile,
      'app-bar-mobile-3': isSmall && isWelcome && !isPrivacy && !isTerms && !isProfile,
      'app-bar-mobile-4': isSmall && isDetailPage && !isPrivacy && !isTerms && !isProfile,
      'app-bar-mobile-5': isSmall && isSpecific && !isPrivacy && !isTerms && !isProfile,
      'app-bar-mobile-6': isSmall && isRecognised && !isPrivacy && !isTerms && !isProfile,
    }"
    color="white"
    elevation="1"
    fixed
  >
    <router-link to="/">
      <div class="logo-img-container d-flex align-center">
        <v-img class="logo-img" :src="$fileURL + logo" height="50" 
        :class="{ 'ml-8': isWelcome && isPrivacy && isTerms && isProfile }">
          <template #placeholder>
            <div class="skeleton" />
          </template>
        </v-img>
      </div>
    </router-link>
    <v-btn
    v-if="isHome && !tokenStart"
    style="background: #f4f5f7; color: black"
    variant="text"
    color="black"
    icon="mdi-share-outline"
    width="40"
    height="40"
  >
    <v-icon color="rgb(38, 38, 38)" size="22"> mdi-share-outline </v-icon>
    <v-menu activator="parent">
      <v-list>
        <v-list-item @click="console.log('share')">
          <v-list-item-title>
            <v-icon class="mr-4" color="black" size="18">
              mdi-email-outline </v-icon
            >Email
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="console.log('share')">
          <v-list-item-title>
            <v-icon class="mr-4" size="18">
              <i class="fa-brands fa-facebook-f" /> </v-icon
            >Facebook
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="console.log('share')">
          <v-list-item-title>
            <v-icon class="mr-4" color="black" size="18"> mdi-twitter </v-icon
            >Twitter
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="console.log('share')">
          <v-list-item-title>
            <v-icon class="mr-4" size="18">
              <i class="fa-brands fa-linkedin-in" /> </v-icon
            >Linkedin
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-btn>
    <div v-if="isWelcome" class="ml-10 d-flex flex-row header-info">
      <div v-if="!isSmall" class="divider" />
      <span :class="{ 'header-info-span': isSmall }">Sign Up / Login</span>
    </div>
    <div v-if="isRecognised" class="ml-0 d-flex flex-row header-info">
      <div class="divider" />
      <span v-if="isSmall" class="header-info-span-2"
        >Recognised Qualifications</span
      >
      <h3 v-if="!isSmall">Recognised Qualifications</h3>
    </div>
    <div
      v-if="!isSmall && isRecognised"
      class="ml-0 d-flex flex-row header-info"
    >
      <div class="divider mx-2" />
      <p style="font-size: 16px" class="text-grey font-weight-bold">
        Where are you Looking For a Job. ?
      </p>
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            style="font-size: 20px; color: #851826; font-weight: 600"
            v-bind="props"
            variant="text"
          >
            {{ countryRecognised }}
            <v-icon right dark> mdi-menu-down </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in countryRegistrable"
            :key="index"
            :value="index"
            @click="changeCountryRecognised(item)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            style="font-size: 18px; color: #000000; font-weight: 600"
            v-bind="props"
            variant="text"
          >
            {{
              skillRecognised != '---Select Skills---'
                ? `${skillRecognised} Jobs`
                : skillRecognised
            }}
            <v-icon right dark> mdi-menu-down </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in skillRegistrable"
            :key="index"
            :value="index"
            @click="changeSkillRecognised(item)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div
      v-if="isDetail && !isSmall"
      class="ml-4 d-flex flex-row header-info"
      style="max-width: 300px"
    >
      <div v-if="!isSmall" class="divider" />
      <span :class="{ 'header-info-span': isSmall }">{{
        isDetailPage
          ? detailHeader.title
          : isDetail
          ? skillSlug.name
          : titleHeader
      }}</span>
    </div>
    
    <div v-if="isPrivacy" class="ml-md-10 ml-sm-6 d-flex flex-row header-info">
      <div :class="{ divider: !isSmall, 'divider-2': isSmall }" />
      <span :class="{ 'header-info-span': isSmall }">Privacy Policy</span>
    </div>
    <div v-if="isTerms" class="ml-md-10 ml-sm-6 d-flex flex-row header-info">
      <div :class="{ divider: !isSmall, 'divider-2': isSmall }" />
      <span :class="{ 'header-info-span-2': isSmall }">Terms & Conditions</span>
    </div>
    <div v-if="isMyProfile" class="ml-md-10 ml-sm-6 d-flex flex-row header-info">
      <div :class="{ divider: !isSmall, 'divider-2': isSmall }" />
      <span :class="{ 'header-info-span-2': isSmall }">My Profile</span>
    </div>
    <div v-if="isResumeProfile" class="ml-md-10 ml-sm-6 d-flex flex-row header-info">
      <div :class="{ divider: !isSmall, 'divider-2': isSmall }" />
      <span class="text-blue-accent-4" :class="{ 'header-info-span-2': isSmall }">Resume Profile</span>
    </div>
    <v-spacer v-if="isPrivacy || isTerms || isProfile" />
    <v-spacer v-if="!isSmall && (isWelcome || isDetail)" />
    <form
      v-if="!isWelcome && !isDetail && !isRecognised && !isPrivacy && !isTerms && !isProfile  && !tokenStart"
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
        color="blue-grey-lighten-2"
      >
        <template v-slot:item="{ props, item }">
          <div v-bind="props">
            <router-link
              class="text-decoration-none text-black font-weight-bold"
              :to="item.raw.slug"
            >
              <div class="d-flex align-center w-100">
                <div class="w-25 py-1">
                  <div style="width: 100px">
                    <v-img height="40" :src="item?.raw?.image">
                      <template #placeholder>
                        <div class="skeleton" /> </template
                    ></v-img>
                  </div>
                </div>
                <div class="w-75">
                  <p>{{ item?.raw?.name }}</p>
                </div>
              </div>
            </router-link>
          </div>
        </template>
      </v-autocomplete>
      <!-- data-autocompleturl="https://boozards.com/merchant-product/search" -->
      <button class="btn btn--search" type="submit">
        <v-icon color="white"> mdi-magnify </v-icon>
      </button>
    </form>
    <div
      class="mr-10 d-flex justify-space-between"
      style="min-width: 500px"
      v-if="isDetailPage && !isSmall"
    >
      <div class="d-flex align-center">
        <v-btn
          style="background: #f4f5f7; color: black"
          variant="text"
          color="black"
          icon="mdi-share-outline"
          width="40"
          height="40"
          class="mx-4"
        >
          <v-icon color="rgb(38, 38, 38)" size="22"> mdi-share-outline </v-icon>
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
        <h3>
          {{ detailHeader.address }}
        </h3>
      </div>

      <v-btn
        class="apply ml-4"
        style="
          border-radius: 0;
          background: #ea027a;
          color: white;
          font-size: 14px;
        "
        height="37"
      >
        Quick Apply
      </v-btn>
    </div>
    <div
      v-if="isSpecific && !isPrivacy && !isTerms && !isProfile"
      class="desktop__app"
      style="min-width: 600px !important"
    >
      <v-btn
        style="background: #f4f5f7; color: black"
        variant="text"
        color="black"
        icon="mdi-share-outline"
        width="40"
        height="40"
        class="mr-2 ml-4"
      >
        <v-icon color="rgb(38, 38, 38)" size="22"> mdi-share-outline </v-icon>
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
      <!-- <div class="d-flex w-100 justify-space-between"> -->
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            v-if="!isLoading"
            style="font-size: 15px; color: #494949"
            v-bind="props"
            variant="text"
          >
          <template v-if="!itemSelectedComplete || itemSelectedComplete == null">
            <span>{{ itemSelected }}</span>
          </template>
          <template v-if="itemSelectedComplete || itemSelectedComplete != null">
            <span class="text-blue-darken-4">{{
              itemSelectedComplete?.title
            }}</span
            ><span class="text-red">
              ({{ itemSelectedComplete?.count }}
              {{
                itemSelectedComplete?.count == '1' ||
                itemSelectedComplete?.count == '0'
                  ? 'Job'
                  : 'Jobs'
              }})</span
            >
            </template>
            <v-icon right dark> mdi-menu-down </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in country"
            :key="index"
            :value="index"
            @click="changeItemSelected(item)"
          >
            <v-list-item-title v-if="isSpecific"
              ><span class="text-blue-darken-4">{{ item.title }}</span
              ><span class="text-red">
                ({{ item.count }}
                {{
                  item.count == '1' || item.count == '0' ? 'Job' : 'Jobs'
                }})</span
              >
            </v-list-item-title>
            <v-list-item-title v-else>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu v-if="itemSelectedComplete?.oneCity != true">
        <template #activator="{ props }">
          <v-btn
            style="
              margin-left: 10px;
              margin-right: 20px;
              font-size: 15px;
              color: #494949;
            "
            v-bind="props"
            variant="text"
          >
            <!-- {{ isLoading ? 'loading...' : itemSelected2 }} -->
            <span v-if="isLoading">loading...</span>
            <template v-if="!isLoading && itemSelected2Complete == null">
              <span>{{ itemSelected2 }}</span>
            </template>
            <template v-if="!isLoading && itemSelected2Complete != null">
              <span class="text-blue-darken-4">
                {{ itemSelected2Complete?.title }}</span
              ><span class="text-black">
                ({{ itemSelected2Complete?.count }}
                {{
                  itemSelected2Complete?.count == '1' ||
                  itemSelected2Complete?.count == '0'
                    ? 'Job'
                    : 'Jobs'
                }})</span
              >
            </template>
            <v-icon right dark> mdi-menu-down </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in city"
            :key="index"
            :value="index"
            @click="changeItemSelected2(item)"
          >
            <v-list-item-title v-if="isSpecific"
              ><span class="text-blue-darken-4">{{ item.title }}</span
              ><span class="text-black">
                ({{ item.count }}
                {{
                  item.count == '1' || item.count == '0' ? 'Job' : 'Jobs'
                }})</span
              >
            </v-list-item-title>
            <v-list-item-title v-else>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- </div> -->
    </div>
    <!-- <v-btn
      v-if="!isWelcome && !isRecognised"
      elevation="0"
      class="btn_sign__up mr-4"
      to="/signup"
    >
      Sign up / Register
    </v-btn> -->
    
  <v-spacer v-if="!isSmall && tokenStart"></v-spacer>
    <v-btn
      v-if="!isWelcome && !isRecognised && !isPrivacy && !isTerms && !isProfile && userName == null"
      elevation="0"
      class="btn_sign__up mr-4"
      @click="loginGypsy"
    >
      Sign up / Sign In
    </v-btn>
    <v-btn
    v-if="!isWelcome && !isPrivacy && !isTerms && !isProfile && userName != null"
    elevation="0"
    class="btn_log__out"
    @click="logout"
    :class="{'mr-6': tokenStart}"
  >
    Logout
  </v-btn>
  <div
    v-if="!isWelcome"
    style="height: 48px; width: 48px; border-radius: 50%; cursor: pointer"
    icon
    :class="{ 'mr-2': isPrivacy || isTerms || isProfile || tokenStart }"
    @click="drawer = !drawer"
  >
    <v-img
      v-if="userImage != null"
      :src="userImage"
      cover
      style="height: 100%; width: 100%; border-radius: 50%"
    >
      <template #placeholder>
        <div class="skeleton" />
      </template>
    </v-img>
    <v-img
      v-else-if="userImage == null && !isLoading"
      src="@/assets/user_icon.png"
      cover
      height="48"
      style="height: 100%; width: 100%"
    />
  </div>

    <template v-if="!isWelcome && !isPrivacy && !isTerms && !isProfile" #extension>
      <div
        class="mobile__app text-center scroll-container d-flex flex-column justify-center align-content-space-between mx-2"
        :class="{
          'mb-n10': !isHome,
          'mobile-specific': isSpecific,
          'mobile-recognised': isRecognised,
        }"
      >
        <div
          class="mb-n2"
          :class="{ 'mt-1': isDetailPage, 'mt-n10': isSpecific }"
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
        <div class="d-flex flex-column mb-n4" v-if="isSpecific">
          <v-menu v-if="!isLoading">
            <template #activator="{ props }">
              <v-btn
                v-if="!isLoading"
                style="font-size: 15px; color: #494949"
                v-bind="props"
                variant="text"
              >
              <template v-if="!itemSelectedComplete || itemSelectedComplete == null">
                <span>{{ itemSelected }}</span>
              </template>
              <template v-if="itemSelectedComplete || itemSelectedComplete != null">
                <span class="text-blue-darken-4">{{
                  itemSelectedComplete?.title
                }}</span
                ><span class="text-red">
                  ({{ itemSelectedComplete?.count }}
                  {{
                    itemSelectedComplete?.count == '1' ||
                    itemSelectedComplete?.count == '0'
                      ? 'Job'
                      : 'Jobs'
                  }})</span
                >
                </template>
                <v-icon right dark> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list style="max-height: 50vh">
              <v-list-item
                v-for="(item, index) in country"
                :key="index"
                :value="index"
                @click="changeItemSelected(item)"
              >
                <v-list-item-title v-if="isSpecific"
                  ><span class="text-blue-darken-4">{{ item.title }}</span
                  ><span class="text-red">
                    ({{ item.count }}
                    {{
                      item.count == '1' || item.count == '0' ? 'Job' : 'Jobs'
                    }})</span
                  >
                </v-list-item-title>
                <v-list-item-title v-else>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-menu v-if="itemSelectedComplete?.oneCity != true">
            <template #activator="{ props }">
              <v-btn
                style="font-size: 15px; color: #494949"
                v-bind="props"
                variant="text"
              >
                <!-- {{ isLoading ? 'loading...' : itemSelected2 }} -->
                <span v-if="isLoading">loading...</span>
                <template v-if="!isLoading && itemSelected2Complete == null">
                  <span>{{ itemSelected2 }}</span>
                </template>
                <template v-if="!isLoading && itemSelected2Complete != null">
                  <span class="text-blue-darken-4">
                    {{ itemSelected2Complete?.title }}</span
                  ><span class="text-black">
                    ({{ itemSelected2Complete?.count }}
                    {{
                      itemSelected2Complete?.count == '1' ||
                      itemSelected2Complete?.count == '0'
                        ? 'Job'
                        : 'Jobs'
                    }})</span
                  >
                </template>
                <v-icon right dark> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list style="max-height: 50vh">
              <v-list-item
                v-for="(item, index) in city"
                :key="index"
                :value="index"
                @click="changeItemSelected2(item)"
              >
                <v-list-item-title v-if="isSpecific"
                  ><span class="text-blue-darken-4">{{ item.title }}</span
                  ><span class="text-black">
                    ({{ item.count }}
                    {{
                      item.count == '1' || item.count == '0' ? 'Job' : 'Jobs'
                    }})</span
                  >
                </v-list-item-title>
                <v-list-item-title v-else>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <div class="d-flex flex-column mb-n4" v-if="isRecognised">
          <p style="font-size: 12px" class="text-grey font-weight-bold">
            Where are you Looking For a Job. ?
          </p>
          <v-menu>
            <template #activator="{ props }">
              <v-btn
                style="font-size: 15px; color: #851826; font-weight: 600"
                v-bind="props"
                variant="text"
              >
                {{ countryRecognised }}
                <v-icon right dark> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in countryRegistrable"
                :key="index"
                :value="index"
                @click="changeCountryRecognised(item)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-menu>
            <template #activator="{ props }">
              <v-btn
                style="font-size: 18px; color: #000000; font-weight: 600"
                v-bind="props"
                variant="text"
              >
                {{
                  skillRecognised != '---Select Skills---'
                    ? `${skillRecognised} Jobs`
                    : skillRecognised
                }}
                <v-icon right dark> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in skillRegistrable"
                :key="index"
                :value="index"
                @click="changeSkillRecognised(item)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <div v-if="isDetailPage">
          <span>{{ detailHeader.address }}</span>
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
          v-if="!isDetail && !isRecognised && !tokenStart"
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
            color="blue-grey-lighten-2"
          >
            <template v-slot:item="{ props, item }">
              <div v-bind="props">
                <router-link
                  class="text-decoration-none text-black font-weight-bold"
                  style="font-size: 12px"
                  :to="item.raw.slug"
                >
                  <div class="d-flex align-center" style="width: 100%">
                    <div style="width: 30% !important" class="py-1">
                      <v-img height="40" :src="item?.raw?.image">
                        <template #placeholder>
                          <div class="skeleton" /> </template
                      ></v-img>
                    </div>
                    <div style="width: 70% !important" class="pl-2">
                      <p>{{ item?.raw?.name }}</p>
                    </div>
                  </div>
                </router-link>
              </div>
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
        <div v-if="(isHome && !tokenStart) || isSpecific" class="my-slide d-flex">
          <v-btn
            class="sub-menu-btn view-all"
            style="box-shadow: 0 5px 25px rgba(0, 0, 0, 0)"
            @click="selectTag('')"
          >
            <!-- :class="{
              active: isSelected,
            }" -->
            <p style="font-size: 12px" elevation>View All</p>
            <!-- <span class="badge" :class="isSelected ? 'active' : ''"
            >2.7K</span
          > -->
          </v-btn>
          <v-slide-group v-model="activeTag">
            <v-slide-group-item
              v-for="btn in trendingBtn"
              :key="btn.id"
              :value="btn.tag"
            >
              <!-- v-slot="{ isSelected }" -->
              <v-btn
                class="sub-menu-btn"
                :class="{
                  active: activeTag == btn.id,
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
    <div class="drawer__top" 
    :class="{ 'py-6': userName == null, 'py-2': userName != null }">
      <p
        v-if="userName == null"
        class="text-decoration-none"
        @click="loginGypsy"
      >
        <span style="font-size: 1.125rem; color: white">Sign up / Sign In</span>
      </p>
      <div v-else class="d-flex align-center">
        <div style="width: 55px; height: 55px; border-radius: 50%">
          <v-img
            cover
            style="border-radius: 50%; width: 100%; height: 100%"
            :src="
              userImage != null
                ? userImage
                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
            "
          >
            <template #placeholder>
              <div class="skeleton" />
            </template>
          </v-img>
        </div>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title style="font-size: 14px">
              {{ userName }}
            </v-list-item-title>
            <v-list-item-subtitle style="font-size: 10px" class="mt-1">
              Last Login: {{ userDated }}
            </v-list-item-subtitle>
            <div
              class="text-red mt-1"
              style="font-size: 12px; cursor: pointer"
              @click="logout"
            >
              Logout
            </div>
          </v-list-item-content>
        </v-list-item>
      </div>
    </div>
    <div class="drawer__heading">
      <div class="drawer-logo">
        <v-img height="35" width="80" :src="$fileURL + logo" />
      </div>
      <v-menu contained style="z-index: 1000">
        <template #activator="{ props }">
          <v-btn
            style="background: #f4f5f7; color: black"
            variant="text"
            color="black"
            icon="mdi-share-outline"
            width="30"
            height="30"
            class="mx-4"
            v-bind="props"
          >
            <v-icon color="rgb(38, 38, 38)" size="15">
              mdi-share-outline
            </v-icon>
          </v-btn>
        </template>
        <v-list style="z-index: 1000">
          <v-list-item @click="console.log('share')">
            <v-list-item-title>
              <v-icon class="mr-4" color="black" size="18">
                mdi-email-outline </v-icon
              >Email
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="console.log('share')">
            <v-list-item-title>
              <v-icon class="mr-4" size="18">
                <i class="fa-brands fa-facebook-f" /> </v-icon
              >Facebook
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="console.log('share')">
            <v-list-item-title>
              <v-icon class="mr-4" color="black" size="18"> mdi-twitter </v-icon
              >Twitter
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="console.log('share')">
            <v-list-item-title>
              <v-icon class="mr-4" size="18">
                <i class="fa-brands fa-linkedin-in" /> </v-icon
              >Linkedin
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <div class="text-muted" style="font-size: 10px">Version 1.0</div>
    </div>
    <v-divider />
    <ul class="pt-1" nav dense>
      <li class="v-list-item">
        <div class="v-list-item__icon">
          <v-img height="20" width="30" src="@/assets/images/icons/home.png" />
        </div>
        <v-list-item-title style="font-size: 12px"> Home </v-list-item-title>
      </li>

      <li v-if="userName != null" class="v-list-item mt-n2">
        <div class="v-list-item__icon">
          <v-img
            height="18"
            width="25"
            src="@/assets/images/icons/menu-shopper.png"
          />
        </div>
        <router-link class="text-decoration-none text-black" to="/my-profile">
          <v-list-item-title style="font-size: 12px">
            My Profile
          </v-list-item-title>
        </router-link>
      </li>
      <li v-if="userName != null" class="v-list-item mt-n2">
        <div class="v-list-item__icon">
          <v-img
            height="18"
            width="25"
            src="@/assets/images/icons/menu-shopper.png"
          />
        </div>
        <router-link class="text-decoration-none text-black" to="/resume-profile">
          <v-list-item-title style="font-size: 12px">
            Resume Profile
          </v-list-item-title>
        </router-link>
      </li>

      <li class="v-list-item mt-n2">
        <div class="v-list-item__icon">
          <v-img height="18" width="25" src="@/assets/images/icons/shop.png" />
        </div>
        <v-list-item-title style="font-size: 12px"> My Jobs </v-list-item-title>
      </li>

      <li v-if="userName != null" class="v-list-item mt-n2">
        <div class="v-list-item__icon">
          <v-img src="" />
        </div>
        <v-list-item-title style="font-size: 12px">
          My Vouchers
        </v-list-item-title>
      </li>
      <li v-if="userName != null" class="v-list-item mt-n2">
        <div class="v-list-item__icon">
          <v-img src="" />
        </div>

        <v-list-item-title style="font-size: 12px">
          My Favorites
        </v-list-item-title>
      </li>
      <li v-if="userName != null" class="v-list-item mt-n2">
        <div class="v-list-item__icon">
          <v-img src="" />
        </div>

        <v-list-item-title style="font-size: 12px"> My Apps </v-list-item-title>
      </li>
      <li v-if="userName == null" class="v-list-item mt-n2">
        <div class="v-list-item__icon">
          <v-img src="" />
        </div>
        <router-link
          class="text-decoration-none text-black"
          to="/privacy-policy"
        >
          <v-list-item-title style="font-size: 12px">
            Privacy Policy
          </v-list-item-title>
        </router-link>
      </li>
      <li v-if="userName == null" class="v-list-item mt-n2">
        <div class="v-list-item__icon">
          <v-img src="" />
        </div>

        <router-link class="text-decoration-none text-black" to="/our-terms">
          <v-list-item-title style="font-size: 12px">
            Terms & Conditions
          </v-list-item-title>
        </router-link>
      </li>
    </ul>
    <div class="drawer__bottom">
      <div class="text-center" style="width: 100%">
        <p style="font-size: 13px" class="mb-1">Made in Singapore</p>
        <h3 style="font-size: 13px">Get connected</h3>
        <v-row
          class="d-flex justify-center mt-1"
          :class="{ 'mb-2': userName == null }"
        >
          <v-col cols="3" class="d-flex justify-end">
            <v-img
              src="@/assets/images/icons/facebook.png"
              height="40"
              width="32"
            />
          </v-col>
          <v-col class="d-flex justify-center" cols="3">
            <v-img
              src="@/assets/images/icons/insta.png"
              height="40"
              width="32"
            />
          </v-col>
          <v-col class="d-flex justify-start" cols="3">
            <v-img
              src="@/assets/images/icons/tiktok.png"
              class="mt-1"
              height="35"
              width="35"
            />
          </v-col>
        </v-row>
        <div
          v-if="userName != null"
          style="font-size: 12px"
          class="text-grey my-1"
        >
          <router-link
            class="text-decoration-none text-grey"
            to="/privacy-policy"
          >
            Privacy
          </router-link>
          |
          <router-link class="text-decoration-none text-grey" to="/our-terms">
            Terms
          </router-link>
        </div>
        <div class="drawer-social d-flex" style="width: 100%">
          <div>
            <h5>WhatsApp</h5>
            <a
              style="text-decoration: none; font-size: 10px"
              :href="`https://api.whatsapp.com/send?phone=${footerData?.whats_app}&text=Hello!`"
            >
              {{ footerData?.whats_app }}
            </a>
          </div>
          <div>
            <h5>Contact us</h5>
            <a
              style="text-decoration: none; font-size: 10px"
              :href="`mailto:${footerData?.email_id}`"
              >{{ footerData?.email_id }}</a
            >
          </div>
        </div>
        <v-divider class="mt-2 mb-n2" />
        <v-container class="footer-bottom pb-2 d-flex justify-center">
          <div class="d-flag d-flex justify-space-between w-100 align-center">
            <img
              style="max-width: 40px; border: 1px solid black"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAjVBMVEX////tKTnsFSr2q6/tJTbsABvtHjDtIDLsAB/tIjTzfITsDSbsAB7sGCzxbHXsAyL1n6T96+z+8vP4ur771tj++PnrAAD84eP5x8r3sLT2panuO0n5wcTuQE3vRlLwWGLuMUDxZW7zhYzydHzvUl30jpT6ztH0lJr3tbn7293vTlnrABTzh47wXmj1mJ0I+eUlAAAGKklEQVR4nO2ci3KiMBSGEWO4RIzXta1Wsd5b9f0fbxOtliQEaLduG+b/ZnaGhewO/ZqcnBwCXgPoeD99A78QODGBExM4MYETEzgxgRMTODGBExM4MfmCExIkjIchl3+YT8n339QP81knkd9udLrTYW8k6O0fmi+vtZPyKSfE58fHnpdhtFum97q1H+MTTghPn/pZId702PKD+93bT1HZCWGTqSLEa6ashkIa1Z0k0UA1MghY7QLJO9WckNaLaqS34nU1UtFJkGy0YcPzRg0bsG++u5+hipPkVQ2tXifMa0Ya3nMtOk8FJ6yjGhnNktx29OB18684RrkTFqtK+inNb8iH3rj9zbf3I5Q68XUljchoQwIBpeLqhMpDs4VTlDmhC1WJNzGjKzkuO53OoiuuPi7E0XLhtpQSJ9GzpmSeM3BIOlTajB0PtSVOWE9Vss6dbUlrnWnTbbmtpMRJqCWvm5aloT+7yuvPnU9SCp1QbRb2iLUHRG/ji5KW+2ugQidMy9UOBelH8t6m4fjAaRQ78buqkt6bvS1digYjGXEs2YtDFDghgTZyOuqPqwwS9iAm4j9C4pBnT0cu9poCJ/6TqkRLUtM4K4UJZbzB5n1l8EQLFyuTBU7YSHUSK92EHh4yEwyNx0Repv5mm2nmD1xcAdmdUK1kMlIGRYNvvIwTMn+vMBE2z/SMsL/PXUL/buxOQjU59XZq3iHmmU5m8JCco0a0cnIesjohqRZh58oihoqlYWkJyW963ta9ecjqxBg6twjrtwR/xDwz+iOPcsuyhJ0bieR2eG7k3+Xm74TVCdOq9LeIGuy06WhiStFXhd7Dve7/HlidhFoO+zEG+DJ7vhnm9pOWku8dbOukX4nNCYns4SRJ97cRteCW/4CtblJ7M6eGjtVJoNeSsvPHrRcMA3sEDWRqK9m1HCsx2ZzQg6qkr/SHa/WtWTTz+KdLo9i1mcfmRE6jSiRVnLBBnimN8FI98DZFjX4jVifa7LJRegQXaf/gxdOTFgUykZFZrplcKzLZnFinYokMNnHbf+55TXv0TE5ef8X4YuTc4LE6eShwwqa9VKztIj4Y2ZczYe9BbsSg0XDoWEf5kpPo9J6UhPHMupyZrC+1atLaftvd/h+sTvTqtPK7vg2Got1s1DhwBGuMfVSdDF2bPP4Bm5NEr8U6WAf5KtacTXtMPHIrPf8nrOudmeqkJltLKmFdF3PNydISKUn+XtDUsTVOFruTverEkp2R16e8KjQ9Oby3wOrEeJKRH2STbi9vHw4f7twNQFYn0VEbPPmPr8RCL82ps0Ve390tS/a6PdcKbbkPPWUl+2QOHlnMXTk7eOxO9Kxtr/3iqYRvxYW38yHJnG5tZFHyfHjHe78XdiclszF5iQVLWSORB/HhsvKZrM+nZZa3PJ++8/3fg4Jno8UPvaKj+uj0dOkRen2u4+B2lAInhSVZcdnPlFh6r9dpJpmMP05vCuq1v5ei/SdtLUV51Oog7Vv+P8i8oUHCW9ly7ebOtiIn8nGvgj7r+u8h50ndrHPd8Xd0rJZ0pXDvFi/Z4ncNHloV+lq3zJmknaB436Ovb0FRf0ouo7BsopaW5L+SZ13daV7shOrJrDJ65Oau0ZyJXOSQDaVBR+QsDbk51NG1dNmeYa20NM6OHpGtbkSu1t6qVTgxdLptErCBq4OnbL99S6tVTzNS2PAysfizfrb/JP1LcG3HezeDbOl7GaE2IT99BAlyTUoiki3fT64vs9DZt97qf6PUCfHHqpTTR0/J3bCV+Yub4aTCO01Ery49ObWZ5AtUePeNhNpz0qmb6WllKr03KmYWdfZJ3ZxQKlLt/WL2qr3HE9e5q1R8Dz3gWqKymdT2NfTq3ytgqRZVHkldrVT/rgXhE21JuHsOXSyPlPKZ758QRg9q7W14oDXsLJ/8Tg7lfrxTkrjpqnZSPv89Jepz9nyM19vtOl7MEr92Sr743S0SnJ9T0KB+Qhr4FlkecGICJyZwYgInJnBiAicmcGICJyaeD3S8JtDxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwN34C1LFl4jt93CzAAAAAElFTkSuQmCC"
              alt="Singapore"
            />
            <div id="footerCurrentTime" style="font-size: 0.7rem">
              {{ currentTime }}
            </div>
          </div>
        </v-container>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import app from '@/util/eventBus';

// import eventBus from "@/util/eventBus";
// import eventBus from "@/util/eventBus";
import axios from '@/util/axios';
import moment from "moment-timezone";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
  props: ['isWelcome'],
  data() {
    return {
      // selectedTag: null,
      tokenStart: null,
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
      isLoading: false,
      trendingBtn: [],
      isDetail: false,
      skillSlug: {},
      countryId: null,
      cityId: null,
      search: null,
      searchItems: [],

      userImage: null,
      userName: null,
      userDated: null,
      drawer: false,
      // itemSelected: 'Singapore',
      country: [],
      countryRegistrable: [],
      skillRegistrable: [],

      trendingCard: [],

      logo: '',
      headerData: {},
      currentTime: "",

      selectedType: 0,
      activeIndex: 1,
      screenWidth: window.innerWidth,
    };
  },
  watch: {
    $route() {
      this.search = null;
    },
  },
  computed: {
    ...mapState(['itemSelected']),
    ...mapState(['itemSelected2']),
    ...mapState(['itemSelectedComplete']),
    ...mapState(['itemSelected2Complete']),
    ...mapState(['detailHeader']),
    ...mapState(['countryRecognised']),
    ...mapState(['idCountryRecognised']),
    ...mapState(['skillRecognised']),
    ...mapState(['idSkillRecognised']),
    tokenProvider() {
      // Mendapatkan URL dari browser
      const url = new URL(window.location.href);

      // Mendapatkan nilai token dari parameter query 'token'
      const tokenParam = url.searchParams.get("token");
      if (tokenParam) {
        localStorage.setItem("token", tokenParam);
      }

      // Mengupdate data 'token' dalam komponen dengan nilai yang ditemukan
      return tokenParam;
    },
    token() {
      return localStorage.getItem("token");
    },
    isPrivacy() {
      return this.$route.path == "/privacy-policy";
    },
    isTerms() {
      return this.$route.path == "/our-terms";
    },
    isProfile() {
      return this.$route.path == "/my-profile" || this.$route.path == "/resume-profile";
    },
    isMyProfile() {
      return this.$route.path == "/my-profile";
    },
    isResumeProfile() {
      return this.$route.path == "/resume-profile";
    },
    isSmall() {
      return this.screenWidth < 640;
    },
    isHome() {
      return this.$route.path === '/';
    },
    isSpecific() {
      return this.$route.params.name;
    },
    isRecognised() {
      return this.$route.path === '/recognised-qualifications';
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
    setInterval(this.updateTime, 1000);
  },
  mounted() {
    const url = new URL(window.location.href);
      const tokenParam = url.searchParams.get("token");
      this.tokenStart = tokenParam

    const token = localStorage.getItem("token");
    if (this.tokenProvider != null) {
      this.getHeaderUserData();
    } else if (token) {
      this.getHeaderUserData();
    }
    this.search = null;
    this.getLogo();
    this.getCountry();
    this.getAppContact();
    //this.getCity();
    this.getTrendingCardData();
    this.getActiveSkills();
    // app.config.globalProperties.$eventBus.$on(
    //   'getHeaderDetail',
    //   this.getHeaderDetail
    // );
    app.config.globalProperties.$eventBus.$on(
      'getTrendingCardData2',
      this.getTrendingCardData2
    );
    app.config.globalProperties.$eventBus.$on(
      'changeHeaderImage',
      this.changeHeaderImage
    );
    app.config.globalProperties.$eventBus.$on(
      'getHeaderUserData',
      this.getHeaderUserData
    );
    app.config.globalProperties.$eventBus.$on(
      'getHeaderDetail',
      this.getSkillBySlug
    );
    app.config.globalProperties.$eventBus.$on(
      'getRegistrableCountrySkills',
      this.getRegistrableData
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
      'getTrendingCardData2',
      this.getTrendingCardData2
    );
    app.config.globalProperties.$eventBus.$off(
      'changeHeaderImage',
      this.changeHeaderImage
    );
    app.config.globalProperties.$eventBus.$off(
      'getHeaderUserData',
      this.getHeaderUserData
    );
    app.config.globalProperties.$eventBus.$off(
      'getHeaderDetail',
      this.getSkillBySlug
    );
    app.config.globalProperties.$eventBus.$off(
      'getRegistrableCountrySkills',
      this.getRegistrableData
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
    getTrendingCardData2() {
      this.tokenStart = null;
    },
    changeHeaderImage(image) {
      //console.log(image)
      this.userImage = this.$fileURL + image
    },
    logout() {
      const token = localStorage.getItem("token");
      axios
        .get(`/gypsy-logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data.data;
          console.log(data);
          localStorage.setItem("name", null);
          localStorage.setItem("g_id", null);
          localStorage.setItem("user_image", null);
          localStorage.setItem("token", null);
          window.location.href = "/";
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    getHeaderUserData() {
      this.isLoading = true;
      //console.log(this.tokenProvider);
      const token = localStorage.getItem("token");
      axios
        .get(`/gypsy-user`, {
          headers: {
            Authorization: `Bearer ${
              this.tokenProvider ? this.tokenProvider : token
            }`,
          },
        })
        .then((response) => {
          const data = response.data.data;
          //console.log(data);

          this.userName = data.name;
          this.userDated = data.last_login;
          this.userImage =
            data.image != null ? this.$fileURL + data.image : null;
          // this.userImage = null;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getHeaderUserData2() {
      this.isLoading = true;
      const token = localStorage.getItem("token");
      axios
        .get(`/gypsy-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data.data;
          //console.log(data);

          this.userName = data.name;
          this.userDated = data.last_login;
          this.userImage =
            data.image != null ? this.$fileURL + data.image : null;
          // this.userImage = null;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
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
    updateTime() {
      // Ambil zona waktu Singapore
      const singaporeTime = moment().tz("Asia/Singapore");
      // Format waktu dalam hh:mm:ss
      this.currentTime = singaporeTime.format("HH:mm:ss");
    },
    loginGypsy() {
      
      const externalURL = `https://www.the-gypsy.sg/sign-in?app_id=${this.$appId}`;
      window.location.href = externalURL;
      //axios
      //  .post(`/gypsy-login/google`, {
      //    app_id: 5,
      //  })
      //  .then((response) => {
      //    console.log(response);
      //    //if (response) {
      //    //  window.location.assign(response.data.target_url);
      //    //} else {
      //    //  window.location.href = "/sign-in";
      //    //}
      //    //console.log(response.data.target_url);
      //  })
      //  .catch((error) => {
      //    console.log(error);
      //    //window.location.href = "/sign-in";
      //  });
    },
    getRegistrableData() {
      this.getRegistrableCountry()
      this.getRegistrableSkills()
    },
    getRegistrableCountry() {
      this.isLoading = true;
      axios
        .get(`/registrable-country/country-skills`)
        .then((response) => {
          const data = response.data.data;
          //console.log(data);
          this.countryRegistrable = data.map((country) => {
            return {
              id: country.country_id,
              title: country.country_name,
              path: '#',
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
    getRegistrableSkills() {
      this.isLoading = true;
      axios
        .get(`/registrable-country/skills`)
        .then((response) => {
          const data = response.data.data;
          //console.log(data);
          this.skillRegistrable = data.map((skills) => {
            return {
              id: skills.skills_id,
              title: skills.skills_name,
              path: '#',
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
    getActiveSkills() {
      this.isLoading = true;
      axios
        .get(`/skills/active/app/${this.$appId}`)
        .then((response) => {
          const data = response.data.data;
          // console.log(data);
          this.searchItems = data.map((item) => {
            return {
              id: item.skills_id || 1,
              name: item.skills_name || '',
              image: this.$fileURL + item.image || '',
              slug: item.slug || '',
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
    getSkillBySlug() {
      //console.log('ok')
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
          this.getCountrySkill();
          this.getCitySkill();
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getHeaderDetail(countryId) {
      axios
        .get(`/job-positions/${this.skillSlug.skills_id}/${countryId}`)
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
    getCountrySkill() {
      this.isLoading = true;
      axios
        .get(`/jobs/get-countries/skills/${this.skillSlug.skills_id}`)
        .then((response) => {
          const data = response.data.data;
          this.country = data.map((country) => {
            return {
              id: country.country_id,
              title: country.country_name,
              count: country.count,
              oneCity: country.one_city == 'Y' ? true : false,
              path: '#',
            };
          });
          //if (isSingapore.length > 0) {
          //  this.setItemSelectedComplete(this.country[0]);
          //  this.setItemSelected(this.country[0].title);
          //} else {
          //  this.setItemSelectedComplete(this.country[0]);
          //  this.setItemSelected(this.country[0].title);
          //}
          this.getHeaderDetail(this.country[0].id);
          this.setItemSelectedComplete(this.country[0]);
          this.setItemSelected(this.country[0].title);
          localStorage.setItem('itemSelectedObj', JSON.stringify(this.country[0]))
          localStorage.setItem('itemSelectedTit', this.country[0].title)
          app.config.globalProperties.$eventBus.$emit('getSkillBySlugFirst');
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getCitySkill() {
      this.isLoading = true;
      axios
        .get(
          `/jobs/get-country-cities/country/${
            this.itemSelectedComplete?.id || this.countryId
          }/skills/${this.skillSlug.skills_id}`
        )
        .then((response) => {
          const data = response.data.data;
          //console.log(data);
          this.city = data.map((city) => {
            return {
              id: city.city_id,
              title: city.city_name,
              count: city.count,
              countryId: city.country_id,
              path: '#',
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
      this.setItemSelected(item.title);
      this.setItemSelectedComplete(item);
      this.setItemSelected2('---Select City---');
      this.setItemSelected2Complete(null);
      this.getCitySkill();
      //console.log(this.itemSelectedComplete);
      app.config.globalProperties.$eventBus.$emit('getJobDetailSpecific1');
    },
    changeItemSelected2(item) {
      this.setItemSelected2(item.title);
      this.setItemSelected2Complete(item);
      app.config.globalProperties.$eventBus.$emit('getJobDetailSpecific2');
    },
    changeCountryRecognised(item) {
      this.setCountryRecognised(item.title);
      this.setIdCountryRecognised(item.id);
      app.config.globalProperties.$eventBus.$emit('getRegulatorInfo');
      app.config.globalProperties.$eventBus.$emit('getQualificationInfo');
      app.config.globalProperties.$eventBus.$emit('getCountry');
    },
    changeSkillRecognised(item) {
      this.setSkillRecognised(item.title);
      this.setIdSkillRecognised(item.id);
      app.config.globalProperties.$eventBus.$emit('getRegulatorInfo');
      app.config.globalProperties.$eventBus.$emit('getQualificationInfo');
      app.config.globalProperties.$eventBus.$emit('getCountry');
    },
    ...mapMutations([
      'setActiveTag',
      'setItemSelected',
      'setItemSelectedComplete',
      'setItemSelected2',
      'setItemSelected2Complete',
      'setCountryRecognised',
      'setSkillRecognised',
      'setIdCountryRecognised',
      'setIdSkillRecognised',
    ]),
    selectTag(tag) {
      this.setActiveTag(tag); // Menetapkan tag yang dipilih sebagai tag aktif
      // console.log('ok');

      if (this.isSpecific) {
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
      this.isLoading = true;
      axios
        .get(`/country`)
        .then((response) => {
          const data = response.data.data;
          // console.log(data);
          //this.country = data.map((country) => {
          //  return {
          //    id: country.country_id,
          //    title: country.country_name,
          //    oneCity: country.one_city == 'Y' ? true : false,
          //    path: '#',
          //  };
          //});
          this.countryId = data
            .filter((d) => d.country_name == this.itemSelected)
            .map((country) => country.country_id)[0];
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getCity() {
      this.isLoading = true;
      axios
        .get(`/cities/country/${this.itemSelectedComplete?.id}`)
        .then((response) => {
          const data = response.data.data;
          // console.log(data);

          this.cityId = data
            .filter((d) => d.city_name == this.itemSelected2)
            .map((city) => city.city_id)[0];
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
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
.app-bar-mobile-start {
  height: 8vh;
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
  height: 32vh;
}
.app-bar-mobile-6 {
  height: 25vh;
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
  gap: 15px;
  font-size: 25px;
  color: black;
  font-weight: 800;
}

.header-info-span {
  font-size: 25px;
  font-weight: 800;
}
.header-info-span-2 {
  font-size: 20px;
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
  height: 220px !important;
}
.mobile-recognised {
  height: 220px !important;
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
