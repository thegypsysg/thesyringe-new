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
                <v-col :cols="isSmall ? '12' : '6'">
                  <h1
                    class="mb-4"
                    style="font-family: Arial, Helvetica, sans-serif !important"
                    :class="{ 'header-mobile': isSmall }"
                  >
                    Work Authorization
                  </h1>

                  <v-form fast-fail @submit.prevent="login">
                    <p class="mb-2 w-75 d-flex justify-space-between"><span>Home Country</span><span class="text-red">Singapore</span></p>

                    <div class="location-input mt-4 mb-8 w-75">
                      <v-combobox
                        v-model="city"
                        :items="resource.city"
                        variant="outlined"
                        label="--- Im a ---"
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

                    <div class="d-flex align-center">
                      <v-btn
                        type="submit"
                        variant="outlined"
                        class="login-btn"
                        :class="{
                          'w-66 login-btn-mobile': isSmall,
                          'w-75': !isSmall,
                        }"
                        @click="nextStep"
                      >
                        Next
                      </v-btn>
                      <div
                        :class="{
                          'w-33 login-btn-mobile': isSmall,
                          'w-25': !isSmall,
                        }"
                        style="
                          text-align: center;
                          cursor: pointer;
                          color: #2b0087;
                          font-weight: 700;
                          font-size: 20px;
                        "
                        @click="backStep"
                      >
                        Back
                      </div>
                    </div>
                  </v-form>
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
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'WhereAreYou',  
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
      town: null,
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
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
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
