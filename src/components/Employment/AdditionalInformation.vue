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
                style="font-family: Arial, Helvetica, sans-serif !important">Step 3 of 5</h1>
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
                    class="mb-4"
                    style="font-family: Arial, Helvetica, sans-serif !important"
                    :class="{ 'header-mobile': isSmall }"
                  >
                    Position Held
                  </h2>

                  <!-- <v-form fast-fail @submit.prevent="login"> -->
                    <div class="location-input mt-4 mb-8 w-100">
                      <v-combobox
                        v-model="position"
                        :items="resource.positions"
                        item-title="label"
                        variant="outlined"
                        placeholder="Type Position Name"
                        clearable
                        class="mt-n1"
                        density="compact"
                      />
                    </div>
                    <!-- <v-autocomplete
                      v-model="city"
                      :items="resource.cities"
                      label="Enter City"
                      class="mt-6 w-50"
                      variant="outlined"
                      clearable
                    />
                    <v-autocomplete
                      v-model="town"
                      :items="resource.towns"
                      label="Enter Town"
                      class="mt-6 w-50"
                      :class="{ 'mb-6': !isSmall }"
                      variant="outlined"
                      clearable
                    /> -->
                    <v-row class="mb-6" v-if="!isSmall">
                      <v-col>
                        <h4>{{employerName || ''}}</h4>
                        <h4>{{employerCountry =='null' ?  '' : employerCountry}}</h4>
                      </v-col>
                    </v-row>

                    <v-container class="fixed-desc w-100" v-if="isSmall">
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
      position: null,
      employerName: null,
      employerCountry : null,
      screenWidth: window.innerWidth,
      isSuccess: false,
      successMessage: '',
      resource: {
        positions: []
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
    this.employerName = localStorage.getItem('employer_name');
    this.employerCountry = localStorage.getItem('employer_country');
    this.getPositionList()
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    saveData() {
      let payload = {}
      if(this.position.value) {
       payload = {
        position_id: this.position.value,
        };
      } else {
       payload = {
        position_name: this.position,
      }
    }
      // console.log(payload);
      const token = localStorage.getItem("token");
      if(this.position) {
      axios
        .post(`/gypsy-applicant/save-position`, payload, {
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
          this.successMessage = "Success Save Position";
          localStorage.setItem('employer_position', data.data.position_id);
          localStorage.setItem('position_name', this.position.label ? this.position.label : this.position);
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
    getPositionList() {
      this.isLoading = true;
      const token = localStorage.getItem("token");
      axios
        .get(`/position-list`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        )
        .then((response) => {
          const data = response.data.data;
          console.log(data);
          this.resource.positions = data.map((item) => {
            return {
              value: item.position_id,
              label: item.position_name,
            };
          });
          
    this.position = localStorage.getItem('employer_position') ? this.resource.positions.filter(item => item.value == localStorage.getItem('employer_position'))[0] : null
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
