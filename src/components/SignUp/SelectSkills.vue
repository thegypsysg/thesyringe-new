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
              min-height="80vh"
              class="mx-auto"
              :class="{ 'login-card px-12': !isSmall, 'py-10 px-2': isSmall }"
            >
              <v-row>
                <v-col cols="12">
                  <div class="text-center">
                    <h1 
                    :class="{ 'header-mobile-2': isSmall }" 
                    style="font-family: Arial, Helvetica, sans-serif !important">Basic Profile Setup</h1>
                    <h1 class="text-red-darken-4" 
                    :class="{ 'header-mobile-2': isSmall }" 
                    style="font-family: Arial, Helvetica, sans-serif !important">Step 2 of 5</h1>
                  </div>
                  </v-col>
                  <div style="height: 0.5px; background: black;" class="w-100 my-2"></div>
                  <v-col cols="12">
                  <h1
                    class="mb-2"
                    style="font-family: Arial, Helvetica, sans-serif !important"
                    :class="{ 'header-mobile': isSmall }"
                  >
                    Skills Group
                  </h1>
                  <h4 class="mb-8">(Please select any one of the following)</h4>

                  <!-- <v-form  fast-fail @submit.prevent="login"> -->
                    <div class="position-relative">
                    <v-radio-group class="w-100" v-model="skill" inline>
                      <v-radio
                        v-for="option in resource.skills"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                        :class="{ 'w-25': !isSmall, 'w-50': isSmall }"
                      >
                        <template #label>
                          <v-card height="180" width="150" class="text-center" elevation="0">
                            <div style="height: 40px;">
                            <p class="font-weight-bold" style="line-height: 18px;">{{ option.label }}</p>
                            </div>
                            <div class="img-cont">
                              <v-img cover height="100" :src="option.image"><template #placeholder>
                                <div class="skeleton" /> </template
                            ></v-img>
                            </div>
                          </v-card>
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </div>

                    <div
                      class="d-flex align-center"
                      :class="{ matop: !isSmall, 'fixed-next w-100': isSmall }"
                    >
                    <v-container v-if="isSmall">
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
                    </v-container>
                    <v-btn
                    v-if="!isSmall"
                    type="submit"
                    variant="outlined"
                    class="login-btn"
                    :class="{
                      'w-33 login-btn-mobile': isSmall,
                      'w-25 mt-n4': !isSmall,
                    }"
                    @click="saveData"
                  >
                    Next
                  </v-btn>
                    </div>
                  <!-- </v-form> -->
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
  name: 'SelectSkills',
  data() {
    return {
      skill: null,
      screenWidth: window.innerWidth,
      isSuccess: false,
      successMessage: '',
      resource: {
        skills: [],
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
    const applicantData = JSON.parse(localStorage.getItem('applicant_data'));
    const sgmId = parseInt(localStorage.getItem("sgm_id"));
    this.skill = sgmId ? sgmId : applicantData.sgm_id;
    this.getTrendingCardData()
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    saveData() {
      const payload = {
        sgm_id: this.skill,
      };
      //console.log(payload);
      const token = localStorage.getItem("token");
      if(this.skill) {
      axios
        .post(`/save-gypsy-applicant`, payload, {
          headers: {
            Authorization: `Bearer ${
              token
            }`,
          },
        })
        .then((response) => {
          const data = response.data;
          //console.log(data);
          this.isSuccess = true;
          this.successMessage = data.message;
          localStorage.setItem("sgm_id", data.data.sgm_id);
          const sgmName = this.resource.skills.filter(sk => sk.value == data.data.sgm_id)[0].label
          console.log(sgmName)
          localStorage.setItem("sgm_name", sgmName);
          this.nextStep()
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          const message = error.response.data.message === ""
            ? "Something Wrong!!!"
            : error.response.data.message;
          this.errorMessage = message;
          this.isError = true;
        });
      }
    },
    getTrendingCardData() {
      this.isLoading = true;
      axios
        .get(`/skillgroups/${this.$appId}`)
        .then((response) => {
          const data = response.data.data;
          //console.log(data);
          this.resource.skills = data.map((item) => {
            return {
              value: item.sgm_id || 1,
              image: this.$fileURL + item.image || '',
              label: item.group_name + ' Jobs' || '',
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

.img-cont {
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100px;
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

.matop {
  margin-top: 150px;
}
.matop-2 {
  margin-top: 250px;
}

.skeleton {
  width: 100%;
  height: 100%;
  background: linear-gradient(-90deg, #f2f2f2 0%, #e1e1e1 50%, #f2f2f2 100%);
  background-size: 400% 400%;
  animation: skeleton 1.6s ease infinite;
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
