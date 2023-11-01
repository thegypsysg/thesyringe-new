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
                style="font-family: Arial, Helvetica, sans-serif !important">Step 4 of 5</h1>
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
                    <h2
                    class="mb-4 text-blue-accent-4"
                    style="font-family: Arial, Helvetica, sans-serif !important"
                    :class="{ 'header-mobile': isSmall }"
                  >
                    Month Start
                  </h2>

                    <div class="location-input d-flex mt-4 mb-8 w-66">
                      <v-autocomplete
                        v-model="startMonth"
                        :items="resource.month"
                        variant="outlined"
                        item-title="label"
                        class="mt-n1 w-75"
                        density="compact"
                      />
                      <input
                        v-model="startYear"
                        class="w-25 pl-2"
                        type="number" pattern="/^-?\d+\.?\d*$/" onkeypress="if(this.value.length==4) return false;"
                        style="height: 37px"
                      />
                    </div>

                  <div
                      class="d-flex align-center mb-n2 justify-space-between w-50"
                    >
                      <v-checkbox
                      v-model="still"
                        class="mb-n4 font-weight-bold text-success"
                        label="Still Working"
                      ></v-checkbox>
                      <!-- <label
                        style="font-weight: 600"
                        class="w-50"
                        :class="{
                          'section-mobile': isSmall,
                          'section-desktop': !isSmall,
                        }"
                        >Still Working</label
                      > -->
                    </div>
                    
                    <h2
                    class="my-4 text-blue-accent-4"
                    style="font-family: Arial, Helvetica, sans-serif !important"
                    :class="{ 'header-mobile': isSmall }"
                  >
                    End Month
                  </h2>

                  <div class="location-input d-flex mt-4 mb-8 w-66">
                    <v-autocomplete
                      v-model="endMonth"
                      :items="resource.month"
                      :disabled="still"
                      clearable
                      variant="outlined"
                      item-title="label"
                      class="mt-n1 w-75"
                      density="compact"
                    />
                    <input
                    :disabled="still"
                      v-model="endYear"
                      class="w-25 pl-2"
                      type="number" pattern="/^-?\d+\.?\d*$/" onkeypress="if(this.value.length==4) return false;"
                      style="height: 37px"
                    />
                  </div>
                    <v-row class="mb-6" v-if="!isSmall">
                      <v-col>
                        <h4 class="text-blue-accent-4">{{positionName || ''}}</h4>
                        <h4>{{employerName || ''}}</h4>
                        <h4>{{employerCountry =='null' ?  '' : employerCountry}}</h4>
                      </v-col>
                    </v-row>

                    <v-container class="fixed-desc w-100" v-if="isSmall">
                        <h4 class="text-blue-accent-4">{{positionName || ''}}</h4>
                        <h4>{{employerName || ''}}</h4>
                        <h4>{{employerCountry =='null' ?  '' : employerCountry}}</h4>
                    </v-container>
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
                  v-if="!isSmall"
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
      startMonth: null,
      startYear: null,
      endMonth: null,
      endYear: null,
      still: null,
      employerName: null,
      employerCountry : null,
      positionName : null,
      screenWidth: window.innerWidth,
      isSuccess: false,
      successMessage: '',
      resource: {
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
      ]
      }
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
    this.employerName = localStorage.getItem('employer_name');
    this.employerCountry = localStorage.getItem('employer_country');
    this.positionName = localStorage.getItem('position_name');
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    saveData() {
      console.log(this.startMonth);
      console.log(this.endMonth);
      let payload = {}
      if(this.still == true) {
       payload = {
        month_start: this.startMonth,
        year_start: this.startYear.toString(),
        still_working: 'Y'
        };
      } else {
       payload = {
        month_start: this.startMonth,
        year_start: this.startYear.toString(),
        still_working: 'N',
        month_end: this.endMonth,
        year_end: this.endYear.toString(),
      }
    }
      // console.log(payload);
      const token = localStorage.getItem("token");
      if(this.startYear && this.startMonth) {
      axios
        .post(`/gypsy-applicant/save-employment-month-details`, payload, {
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
          this.successMessage = "Success Save Work Duration";
          if(this.still == true) {
            localStorage.setItem('start_month', this.resource.month.filter(item => item.value == this.startMonth)[0].label);
            localStorage.setItem('start_year', this.startYear)
            localStorage.removeItem('end_month');
            localStorage.removeItem('end_year')
          } else {
            localStorage.setItem('start_month', this.resource.month.filter(item => item.value == this.startMonth)[0].label);
            localStorage.setItem('start_year', this.startYear)
            localStorage.setItem('end_month', this.resource.month.filter(item => item.value == this.endMonth)[0].label);
            localStorage.setItem('end_year', this.endYear)
          }
          this.nextStep();
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

.fixed-desc {
  position: fixed;
  bottom: 100px;
  left: 0;
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
</style>
