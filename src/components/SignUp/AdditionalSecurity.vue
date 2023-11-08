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
                style="font-family: Arial, Helvetica, sans-serif !important">Basic Profile Setup</h1>
                <h1 class="text-red-darken-4" 
                :class="{ 'header-mobile-2': isSmall }" 
                style="font-family: Arial, Helvetica, sans-serif !important">Step 1 of 5</h1>
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
                    <div class="d-flex align-center my-2">
                    <p class="w-75">Birth Date</p>
                    <span class="w-33">Age</span>
                  </div>
              <div class="d-flex align-center mt-2"> <input
                v-model="date"
                required
                class="form-control w-66"
                type="text"
                id="dateInput"
                placeholder="DD/MM/YYYY"
                @input="onDateInput"
              /> 
              <span v-if="age" class="font-weight-bold ml-2 w-33"><span class="text-red">{{ age }}</span> Years</span>
            </div>
                    <p class="mb-2 mt-6">Marital Status</p>
                    <VueMultiselect
                  v-model="marital"
                  class="mt-2 w-75"
                  :options="resource.marital"
                  track-by="value"
                  label="title"
                  placeholder="Select Marital Status"
                />
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
                    <!-- <div
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
                </div> -->
                  </v-container>
                  <v-btn
                  v-if="!isSmall"
                  type="submit"
                  variant="outlined"
                  class="login-btn"
                  :class="{
                    'w-33 login-btn-mobile': isSmall,
                    'w-25 mt-6': !isSmall,
                  }"
                  @click="saveData"
                >
                  Next
                </v-btn>
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
import VueMultiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import axios from '@/util/axios';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'WhereAreYou',  
  components: {
    VueMultiselect,
  },
  data() {
    return {
      date: null,
      marital: null,
      screenWidth: window.innerWidth,
      isSuccess: false,
      successMessage: '',
      resource: {
        marital: [
          // "Single",
          // "Married",
          // "Others",
          { title: "Single", value: "S" },
          { title: "Married", value: "M" },
        ],
      },
    };
  },
  computed: {
    isSmall() {
      return this.screenWidth < 640;
    },
    age() {
      if (!this.date) return null;

      const [day, month, year] = this.date.split("/").map(Number);
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
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    onDateInput() {
      const formattedDate = this.date.replace(/\D/g, "");

      // Memisahkan tanggal, bulan, dan tahun
      const day = formattedDate.substring(0, 2);
      const month = formattedDate.substring(2, 4);
      const year = formattedDate.substring(4, 8);

      // Memeriksa apakah tanggal, bulan, dan tahun valid
      if (day && month && year) {
        // Mengatur format tanggal yang sesuai dengan JavaScript (mm/dd/yyyy)
        this.date = `${month}/${day}/${year}`;
      } else {
        this.date = formattedDate; // Tidak valid, tetapkan nilai yang sama
      }
      //console.log(this.input.date);
    },
    saveData() {
      const payload = {
        date_of_birth: this.date,
        marital_status: this.marital.value,
      };
      console.log(payload);
      const token = localStorage.getItem("token");
      if(this.date && this.marital) {
      axios
        .post(`/gypsy-applicant/save-date-of-birth-and-marital-status`, payload, {
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
          this.successMessage = data.message;
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
</style>
