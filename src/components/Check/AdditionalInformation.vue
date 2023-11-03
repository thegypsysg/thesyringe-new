<template>
  <div>
    <div v-if="isLoading" class="text-center loading-page">
      <v-progress-circular :size="50" color="#fa2964" indeterminate />
    </div>
    <div
    v-if="!isLoading"
      class="d-flex align-center"
      :class="{ 'login-container': !isSmall, 'mt-10': isSmall }"
    >
      <v-container fluid>
        <v-row class="d-flex align-center justify-center">
          <v-col :cols="isSmall ? '12' : '8'">
            <v-card
              :elevation="!isSmall ? 1 : 0"
              :max-width="isSmall ? `${screenWidth - 30}px` : ''"
              class="mx-auto"
              :class="{ 'login-card px-12': !isSmall, 'py-10 px-2': isSmall }"
            >
              <v-row>
                <v-col cols="12">
                <div class="text-center mb-4">
                <h1 
                :class="{ 'header-mobile-2': isSmall }" 
                style="font-family: Arial, Helvetica, sans-serif !important">Qualification Check</h1>
                <h2 class="text-blue-accent-4" 
                :class="{ 'header-mobile-2': isSmall }" 
                style="font-family: Arial, Helvetica, sans-serif !important">Step - 3</h2>
              </div>
              <!-- <div style="height: 0.5px; background: black;" class="w-100 my-2"></div> -->
            </v-col>
                <v-col :cols="isSmall ? '12' : '10'">
                  <!-- <h2 class="mt-6">
                    Hi {{ name }}
                  </h2>
                  <br /> -->
                  <h2>Congrats your Qualifications are Registrable with <span class="text-blue-accent-4">{{regulatorName}}</span></h2>
                  <br />
                  <h2 class="text-blue-accent-4 mt-2">{{universityName}}</h2>
                  <h2 class="text-blue-accent-4 mt-2">{{qualificationName}}</h2>
                  <h2 class="text-blue-accent-4 mt-2">{{countryName}}</h2>
                  <br />
                  <h2 class="mb-10">Please Press Next to Continue with the registration.</h2>
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
                        @click="saveApplication"
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
                    @click="saveApplication"
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
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
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
    </div>
  </div>
</template>

<script>
import app from '@/util/eventBus';
import axios from '@/util/axios';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "AdditionalInformation",
  data() {
    return {
      isLoading: false,
      regulatorName: null,
      qualificationName: null,
      countryName : null,
      universityName : null,
      name: "",
      path: '',
      screenWidth: window.innerWidth,
      isError: false,
      isSuccess: false,
      errorMessage: "",
      successMessage: "",
    };
  },
  computed: {
    isSmall() {
      return this.screenWidth < 640;
    },
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  mounted() {
    this.getApplicantData()
    this.getData()
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    saveApplication() {
      const payload = {
        job_id: this.$route.params.id,
      };
      //console.log(payload);
      const token = localStorage.getItem("token");
      axios
        .post(`/save-application`, payload, {
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
          this.successMessage = data.message || 'Successfully created';
      app.config.globalProperties.$eventBus.$emit('checkJobFalse');
      app.config.globalProperties.$eventBus.$emit('checkJobFalse2');
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
    },
    getData() {
      this.isLoading = true;
      const token = localStorage.getItem("token");
      const jobId = this.$route.params.id
      axios
      .get(`/registrable-skill-job-detail/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        // this.qualificationName = data.skills_name;
        this.regulatorName = data.regulator;
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
        this.countryName = data.qualifications_country_name;
        this.qualificationName = data.qualification_name;
        this.universityName = data.partner_name;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    nextStep() {
      this.$emit("nextStep");
    },
    backStep() {
      this.$emit("backStep");
    },
    handleResize() {
      this.screenWidth = window.innerWidth;
    },
    resendOTP() {
      this.isSuccess = true;
      this.successMessage = "Success send OTP";
    },
  },
};
</script>

<style scoped>
.login-container {
  background-image: url("@/assets/Syringe-Signup-main.jpg");
  background-position: center;
  background-size: cover;
  background-color: #cccccc;
  min-height: 100vh;
}

.header-mobile {
  font-size: 20px;
}

.section-desktop {
  font-size: 20px;
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
  border-radius: 5px;
  color: white !important;
  font-weight: 500;
  font-size: 14px;
  text-transform: unset;
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

.loading-page {
  height: 100vh;
  margin-top: 300px;
}

@media (max-width: 599px) {
  .loading-page {
    margin-top: 450px;
  }
}
</style>
