<template>
  <div>
    <div
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
                style="font-family: Arial, Helvetica, sans-serif !important">Employment Profile</h1>
                <h1 class="text-red-darken-4" 
                :class="{ 'header-mobile-2': isSmall }" 
                style="font-family: Arial, Helvetica, sans-serif !important">Step 5 of 5</h1>
              </div>
              <div style="height: 0.5px; background: black;" class="w-100 my-2"></div>
            </v-col>
                <v-col cols="12">
                  <!-- <h2 class="mt-6">
                    Hi {{ name }}
                  </h2>
                  <br /> -->
                  <h2>You have successfully created your Employment Profile .</h2>
                  <br />
                  <h2 class="text-blue-accent-4">{{positionName}}</h2>
                  <h2>{{employerName}}</h2>
                  <h2>{{employerCountry}}</h2>
                  <h2>From {{startMonth + ' ' + startYear}}</h2>
                  <h2>Till {{endMonth ? endMonth + ' ' + endYear : 'Date'}}</h2>
                  <br />
                  <h2>You can modify / update this in your Resume Profile .</h2>
                  <div class="d-flex mt-12 align-center w-100">
                    <v-btn
                    :disabled="isLoading"
                      type="submit"
                      variant="outlined"
                      class="login-btn"
                      :class="{
                        'w-50 login-btn-mobile': isSmall,
                        'w-33': !isSmall,
                      }"
                      @click="goToPath()"
                    >
                      OK
                    </v-btn>
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
      </v-container>
    </div>
  </div>
</template>

<script>
import app from '@/util/eventBus';
import axios from '@/util/axios';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "AdditionalSecurity",
  data() {
    return {
      isLoading: false,
      employerName: null,
      employerCountry : null,
      positionName : null,
      startMonth: null,
      startYear: null,
      endMonth: null,
      endYear: null,
      name: "",
      path: '',
      screenWidth: window.innerWidth,
      isSuccess: false,
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
    this.employerName = localStorage.getItem('employer_name');
    this.employerCountry = localStorage.getItem('employer_country');
    this.positionName = localStorage.getItem('position_name');
    this.startMonth = localStorage.getItem('start_month');
    this.startYear = localStorage.getItem('start_year');
    this.endMonth = localStorage.getItem('end_month') || '';
    this.endYear = localStorage.getItem('end_year') || '';
    this.getData()
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    goToPath() {          
      localStorage.removeItem('employment_status');
      localStorage.removeItem('employer_name')
          localStorage.removeItem('employer_country')
          localStorage.removeItem('employer_country_prefix')
          localStorage.removeItem('employer_position')
          localStorage.removeItem('position_name')          
          localStorage.removeItem('start_month')
          localStorage.removeItem('start_year')
            localStorage.removeItem('end_month')
            localStorage.removeItem('end_year')
      app.config.globalProperties.$eventBus.$emit('employmentJobFalse');
      app.config.globalProperties.$eventBus.$emit('employmentJobFalse2');
      if (this.path != '/') {
          this.$router.push(this.path);
        } else {
          this.$router.push(this.path);
        app.config.globalProperties.$eventBus.$emit('getTrendingCardData2');
        }
    },
    getData() {
      
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
        if (data.slug) {
          this.path = `/${data.slug}`;
          app.config.globalProperties.$eventBus.$emit('changeHeaderPath', `/${data.slug}`);
        } else {
        this.path = "/";
          app.config.globalProperties.$eventBus.$emit('changeHeaderPath', "/");
      }
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
</style>
