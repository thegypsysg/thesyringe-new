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
              :class="{ 'login-card px-12': !isSmall, 'pt-10 pb-16 px-2': isSmall }"
            >
              <v-row>
                <v-col cols="12">
                <div class="text-center">
                <h1 
                :class="{ 'header-mobile-2': isSmall }" 
                style="font-family: Arial, Helvetica, sans-serif !important">Basic Profile Setup</h1>
                <h1 class="text-red-darken-4" 
                :class="{ 'header-mobile-2': isSmall }" 
                style="font-family: Arial, Helvetica, sans-serif !important">Step 3 of 4</h1>
                  </div>
                  <div style="height: 0.5px; background: black;" class="w-100 my-2"></div>
                </v-col>
                <v-col class="pb-16 pb-md-1" :cols="isSmall ? '12' : '6'">
                  <h1
                    class="mb-4"
                    style="font-family: Arial, Helvetica, sans-serif !important"
                    :class="{ 'header-mobile': isSmall }"
                  >
                    Where are you now ?
                  </h1>

                  <!-- <v-form fast-fail @submit.prevent="login"> -->
                    <p class="mb-2">Select Country</p>
                    <div class="w-75 mb-8 d-flex align-center">
                      <div
                        v-if="country"
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
                          :class="['fi-' + country.toLowerCase()]"
                        />
                      </div>
                      <MazSelect
                        v-slot="{ option }"
                        v-model="country"
                        item-height="40"
                        :options="options"
                        search
                        size="md"
                        class="w-100"
                        search-placeholder="Search in country"
                        :class="{ 'ml-n1': country }"
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
                    <div class="location-input mt-4 mb-8 w-75">
                      <v-combobox
                        v-model="city"
                        :items="resource.city"
                        variant="outlined"
                        label="--- Select City ---"
                        clearable
                        class="mt-n1"
                        density="compact"
                      />
                    </div>
                    <div style="display: none;">
                      <MazPhoneNumberInput
                        show-code-on-list
                        :default-country-code="
                          country
                        "
                        @update="phoneEvent = $event"
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
                    'w-25': !isSmall,
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
                    Where are you currently, which Country, City ?
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
import MazSelect from "maz-ui/components/MazSelect";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import axios from '@/util/axios';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'WhereAreYou',  
  components: {
    MazSelect,
    MazPhoneNumberInput
  },
  data() {
    return {      
      options: [
        { value: "SG", label: "Singapore" },
        { value: "BD", label: "Bangladesh" },
        { value: "IN", label: "India" },
        { value: "MY", label: "Malaysia" },
        { value: "GB", label: "United Kingdom" },
        { value: "PH", label: "Philippines" },
        { value: "AF", label: "Afghanistan" },
        { value: "AX", label: "Aland Islands" },
        { value: "AL", label: "Albania" },
        { value: "DZ", label: "Algeria" },
        { value: "AS", label: "American Samoa" },
        { value: "AD", label: "Andorra" },
        { value: "AO", label: "Angola" },
        { value: "AI", label: "Anguilla" },
        { value: "AQ", label: "Antarctica" },
        { value: "AG", label: "Antigua And Barbuda" },
        { value: "AR", label: "Argentina" },
        { value: "AM", label: "Armenia" },
        { value: "AW", label: "Aruba" },
        { value: "AU", label: "Australia" },
        { value: "AT", label: "Austria" },
        { value: "AZ", label: "Azerbaijan" },
        { value: "BS", label: "Bahamas" },
        { value: "BH", label: "Bahrain" },
        { value: "BB", label: "Barbados" },
        { value: "BY", label: "Belarus" },
        { value: "BE", label: "Belgium" },
        { value: "BZ", label: "Belize" },
        { value: "BJ", label: "Benin" },
        { value: "BM", label: "Bermuda" },
        { value: "BT", label: "Bhutan" },
        { value: "BO", label: "Bolivia" },
        { value: "BA", label: "Bosnia And Herzegovina" },
        { value: "BW", label: "Botswana" },
        { value: "BV", label: "Bouvet Island" },
        { value: "BR", label: "Brazil" },
        { value: "IO", label: "British Indian Ocean Territory" },
        { value: "BN", label: "Brunei Darussalam" },
        { value: "BG", label: "Bulgaria" },
        { value: "BF", label: "Burkina Faso" },
        { value: "BI", label: "Burundi" },
        { value: "KH", label: "Cambodia" },
        { value: "CM", label: "Cameroon" },
        { value: "CA", label: "Canada" },
        { value: "CV", label: "Cape Verde" },
        { value: "KY", label: "Cayman Islands" },
        { value: "CF", label: "Central African Republic" },
        { value: "TD", label: "Chad" },
        { value: "CL", label: "Chile" },
        { value: "CN", label: "China" },
        { value: "CX", label: "Christmas Island" },
        { value: "CC", label: "Cocos (Keeling) Islands" },
        { value: "CO", label: "Colombia" },
        { value: "KM", label: "Comoros" },
        { value: "CG", label: "Congo" },
        { value: "CD", label: "Congo, Democratic Republic" },
        { value: "CK", label: "Cook Islands" },
        { value: "CR", label: "Costa Rica" },
        { value: "CI", label: "Cote D'Ivoire" },
        { value: "HR", label: "Croatia" },
        { value: "CU", label: "Cuba" },
        { value: "CY", label: "Cyprus" },
        { value: "CZ", label: "Czech Republic" },
        { value: "DK", label: "Denmark" },
        { value: "DJ", label: "Djibouti" },
        { value: "DM", label: "Dominica" },
        { value: "DO", label: "Dominican Republic" },
        { value: "EC", label: "Ecuador" },
        { value: "EG", label: "Egypt" },
        { value: "SV", label: "El Salvador" },
        { value: "GQ", label: "Equatorial Guinea" },
        { value: "ER", label: "Eritrea" },
        { value: "EE", label: "Estonia" },
        { value: "ET", label: "Ethiopia" },
        { value: "FK", label: "Falkland Islands (Malvinas)" },
        { value: "FO", label: "Faroe Islands" },
        { value: "FJ", label: "Fiji" },
        { value: "FI", label: "Finland" },
        { value: "FR", label: "France" },
        { value: "GF", label: "French Guiana" },
        { value: "PF", label: "French Polynesia" },
        { value: "TF", label: "French Southern Territories" },
        { value: "GA", label: "Gabon" },
        { value: "GM", label: "Gambia" },
        { value: "GE", label: "Georgia" },
        { value: "DE", label: "Germany" },
        { value: "GH", label: "Ghana" },
        { value: "GI", label: "Gibraltar" },
        { value: "GR", label: "Greece" },
        { value: "GL", label: "Greenland" },
        { value: "GD", label: "Grenada" },
        { value: "GP", label: "Guadeloupe" },
        { value: "GU", label: "Guam" },
        { value: "GT", label: "Guatemala" },
        { value: "GG", label: "Guernsey" },
        { value: "GN", label: "Guinea" },
        { value: "GW", label: "Guinea-Bissau" },
        { value: "GY", label: "Guyana" },
        { value: "HT", label: "Haiti" },
        { value: "HM", label: "Heard Island & Mcdonald Islands" },
        { value: "VA", label: "Holy See (Vatican City State)" },
        { value: "HN", label: "Honduras" },
        { value: "HK", label: "Hong Kong" },
        { value: "HU", label: "Hungary" },
        { value: "IS", label: "Iceland" },
        { value: "ID", label: "Indonesia" },
        { value: "IR", label: "Iran, Islamic Republic Of" },
        { value: "IQ", label: "Iraq" },
        { value: "IE", label: "Ireland" },
        { value: "IM", label: "Isle Of Man" },
        { value: "IL", label: "Israel" },
        { value: "IT", label: "Italy" },
        { value: "JM", label: "Jamaica" },
        { value: "JP", label: "Japan" },
        { value: "JE", label: "Jersey" },
        { value: "JO", label: "Jordan" },
        { value: "KZ", label: "Kazakhstan" },
        { value: "KE", label: "Kenya" },
        { value: "KI", label: "Kiribati" },
        { value: "KR", label: "Korea" },
        { value: "KW", label: "Kuwait" },
        { value: "KG", label: "Kyrgyzstan" },
        { value: "LA", label: "Lao People's Democratic Republic" },
        { value: "LV", label: "Latvia" },
        { value: "LB", label: "Lebanon" },
        { value: "LS", label: "Lesotho" },
        { value: "LR", label: "Liberia" },
        { value: "LY", label: "Libyan Arab Jamahiriya" },
        { value: "LI", label: "Liechtenstein" },
        { value: "LT", label: "Lithuania" },
        { value: "LU", label: "Luxembourg" },
        { value: "MO", label: "Macao" },
        { value: "MK", label: "Macedonia" },
        { value: "MG", label: "Madagascar" },
        { value: "MW", label: "Malawi" },
        { value: "MV", label: "Maldives" },
        { value: "ML", label: "Mali" },
        { value: "MT", label: "Malta" },
        { value: "MH", label: "Marshall Islands" },
        { value: "MQ", label: "Martinique" },
        { value: "MR", label: "Mauritania" },
        { value: "MU", label: "Mauritius" },
        { value: "YT", label: "Mayotte" },
        { value: "MX", label: "Mexico" },
        { value: "FM", label: "Micronesia, Federated States Of" },
        { value: "MD", label: "Moldova" },
        { value: "MC", label: "Monaco" },
        { value: "MN", label: "Mongolia" },
        { value: "ME", label: "Montenegro" },
        { value: "MS", label: "Montserrat" },
        { value: "MA", label: "Morocco" },
        { value: "MZ", label: "Mozambique" },
        { value: "MM", label: "Myanmar" },
        { value: "NA", label: "Namibia" },
        { value: "NR", label: "Nauru" },
        { value: "NP", label: "Nepal" },
        { value: "NL", label: "Netherlands" },
        { value: "AN", label: "Netherlands Antilles" },
        { value: "NC", label: "New Caledonia" },
        { value: "NZ", label: "New Zealand" },
        { value: "NI", label: "Nicaragua" },
        { value: "NE", label: "Niger" },
        { value: "NG", label: "Nigeria" },
        { value: "NU", label: "Niue" },
        { value: "NF", label: "Norfolk Island" },
        { value: "MP", label: "Northern Mariana Islands" },
        { value: "NO", label: "Norway" },
        { value: "OM", label: "Oman" },
        { value: "PK", label: "Pakistan" },
        { value: "PW", label: "Palau" },
        { value: "PS", label: "Palestinian Territory, Occupied" },
        { value: "PA", label: "Panama" },
        { value: "PG", label: "Papua New Guinea" },
        { value: "PY", label: "Paraguay" },
        { value: "PE", label: "Peru" },
        { value: "PN", label: "Pitcairn" },
        { value: "PL", label: "Poland" },
        { value: "PT", label: "Portugal" },
        { value: "PR", label: "Puerto Rico" },
        { value: "QA", label: "Qatar" },
        { value: "RE", label: "Reunion" },
        { value: "RO", label: "Romania" },
        { value: "RU", label: "Russian Federation" },
        { value: "RW", label: "Rwanda" },
        { value: "BL", label: "Saint Barthelemy" },
        { value: "SH", label: "Saint Helena" },
        { value: "KN", label: "Saint Kitts And Nevis" },
        { value: "LC", label: "Saint Lucia" },
        { value: "MF", label: "Saint Martin" },
        { value: "PM", label: "Saint Pierre And Miquelon" },
        { value: "VC", label: "Saint Vincent And Grenadines" },
        { value: "WS", label: "Samoa" },
        { value: "SM", label: "San Marino" },
        { value: "ST", label: "Sao Tome And Principe" },
        { value: "SA", label: "Saudi Arabia" },
        { value: "SN", label: "Senegal" },
        { value: "RS", label: "Serbia" },
        { value: "SC", label: "Seychelles" },
        { value: "SL", label: "Sierra Leone" },
        { value: "SK", label: "Slovakia" },
        { value: "SI", label: "Slovenia" },
        { value: "SB", label: "Solomon Islands" },
        { value: "SO", label: "Somalia" },
        { value: "ZA", label: "South Africa" },
        { value: "GS", label: "South Georgia And Sandwich Isl." },
        { value: "ES", label: "Spain" },
        { value: "LK", label: "Sri Lanka" },
        { value: "SD", label: "Sudan" },
        { value: "SR", label: "Suriname" },
        { value: "SJ", label: "Svalbard And Jan Mayen" },
        { value: "SZ", label: "Swaziland" },
        { value: "SE", label: "Sweden" },
        { value: "CH", label: "Switzerland" },
        { value: "SY", label: "Syrian Arab Republic" },
        { value: "TW", label: "Taiwan" },
        { value: "TJ", label: "Tajikistan" },
        { value: "TZ", label: "Tanzania" },
        { value: "TH", label: "Thailand" },
        { value: "TL", label: "Timor-Leste" },
        { value: "TG", label: "Togo" },
        { value: "TK", label: "Tokelau" },
        { value: "TO", label: "Tonga" },
        { value: "TT", label: "Trinidad And Tobago" },
        { value: "TN", label: "Tunisia" },
        { value: "TR", label: "Turkey" },
        { value: "TM", label: "Turkmenistan" },
        { value: "TC", label: "Turks And Caicos Islands" },
        { value: "TV", label: "Tuvalu" },
        { value: "UG", label: "Uganda" },
        { value: "UA", label: "Ukraine" },
        { value: "AE", label: "United Arab Emirates" },
        { value: "US", label: "United States" },
        { value: "UM", label: "United States Outlying Islands" },
        { value: "UY", label: "Uruguay" },
        { value: "UZ", label: "Uzbekistan" },
        { value: "VU", label: "Vanuatu" },
        { value: "VE", label: "Venezuela" },
        { value: "VN", label: "Viet Nam" },
        { value: "VG", label: "Virgin Islands}, British" },
        { value: "VI", label: "Virgin Islands}, U.S." },
        { value: "WF", label: "Wallis And Futuna" },
        { value: "EH", label: "Western Sahara" },
        { value: "YE", label: "Yemen" },
        { value: "ZM", label: "Zambia" },
        { value: "ZW", label: "Zimbabwe" },
      ],
      country: null,
      city: null,
      phoneEvent: null,
        countryName: null,
      screenWidth: window.innerWidth,
      isSuccess: false,
      successMessage: '',
      resource: {
        countries: ['Singapore', 'India', 'Indonesia'],
        city: ['Singapore', 'India', 'Indonesia'],
        towns: ['Marine Drive', 'Delhi', 'Jakarta'],
      },
    };
  },
  computed: {
    isSmall() {
      return this.screenWidth < 640;
    },
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    country: function (newVal, oldVal) {
      const country = this.options.filter((o) => o.value === newVal)[0];
      //console.log(country?.label);
      this.countryName = country?.label;
      this.getCity(country?.label);
    },
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  mounted() {
    this.getCity()
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    saveData() {
      const payload = {
        // country_current: this.input.country.id,
        country_prefix: this.country,
        country_code: this.phoneEvent?.countryCallingCode
          ? `+${this.phoneEvent.countryCallingCode}`
          : "+65",
        current_country: this.countryName,
        current_city: this.city.title
          ? this.city.title
          : this.city,
        flag:
          "https://flagicons.lipis.dev/flags/4x3/" +
          this.country.toLowerCase() +
          ".svg",
      };
      //console.log(payload);
      //console.log(this.phoneEvent);
      const token = localStorage.getItem("token");
      if(this.country && this.city) {
      axios
        .post(`/gypsy-applicant/save-current-location`, payload, {
          headers: {
            Authorization: `Bearer ${
              token
            }`,
          },
        })
        .then((response) => {
          const data = response.data;
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
    getCity(country_name) {
      axios
        .get(`/city`)
        .then((response) => {
          const data = response.data.data;
          //console.log(data);
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
</style>
