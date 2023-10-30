<template>
  <div>
    <div v-if="isLoading" class="text-center loading-page">
      <v-progress-circular :size="50" color="primary" indeterminate />
    </div>
    <v-container v-if="!isLoading && !isMyQualification && !isMyEmployment">
      <template v-if="!isSmall">
        <div class="card-container d-flex flex-wrap justify-space-between">
          <v-card class="first-section px-16 py-2">
            <input
              ref="filePickerField"
              type="file"
              accept="image/*"
              hidden
              @change="launchCropper"
            />
            <div
              class="image-container d-flex justify-center w-100 mb-4"
              style="position: relative"
            >
              <div>
                <div
                  style="width: 170px; height: 120px; border-radius: 20px"
                  class="mt-5"
                >
                  <v-img
                    style="width: 100%; height: 100%; border-radius: 20px"
                    cover
                    :src="
                      image_path
                        ? image_path
                        : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                    "
                  />
                </div>
                <div
                  class="mt-4 w-100 d-flex align-center"
                  :class="{
                    'justify-space-between': image_path,
                    'justify-center': !image_path,
                  }"
                >
                  <v-btn
                    size="small"
                    color="blue"
                    variant="outlined"
                    @click="$refs.filePickerField.click()"
                    :disabled="image_path"
                  >
                    {{ !isSaveImage ? "Upload Picture" : "Saving Image" }}
                  </v-btn>
                  <v-icon
                    v-if="image_path"
                    @click="deleteImage()"
                    color="red"
                    icon="mdi-trash-can-outline"
                  >
                  </v-icon>
                </div>
                <!-- <image-cropper-dialog
                  ref="cropperDialog"
                  :chosen-image="image"
                  @onReset="$refs.filePickerField.value = null"
                  @onCrop="
                    (croppedImage) => {
                      image_path = croppedImage;
                    }
                  "
                /> -->
              </div>
            </div>
            <v-row class="">
              <v-col>
                <label>Gender</label>

                <VueMultiselect
                  v-model="input.gender"
                  class="mt-2"
                  :options="resource.gender"
                  track-by="value"
                  label="title"
                  placeholder="Select Gender"
                />

                <!-- <select v-model="input.gender" class="form-control mt-2">
                  <option disabled value="">Gender</option>
                  <option
                    v-for="gender in resource.gender"
                    :key="gender"
                    :value="gender"
                  >
                    {{ gender }}
                  </option>
                </select> -->
              </v-col>
            </v-row>
            <v-row
                >
                  <v-col cols="7">
                    <label>Birth Date</label>
                    <input
                      v-model="input.date"
                      required
                      class="form-control mt-2"
                      type="text"
                      id="dateInput"
                      placeholder="DD/MM/YYYY"
                      @input="onDateInput"
                    />
                  </v-col>
                  <v-col cols="5">
                    <label>Age</label>
                    <p class="mt-5">
                      {{ age }}
                    </p>
                  </v-col>
                </v-row>
            <v-row class="">
              <v-col>
                <label>Marital Status</label>
                <VueMultiselect
                  v-model="input.marital"
                  class="mt-2"
                  :options="resource.marital"
                  track-by="value"
                  label="title"
                  placeholder="Select Marital Status"
                />
                <!-- <select v-model="input.marital" class="form-control mt-2">
                  <option disabled value="">--- Select ---</option>
                  <option
                    v-for="marital in resource.marital"
                    :key="marital"
                    :value="marital"
                  >
                    {{ marital }}
                  </option>
                </select> -->
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <label>Nationality</label>

                <VueMultiselect
                  v-model="input.nationality"
                  @select="onInputNationality()"
                  class="mt-2"
                  :options="resource.nationality"
                  track-by="id"
                  label="title"
                  placeholder="Select Nationality"
                />
                <!-- <select v-model="input.nationality" class="form-control mt-2">
                  <option disabled value="">--- Select ---</option>
                  <option
                    v-for="nation in resource.nationality"
                    :key="nation"
                    :value="nation"
                  >
                    {{ nation }}
                  </option>
                </select> -->
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <label>Which Country were you Born. ?</label>

                <div class="w-100 d-flex align-center">
                  <div
                    v-if="input.born"
                    style="
                      border-top: 2px solid rgb(239, 239, 239);
                      border-bottom: 2px solid rgb(239, 239, 239);
                      border-left: 2px solid rgb(239, 239, 239);
                      border-radius: 5px 0 0px 5px;
                      height: 47px;
                    "
                    class="d-flex align-center justify-center"
                  >
                    <span
                      class="fi ml-2 pr-4 mr-4"
                      :class="['fi-' + input.born.toLowerCase()]"
                    />
                  </div>
                  <MazSelect
                    v-slot="{ option }"
                    v-model="input.born"
                    item-height="40"
                    :options="options"
                    search
                    size="md"
                    class="w-100"
                    search-placeholder="Search in country"
                    :class="{ 'ml-n1': input.born }"
                  >
                    <div
                      class="flex items-center"
                      style="
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                        width: 100%;
                        gap: 1rem;
                      "
                    >
                      <span
                        class="fi"
                        :class="['fi-' + option.value.toLowerCase()]"
                      />
                      <span class="pl-2">
                        {{ option.label }}
                      </span>
                    </div>
                  </MazSelect>
                </div>
                <!-- <select v-model="input.nationality" class="form-control mt-2">
                  <option disabled value="">--- Select ---</option>
                  <option
                    v-for="nation in resource.nationality"
                    :key="nation"
                    :value="nation"
                  >
                    {{ nation }}
                  </option>
                </select> -->
              </v-col>
            </v-row>
            <v-row class="mb-6 mt-16">
              <v-col class="d-flex justify-center">
                <v-btn
                  class="text-none text-subtitle-1"
                  color="success"
                  size="large"
                  variant="flat"
                  @click="saveDataDesktop1()"
                >
                  Save Changes
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
          <v-card class="second-section">
            <v-card-title
              style="border-bottom: 1px solid rgb(227, 227, 227)"
              class="card-title"
            >
              <v-container
                class="d-flex align-center justify-space-between my-n4"
              >
                <p class="title-card">Basic Information</p>
                <v-btn
                  class="text-none text-subtitle-1"
                  color="success"
                  size="large"
                  variant="flat"
                  @click="saveDataDesktop2()"
                >
                  Save Changes
                </v-btn>
              </v-container>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <label>Name</label>
                    <input
                      v-model="input.name"
                      type="text"
                      required
                      class="form-control mt-2"
                      placeholder="Enter Your Full Name"
                    />
                    <!-- <v-text-field
                      v-model="input.name"
                      :rules="rules.nameRules"
                      :counter="20"
                      class="mt-2"
                      variant="outlined"
                      placeholder="Enter Name"
                      density="compact"
                      required
                      single-line
                    /> -->
                  </v-col>
                  <v-col cols="6">
                    <label
                      >Email
                      <span
                        :class="{
                          'text-red': !isEmailVerified,
                          'text-green': isEmailVerified,
                        }"
                        >{{
                          isEmailVerified ? "(Verified)" : "(Not Verified)"
                        }}</span
                      ></label
                    >
                    <div
                      class="d-flex align-center mt-2 py-0 back-grey"
                      style="border: 1px solid #ced4da; border-radius: 0.25rem"
                    >
                      <input
                        v-model="input.email"
                        type="email"
                        disabled
                        class="form-control"
                        style="border: none"
                        placeholder="Enter Email"
                      />
                      <span
                        class="text-blue-darken-4 mx-2"
                        style="cursor: pointer"
                        @click="isChangeEmail = !isChangeEmail"
                      >
                        Change
                      </span>
                    </div>
                    <div v-if="isChangeEmail">
                      <input
                        v-model="input.emailNew"
                        type="email"
                        class="form-control mt-4"
                        placeholder="Enter Email"
                      />
                      <v-btn
                        class="text-none text-subtitle-1 mt-4"
                        color="success"
                        variant="flat"
                        @click="saveEmail()"
                      >
                        Save Changes
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <label
                      >Contact Number
                      <span
                        :class="{
                          'text-red': !isPhoneVerified,
                          'text-green': isPhoneVerified,
                        }"
                        >{{
                          isPhoneVerified ? "(Verified)" : "(Not Verified)"
                        }}</span
                      ></label
                    >
                    <div
                      class="d-flex align-center mt-2 py-0 back-grey"
                      style="border: 1px solid #ced4da; border-radius: 0.25rem"
                    >
                      <input
                        v-model="input.phone"
                        type="text"
                        required
                        disabled
                        class="form-control"
                        style="border: none"
                        placeholder="Phone Number"
                      />
                      <span
                        class="text-blue-darken-4 mx-2"
                        style="cursor: pointer"
                        @click="isChangePhone = !isChangePhone"
                      >
                        Change
                      </span>
                    </div>
                    <div v-if="isChangePhone" class="mt-2">
                      <MazPhoneNumberInput
                        v-model="input.phoneNew"
                        show-code-on-list
                      color="info"
                      :default-country-code="country ? country : 'SG'"
                      :preferred-countries="[
                        'SG',
                        'BD',
                        'IN',
                        'MY',
                        'GB',
                        'PH',
                      ]"
                      @update="phoneEvent = $event"
                      />
                      <v-btn
                        class="text-none text-subtitle-1 text-white w-100 mt-3"
                        color="#F0882D"
                        variant="flat"
                        @click="saveMobile()"
                      >
                        Save
                      </v-btn>
                    </div>
                    <v-alert
                      class="my-2"
                      v-model="isMobileChanged"
                      type="success"
                      :text="successMessage"
                    ></v-alert>
                  </v-col>
                  <v-col cols="6">
                    <label>Password </label>
                    <div
                      class="d-flex align-center mt-2 py-0 back-grey"
                      style="border: 1px solid #ced4da; border-radius: 0.25rem"
                    >
                      <input
                        v-model="input.password"
                        type="password"
                        required
                        disabled
                        class="form-control"
                        :class="{ 'w-66 mr-3': !input.password }"
                        style="border: none"
                        placeholder="Enter Password"
                        maxlength="8"
                      />
                      <span
                        v-if="!isLoading"
                        class="text-blue-darken-4 mx-2 text-right"
                        style="cursor: pointer"
                        @click="isChangePassword = !isChangePassword"
                      >
                        {{ input.password ? "Change" : "Create New" }}
                      </span>
                    </div>
                    <div v-if="isChangePassword">
                      <div
                        class="d-flex align-center mt-4 py-0"
                        style="
                          border: 1px solid #ced4da;
                          border-radius: 0.25rem;
                        "
                      >
                        <input
                          v-model="input.passwordNew"
                          :type="!showPassword1 ? 'password' : 'text'"
                          required
                          class="form-control"
                          style="border: none"
                          placeholder="Enter Password"
                          maxlength="8"
                        />
                        <span
                          class="toggle-password mr-4 ml-2 mdi"
                          :class="{
                            'mdi-eye': showPassword1,
                            'mdi-eye-off': !showPassword1,
                          }"
                          style="cursor: pointer; font-size: 26px"
                          @click="showPassword1 = !showPassword1"
                        >
                        </span>
                      </div>
                      <h6
                        v-if="isPassword1 == false"
                        class="w-100 text-red mb-2"
                      >
                        Password must be 8 characters
                      </h6>
                      <template v-if="input.password">
                        <div
                          class="d-flex align-center mt-4 py-0"
                          style="
                            border: 1px solid #ced4da;
                            border-radius: 0.25rem;
                          "
                        >
                          <input
                            v-model="input.passwordConfirm"
                            :type="!showPassword2 ? 'password' : 'text'"
                            required
                            class="form-control"
                            style="border: none"
                            placeholder="Re-enter Password"
                            maxlength="8"
                          />
                          <span
                            class="toggle-password mr-4 ml-2 mdi"
                            :class="{
                              'mdi-eye': showPassword2,
                              'mdi-eye-off': !showPassword2,
                            }"
                            style="cursor: pointer; font-size: 26px"
                            @click="showPassword2 = !showPassword2"
                          >
                          </span>
                        </div>
                        <h6
                          v-if="isPassword2 == false"
                          class="w-100 text-red mb-2"
                        >
                          {{ password2Mes }}
                        </h6>
                      </template>
                      <v-btn
                        class="text-none text-subtitle-1"
                        :class="{ 'mt-4': isPassword2, 'mt-n2': !isPassword2 }"
                        color="success"
                        variant="flat"
                        @click="changePassword()"
                      >
                        Save Changes
                      </v-btn>
                    </div>

                    <v-alert
                      class="my-2"
                      v-model="isPasswordChanged"
                      type="success"
                      :text="successMessage"
                    ></v-alert>
                  </v-col>
                </v-row>
                
                <!-- <hr class="my-4" /> -->
              </v-container>
              <v-container>
                <div
                style="border-top: 1px solid rgb(189, 189, 189)"
                  class="d-flex w-100 justify-space-between align-center mt-4 pt-4 mb-4 "
                >
                  <p class="title-card">Where are you now . ?</p>
                  <v-btn
                    class="text-none text-subtitle-1"
                    color="success"
                    size="large"
                    variant="flat"
                    @click="saveLocation()"
                  >
                    Save Changes
                  </v-btn>
                </div>

                <v-row>
                  <v-col cols="6">
                    <!-- <VueMultiselect
                      v-model="input.country"
                      class="mt-2"
                      :options="resource.country"
                      placeholder="Current Country"
                    /> -->
                    <!-- <div class="location-input">
                      <v-autocomplete
                        v-model="input.country"
                        :items="resource.country"
                        variant="outlined"
                        label="Current Country"
                        clearable
                        class="mt-n1"
                        density="compact"
                        :rules="rules.countryRules"
                      />
                    </div> -->
                    <div class="w-100 d-flex align-center">
                      <div
                        v-if="input.country"
                        style="
                          border-top: 2px solid rgb(239, 239, 239);
                          border-bottom: 2px solid rgb(239, 239, 239);
                          border-left: 2px solid rgb(239, 239, 239);
                          border-radius: 5px 0 0px 5px;
                          height: 47px;
                        "
                        class="d-flex align-center justify-center"
                      >
                        <span
                          class="fi ml-2 pr-4 mr-4"
                          :class="['fi-' + input.country.toLowerCase()]"
                        />
                      </div>
                      <MazSelect
                        v-slot="{ option }"
                        v-model="input.country"
                        item-height="40"
                        :options="options"
                        search
                        size="md"
                        class="w-100"
                        search-placeholder="Search in country"
                        :class="{ 'ml-n1': input.country }"
                      >
                        <div
                          class="flex items-center"
                          style="
                            padding-top: 0.5rem;
                            padding-bottom: 0.5rem;
                            width: 100%;
                            gap: 1rem;
                          "
                        >
                          <span
                            class="fi"
                            :class="['fi-' + option.value.toLowerCase()]"
                          />
                          <span class="pl-2">
                            {{ option.label }}
                          </span>
                        </div>
                      </MazSelect>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <!-- <VueMultiselect
                      v-model="input.city"
                      :options="resource.city"
                      placeholder="Current City"
                    /> -->
                    <div class="location-input">
                      <v-combobox
                        v-model="input.city"
                        :items="resource.city"
                        variant="outlined"
                        label="Select City"
                        clearable
                        class="mt-n1"
                        density="compact"
                        :rules="rules.cityRules"
                      />
                    </div>
                  </v-col>
                </v-row>
                <v-row class="mb-n8 pb-2">
                  <v-col cols="6">
                    <!-- <VueMultiselect
                      v-model="input.town"
                      class="mt-2"
                      :options="resource.town"
                      placeholder="Current Town"
                    /> -->
                    <div class="location-input">
                      <v-combobox
                        v-model="input.town"
                        :items="resource.town"
                        variant="outlined"
                        label="Select Town (Optional)"
                        clearable
                        class="mt-n1"
                        density="compact"
                      />
                    </div>
                  </v-col>
                </v-row>
                <hr class="mt-8" />
              </v-container>
              <!-- <v-container>
                <div
                  class="d-flex w-100 justify-space-between align-center mb-4 mt-n4"
                >
                  <p class="title-card">Nearest Mall</p>
                  <v-btn
                    class="text-none text-subtitle-1"
                    color="success"
                    size="large"
                    variant="flat"
                  >
                    Save Changes
                  </v-btn>
                </div>
                <v-row
                  style="border-bottom: 1px solid rgb(189, 189, 189)"
                  class="mb-2 pb-2"
                >
                  <v-col cols="6">
                    <VueMultiselect
                      v-model="input.nearest"
                      class="mt-2"
                      :options="resource.nearest"
                      placeholder="Select Nearest Mall"
                    />
                  </v-col>
                </v-row>
              </v-container>
              <v-container>
                <div
                  class="d-flex w-100 justify-space-between align-center mb-4 mt-n4"
                >
                  <p class="title-card">Favorite Malls</p>
                  <v-spacer />
                </div>
                <v-row>
                  <v-col cols="4">
                    <VueMultiselect
                      v-model="input.favorite1"
                      class="mt-2"
                      :options="resource.favorite"
                      placeholder="Select Mall"
                    />
                  </v-col>
                  <v-col cols="4">
                    <VueMultiselect
                      v-model="input.favorite2"
                      class="mt-2"
                      :options="resource.favorite"
                      placeholder="Select Mall"
                    />
                  </v-col>
                  <v-col cols="4">
                    <VueMultiselect
                      v-model="input.favorite3"
                      class="mt-2"
                      :options="resource.favorite"
                      placeholder="Select Mall"
                    />
                  </v-col>
                </v-row>
              </v-container> -->
            </v-card-text>
          </v-card>
        </div>
      </template>
      <template v-if="isSmall">
        <div class="mobile-container pb-16">
          <input
            ref="filePickerField"
            type="file"
            accept="image/*"
            hidden
            @change="launchCropper"
          />
          <div class="image-container d-flex justify-center w-100 w-100 mb-8">
            <!-- <v-img
                    style="width: 100%; height: 100%; border-radius: 20px"
                    :src="
                      image_path != ''
                        ? image_path
                        : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                    "
                  /> -->
            <div>
              <div
                style="width: 170px; height: 120px; border-radius: 20px"
                class="mt-5"
              >
                <v-img
                  style="width: 100%; height: 100%; border-radius: 20px"
                  cover
                  :src="
                    image_path
                      ? image_path
                      : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                  "
                />
              </div>
              <div
                class="mt-4 d-flex align-center"
                :class="{
                  'justify-space-between': image_path,
                  'justify-center': !image_path,
                }"
              >
                <v-btn
                  size="small"
                  color="blue"
                  variant="outlined"
                  @click="$refs.filePickerField.click()"
                  :disabled="image_path"
                >
                  {{ !isSaveImage ? "Upload Picture" : "Saving Image" }}
                </v-btn>
                <v-icon
                  v-if="image_path"
                  @click="deleteImage()"
                  color="red"
                  icon="mdi-trash-can-outline"
                >
                </v-icon>
              </div>
              <!-- <image-cropper-dialog
                ref="cropperDialog"
                :chosen-image="image"
                @onReset="$refs.filePickerField.value = null"
                @onCrop="
                  (croppedImage) => {
                    image_path = croppedImage;
                  }
                "
              /> -->
            </div>
          </div>
          <h1 class="text-center text-red-accent-4">{{skill}}</h1>
          <!-- <div v-if="(isHome && !tokenStart) || isSpecific" class="my-slide d-flex"> -->
          <v-slide-group class="my-6" v-model="activeResume">
            <v-slide-group-item
              v-for="(btn, i) in itemsResume"
              :key="i"
            >
              <!-- v-slot="{ isSelected }" -->
              <v-btn
                class="sub-menu-btn"
                :class="{
                  active: activeResume == btn,
                }"
                @click="activeResume = btn"
                style="box-shadow: 0 5px 25px rgba(0, 0, 0, 0)"
              >
                <p class="text-blue-accent-4" style="font-size: 12px" elevation>
                  {{ btn }}
                </p>
              </v-btn>
            </v-slide-group-item>
          </v-slide-group>
          <!-- </div> -->
          
        <template v-if="activeResume == 'Personal Info'">
          <div
          style="background: #F7F7F7"
            class="d-flex w-100 py-1 px-2 my-6 justify-space-between align-center"
          >
            <p class="title-card">Personal Information</p>
            <v-btn
                  class="text-none text-subtitle-1"
                  color="success"
                  size="large"
                  variant="flat"
                  @click="saveData()"
                >
                  Save Changes
                </v-btn>
          </div>
          <v-row>
            <v-col>
              <label>Name</label>
              <input
                v-model="input.name"
                type="text"
                required
                class="form-control mt-2"
                placeholder="Enter Your Full Name"
              />
            </v-col>
          </v-row>
          <v-row>
          <v-col cols="8">
            <v-radio-group
              v-model="input.gender2"
              :rules="rules.genderRules"
              inline
              class="ml-n4"
              style="font-size: 12px !important"
            >
              <v-radio
                style="font-size: 10px !important"
                label="Male"
                value="M"
              />
              <v-radio
                style="font-size: 10px !important"
                label="Female"
                value="F"
              />
            </v-radio-group>
          </v-col>
          </v-row>
          <v-row class="mt-n10">
            <v-col cols="8">
              <label
                >Date of Birth</label
              >
              <div class="d-flex align-center mt-2"> <input
                v-model="input.date"
                required
                class="form-control w-66"
                type="text"
                id="dateInput"
                placeholder="DD/MM/YYYY"
                @input="onDateInput"
              /> 
              <span class="font-weight-bold ml-2 w-33">({{ age }} Years)</span>
            </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label
                >Email
                <span
                  :class="{
                    'text-red': !isEmailVerified,
                    'text-green': isEmailVerified,
                  }"
                  >{{ isEmailVerified ? "(Verified)" : "(Not Verified)" }}</span
                ></label
              >
              <div
                class="d-flex align-center mt-2 py-0 back-grey"
                style="border: 1px solid #ced4da; border-radius: 0.25rem"
              >
                <input
                  v-model="input.email"
                  type="email"
                  disabled
                  class="form-control"
                  style="border: none"
                  placeholder="Enter Email"
                />
                <span
                  class="text-blue-darken-4 mx-2"
                  style="cursor: pointer"
                  @click="isChangeEmail = !isChangeEmail"
                >
                  Change
                </span>
              </div>
              <div v-if="isChangeEmail">
                <input
                  v-model="input.emailNew"
                  type="email"
                  class="form-control mt-4"
                  placeholder="Enter Email"
                />
                <v-btn
                  class="text-none text-subtitle-1 mt-4"
                  color="success"
                  variant="flat"
                  @click="saveEmail()"
                >
                  Save Changes
                </v-btn>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label
                >Mobile #
                <span
                  :class="{
                    'text-red': !isPhoneVerified,
                    'text-green': isPhoneVerified,
                  }"
                  >{{ isPhoneVerified ? "(Verified)" : "(Not Verified)" }}</span
                ></label
              >
              <div
                class="d-flex align-center mt-2 py-0 back-grey"
                style="border: 1px solid #ced4da; border-radius: 0.25rem"
              >
                <input
                  v-model="input.phone"
                  type="text"
                  required
                  disabled
                  class="form-control"
                  style="border: none"
                  placeholder="Phone Number"
                />
                <span
                  class="text-blue-darken-4 mx-2"
                  style="cursor: pointer"
                  @click="isChangePhone = !isChangePhone"
                >
                  Change
                </span>
              </div>
              <div v-if="isChangePhone" class="mt-2">
                <MazPhoneNumberInput
                  v-model="input.phoneNew"
                  show-code-on-list
                      color="info"
                      :default-country-code="country ? country : 'SG'"
                      :preferred-countries="[
                        'SG',
                        'BD',
                        'IN',
                        'MY',
                        'GB',
                        'PH',
                      ]"
                      @update="phoneEvent2 = $event"
                />
                <v-btn
                  class="text-none text-subtitle-1 text-white w-100 mt-3"
                  color="#F0882D"
                  variant="flat"
                  @click="saveMobile()"
                >
                  Save
                </v-btn>
              </div>
              <v-alert
                class="my-2"
                v-model="isMobileChanged"
                type="success"
                :text="successMessage"
              ></v-alert>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label
                >What's App
                <span
                  :class="{
                    'text-red': !isWhatsappVerified,
                    'text-green': isWhatsappVerified,
                  }"
                  >{{ isWhatsappVerified ? "(Verified)" : "(Not Verified)" }}</span
                ></label
              >
              <div
                class="d-flex align-center mt-2 py-0 back-grey"
                style="border: 1px solid #ced4da; border-radius: 0.25rem"
              >
                <input
                  v-model="input.whatsapp"
                  type="text"
                  required
                  disabled
                  class="form-control"
                  style="border: none"
                  placeholder="Phone Number"
                />
                <span
                  class="text-blue-darken-4 mx-2"
                  style="cursor: pointer"
                  @click="isChangeWhatsapp = !isChangeWhatsapp"
                >
                  Change
                </span>
              </div>
              <div v-if="isChangeWhatsapp" class="mt-2">
                <MazPhoneNumberInput
                  v-model="input.whatsappNew"
                  show-code-on-list
                      color="info"
                      :default-country-code="country ? country : 'SG'"
                      :preferred-countries="[
                        'SG',
                        'BD',
                        'IN',
                        'MY',
                        'GB',
                        'PH',
                      ]"
                      @update="phoneEvent3 = $event"
                />
                <v-btn
                  class="text-none text-subtitle-1 text-white w-100 mt-3"
                  color="#F0882D"
                  variant="flat"
                  @click="saveWhatsapp()"
                >
                  Save
                </v-btn>
              </div>
              <v-alert
                class="my-2"
                v-model="isWhatsappChanged"
                type="success"
                :text="successMessage"
              ></v-alert>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label>Nationality</label>
              <VueMultiselect
                v-model="input.nationality"
                @select="onInputNationality()"
                class="mt-2"
                :options="resource.nationality"
                track-by="id"
                label="title"
                placeholder="Select Nationality"
              />
              <!-- <v-select
                v-model="input.nationality"
                :items="resource.nationality"
                placeholder="Select Nationality"
                variant="outlined"
                clearable
                class="mt-2"
                density="compact"
                :rules="rules.nationalityRules"
              /> -->
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <label>Marital Status</label>
              <VueMultiselect
                v-model="input.marital"
                class="mt-2"
                :options="resource.marital"
                track-by="value"
                label="title"
                placeholder="Select Marital Status"
              />
            </v-col>
          </v-row>
          <v-row class="mb-16 pb-16">
            <v-col>
              <label>Which Country were you Born. ?</label>

              <div class="w-100 d-flex align-center">
                <div
                  v-if="input.born"
                  style="
                    border-top: 2px solid rgb(239, 239, 239);
                    border-bottom: 2px solid rgb(239, 239, 239);
                    border-left: 2px solid rgb(239, 239, 239);
                    border-radius: 5px 0 0px 5px;
                    height: 47px;
                  "
                  class="d-flex align-center justify-center"
                >
                  <span
                    class="fi ml-2 pr-4 mr-4"
                    :class="['fi-' + input.born.toLowerCase()]"
                  />
                </div>
                <MazSelect
                  v-slot="{ option }"
                  v-model="input.born"
                  item-height="40"
                  :options="options"
                  search
                  size="md"
                  class="w-100"
                  search-placeholder="Search in country"
                  :class="{ 'ml-n1': input.born }"
                >
                  <div
                    class="flex items-center"
                    style="
                      padding-top: 0.5rem;
                      padding-bottom: 0.5rem;
                      width: 100%;
                      gap: 1rem;
                    "
                  >
                    <span
                      class="fi"
                      :class="['fi-' + option.value.toLowerCase()]"
                    />
                    <span class="pl-2">
                      {{ option.label }}
                    </span>
                  </div>
                </MazSelect>
              </div>
              <!-- <select v-model="input.nationality" class="form-control mt-2">
                <option disabled value="">--- Select ---</option>
                <option
                  v-for="nation in resource.nationality"
                  :key="nation"
                  :value="nation"
                >
                  {{ nation }}
                </option>
              </select> -->
            </v-col>
          </v-row>
          
        </template>
        <template v-if="activeResume == 'Current Location'">
          <div
          style="background: #F7F7F7"
            class="d-flex w-100 py-1 px-2 my-6 justify-space-between align-center"
          >
            <p class="title-card">Current Location</p>
            <v-btn
                  class="text-none text-subtitle-1"
                  color="success"
                  size="large"
                  variant="flat"
                  @click="saveLocation()"
                >
                  Save Changes
                </v-btn>
          </div>
            <v-row>
              <v-col cols="10">
                <!-- <VueMultiselect
                  v-model="input.country"
                  class="mt-2"
                  :options="resource.country"
                  placeholder="Current Country"
                /> -->
                <!-- <div class="location-input">
                  <v-autocomplete
                    v-model="input.country"
                    :items="resource.country"
                    variant="outlined"
                    label="Current Country"
                    clearable
                    class="mt-n1"
                    density="compact"
                    :rules="rules.countryRules"
                  />
                </div> -->
                <div class="w-100 d-flex align-center">
                  <div
                    v-if="input.country"
                    style="
                      border-top: 2px solid rgb(239, 239, 239);
                      border-bottom: 2px solid rgb(239, 239, 239);
                      border-left: 2px solid rgb(239, 239, 239);
                      border-radius: 5px 0 0px 5px;
                      height: 47px;
                    "
                    class="d-flex align-center justify-center"
                  >
                    <span
                      class="fi ml-2 pr-4 mr-4"
                      :class="['fi-' + input.country.toLowerCase()]"
                    />
                  </div>
                  <MazSelect
                    v-slot="{ option }"
                    v-model="input.country"
                    item-height="40"
                    :options="options"
                    search
                    size="md"
                    class="w-100"
                    search-placeholder="Search in country"
                    :class="{ 'ml-n1': input.country }"
                  >
                    <div
                      class="flex items-center"
                      style="
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                        width: 100%;
                        gap: 1rem;
                      "
                    >
                      <span
                        class="fi"
                        :class="['fi-' + option.value.toLowerCase()]"
                      />
                      <span class="pl-2">
                        {{ option.label }}
                      </span>
                    </div>
                  </MazSelect>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="10">
                <!-- <VueMultiselect
                  v-model="input.city"
                  :options="resource.city"
                  placeholder="Current City"
                /> -->
                <div class="location-input">
                  <v-combobox
                    v-model="input.city"
                    :items="resource.city"
                    variant="outlined"
                    label="Select City"
                    clearable
                    class="mt-n1"
                    density="compact"
                    :rules="rules.cityRules"
                  />
                </div>
              </v-col>
            </v-row>
            <v-row class="mb-8 pb-2">
              <v-col cols="10">
                <!-- <VueMultiselect
                  v-model="input.town"
                  class="mt-2"
                  :options="resource.town"
                  placeholder="Current Town"
                /> -->
                <div class="location-input">
                  <v-combobox
                    v-model="input.town"
                    :items="resource.town"
                    variant="outlined"
                    label="Select Town (Optional)"
                    clearable
                    class="mt-n1"
                    density="compact"
                  />
                </div>
              </v-col>
            </v-row>
        </template>
        <template v-if="activeResume == 'My Qualifications'">
          <div
          style="background: #F7F7F7"
            class="w-100 pt-2 pb-8 px-4 my-6"
          >
            <p class="title-card text-red-darken-4 mb-4">My Qualifications</p>
            <v-card  elevation="0" class="pa-4">
              <div class="d-flex justify-space-between mb-2">
                <span class="text-blue-darken-4"># 1</span>
                <span @click="isMyQualification = true" style="cursor: pointer;" class="text-blue-darken-4">Edit</span>
              </div>
              <p>{{qualificationData.qualification}}</p>
              <p>{{qualificationData.university + ', '+qualificationData.qualificationCountry}}</p>
              <p>Year Passed : <span class="text-blue-darken-4">{{qualificationData.year}}</span></p>
            </v-card>
          </div>
        </template>
        <template v-if="activeResume == 'My Employment'">
          <div
          style="background: #F7F7F7"
            class="w-100 pt-2 pb-8 px-4 my-6"
          >
            <p class="title-card text-red-darken-4 mb-4">My Employment</p>
            <v-card  elevation="0" class="pa-4">
              <div class="d-flex justify-space-between mb-2">
                <span class="text-blue-darken-4"># 1</span>
                <span @click="isMyEmployment = true" style="cursor: pointer;" class="text-blue-darken-4">Edit</span>
              </div>
              <p class="text-blue-darken-4">{{employmentData.position}}</p>
              <p >{{employmentData.name}}</p>
              <p >{{employmentData.country}}</p>
              <p >{{employmentData.start}}</p>
              <p >{{employmentData.end}}</p>
            </v-card>
          </div>
        </template>
        <div class="w-100" style="background: #F3F3F3; position: fixed; bottom: 0; left: 0; z-index: 99999">
          <v-container
            class="d-flex justify-center align-center"
          >
            <v-btn
              class="text-none text-subtitle-1"
              color="#0197D4"
              size="large"
              variant="flat"
            >
             <span class="text-white">View Full Profile</span>
            </v-btn>
          </v-container>
        </div>
        </div>
      </template>
      <div class="crop-image-dialog">
        <v-dialog v-model="showCropper" max-width="500" persistent>
          <v-card class="pt-6 pb-3">
            <v-card-text class="pb-3">
              <vue-cropper
                ref="cropper"
                class="image-container"
                :aspect-ratio="1 / 1"
                :guides="true"
                :background="false"
                :view-mode="3"
                drag-mode="move"
                :src="image"
                alt="Image not available"
              />
            </v-card-text>
            <v-card-actions class="py-0 mx-10">
              <v-btn text color="red" @click="resetCropper"> Cancel </v-btn>
              <v-spacer />
              <v-btn text color="blue" @click="cropChosenImage"> Crop </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <v-snackbar
        v-model="isSuccess"
        location="top"
        color="green"
        :timeout="3000"
      >
        {{ successMessage }}

        <template #actions>
          <v-btn color="white" variant="text" @click="isSuccess = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
      <v-snackbar v-model="isError" location="top" color="red" :timeout="3000">
        {{ errorMessage }}

        <template #actions>
          <v-btn color="white" variant="text" @click="isError = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
    <div v-if="!isLoading && isMyQualification" >
      <AdditionalData @backStep="backStep" />
    </div>
    <div v-if="!isLoading && isMyEmployment" >
      <AdditionalData2 @backStep="backStep" />
    </div>
    <input
      ref="fileuploadinput"
      style="display: none; filter: alpha(opacity=0)"
      type="file"
      accept="image/png, image/jpeg"
      @change="onFileChangeInput"
    />
  </div>
