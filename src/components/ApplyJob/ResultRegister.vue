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
                  <h2 class="mt-6">
                    Hi {{ name }}
                  </h2>
                  <br />
                  <h2>You have successfully created your Qualifications Profile .</h2>
                  <br />
                  <h2>You can view the same in your resume profile</h2>

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
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "AdditionalSecurity",
  data() {
    return {
      isLoading: false,
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
    this.name = localStorage.getItem("userName")
      ? localStorage.getItem("userName")
      : "";
    this.gId = localStorage.getItem("g_id") ? localStorage.getItem("g_id") : "";
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    goToPath() {
          localStorage.removeItem("qt_id")
          localStorage.removeItem("qualification_type")
          localStorage.removeItem("qualification_country")
          localStorage.removeItem("qualification_university")
      app.config.globalProperties.$eventBus.$emit('applyJobFalse');
      app.config.globalProperties.$eventBus.$emit('applyJobFalse2');
          app.config.globalProperties.$eventBus.$emit('employmentJob');
          app.config.globalProperties.$eventBus.$emit('employmentJob2');
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
