<template>
  <div>
    <div v-if="isLoading" class="text-center loading-page">
      <v-progress-circular :size="50" color="primary" indeterminate />
    </div>
    <div
    v-else
      class="d-flex align-center"
      :class="{ 'login-container': !isSmall, 'mt-10': isSmall }"
    >
      <v-container fluid>
        <v-row class="d-flex align-center justify-center">
          <v-col :cols="isSmall ? '12' : '10'">
            <v-card
              :elevation="!isSmall ? 1 : 0"
              :max-width="isSmall ? `${screenWidth - 30}px` : ''"
              class="mx-auto"
              :class="{ 'login-card px-12': !isSmall, 'py-10 px-2': isSmall }"
            >
              <v-row>
                <v-col cols="12">
                <div class="text-center">
                <h1 
                :class="{ 'header-mobile-2': isSmall }" 
                style="font-family: Arial, Helvetica, sans-serif !important">Qualification Profile Setup</h1>
                <h1 class="text-red-darken-4" 
                :class="{ 'header-mobile-2': isSmall }" 
                style="font-family: Arial, Helvetica, sans-serif !important">Step 3 of 4</h1>
              </div>
              <div style="height: 0.5px; background: black;" class="w-100 my-2"></div>
            </v-col>
                <v-col class="pb-16 pb-md-10" :cols="isSmall ? '12' : '6'">
                  <!-- <h1
                    class="mb-4"
                    style="font-family: Arial, Helvetica, sans-serif !important"
                    :class="{ 'header-mobile': isSmall }"
                  >
                    Where are you now ?
                  </h1> -->

                  <!-- <v-form fast-fail @submit.prevent="login"> -->
                    <h3 class="mb-2">Please check if your university in this list below .</h3>
                    <p class="mb-2 text-blue-accent-4">These are approved list of qualifications</p>
                    <div class="location-input mt-4 mb-8 w-100">
                      <v-autocomplete
                        v-model="universityRegis"
                        :items="resource.universityRegis"
                        :disabled="universityNonRegis"
                        variant="outlined"
                        item-value="label"
                        item-title="label"
                        label="--- Select University ---"
                        clearable
                        class="mt-n1"
                        density="compact"
                      />
                    </div>
                    <h3 class="text-red my-8 text-center">OR</h3>
                    <h3 class="mb-2">Please select from any of these University list .</h3>
                    <p class="mb-2 text-blue-accent-4">Add a new university if its not in the List</p>
                    <div class="location-input mt-4 mb-8 w-100">
                      <v-combobox
                        v-model="universityNonRegis"
                        :items="resource.universityNonRegis"
                        :disabled="universityRegis"
                        variant="outlined"
                        item-value="label"
                        item-title="label"
                        label="--- Select University ---"
                        clearable
                        class="mt-n1"
                        density="compact"
                      />
                    </div>
                      <!-- <v-combobox
                      v-model="university"
                      :items="resource.university"
                      variant="outlined"
                      item-value="label"
                      item-title="label"
                      clearable
                        label="--- Select University ---"
                        class="mt-n1"
                        density="compact"
                      >
                        <template v-slot:item="{ props, item }">
                          <div v-if="item?.raw?.label == 'Registrable' ||  item?.raw?.label == 'Non Registrable'">
                            <p class="py-4 pl-2 text-blue-darken-4">{{ item?.raw?.label }}</p>
                          </div>
                          <div v-else v-bind="props">
                            <p class="py-2 pl-2 custom-list">{{ item?.raw?.label }}</p>
                          </div>
                        </template>
                      </v-combobox> -->
                    

                    <div
                    class="d-flex align-center"
                    :class="{ matop: !isSmall, 'fixed-next w-100': isSmall }"
                  >
                  <v-container class="d-flex justify-space-between align-center" v-if="isSmall">
                    <v-btn
                      type="submit"
                      variant="outlined"
                      class="login-btn"
                      :class="{
                        'w-33 login-btn-mobile': isSmall,
                        'w-25': !isSmall,
                      }"
                      @click="saveData"
                    >
                      Next
                    </v-btn>
                    <div
                  class="text-blue-darken-4"
                  :class="{
                    'w-33 login-btn-mobile': isSmall,
                    'w-25': !isSmall,
                  }"
                  style="
                    text-align: center;
                    cursor: pointer;
                    font-weight: 700;
                    font-size: 20px;
                  "
                  @click="backStep"
                >
                  Back
                </div>
                  </v-container>
                    <div 
                    v-if="!isSmall" class="w-100 d-flex justify-space-between align-center mt-12">
                      <v-btn
                        type="submit"
                        variant="outlined"
                        class="login-btn"
                        :class="{
                          'w-33 login-btn-mobile': isSmall,
                          'w-25': !isSmall,
                        }"
                        @click="saveData"
                      >
                          Next
                      </v-btn>
                      <div
                        class="text-blue-darken-4"
                        :class="{
                          'w-33 login-btn-mobile': isSmall,
                          'w-25': !isSmall,
                        }"
                        style="
                          text-align: center;
                          cursor: pointer;
                          font-weight: 700;
                          font-size: 20px;
                        "
                        @click="backStep"
                      >
                        Back
                      </div>
                    </div>
                  </div>
                  <!-- </v-form> -->
                </v-col>
                <v-col
                  v-if="!isSmall"
                  cols="6"
                  class="d-flex align-center justify-center"
                >
                  <h1 style="width: 80%">
                  </h1>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-snackbar
          location="top"
          color="green"
          v-model="isSuccess"
          :timeout="3000"
        >
          {{ successMessage }}

          <template v-slot:actions>
            <v-btn color="white" variant="text" @click="isSuccess = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from '@/util/axios';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'WhereAreYou',
  data() {
    return {
      isLoading: false,
      universityRegis: null,
      universityNonRegis: null,
      countryId: null,
      countryName: '',
      nationality: null,
      nationalityName: '',
      phoneEvent: null,
      phoneEvent2: null,
      screenWidth: window.innerWidth,
      isSuccess: false,
      successMessage: '',
      resource: {
        universityRegis: [],
        universityNonRegis: [],
      },
    };
  },
  computed: {
    isSmall() {
      return this.screenWidth < 640;
    },
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  mounted() {
    // this.university = localStorage.getItem('qualification_university')
    this.getApplicantData()
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: { 
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
          this.countryId = data.qualifications_country;
          this.getUniversityRegistrable()
          this.getUniversityNonRegistrable()
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
      console.log(this.universityRegis)
      console.log(this.universityNonRegis)
      let payload = {}
      if(this.universityRegis && !this.universityNonRegis) {
        payload = {
          partner_name: this.universityRegis
        }
      } else if(this.universityNonRegis && !this.universityRegis) {
        payload = {
          partner_name: this.universityNonRegis.label ? this.universityNonRegis.label : this.universityNonRegis
        }
      }
      //console.log(payload);
      const token = localStorage.getItem("token");
      if((this.universityRegis && !this.universityNonRegis) || (this.universityNonRegis && !this.universityRegis)) {
      axios
        .post(`/gypsy-applicant/save-university`, payload, {
          headers: {
            Authorization: `Bearer ${
              token
            }`,
          },
        })
        .then((response) => {
          const data = response.data;
          console.log(data)
          this.isSuccess = true;
          this.successMessage = "Success Save University";
          if(this.universityRegis && !this.universityNonRegis) {
          localStorage.setItem("qualification_university", this.universityRegis)
          } else if(this.universityNonRegis && !this.universityRegis) {
            localStorage.setItem("qualification_university", this.universityNonRegis.label ? this.universityNonRegis.label : this.universityNonRegis)
          }
          this.nextStep()
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
      }
    },
    getUniversityRegistrable() {
      this.isLoading = true;
      const token = localStorage.getItem("token");
      axios
        .get(`/university-list/registrable/${this.$route.params.id}/${this.countryId}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        )
        .then((response) => {
          const data = response.data.data;
          //console.log(data);
          this.resource.universityRegis = data.map((item) => {
            return {
              value: item.university_id || 1,
              label: item.partner_name || '',
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
    getUniversityNonRegistrable() {
      this.isLoading = true;
      const token = localStorage.getItem("token");
      setTimeout(() => {
      axios
        .get(`/university-list/non-registrable/${this.$route.params.id}/${this.countryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        )
        .then((response) => {
          const data = response.data.data;
          //console.log(data);
          this.resource.universityNonRegis = data.map((item) => {
            return {
              value: item.university_id || 1,
              label: item.partner_name || '',
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
      },500)
    },
    nextStep() {
      this.$emit('nextStep');
    },
    backStep() {
      this.$emit('backStep');
    },
    handleResize() {
      this.screenWidth = window.innerWidth;
    },
    resendOTP() {
      this.isSuccess = true;
      this.successMessage = 'Success send OTP';
    },
  },
};
</script>

<style scoped>
.login-container {
  background-image: url('@/assets/Syringe-Signup-main.jpg');
  background-position: center;
  background-size: cover;
  background-color: #cccccc;
  min-height: 100vh;
}

.header-mobile {
  font-size: 20px;
}
.header-mobile-2 {
  font-size: 24px;
}

.section-desktop {
  font-size: 24px;
}

.section-mobile {
  font-size: 16px;
}

.login-input .v-text-field input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 30px #f5f5f5 inset !important;
  -webkit-text-fill-color: #333 !important;
}

/* Firefox */
.login-input .v-text-field input:-moz-autofill {
  -moz-box-shadow: 0 0 0 30px #f5f5f5 inset !important;
  -moz-text-fill-color: #333 !important;
}

.fixed-next {
  position: fixed;
  bottom: 0;
  left: 0;
  background: #F3F3F3;
}
.login-btn {
  width: 400px;
  height: 50px;

  background: #fa2964;
  border-radius: 10px;
  color: white !important;
  font-weight: 500;
  font-size: 14px;
  text-transform: unset;
}

.location-input {
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  height: 38px;
  position: relative;
  border: 1px solid rgb(160, 160, 160);
  border-radius: 5px;
}

.next-btn {
  width: 70% !important;
}

.login-btn-mobile {
  font-weight: 600;
  font-size: 18px;
}

.login-footer-span {
  font-size: 20px;
  font-weight: 600;
}

.login-line {
  width: 70px;
  height: 1px;
  background: #bababa;
}
.login-line-mobile {
  width: 150px;
}

.login-card {
  margin-top: 90px;
  padding-top: 15px;
  padding-bottom: 120px;
}

.login-footer-icon {
  cursor: pointer;
}
.login-footer-btn {
  gap: 20px;
}
.login-footer-btn-mobile {
  gap: 40px;
}

.custom-list:hover {
  background: rgb(248, 248, 248);
  cursor: pointer;
}

.loading-page {
  margin-top: 300px;
}

@media (max-width: 599px) {
  .loading-page {
    margin-top: 450px;
  }
}
</style>