</template>

<script>
// import VueAvatarCropper from "vue-avatar-cropper";
import VueMultiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import app from "@/util/eventBus";
// import ImageCropperDialog from "../components/ImageCropperDialog.vue";
import axios from "@/util/axios";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import MazSelect from "maz-ui/components/MazSelect";
import AdditionalData from '@/components/MyQualifications/AdditionalData.vue'
import AdditionalData2 from '@/components/MyEmployment/AdditionalData.vue'
export default {
  components: {
    VueMultiselect,
    MazPhoneNumberInput,
    // ImageCropperDialog,
    MazSelect,
    AdditionalData,
    AdditionalData2,
    VueCropper,
  },
  data() {
    return {
      options: [
  { phoneNum: "+65", value: "SG", label: "Singapore" },
  { phoneNum: "+880", value: "BD", label: "Bangladesh" },
  { phoneNum: "+91", value: "IN", label: "India" },
  { phoneNum: "+60", value: "MY", label: "Malaysia" },
  { phoneNum: "+44", value: "GB", label: "United Kingdom" },
  { phoneNum: "+63", value: "PH", label: "Philippines" },
  { phoneNum: "+93", value: "AF", label: "Afghanistan" },
  { phoneNum: "+358", value: "AX", label: "Aland Islands" },
  { phoneNum: "+355", value: "AL", label: "Albania" },
  { phoneNum: "+213", value: "DZ", label: "Algeria" },
  { phoneNum: "+1", value: "AS", label: "American Samoa" },
  { phoneNum: "+376", value: "AD", label: "Andorra" },
  { phoneNum: "+244", value: "AO", label: "Angola" },
  { phoneNum: "+1", value: "AI", label: "Anguilla" },
  { phoneNum: "+672", value: "AQ", label: "Antarctica" },
  { phoneNum: "+1", value: "AG", label: "Antigua And Barbuda" },
  { phoneNum: "+54", value: "AR", label: "Argentina" },
  { phoneNum: "+374", value: "AM", label: "Armenia" },
  { phoneNum: "+297", value: "AW", label: "Aruba" },
  { phoneNum: "+61", value: "AU", label: "Australia" },
  { phoneNum: "+43", value: "AT", label: "Austria" },
  { phoneNum: "+994", value: "AZ", label: "Azerbaijan" },
  { phoneNum: "+1", value: "BS", label: "Bahamas" },
  { phoneNum: "+973", value: "BH", label: "Bahrain" },
  { phoneNum: "+1", value: "BB", label: "Barbados" },
  { phoneNum: "+375", value: "BY", label: "Belarus" },
  { phoneNum: "+32", value: "BE", label: "Belgium" },
  { phoneNum: "+501", value: "BZ", label: "Belize" },
  { phoneNum: "+229", value: "BJ", label: "Benin" },
  { phoneNum: "+1", value: "BM", label: "Bermuda" },
  { phoneNum: "+975", value: "BT", label: "Bhutan" },
  { phoneNum: "+591", value: "BO", label: "Bolivia" },
  { phoneNum: "+387", value: "BA", label: "Bosnia And Herzegovina" },
  { phoneNum: "+267", value: "BW", label: "Botswana" },
  { phoneNum: "N/A", value: "BV", label: "Bouvet Island" },
  { phoneNum: "+55", value: "BR", label: "Brazil" },
  { phoneNum: "N/A", value: "IO", label: "British Indian Ocean Territory" },
  { phoneNum: "+673", value: "BN", label: "Brunei Darussalam" },
  { phoneNum: "+359", value: "BG", label: "Bulgaria" },
  { phoneNum: "+226", value: "BF", label: "Burkina Faso" },
  { phoneNum: "+257", value: "BI", label: "Burundi" },
  { phoneNum: "+855", value: "KH", label: "Cambodia" },
  { phoneNum: "+237", value: "CM", label: "Cameroon" },
  { phoneNum: "+1", value: "CA", label: "Canada" },
  { phoneNum: "+238", value: "CV", label: "Cape Verde" },
  { phoneNum: "+1", value: "KY", label: "Cayman Islands" },
  { phoneNum: "+236", value: "CF", label: "Central African Republic" },
  { phoneNum: "+235", value: "TD", label: "Chad" },
  { phoneNum: "+56", value: "CL", label: "Chile" },
  { phoneNum: "+86", value: "CN", label: "China" },
  { phoneNum: "+61", value: "CX", label: "Christmas Island" },
  { phoneNum: "+61", value: "CC", label: "Cocos (Keeling) Islands" },
  { phoneNum: "+57", value: "CO", label: "Colombia" },
  { phoneNum: "+269", value: "KM", label: "Comoros" },
  { phoneNum: "+242", value: "CG", label: "Congo" },
  { phoneNum: "+243", value: "CD", label: "Congo, Democratic Republic" },
  { phoneNum: "+682", value: "CK", label: "Cook Islands" },
  { phoneNum: "+506", value: "CR", label: "Costa Rica" },
  { phoneNum: "+225", value: "CI", label: "Cote D'Ivoire" },
  { phoneNum: "+385", value: "HR", label: "Croatia" },
  { phoneNum: "+53", value: "CU", label: "Cuba" },
  { phoneNum: "+357", value: "CY", label: "Cyprus" },
  { phoneNum: "+420", value: "CZ", label: "Czech Republic" },
  { phoneNum: "+45", value: "DK", label: "Denmark" },
  { phoneNum: "+253", value: "DJ", label: "Djibouti" },
  { phoneNum: "+1", value: "DM", label: "Dominica" },
  { phoneNum: "+1", value: "DO", label: "Dominican Republic" },
  { phoneNum: "+593", value: "EC", label: "Ecuador" },
  { phoneNum: "+20", value: "EG", label: "Egypt" },
  { phoneNum: "+503", value: "SV", label: "El Salvador" },
  { phoneNum: "+240", value: "GQ", label: "Equatorial Guinea" },
  { phoneNum: "+291", value: "ER", label: "Eritrea" },
  { phoneNum: "+372", value: "EE", label: "Estonia" },
  { phoneNum: "+251", value: "ET", label: "Ethiopia" },
  { phoneNum: "+500", value: "FK", label: "Falkland Islands (Malvinas)" },
  { phoneNum: "+298", value: "FO", label: "Faroe Islands" },
  { phoneNum: "+679", value: "FJ", label: "Fiji" },
  { phoneNum: "+358", value: "FI", label: "Finland" },
  { phoneNum: "+33", value: "FR", label: "France" },
  { phoneNum: "+594", value: "GF", label: "French Guiana" },
  { phoneNum: "+689", value: "PF", label: "French Polynesia" },
  { phoneNum: "N/A", value: "TF", label: "French Southern Territories" },
  { phoneNum: "+241", value: "GA", label: "Gabon" },
  { phoneNum: "+220", value: "GM", label: "Gambia" },
  { phoneNum: "+995", value: "GE", label: "Georgia" },
  { phoneNum: "+49", value: "DE", label: "Germany" },
  { phoneNum: "+233", value: "GH", label: "Ghana" },
  { phoneNum: "+350", value: "GI", label: "Gibraltar" },
  { phoneNum: "+30", value: "GR", label: "Greece" },
  { phoneNum: "+299", value: "GL", label: "Greenland" },
  { phoneNum: "+1", value: "GD", label: "Grenada" },
  { phoneNum: "+590", value: "GP", label: "Guadeloupe" },
  { phoneNum: "+1", value: "GU", label: "Guam" },
  { phoneNum: "+502", value: "GT", label: "Guatemala" },
  { phoneNum: "+44", value: "GG", label: "Guernsey" },
  { phoneNum: "+224", value: "GN", label: "Guinea" },
  { phoneNum: "+245", value: "GW", label: "Guinea-Bissau" },
  { phoneNum: "+592", value: "GY", label: "Guyana" },
  { phoneNum: "+509", value: "HT", label: "Haiti" },
  { phoneNum: "N/A", value: "HM", label: "Heard Island & Mcdonald Islands" },
  { phoneNum: "+39", value: "VA", label: "Holy See (Vatican City State)" },
  { phoneNum: "+504", value: "HN", label: "Honduras" },
  { phoneNum: "+852", value: "HK", label: "Hong Kong" },
  { phoneNum: "+36", value: "HU", label: "Hungary" },
  { phoneNum: "+354", value: "IS", label: "Iceland" },
  { phoneNum: "+62", value: "ID", label: "Indonesia" },
  { phoneNum: "+98", value: "IR", label: "Iran, Islamic Republic Of" },
  { phoneNum: "+964", value: "IQ", label: "Iraq" },
  { phoneNum: "+353", value: "IE", label: "Ireland" },
  { phoneNum: "+44", value: "IM", label: "Isle Of Man" },
  { phoneNum: "+972", value: "IL", label: "Israel" },
  { phoneNum: "+39", value: "IT", label: "Italy" },
  { phoneNum: "+1", value: "JM", label: "Jamaica" },
  { phoneNum: "+81", value: "JP", label: "Japan" },
  { phoneNum: "+44", value: "JE", label: "Jersey" },
  { phoneNum: "+962", value: "JO", label: "Jordan" },
  { phoneNum: "+7", value: "KZ", label: "Kazakhstan" },
  { phoneNum: "+254", value: "KE", label: "Kenya" },
  { phoneNum: "+686", value: "KI", label: "Kiribati" },
  { phoneNum: "+82", value: "KR", label: "Korea" },
  { phoneNum: "+965", value: "KW", label: "Kuwait" },
  { phoneNum: "+996", value: "KG", label: "Kyrgyzstan" },
  { phoneNum: "+856", value: "LA", label: "Lao People's Democratic Republic" },
  { phoneNum: "+371", value: "LV", label: "Latvia" },
  { phoneNum: "+961", value: "LB", label: "Lebanon" },
  { phoneNum: "+266", value: "LS", label: "Lesotho" },
  { phoneNum: "+231", value: "LR", label: "Liberia" },
  { phoneNum: "+218", value: "LY", label: "Libyan Arab Jamahiriya" },
  { phoneNum: "+423", value: "LI", label: "Liechtenstein" },
  { phoneNum: "+370", value: "LT", label: "Lithuania" },
  { phoneNum: "+352", value: "LU", label: "Luxembourg" },
  { phoneNum: "+853", value: "MO", label: "Macao" },
  { phoneNum: "+389", value: "MK", label: "Macedonia" },
  { phoneNum: "+261", value: "MG", label: "Madagascar" },
  { phoneNum: "+265", value: "MW", label: "Malawi" },
  { phoneNum: "+960", value: "MV", label: "Maldives" },
  { phoneNum: "+223", value: "ML", label: "Mali" },
  { phoneNum: "+356", value: "MT", label: "Malta" },
  { phoneNum: "+692", value: "MH", label: "Marshall Islands" },
  { phoneNum: "+596", value: "MQ", label: "Martinique" },
  { phoneNum: "+222", value: "MR", label: "Mauritania" },
  { phoneNum: "+230", value: "MU", label: "Mauritius" },
  { phoneNum: "+262", value: "YT", label: "Mayotte" },
  { phoneNum: "+52", value: "MX", label: "Mexico" },
  { phoneNum: "+691", value: "FM", label: "Micronesia, Federated States Of" },
  { phoneNum: "+373", value: "MD", label: "Moldova" },
  { phoneNum: "+377", value: "MC", label: "Monaco" },
  { phoneNum: "+976", value: "MN", label: "Mongolia" },
  { phoneNum: "+382", value: "ME", label: "Montenegro" },
  { phoneNum: "+1", value: "MS", label: "Montserrat" },
  { phoneNum: "+212", value: "MA", label: "Morocco" },
  { phoneNum: "+258", value: "MZ", label: "Mozambique" },
  { phoneNum: "+95", value: "MM", label: "Myanmar" },
  { phoneNum: "+264", value: "NA", label: "Namibia" },
  { phoneNum: "+674", value: "NR", label: "Nauru" },
  { phoneNum: "+977", value: "NP", label: "Nepal" },
  { phoneNum: "+31", value: "NL", label: "Netherlands" },
  { phoneNum: "N/A", value: "AN", label: "Netherlands Antilles" },
  { phoneNum: "N/A", value: "NC", label: "New Caledonia" },
  { phoneNum: "+64", value: "NZ", label: "New Zealand" },
  { phoneNum: "+505", value: "NI", label: "Nicaragua" },
  { phoneNum: "+227", value: "NE", label: "Niger" },
  { phoneNum: "+234", value: "NG", label: "Nigeria" },
  { phoneNum: "+683", value: "NU", label: "Niue" },
  { phoneNum: "+672", value: "NF", label: "Norfolk Island" },
  { phoneNum: "+1", value: "MP", label: "Northern Mariana Islands" },
  { phoneNum: "+47", value: "NO", label: "Norway" },
  { phoneNum: "+968", value: "OM", label: "Oman" },
  { phoneNum: "+92", value: "PK", label: "Pakistan" },
  { phoneNum: "+680", value: "PW", label: "Palau" },
  { phoneNum: "N/A", value: "PS", label: "Palestinian Territory, Occupied" },
  { phoneNum: "+507", value: "PA", label: "Panama" },
  { phoneNum: "+675", value: "PG", label: "Papua New Guinea" },
  { phoneNum: "+595", value: "PY", label: "Paraguay" },
  { phoneNum: "+51", value: "PE", label: "Peru" },
  { phoneNum: "+870", value: "PN", label: "Pitcairn" },
  { phoneNum: "+48", value: "PL", label: "Poland" },
  { phoneNum: "+351", value: "PT", label: "Portugal" },
  { phoneNum: "+1", value: "PR", label: "Puerto Rico" },
  { phoneNum: "+974", value: "QA", label: "Qatar" },
  { phoneNum: "+262", value: "RE", label: "Reunion" },
  { phoneNum: "+40", value: "RO", label: "Romania" },
  { phoneNum: "+7", value: "RU", label: "Russian Federation" },
  { phoneNum: "+250", value: "RW", label: "Rwanda" },
  { phoneNum: "N/A", value: "BL", label: "Saint Barthelemy" },
  { phoneNum: "N/A", value: "SH", label: "Saint Helena" },
  { phoneNum: "N/A", value: "KN", label: "Saint Kitts And Nevis" },
  { phoneNum: "N/A", value: "LC", label: "Saint Lucia" },
  { phoneNum: "N/A", value: "MF", label: "Saint Martin" },
  { phoneNum: "N/A", value: "PM", label: "Saint Pierre And Miquelon" },
  { phoneNum: "N/A", value: "VC", label: "Saint Vincent And Grenadines" },
  { phoneNum: "+685", value: "WS", label: "Samoa" },
  { phoneNum: "+378", value: "SM", label: "San Marino" },
  { phoneNum: "+239", value: "ST", label: "Sao Tome And Principe" },
  { phoneNum: "+966", value: "SA", label: "Saudi Arabia" },
  { phoneNum: "+221", value: "SN", label: "Senegal" },
  { phoneNum: "+381", value: "RS", label: "Serbia" },
  { phoneNum: "+248", value: "SC", label: "Seychelles" },
  { phoneNum: "+232", value: "SL", label: "Sierra Leone" },
  { phoneNum: "+65", value: "SG", label: "Singapore" },
  { phoneNum: "+421", value: "SK", label: "Slovakia" },
  { phoneNum: "+386", value: "SI", label: "Slovenia" },
  { phoneNum: "+677", value: "SB", label: "Solomon Islands" },
  { phoneNum: "+252", value: "SO", label: "Somalia" },
  { phoneNum: "+27", value: "ZA", label: "South Africa" },
  { phoneNum: "N/A", value: "GS", label: "South Georgia And Sandwich Isl." },
  { phoneNum: "N/A", value: "ES", label: "Spain" },
  { phoneNum: "+94", value: "LK", label: "Sri Lanka" },
  { phoneNum: "+249", value: "SD", label: "Sudan" },
  { phoneNum: "+597", value: "SR", label: "Suriname" },
  { phoneNum: "+47", value: "SJ", label: "Svalbard And Jan Mayen" },
  { phoneNum: "+268", value: "SZ", label: "Swaziland" },
  { phoneNum: "+46", value: "SE", label: "Sweden" },
  { phoneNum: "+41", value: "CH", label: "Switzerland" },
  { phoneNum: "+963", value: "SY", label: "Syrian Arab Republic" },
  { phoneNum: "+886", value: "TW", label: "Taiwan" },
  { phoneNum: "+992", value: "TJ", label: "Tajikistan" },
  { phoneNum: "+255", value: "TZ", label: "Tanzania" },
  { phoneNum: "+66", value: "TH", label: "Thailand" },
  { phoneNum: "+670", value: "TL", label: "Timor-Leste" },
  { phoneNum: "+228", value: "TG", label: "Togo" },
  { phoneNum: "+690", value: "TK", label: "Tokelau" },
  { phoneNum: "+676", value: "TO", label: "Tonga" },
  { phoneNum: "+1", value: "TT", label: "Trinidad And Tobago" },
  { phoneNum: "+216", value: "TN", label: "Tunisia" },
  { phoneNum: "+90", value: "TR", label: "Turkey" },
  { phoneNum: "+993", value: "TM", label: "Turkmenistan" },
  { phoneNum: "+1", value: "TC", label: "Turks And Caicos Islands" },
  { phoneNum: "+688", value: "TV", label: "Tuvalu" },
  { phoneNum: "+256", value: "UG", label: "Uganda" },
  { phoneNum: "+380", value: "UA", label: "Ukraine" },
  { phoneNum: "+971", value: "AE", label: "United Arab Emirates" },
  { phoneNum: "+44", value: "GB", label: "United Kingdom" },
  { phoneNum: "+1", value: "US", label: "United States" },
  { phoneNum: "N/A", value: "UM", label: "United States Outlying Islands" },
  { phoneNum: "+598", value: "UY", label: "Uruguay" },
  { phoneNum: "+998", value: "UZ", label: "Uzbekistan" },
  { phoneNum: "+678", value: "VU", label: "Vanuatu" },
  { phoneNum: "+58", value: "VE", label: "Venezuela" },
  { phoneNum: "+84", value: "VN", label: "Vietnam" },
  { phoneNum: "+1", value: "VG", label: "Virgin Islands, British" },
  { phoneNum: "+1", value: "VI", label: "Virgin Islands, U.S." },
  { phoneNum: "+681", value: "WF", label: "Wallis And Futuna" },
  { phoneNum: "N/A", value: "EH", label: "Western Sahara" },
  { phoneNum: "+967", value: "YE", label: "Yemen" },
  { phoneNum: "+260", value: "ZM", label: "Zambia" },
  { phoneNum: "+263", value: "ZW", label: "Zimbabwe" }
],
      chosenImage: null,
      showCropper: false,
      imageFileType: null,
      isMyQualification: false,
      isMyEmployment: false,
      isLoading: false,
      screenWidth: window.innerWidth,
      isEmailVerified: false,
      isPhoneVerified: false,
      isWhatsappVerified: false,
      isChangePassword: false,
      isMobileChanged: false,
      isWhatsappChanged: false,
      isPasswordChanged: false,
      isPassword1: true,
      isPassword2: true,
      password2Mes: "",
      phoneEvent: null,
      phoneEvent2: null,
      phoneEvent3: null,
      isSaveImage: false,
      isChangePhone: false,
      isChangeWhatsapp: false,
      isChangeEmail: false,
      showPassword1: false,
      showPassword2: false,
      menuOpen: false,
      isError: false,
      isSuccess: false,
      errorMessage: "",
      successMessage: "",
      image_path: "",
      skill: '',
      image: null,
      imageSend: null,
      activeResume: 'Personal Info',
      itemsResume: ['Personal Info','Current Location', 'My Qualifications', 'My Employment'],
      qualificationData: null,
      employmentData: null,
      input: {
        id: null,
        image_path: "",
        image: null,
        gender: null,
        gender2: null,
        marital: null,
        nationality: null,
        born: null,
        name: "",
        email: "",
        emailNew: "",
        phone: "",
        phoneNew: "",
        whatsapp: "",
        whatsappNew: "",
        password: "",
        passwordNew: "",
        passwordConfirm: "",
        date: null,
        age: "",

        town: null,
        city: null,
        country: null,
        countryOld: null,
        countryName: null,
        countryCode: null,
        bornCountryName: null,
        bornCountryCode: null,
      },
      rules: {
        nameRules: [
          (value) => {
            if (value) return true;
            return "Name is required.";
          },
          (value) => {
            if (value?.length >= 4) return true;
            return "Username must be more than 4 characters.";
          },
          (value) => {
            if (value?.length <= 20) return true;
            return "Username must be less than 20 characters.";
          },
        ],
        emailRules: [
          (value) => {
            if (value) return true;
            return "E-mail is required.";
          },
          (value) => {
            if (/.+@.+\..+/.test(value)) return true;
            return "E-mail must be valid.";
          },
        ],
        phoneRules: [(v) => !!v || "Phone number is required"],
        passwordRules: [(v) => !!v || "Password is required"],
        dateRules: [(v) => !!v || "Birth Date is required"],
        genderRules: [(v) => !!v || "Gender is required"],
        maritalRules: [(v) => !!v || "Marital Status is required"],
        nationalityRules: [(v) => !!v || "Nationality is required"],
        nearestRules: [(v) => !!v || "Nearest Mall is required"],
        townRules: [(v) => !!v || "Town is required"],
        cityRules: [(v) => !!v || "City is required"],
        countryRules: [(v) => !!v || "Country is required"],
      },
      phoneNumberCounter: {
        value: 0,
        counterSize: 10,
      },
      resource: {
        gender: [
          // "Male",
          // "Female",
          { title: "Male", value: "M" },
          { title: "Female", value: "F" },
        ],
        month: [
        { value: '01', label: 'January' },
        { value: '02', label: 'February' },
        { value: '03', label: 'March' },
        { value: '04', label: 'April' },
        { value: '05', label: 'May' },
        { value: '06', label: 'June' },
        { value: '07', label: 'July' },
        { value: '08', label: 'August' },
        { value: '09', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' }
      ],
        marital: [
          // "Single",
          // "Married",
          // "Others",
          { title: "Single", value: "S" },
          { title: "Married", value: "M" },
        ],
        nationality: [],
        favorite: [],
        town: [],
        city: ["Alexandra", "Ang Mo Kio", "Bedok", "Bukit Panjang"],
        country: ["Singapore"],
      },
    };
  },
  computed: {
    isSmall() {
      return this.screenWidth < 640;
    },
    age() {
      if (!this.input.date) return null;

      const [day, month, year] = this.input.date.split("/").map(Number);
      if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

      const today = new Date();
      const birthDate = new Date(year, month - 1, day); // Month is 0-based in JavaScript

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return age;
    },
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    "input.country": function (newVal, oldVal) {
      const country = this.options.filter((o) => o.value === newVal)[0];
      console.log(country?.label);
      this.input.countryName = country?.label;
      this.input.countryCode = country?.phoneNum;
      this.getCity(country?.label);
    },
    // eslint-disable-next-line no-unused-vars
    "input.born": function (newVal, oldVal) {
      const country = this.options.filter((o) => o.value === newVal)[0];
      console.log(country?.label);
      this.input.bornCountryName = country?.label;
      this.input.bornCountryCode = country?.phoneNum;
    },
    // eslint-disable-next-line no-unused-vars
    "input.city": function (newVal, oldVal) {
      // console.log(newVal.id);
      this.getTown(newVal?.id);
    },
    "input.passwordNew": function (newVal) {
      if (newVal) {
        this.isPassword1 = true;
      }
    },
    "input.passwordConfirm": function (newVal) {
      if (newVal) {
        this.isPassword2 = true;
      }
    },
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  mounted() {
    app.config.globalProperties.$eventBus.$emit(
      "changeHeaderWelcome",
      "My Profile"
    );
    this.getCity();
    this.getTown();
    this.getNationality();
      this.getApplicantData()
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    backStep() {
      this.isMyQualification = false;
      this.isMyEmployment = false;
      
      this.getApplicantData()
    },
    async initCropper(imageFileType) {
      this.showCropper = true;
      this.imageFileType = imageFileType;
      await new Promise((resolve) => setTimeout(resolve, 50));
      this.$refs.cropper.replace(this.image);
    },

    async resetCropper() {
      this.$refs.filePickerField.value = null;
      this.showCropper = false;
    },

    async cropChosenImage() {
      // this.$emit(
      //   "onCrop",
      this.image_path = this.$refs.cropper
        .getCroppedCanvas()
        .toDataURL(this.imageFileType);
      // );
      this.saveImage();
      this.resetCropper();
    },
    onInputNationality() {
      console.log("ok", this.input.nationality);
    },
    getTown(id) {
      axios
        .get(`/town-list`)
        .then((response) => {
          const data = response.data.data;
          //console.log(id);
          if (id) {
            this.resource.town = data
              .filter((i) => i.city_id == id)
              .map((town) => {
                return {
                  id: town.town_id,
                  title: town.town_name,
                  city_id: town.city_id,
                  path: "#",
                };
              });
          } else {
            this.resource.town = data.map((town) => {
              return {
                id: town.town_id,
                title: town.town_name,
                city_id: town.city_id,
                path: "#",
              };
            });
          }
          // console.log(this.resource.town);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    getCity(country_name) {
      axios
        .get(`/city`)
        .then((response) => {
          const data = response.data.data;
          console.log(data);
          if (country_name) {
            this.resource.city = data
              .filter((i) => i.country_name == country_name)
              .map((city) => {
                return {
                  id: city.city_id,
                  title: city.city_name,
                  path: "#",
                };
              });
          } else {
            this.resource.city = data.map((city) => {
              return {
                id: city.city_id,
                title: city.city_name,
                prefix: city.prefix,
                path: "#",
              };
            });
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    getNationality() {
      this.isLoading = true;
      axios
        .get(`/country`)
        .then((response) => {
          const data = response.data.data;
          this.resource.nationality = data.filter(c => c.nationality != '').map((country) => {
            return {
              id: country.country_id,
              title: country.nationality,
            };
          });
          //console.log(data)

          this.resource.country = data.map((country) => {
            return {
              id: country.country_id,
              title: country.country_name,
            };
          });
          this.getUserData();
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getApplicantData() {
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
          this.qualificationData = {
            ...data,
            step: data.qualifications_steps,
            year: data.year_passed,
            qualification: data.qualification_name,
            qualificationCountry: data.qualifications_country_name,
            university: data.partner_name,
          }
          this.employmentData = {
            ...data,
            position: data.position_name,
            name: data.employer_name,
            country: data.employer_country_name,
            start: `From ${this.resource.month.filter(item => item.value == data.month_start)[0].label} ${data.year_start}`,
            end: data.month_end ?  `Till ${this.resource.month.filter(item => item.value == data.month_end)[0].label} ${data.year_end}` :  'Till Date'
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getUserData() {
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
          // this.input.nationality = this.resource.nationality.filter(
          //   (i) => i.id == 2
          // )[0];
          // this.input.marital = this.resource.marital.filter(
          //   (i) => i.value == "S"
          // )[0];
          // this.input.gender = this.resource.gender.filter(
          //   (i) => i.value == "F"
          // )[0];
          // this.input.gender2 = "F";

          // country_current: 28,
          // date_of_birth: null,
          // gender: "M",
          // image: "cea8b5aca2c523ec0b425738e4d80b3d.jpg",
          // last_login: "11/09/2023",
          // marital_status: null,

          this.image_path =
            data.image != null ? this.$fileURL + data.image : null;
            this.skill = data.skills_name || '',
          this.input = {
            id: data.gypsy_id,
            image_path: "",
            image: null,
            gender: this.resource.gender.filter(
              (i) => i.value == data.gender
            )[0],
            gender2: data.gender || null,
            marital: this.resource.marital.filter(
              (i) => i.value == data.marital_status
            )[0],
            nationality: this.resource.nationality.filter(
              (i) => i.id == data.nationality
            )[0],
            name: data.name,
            email: data.email_id,
            phone: data.mobile_number,
            phoneNew: data.mobile_number,
            whatsapp: data.whats_app,
            whatsappNew: data.whats_app,
            password: data.password ? "xxxxxxxx" : "",
            date: data.date_of_birth,
            age: "",

            town: this.resource.town.filter(
              (i) => i.id == data.town_current
            )[0],
            city: this.resource.city.filter(
              (i) => i.id == data.city_current
            )[0],
            countryOld: data.current_country_name ? this.options.filter(
              (i) => i.label == data.current_country_name
            )[0].value : null,
            country: data.current_country_name ? this.options.filter(
              (i) => i.label == data.current_country_name
            )[0].value : null,
            countryCode: data.current_country_name ? this.options.filter(
              (i) => i.label == data.current_country_name
            )[0].phoneNum : '',
            countryName: data.current_country_name ? this.options.filter(
              (i) => i.label == data.current_country_name
            )[0].label : '',
            born: data.born_country_name ? this.options.filter(
              (i) => i.label == data.born_country_name
            )[0].value : null,
            bornCountryName: data.born_country_name ? this.options.filter(
              (i) => i.label == data.born_country_name
            )[0].label : '',
            bornCountryCode: data.born_country_name ? this.options.filter(
              (i) => i.label == data.born_country_name
            )[0].phoneNum : '',
          };
          this.isEmailVerified =
            data.email_verified == "N"
              ? false
              : data.email_verified == "Y"
              ? true
              : null;
          this.isPhoneVerified =
            data.mobile_verified == "N"
              ? false
              : data.mobile_verified == "Y"
              ? true
              : null;
          this.isWhatsappVerified =
            data.whatsapp_verified == "N"
              ? false
              : data.whatsapp_verified == "Y"
              ? true
              : null;
          this.input.nationality = this.resource.nationality.filter(
            (i) => i.id == data.nationality
          );
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    saveData() {
      this.isSending = true;
      const payload = {
        // "marital_status":"M",
        // "country_current":1,
        // "image":[file upload]

        gypsy_id: this.input.id,
        name: this.input.name,
        // mobile_number: this.input.phoneNew || this.input.phone,
        // email_id: this.input.email,
        gender: this.input.gender.value,
        app_id: this.$appId,
        // password: this.input.password,
        marital_status: this.input.marital.value,
        date_of_birth: this.input.date,
        nationality: this.input.nationality.id ? this.input.nationality.id : this.input.nationality[0].id,
        born_country_prefix: this.input.born,
        born_country: this.input.bornCountryName,
        born_country_code: this.input.bornCountryCode,
        born_country_flag: "https://flagicons.lipis.dev/flags/4x3/" +
          this.input.born.toLowerCase() +
          ".svg",
        // image: this.imageSend || null,
      };
      //console.log(payload);
      const token = localStorage.getItem("token");
      axios
        .post(`/save-gypsy-user`, payload, {
          headers: {
            Authorization: `Bearer ${
              this.tokenProvider ? this.tokenProvider : token
            }`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const data = response.data;
          //console.log(data);
          this.isSuccess = true;
          this.successMessage = data.message;
          // localStorage.setItem("name", data.data.name);
          // localStorage.setItem("user_image", data.data.image);
          // localStorage.setItem("last_login", data.data.last_login);
          // localStorage.setItem("token", data.data.token);
          this.getUserData();
          // localStorage.setItem("name", data.data.name);
          // localStorage.setItem("email", data.data.email_id);
          // localStorage.setItem("g_id", data.data.gypsy_ref_no);
          // localStorage.setItem("user_image", data.data.image);
          // localStorage.setItem("last_login", data.data.last_login);
          // localStorage.setItem("token", data.data.token);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          const message = error.response.data.mobile_number
            ? error.response.data.mobile_number[0]
            : error.response.data.message === ""
            ? "Something Wrong!!!"
            : error.response.data.message;
          this.errorMessage = message;
          this.isError = true;
        })
        .finally(() => {
          this.isSending = false;
        });
    },
    saveDataDesktop1() {
      this.isSending = true;
      const payload = {
        // "marital_status":"M",
        // "country_current":1,
        // "image":[file upload]

        gypsy_id: this.input.id,
        // name: this.input.name,
        // mobile_number: this.input.phoneNew || this.input.phone,
        // email_id: this.input.email,
        gender: this.input.gender.value,
        date_of_birth: this.input.date,
        // app_id: this.$appId,
        // password: this.input.password,
        marital_status: this.input.marital.value,
        // date_of_birth: this.input.date,
        nationality: this.input.nationality.id ? this.input.nationality.id : this.input.nationality[0].id,
        born_country_prefix: this.input.born,
        born_country: this.input.bornCountryName,
        born_country_code: this.input.bornCountryCode,
        born_country_flag: "https://flagicons.lipis.dev/flags/4x3/" +
          this.input.born.toLowerCase() +
          ".svg",
        // image: this.imageSend || null,
      };
      //console.log(payload);
      const token = localStorage.getItem("token");
      axios
        .post(`/save-gypsy-user`, payload, {
          headers: {
            Authorization: `Bearer ${
              this.tokenProvider ? this.tokenProvider : token
            }`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const data = response.data;
          //console.log(data);
          this.isSuccess = true;
          this.successMessage = data.message;
          // localStorage.setItem("name", data.data.name);
          // localStorage.setItem("user_image", data.data.image);
          // localStorage.setItem("last_login", data.data.last_login);
          // localStorage.setItem("token", data.data.token);
          this.getUserData();
          // localStorage.setItem("name", data.data.name);
          // localStorage.setItem("email", data.data.email_id);
          // localStorage.setItem("g_id", data.data.gypsy_ref_no);
          // localStorage.setItem("user_image", data.data.image);
          // localStorage.setItem("last_login", data.data.last_login);
          // localStorage.setItem("token", data.data.token);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          const message = error.response.data.mobile_number
            ? error.response.data.mobile_number[0]
            : error.response.data.message === ""
            ? "Something Wrong!!!"
            : error.response.data.message;
          this.errorMessage = message;
          this.isError = true;
        })
        .finally(() => {
          this.isSending = false;
        });
    },
    saveDataDesktop2() {
      this.isSending = true;
      const payload = {
        gypsy_id: this.input.id,
        name: this.input.name,
        // mobile_number: this.input.phoneNew || this.input.phone,
        // email_id: this.input.email,
      };
      //console.log(payload);
      const token = localStorage.getItem("token");
      axios
        .post(`/save-gypsy-user`, payload, {
          headers: {
            Authorization: `Bearer ${
              this.tokenProvider ? this.tokenProvider : token
            }`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const data = response.data;
          //console.log(data);
          this.isSuccess = true;
          this.successMessage = data.message;
          // localStorage.setItem("name", data.data.name);
          // localStorage.setItem("user_image", data.data.image);
          // localStorage.setItem("last_login", data.data.last_login);
          // localStorage.setItem("token", data.data.token);
          this.getUserData();
          // localStorage.setItem("name", data.data.name);
          // localStorage.setItem("email", data.data.email_id);
          // localStorage.setItem("g_id", data.data.gypsy_ref_no);
          // localStorage.setItem("user_image", data.data.image);
          // localStorage.setItem("last_login", data.data.last_login);
          // localStorage.setItem("token", data.data.token);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          const message = error.response.data.mobile_number
            ? error.response.data.mobile_number[0]
            : error.response.data.message === ""
            ? "Something Wrong!!!"
            : error.response.data.message;
          this.errorMessage = message;
          this.isError = true;
        })
        .finally(() => {
          this.isSending = false;
        });
    },
    saveLocation() {
      this.isSending = true;
      console.log(this.input.country)
      console.log(this.phoneEvent)
      console.log(this.phoneEvent2)
      console.log(this.phoneEvent3)
      const payload = {
        // country_current: this.input.country.id,
        country_current: this.input.countryName,
        country_prefix: this.input.country,
        country_code: this.input.countryCode,
        flag:
          "https://flagicons.lipis.dev/flags/4x3/" +
          this.input.country.toLowerCase() +
          ".svg",
        city_current: this.input.city.title
          ? this.input.city.title
          : this.input.city,
        town_current: this.input.town?.title
          ? this.input.town?.title
          : this.input.town ? this.input.town : null,
      };
      //console.log(payload);
      //console.log(this.phoneEvent);
      const token = localStorage.getItem("token");
      axios
        .post(`/gypsy/save-current-location`, payload, {
          headers: {
            Authorization: `Bearer ${
              this.tokenProvider ? this.tokenProvider : token
            }`,
          },
        })
        .then((response) => {
          const data = response.data;
          //console.log(data);
          this.isSuccess = true;
          this.successMessage = data.message;
          // localStorage.setItem("name", data.data.name);
          // localStorage.setItem("user_image", data.data.image);
          // localStorage.setItem("last_login", data.data.last_login);
          // localStorage.setItem("token", data.data.token);
          this.getUserData();
          // localStorage.setItem("name", data.data.name);
          // localStorage.setItem("email", data.data.email_id);
          // localStorage.setItem("g_id", data.data.gypsy_ref_no);
          // localStorage.setItem("user_image", data.data.image);
          // localStorage.setItem("last_login", data.data.last_login);
          // localStorage.setItem("token", data.data.token);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          const message =
            error.response.data.message === ""
              ? "Something Wrong!!!"
              : error.response.data.message;
          this.errorMessage = message;
          this.isError = true;
        })
        .finally(() => {
          this.isSending = false;
        });
    },
    saveEmail() {
      this.isSending = true;
      const payload = {
        gypsy_id: this.input.id,
        email_id: this.input.emailNew,
      };
      //console.log(payload);
      const token = localStorage.getItem("token");
      axios
        .post(`/save-gypsy-user`, payload, {
          headers: {
            Authorization: `Bearer ${
              this.tokenProvider ? this.tokenProvider : token
            }`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const data = response.data;
          //console.log(data);
          this.isSuccess = true;
          this.successMessage = data.message;
          // localStorage.setItem("name", data.data.name);
          // localStorage.setItem("user_image", data.data.image);
          // localStorage.setItem("last_login", data.data.last_login);
          // localStorage.setItem("token", data.data.token);
          // this.getUserData();
          this.isChangeEmail = false;

          this.input.email = this.input.emailNew;
          this.input.emailNew = "";
          // localStorage.setItem("name", data.data.name);
          // localStorage.setItem("email", data.data.email_id);
          // localStorage.setItem("g_id", data.data.gypsy_ref_no);
          // localStorage.setItem("user_image", data.data.image);
          // localStorage.setItem("last_login", data.data.last_login);
          // localStorage.setItem("token", data.data.token);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          const message = error.response.data.email_id
            ? error.response.data.email_id[0]
            : error.response.data.message === ""
            ? "Something Wrong!!!"
            : error.response.data.message;
          this.errorMessage = message;
          this.isError = true;
        })
        .finally(() => {
          this.isSending = false;
        });
    },
    saveMobile() {
      this.isSending = true;
      const payload = {
        gypsy_id: this.input.id,
        mobile_number: this.input.phoneNew || this.input.phone,
      };
      //console.log(payload);
      const token = localStorage.getItem("token");

      axios
        .post(`/save-gypsy-user`, payload, {
          headers: {
            Authorization: `Bearer ${
              this.tokenProvider ? this.tokenProvider : token
            }`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          // this.isSuccess = true;
          this.successMessage = "New Number Updated";
          this.isMobileChanged = true;
          this.isChangePhone = false;
          this.input.phone = this.input.phoneNew;
          setTimeout(() => {
            this.isMobileChanged = false;
            this.isSending = false;
          }, 5000);
          this.input.phoneNew = "";
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          const message = error.response.data.mobile_number
            ? error.response.data.mobile_number[0]
            : error.response.data.message === ""
            ? "Something Wrong!!!"
            : error.response.data.message;
          this.errorMessage = message;
          this.isError = true;
        })
        .finally(() => {
          this.isSending = false;
        });
    },
    saveWhatsapp() {
      this.isSending = true;
      const payload = {
        gypsy_id: this.input.id,
        mobile_number: this.input.phoneNew || this.input.phone,
        whats_app: this.input.whatsappNew || this.input.whatsapp,
      };
      //console.log(payload);
      const token = localStorage.getItem("token");

      axios
        .post(`/save-gypsy-user`, payload, {
          headers: {
            Authorization: `Bearer ${
              this.tokenProvider ? this.tokenProvider : token
            }`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          // this.isSuccess = true;
          this.successMessage = "New Number Updated";
          this.isWhatsappChanged = true;
          this.isChangeWhatsapp = false;
          this.input.whatsapp = this.input.whatsappNew;
          setTimeout(() => {
            this.isWhatsappChanged = false;
            this.isSending = false;
          }, 5000);
          this.input.whatsappNew = "";
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          const message = error.response.data.whats_app
            ? error.response.data.whats_app[0]
            : error.response.data.message === ""
            ? "Something Wrong!!!"
            : error.response.data.message;
          this.errorMessage = message;
          this.isError = true;
        })
        .finally(() => {
          this.isSending = false;
        });
    },
    deleteImage() {
      this.isSending = true;
      const token = localStorage.getItem("token");
      axios
        .delete(`/gypsy/image`, {
          headers: {
            Authorization: `Bearer ${
              this.tokenProvider ? this.tokenProvider : token
            }`,
          },
        })
        .then((response) => {
          const data = response.data;
          //console.log(data);
          this.isSuccess = true;
          this.successMessage = data.message;
          app.config.globalProperties.$eventBus.$emit(
            "getHeaderUserData"
          );
          this.getUserData();
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          const message =
            error.response.data.message === ""
              ? "Something Wrong!!!"
              : error.response.data.message;
          this.errorMessage = message;
          this.isError = true;
        })
        .finally(() => {
          this.isSending = false;
        });
    },
    saveImage() {
      this.isSaveImage = true;
      const payload = {
        // "marital_status":"M",
        // "country_current":1,
        // "image":[file upload]

        // name: this.input.name,
        // mobile_number: this.input.phoneNew || this.input.phone,
        // email_id: this.input.email,
        // gender: this.input.gender.value,
        // app_id: this.$appId,
        // // password: this.input.password,
        // marital_status: this.input.marital.value,
        // // date_of_birth: this.input.date,
        // country_current: this.input.nationality.id,
        gypsy_id: this.input.id,
        image: this.imageSend || null,
      };
      //console.log(payload);
      const token = localStorage.getItem("token");
      axios
        .post(`/save-gypsy-user`, payload, {
          headers: {
            Authorization: `Bearer ${
              this.tokenProvider ? this.tokenProvider : token
            }`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const data = response.data;
          //console.log(data.data.image);
          this.isSuccess = true;
          this.successMessage = data.message;
          app.config.globalProperties.$eventBus.$emit(
            "changeHeaderImage", data.data.image
          );
          // this.getUserData();
          // localStorage.setItem("name", data.data.name);
          // localStorage.setItem("email", data.data.email_id);
          // localStorage.setItem("g_id", data.data.gypsy_ref_no);
          // localStorage.setItem("user_image", data.data.image);
          // localStorage.setItem("last_login", data.data.last_login);
          // localStorage.setItem("token", data.data.token);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          const message =
            error.response.data.message === ""
              ? "Something Wrong!!!"
              : error.response.data.message;
          this.errorMessage = message;
          this.isError = true;
        })
        .finally(() => {
          this.isSaveImage = false;
        });
    },
    changePassword() {
      if (this.input.passwordNew?.length != 8) {
        this.isPassword1 = false;
      } else if (this.input.passwordNew?.length == 8) {
        this.isPassword1 = true;
      }
      if (this.input.password && this.input.passwordConfirm?.length != 8) {
        this.isPassword2 = false;
        this.password2Mes = "Password must be 8 characters";
      } else if (
        this.input.password &&
        this.input.passwordConfirm != this.input.passwordNew
      ) {
        this.isPassword2 = false;
        this.password2Mes = "Must be same with password above";
      } else if (
        this.input.password &&
        this.input.passwordConfirm?.length == 8
      ) {
        this.isPassword2 = true;
      }

      this.isSending = true;
      const payload = {
        gypsy_id: this.input.id,
        email_id: this.input.email,
        password: this.input.passwordNew,
      };
      const token = localStorage.getItem("token");
      if (this.isPassword1 == true && this.isPassword2 == true) {
        axios
          .post(`/gypsy-change-password`, payload, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const data = response.data;
            //console.log(data);
            // localStorage.setItem("name", data.data.name);
            // localStorage.setItem("email", data.data.email_id);
            // localStorage.setItem("g_id", data.data.gypsy_ref_no);
            // localStorage.setItem("user_image", data.data.image);
            // localStorage.setItem("last_login", data.data.last_login);
            // localStorage.setItem("token", data.data.token);
            // this.isSuccess = true;
            this.input.password = this.input.passwordNew;
            this.successMessage = data.message;
            this.isChangePassword = false;
            this.isPasswordChanged = true;
            setTimeout(() => {
              this.isPasswordChanged = false;
            }, 5000);
            this.input.passwordNew = "";
            this.input.passwordConfirm = "";
            // this.email = "";
            // this.name = "";
            // this.country = null;
            // this.city = null;
            // this.mobile = "";
            // this.gender = "";
            // app.config.globalProperties.$eventBus.$emit(
            //   "changeHeaderWelcome",
            //   "Sign Up Completed"
            // );
            // this.nextStep();
            // this.getUserData();
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.log(error);
            const message = error.response.data.email_id
              ? error.response.data.email_id[0]
              : error.response.data.message === ""
              ? "Something Wrong!!!"
              : error.response.data.message;
            this.errorMessage = message;
            this.isError = true;
            this.isChangePassword = false;
          })
          .finally(() => {
            this.isSending = false;
          });
      }
    },
    onFileChangeInput(e) {
      var files = e.target.files || e.dataTransfer.files;
      this.image = files[0];
      this.image_path = URL.createObjectURL(files[0]);
      // console.log(this.input);
    },
    async launchCropper(event) {
      if (!event) return;
      var file = event.target.files[0];
      this.image = await this.toBase64(file);
      this.imageSend = file;
      // if (this.imageSend != null) {
      //   this.saveImage();
      // }
      this.initCropper(file.type);
    },
    async toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    handleResize() {
      this.screenWidth = window.innerWidth;
    },
    onDateInput() {
      const formattedDate = this.input.date.replace(/\D/g, "");

      // Memisahkan tanggal, bulan, dan tahun
      const day = formattedDate.substring(0, 2);
      const month = formattedDate.substring(2, 4);
      const year = formattedDate.substring(4, 8);

      // Memeriksa apakah tanggal, bulan, dan tahun valid
      if (day && month && year) {
        // Mengatur format tanggal yang sesuai dengan JavaScript (mm/dd/yyyy)
        this.input.date = `${month}/${day}/${year}`;
      } else {
        this.input.date = formattedDate; // Tidak valid, tetapkan nilai yang sama
      }
      //console.log(this.input.date);
    },
  },
};
</script>

<style scoped>
.image-container {
  max-width: 450px;
}

.image-container img {
  /* This is important */
  width: 100%;
}
.card-container {
  margin-top: 100px;
  width: 100%;
}

.first-section {
  width: 35%;
  height: 60%;
}

.second-section {
  width: 63%;
}

.card-title {
  background: #f7f7f7;
}

.avatar {
  width: 160px;
  border-radius: 50%;
}
.avatar-mobile {
  width: 90px;
}

.title-card {
  font-size: 20px;
  font-weight: 600;
}

.mobile-container {
  margin-top: 80px;
}

.form-control {
  display: block;
  width: 100%;
  border: 1px solid #ced4da;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

@media screen and (prefers-reduced-motion: reduce) {
  .form-control {
    transition: none;
  }
}

.form-control::-ms-expand {
  background-color: transparent;
  border: 0;
}

.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
.form-control:-webkit-autofill {
  background-color: #fff;
}

.form-control::-webkit-input-placeholder {
  color: #6c757d;
  opacity: 1;
}

.form-control::-moz-placeholder {
  color: #6c757d;
  opacity: 1;
}

.form-control:-ms-input-placeholder {
  color: #6c757d;
  opacity: 1;
}

.form-control::-ms-input-placeholder {
  color: #6c757d;
  opacity: 1;
}

.form-control::placeholder {
  color: #6c757d;
  opacity: 1;
}

.form-control:disabled,
.form-control[readonly] {
  background-color: #e9ecef;
  opacity: 1;
}

.loading-page {
  margin-top: 300px;
}

.back-grey {
  background: #e9ecef;
}

.location-input {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  height: 38px;
  position: relative;
  border: 1px solid rgb(160, 160, 160);
  border-radius: 5px;
}

@media (max-width: 599px) {
  .loading-page {
    margin-top: 450px;
  }
}
</style>
