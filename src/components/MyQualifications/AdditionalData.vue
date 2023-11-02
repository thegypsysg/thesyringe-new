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
                <div class="d-flex align-center">
                  <div
                        class="text-blue-darken-4 w-25"
                        :class="{
                          'login-btn-mobile': isSmall,
                        }"
                        style="
                          text-align: lefts;
                          cursor: pointer;
                          font-weight: 700;
                          font-size: 20px;
                        "
                        @click="backStep"
                      >
                        Back
                      </div>
                <h1 class="text-red-darken-4 w-75" 
                :class="{ 'header-mobile-2': isSmall }" 
                style="font-family: Arial, Helvetica, sans-serif !important">My Qualifications</h1>
              </div>
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
                    <h4 class="mb-2">Is this your very first Qualifications. ?</h4>
                    <div class="position-relative">
                      <v-radio-group class="w-100" @change="saveFirst" v-model="first" inline>
                        <v-radio
                          v-for="option in resource.first"
                          :key="option.value"
                          :label="option.label"
                          :value="option.value"
                          class="w-33 py-2"
                        >
                          <template #label>
                            <span class="font-weight-bold" style="line-height: 18px;">{{ option.label }}</span>
                            <!--  <v-card height="180" width="150" class="text-center" elevation="0">
                              <div style="height: 40px;">
                              </div>
                              <div class="img-cont">
                                <v-img cover height="100" :src="option.image"><template #placeholder>
                                  <div class="skeleton" /> </template
                              ></v-img>
                              </div>
                            </v-card>-->
                          </template> 
                        </v-radio>
                      </v-radio-group>
                    </div>
                    <h4 class="mb-2">Which University did you obtain this qualification. ?</h4>
                    <div class="d-flex mt-4 mb-8  align-center justify-space-between">
                    <div class="location-input w-75" :class="{'disabled-input': !isChangeUniversity}">
                      <v-autocomplete
                        v-model="university"
                        :disabled="!isChangeUniversity"
                        :items="resource.university"
                        variant="outlined"
                        item-value="label"
                        item-title="label"
                        label="--- Select University ---"
                        class="mt-n1"
                        density="compact"
                      />
                    </div>
                    <span
                    v-if="!isChangeUniversity"
                      class="text-blue-darken-4 mx-2"
                      style="cursor: pointer"
                      @click="isChangeUniversity = !isChangeUniversity"
                    >
                      Change
                    </span>
                      <v-btn
                      v-else
                      class="text-none text-subtitle-1"
                      color="success"
                      variant="flat"
                      @click="saveUniversity"
                      >
                        {{ isSave ? "Saving..." : 'Save' }}
                      </v-btn>
                  </div>
                    
                  <h4
                  class="mb-4"
                  style="font-family: Arial, Helvetica, sans-serif !important"
                >
                  Which Country did you obtain this Qualifications. ?
                </h4>

                <!-- <v-form fast-fail @submit.prevent="login"> -->
                  
                  <div class="d-flex mt-4 mb-8  align-center justify-space-between">
                  <div class="w-75 d-flex align-center" >
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
                      :disabled="!isChangeCountry"
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
                  <span
                    v-if="!isChangeCountry"
                      class="text-blue-darken-4 mx-2"
                      style="cursor: pointer"
                      @click="isChangeCountry = !isChangeCountry"
                    >
                      Change
                    </span>
                      <v-btn
                      v-else
                      class="text-none text-subtitle-1"
                      color="success"
                      variant="flat"
                      @click="saveCountry"
                      >
                      {{ isSave ? "Saving..." : 'Save' }}
                      </v-btn>
                      </div>
                    <h4 class="mb-2">Qualifications Name</h4>
                    <div class="d-flex mt-4 mb-8  align-center justify-space-between">
                    <div class="location-input w-75" :class="{'disabled-input': !isChangeQualification}">
                      <v-combobox
                      :disabled="!isChangeQualification"
                        v-model="qualification"
                        :items="resource.qualifications"
                        variant="outlined"
                        item-value="label"
                        item-title="label"
                        label="--- Select Qualification ---"
                        class="mt-n1"
                        density="compact"
                      />
                    </div>
                  <span
                  v-if="!isChangeQualification"
                    class="text-blue-darken-4 mx-2"
                    style="cursor: pointer"
                    @click="isChangeQualification = !isChangeQualification"
                  >
                    Change
                  </span>
                    <v-btn
                    v-else
                    class="text-none text-subtitle-1"
                    color="success"
                    variant="flat"
                    @click="saveQualification"
                    >
                    {{ isSave ? "Saving..." : 'Save' }}
                    </v-btn>
                    </div>
                    <h4>Year Passed</h4>
                    <div class="d-flex mt-4 mb-8 align-center">
                    <div class="location-input w-25" :class="{'disabled-input': !isChangeYear}">
                      <input
                        v-model="year"
                        :disabled="!isChangeYear"
                        class="pl-2"
                        type="number" pattern="/^-?\d+\.?\d*$/" onkeypress="if(this.value.length==4) return false;"
                        style="height: 37px"
                      />
                    </div>
                    <span
                  v-if="!isChangeYear"
                    class="text-blue-darken-4 ml-4 mr-2"
                    style="cursor: pointer"
                    @click="isChangeYear = !isChangeYear"
                  >
                    Change
                  </span>
                    <v-btn
                    v-else
                    class="text-none text-subtitle-1 ml-4"
                    color="success"
                    variant="flat"
                    @click="saveYear"
                    >
                    {{ isSave ? "Saving..." : 'Save' }}
                    </v-btn>
                    </div>

                    <div
                    class="d-flex align-center"
                    :class="{ matop: !isSmall, 'fixed-next w-100': isSmall }"
                  >
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
import MazSelect from "maz-ui/components/MazSelect";
import axios from '@/util/axios';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'WhereAreYou',
  components: {
    MazSelect,
  },
  data() {
    return {
      options: [
  { phoneNum: "+65", value: "SG", label: "Singapore" },
  { phoneNum: "+880", value: "BD", label: "Bangladesh" },
  { phoneNum: "+91", value: "IN", label: "India" },
  { phoneNum: "+60", value: "MY", label: "Malaysia" },
  { phoneNum: "+44", value: "GB", label: "United Kingdom" },
  { phoneNum: "+63", value: "PH", label: "Philippines" },
  { phoneNum: "+93", value: "AF", label: "Afghanistan" },
  { phoneNum: "+358", value: "AX", label: "Aland Islands" },
  { phoneNum: "+355", value: "AL", label: "Albania" },
  { phoneNum: "+213", value: "DZ", label: "Algeria" },
  { phoneNum: "+1", value: "AS", label: "American Samoa" },
  { phoneNum: "+376", value: "AD", label: "Andorra" },
  { phoneNum: "+244", value: "AO", label: "Angola" },
  { phoneNum: "+1", value: "AI", label: "Anguilla" },
  { phoneNum: "+672", value: "AQ", label: "Antarctica" },
  { phoneNum: "+1", value: "AG", label: "Antigua And Barbuda" },
  { phoneNum: "+54", value: "AR", label: "Argentina" },
  { phoneNum: "+374", value: "AM", label: "Armenia" },
  { phoneNum: "+297", value: "AW", label: "Aruba" },
  { phoneNum: "+61", value: "AU", label: "Australia" },
  { phoneNum: "+43", value: "AT", label: "Austria" },
  { phoneNum: "+994", value: "AZ", label: "Azerbaijan" },
  { phoneNum: "+1", value: "BS", label: "Bahamas" },
  { phoneNum: "+973", value: "BH", label: "Bahrain" },
  { phoneNum: "+1", value: "BB", label: "Barbados" },
  { phoneNum: "+375", value: "BY", label: "Belarus" },
  { phoneNum: "+32", value: "BE", label: "Belgium" },
  { phoneNum: "+501", value: "BZ", label: "Belize" },
  { phoneNum: "+229", value: "BJ", label: "Benin" },
  { phoneNum: "+1", value: "BM", label: "Bermuda" },
  { phoneNum: "+975", value: "BT", label: "Bhutan" },
  { phoneNum: "+591", value: "BO", label: "Bolivia" },
  { phoneNum: "+387", value: "BA", label: "Bosnia And Herzegovina" },
  { phoneNum: "+267", value: "BW", label: "Botswana" },
  { phoneNum: "N/A", value: "BV", label: "Bouvet Island" },
  { phoneNum: "+55", value: "BR", label: "Brazil" },
  { phoneNum: "N/A", value: "IO", label: "British Indian Ocean Territory" },
  { phoneNum: "+673", value: "BN", label: "Brunei Darussalam" },
  { phoneNum: "+359", value: "BG", label: "Bulgaria" },
  { phoneNum: "+226", value: "BF", label: "Burkina Faso" },
  { phoneNum: "+257", value: "BI", label: "Burundi" },
  { phoneNum: "+855", value: "KH", label: "Cambodia" },
  { phoneNum: "+237", value: "CM", label: "Cameroon" },
  { phoneNum: "+1", value: "CA", label: "Canada" },
  { phoneNum: "+238", value: "CV", label: "Cape Verde" },
  { phoneNum: "+1", value: "KY", label: "Cayman Islands" },
  { phoneNum: "+236", value: "CF", label: "Central African Republic" },
  { phoneNum: "+235", value: "TD", label: "Chad" },
  { phoneNum: "+56", value: "CL", label: "Chile" },
  { phoneNum: "+86", value: "CN", label: "China" },
  { phoneNum: "+61", value: "CX", label: "Christmas Island" },
  { phoneNum: "+61", value: "CC", label: "Cocos (Keeling) Islands" },
  { phoneNum: "+57", value: "CO", label: "Colombia" },
  { phoneNum: "+269", value: "KM", label: "Comoros" },
  { phoneNum: "+242", value: "CG", label: "Congo" },
  { phoneNum: "+243", value: "CD", label: "Congo, Democratic Republic" },
  { phoneNum: "+682", value: "CK", label: "Cook Islands" },
  { phoneNum: "+506", value: "CR", label: "Costa Rica" },
  { phoneNum: "+225", value: "CI", label: "Cote D'Ivoire" },
  { phoneNum: "+385", value: "HR", label: "Croatia" },
  { phoneNum: "+53", value: "CU", label: "Cuba" },
  { phoneNum: "+357", value: "CY", label: "Cyprus" },
  { phoneNum: "+420", value: "CZ", label: "Czech Republic" },
  { phoneNum: "+45", value: "DK", label: "Denmark" },
  { phoneNum: "+253", value: "DJ", label: "Djibouti" },
  { phoneNum: "+1", value: "DM", label: "Dominica" },
  { phoneNum: "+1", value: "DO", label: "Dominican Republic" },
  { phoneNum: "+593", value: "EC", label: "Ecuador" },
  { phoneNum: "+20", value: "EG", label: "Egypt" },
  { phoneNum: "+503", value: "SV", label: "El Salvador" },
  { phoneNum: "+240", value: "GQ", label: "Equatorial Guinea" },
  { phoneNum: "+291", value: "ER", label: "Eritrea" },
  { phoneNum: "+372", value: "EE", label: "Estonia" },
  { phoneNum: "+251", value: "ET", label: "Ethiopia" },
  { phoneNum: "+500", value: "FK", label: "Falkland Islands (Malvinas)" },
  { phoneNum: "+298", value: "FO", label: "Faroe Islands" },
  { phoneNum: "+679", value: "FJ", label: "Fiji" },
  { phoneNum: "+358", value: "FI", label: "Finland" },
  { phoneNum: "+33", value: "FR", label: "France" },
  { phoneNum: "+594", value: "GF", label: "French Guiana" },
  { phoneNum: "+689", value: "PF", label: "French Polynesia" },
  { phoneNum: "N/A", value: "TF", label: "French Southern Territories" },
  { phoneNum: "+241", value: "GA", label: "Gabon" },
  { phoneNum: "+220", value: "GM", label: "Gambia" },
  { phoneNum: "+995", value: "GE", label: "Georgia" },
  { phoneNum: "+49", value: "DE", label: "Germany" },
  { phoneNum: "+233", value: "GH", label: "Ghana" },
  { phoneNum: "+350", value: "GI", label: "Gibraltar" },
  { phoneNum: "+30", value: "GR", label: "Greece" },
  { phoneNum: "+299", value: "GL", label: "Greenland" },
  { phoneNum: "+1", value: "GD", label: "Grenada" },
  { phoneNum: "+590", value: "GP", label: "Guadeloupe" },
  { phoneNum: "+1", value: "GU", label: "Guam" },
  { phoneNum: "+502", value: "GT", label: "Guatemala" },
  { phoneNum: "+44", value: "GG", label: "Guernsey" },
  { phoneNum: "+224", value: "GN", label: "Guinea" },
  { phoneNum: "+245", value: "GW", label: "Guinea-Bissau" },
  { phoneNum: "+592", value: "GY", label: "Guyana" },
  { phoneNum: "+509", value: "HT", label: "Haiti" },
  { phoneNum: "N/A", value: "HM", label: "Heard Island & Mcdonald Islands" },
  { phoneNum: "+39", value: "VA", label: "Holy See (Vatican City State)" },
  { phoneNum: "+504", value: "HN", label: "Honduras" },
  { phoneNum: "+852", value: "HK", label: "Hong Kong" },
  { phoneNum: "+36", value: "HU", label: "Hungary" },
  { phoneNum: "+354", value: "IS", label: "Iceland" },
  { phoneNum: "+62", value: "ID", label: "Indonesia" },
  { phoneNum: "+98", value: "IR", label: "Iran, Islamic Republic Of" },
  { phoneNum: "+964", value: "IQ", label: "Iraq" },
  { phoneNum: "+353", value: "IE", label: "Ireland" },
  { phoneNum: "+44", value: "IM", label: "Isle Of Man" },
  { phoneNum: "+972", value: "IL", label: "Israel" },
  { phoneNum: "+39", value: "IT", label: "Italy" },
  { phoneNum: "+1", value: "JM", label: "Jamaica" },
  { phoneNum: "+81", value: "JP", label: "Japan" },
  { phoneNum: "+44", value: "JE", label: "Jersey" },
  { phoneNum: "+962", value: "JO", label: "Jordan" },
  { phoneNum: "+7", value: "KZ", label: "Kazakhstan" },
  { phoneNum: "+254", value: "KE", label: "Kenya" },
  { phoneNum: "+686", value: "KI", label: "Kiribati" },
  { phoneNum: "+82", value: "KR", label: "Korea" },
  { phoneNum: "+965", value: "KW", label: "Kuwait" },
  { phoneNum: "+996", value: "KG", label: "Kyrgyzstan" },
  { phoneNum: "+856", value: "LA", label: "Lao People's Democratic Republic" },
  { phoneNum: "+371", value: "LV", label: "Latvia" },
  { phoneNum: "+961", value: "LB", label: "Lebanon" },
  { phoneNum: "+266", value: "LS", label: "Lesotho" },
  { phoneNum: "+231", value: "LR", label: "Liberia" },
  { phoneNum: "+218", value: "LY", label: "Libyan Arab Jamahiriya" },
  { phoneNum: "+423", value: "LI", label: "Liechtenstein" },
  { phoneNum: "+370", value: "LT", label: "Lithuania" },
  { phoneNum: "+352", value: "LU", label: "Luxembourg" },
  { phoneNum: "+853", value: "MO", label: "Macao" },
  { phoneNum: "+389", value: "MK", label: "Macedonia" },
  { phoneNum: "+261", value: "MG", label: "Madagascar" },
  { phoneNum: "+265", value: "MW", label: "Malawi" },
  { phoneNum: "+960", value: "MV", label: "Maldives" },
  { phoneNum: "+223", value: "ML", label: "Mali" },
  { phoneNum: "+356", value: "MT", label: "Malta" },
  { phoneNum: "+692", value: "MH", label: "Marshall Islands" },
  { phoneNum: "+596", value: "MQ", label: "Martinique" },
  { phoneNum: "+222", value: "MR", label: "Mauritania" },
  { phoneNum: "+230", value: "MU", label: "Mauritius" },
  { phoneNum: "+262", value: "YT", label: "Mayotte" },
  { phoneNum: "+52", value: "MX", label: "Mexico" },
  { phoneNum: "+691", value: "FM", label: "Micronesia, Federated States Of" },
  { phoneNum: "+373", value: "MD", label: "Moldova" },
  { phoneNum: "+377", value: "MC", label: "Monaco" },
  { phoneNum: "+976", value: "MN", label: "Mongolia" },
  { phoneNum: "+382", value: "ME", label: "Montenegro" },
  { phoneNum: "+1", value: "MS", label: "Montserrat" },
  { phoneNum: "+212", value: "MA", label: "Morocco" },
  { phoneNum: "+258", value: "MZ", label: "Mozambique" },
  { phoneNum: "+95", value: "MM", label: "Myanmar" },
  { phoneNum: "+264", value: "NA", label: "Namibia" },
  { phoneNum: "+674", value: "NR", label: "Nauru" },
  { phoneNum: "+977", value: "NP", label: "Nepal" },
  { phoneNum: "+31", value: "NL", label: "Netherlands" },
  { phoneNum: "N/A", value: "AN", label: "Netherlands Antilles" },
  { phoneNum: "N/A", value: "NC", label: "New Caledonia" },
  { phoneNum: "+64", value: "NZ", label: "New Zealand" },
  { phoneNum: "+505", value: "NI", label: "Nicaragua" },
  { phoneNum: "+227", value: "NE", label: "Niger" },
  { phoneNum: "+234", value: "NG", label: "Nigeria" },
  { phoneNum: "+683", value: "NU", label: "Niue" },
  { phoneNum: "+672", value: "NF", label: "Norfolk Island" },
  { phoneNum: "+1", value: "MP", label: "Northern Mariana Islands" },
  { phoneNum: "+47", value: "NO", label: "Norway" },
  { phoneNum: "+968", value: "OM", label: "Oman" },
  { phoneNum: "+92", value: "PK", label: "Pakistan" },
  { phoneNum: "+680", value: "PW", label: "Palau" },
  { phoneNum: "N/A", value: "PS", label: "Palestinian Territory, Occupied" },
  { phoneNum: "+507", value: "PA", label: "Panama" },
  { phoneNum: "+675", value: "PG", label: "Papua New Guinea" },
  { phoneNum: "+595", value: "PY", label: "Paraguay" },
  { phoneNum: "+51", value: "PE", label: "Peru" },
  { phoneNum: "+870", value: "PN", label: "Pitcairn" },
  { phoneNum: "+48", value: "PL", label: "Poland" },
  { phoneNum: "+351", value: "PT", label: "Portugal" },
  { phoneNum: "+1", value: "PR", label: "Puerto Rico" },
  { phoneNum: "+974", value: "QA", label: "Qatar" },
  { phoneNum: "+262", value: "RE", label: "Reunion" },
  { phoneNum: "+40", value: "RO", label: "Romania" },
  { phoneNum: "+7", value: "RU", label: "Russian Federation" },
  { phoneNum: "+250", value: "RW", label: "Rwanda" },
  { phoneNum: "N/A", value: "BL", label: "Saint Barthelemy" },
  { phoneNum: "N/A", value: "SH", label: "Saint Helena" },
  { phoneNum: "N/A", value: "KN", label: "Saint Kitts And Nevis" },
  { phoneNum: "N/A", value: "LC", label: "Saint Lucia" },
  { phoneNum: "N/A", value: "MF", label: "Saint Martin" },
  { phoneNum: "N/A", value: "PM", label: "Saint Pierre And Miquelon" },
  { phoneNum: "N/A", value: "VC", label: "Saint Vincent And Grenadines" },
  { phoneNum: "+685", value: "WS", label: "Samoa" },
  { phoneNum: "+378", value: "SM", label: "San Marino" },
  { phoneNum: "+239", value: "ST", label: "Sao Tome And Principe" },
  { phoneNum: "+966", value: "SA", label: "Saudi Arabia" },
  { phoneNum: "+221", value: "SN", label: "Senegal" },
  { phoneNum: "+381", value: "RS", label: "Serbia" },
  { phoneNum: "+248", value: "SC", label: "Seychelles" },
  { phoneNum: "+232", value: "SL", label: "Sierra Leone" },
  { phoneNum: "+65", value: "SG", label: "Singapore" },
  { phoneNum: "+421", value: "SK", label: "Slovakia" },
  { phoneNum: "+386", value: "SI", label: "Slovenia" },
  { phoneNum: "+677", value: "SB", label: "Solomon Islands" },
  { phoneNum: "+252", value: "SO", label: "Somalia" },
  { phoneNum: "+27", value: "ZA", label: "South Africa" },
  { phoneNum: "N/A", value: "GS", label: "South Georgia And Sandwich Isl." },
  { phoneNum: "N/A", value: "ES", label: "Spain" },
  { phoneNum: "+94", value: "LK", label: "Sri Lanka" },
  { phoneNum: "+249", value: "SD", label: "Sudan" },
  { phoneNum: "+597", value: "SR", label: "Suriname" },
  { phoneNum: "+47", value: "SJ", label: "Svalbard And Jan Mayen" },
  { phoneNum: "+268", value: "SZ", label: "Swaziland" },
  { phoneNum: "+46", value: "SE", label: "Sweden" },
  { phoneNum: "+41", value: "CH", label: "Switzerland" },
  { phoneNum: "+963", value: "SY", label: "Syrian Arab Republic" },
  { phoneNum: "+886", value: "TW", label: "Taiwan" },
  { phoneNum: "+992", value: "TJ", label: "Tajikistan" },
  { phoneNum: "+255", value: "TZ", label: "Tanzania" },
  { phoneNum: "+66", value: "TH", label: "Thailand" },
  { phoneNum: "+670", value: "TL", label: "Timor-Leste" },
  { phoneNum: "+228", value: "TG", label: "Togo" },
  { phoneNum: "+690", value: "TK", label: "Tokelau" },
  { phoneNum: "+676", value: "TO", label: "Tonga" },
  { phoneNum: "+1", value: "TT", label: "Trinidad And Tobago" },
  { phoneNum: "+216", value: "TN", label: "Tunisia" },
  { phoneNum: "+90", value: "TR", label: "Turkey" },
  { phoneNum: "+993", value: "TM", label: "Turkmenistan" },
  { phoneNum: "+1", value: "TC", label: "Turks And Caicos Islands" },
  { phoneNum: "+688", value: "TV", label: "Tuvalu" },
  { phoneNum: "+256", value: "UG", label: "Uganda" },
  { phoneNum: "+380", value: "UA", label: "Ukraine" },
  { phoneNum: "+971", value: "AE", label: "United Arab Emirates" },
  { phoneNum: "+44", value: "GB", label: "United Kingdom" },
  { phoneNum: "+1", value: "US", label: "United States" },
  { phoneNum: "N/A", value: "UM", label: "United States Outlying Islands" },
  { phoneNum: "+598", value: "UY", label: "Uruguay" },
  { phoneNum: "+998", value: "UZ", label: "Uzbekistan" },
  { phoneNum: "+678", value: "VU", label: "Vanuatu" },
  { phoneNum: "+58", value: "VE", label: "Venezuela" },
  { phoneNum: "+84", value: "VN", label: "Vietnam" },
  { phoneNum: "+1", value: "VG", label: "Virgin Islands, British" },
  { phoneNum: "+1", value: "VI", label: "Virgin Islands, U.S." },
  { phoneNum: "+681", value: "WF", label: "Wallis And Futuna" },
  { phoneNum: "N/A", value: "EH", label: "Western Sahara" },
  { phoneNum: "+967", value: "YE", label: "Yemen" },
  { phoneNum: "+260", value: "ZM", label: "Zambia" },
  { phoneNum: "+263", value: "ZW", label: "Zimbabwe" }
      ],
      isSave: false,
      isLoading: false,
      isChangeUniversity: false,
      isChangeCountry: false,
      isChangeQualification: false,
      isChangeYear: false,
      first: null,
      university: null,
      country: null,
      countryCode: null,
        countryName: null,
      qualification: null,
      year: null,
      nationality: null,
      nationalityName: '',
      phoneEvent: null,
      phoneEvent2: null,
      screenWidth: window.innerWidth,
      isError: false,
      isSuccess: false,
      errorMessage: "",
      successMessage: "",
      resource: {
        qualifications: [],
        university: [],
        first: [
          {
            value: 'Y',
            label:'Yes'
          },
          {
            value: 'N',
            label:'No'
          },
        ]
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
      this.countryCode = country?.phoneNum;
    },
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  mounted() {
    this.getQualifications()
    this.getApplicantData()
    this.getUniversity()
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    saveFirst() {
      this.isSave = true;
      const payload = {
        first: this.first,
      };
      //console.log(payload);
      const token = localStorage.getItem("token");
      if(this.first) {
      axios
        .post(`/gypsy-applicant/save-qualification-first-status`, payload, {
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
          this.successMessage = "Success Save Is First Qualification";
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
        .finally(() => this.isSave = false);
      }
    },
    saveUniversity() {
      this.isSave = true;
      const payload = {
        partner_name: this.university,
      };
      //console.log(payload);
      const token = localStorage.getItem("token");
      if(this.university) {
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
          this.isChangeUniversity = false
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
        
        .finally(() => this.isSave = false);
      }
    },
    saveCountry() {
      this.isSave = true;
      const payload = {
        // country_current: this.input.country.id,
        qualification_country: this.countryName,
        qualification_country_prefix: this.country,
        qualification_country_code: this.countryCode,
        qualification_country_flag:
          "https://flagicons.lipis.dev/flags/4x3/" +
          this.country.toLowerCase() +
          ".svg",
      };
      //console.log(payload);
      //console.log(this.phoneEvent);
      const token = localStorage.getItem("token");
      if(this.country) {
      axios
        .post(`/gypsy-applicant/save-qualification-country`, payload, {
          headers: {
            Authorization: `Bearer ${
              token
            }`,
          },
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          this.isSuccess = true;
          this.successMessage = "Success save qualification country";
          this.isChangeCountry = false
        })
        .catch((error) => {
          console.log(error);
          const message =
            error.response.data.message === ""
              ? "Something Wrong!!!"
              : error.response.data.message;
          this.errorMessage = message;
          this.isError = true;
        })
        
        .finally(() => this.isSave = false);
      }
    },
    saveQualification() {
      this.isSave = true;
      const payload = {
        qualification_name: this.qualification.label ? this.qualification.label : this.qualification,
        year_passed: this.year.toString(),
      };
      //console.log(payload);
      const token = localStorage.getItem("token");
      if(this.qualification) {
      axios
        .post(`/gypsy-applicant/save-qualification`, payload, {
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
          this.successMessage = "Success Save Qualification";
          this.isChangeQualification = false
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
        
        .finally(() => this.isSave = false);
      }
    },
    saveYear() {
      this.isSave = true;
      const payload = {
        qualification_name: this.qualification.label ? this.qualification.label : this.qualification,
        year_passed: this.year.toString(),
      };
      //console.log(payload);
      const token = localStorage.getItem("token");
      const yearString  = this.year.toString()
      if(yearString.length == 4) {
      axios
        .post(`/gypsy-applicant/save-qualification`, payload, {
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
          this.successMessage = "Success Save Year Passed";
          this.isChangeYear = false
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
        
        .finally(() => this.isSave = false);
      }
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
          this.first = data.first == 'Y' ? 'Y' : data.first == 'N' ? 'N' : 'N';
          this.university = data.partner_name || '';
          this.country = data.qualifications_country_name ? this.options.filter(
            (i) => i.label == data.qualifications_country_name
            )[0].value : null;
          this.qualification = data.qualification_name || '';
          this.year = data.year_passed
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getUniversity() {
      this.isLoading = true;
      const token = localStorage.getItem("token");
      axios
        .get(`/university-list`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        )
        .then((response) => {
          const data = response.data.data;
          console.log(data);
          this.resource.university = data.map((item) => {
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
    getQualifications() {
      this.isLoading = true;
      const token = localStorage.getItem("token");
      axios
        .get(`/qualification-list`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        )
        .then((response) => {
          const data = response.data.data;
          console.log(data);
          this.resource.qualifications = data.sort((a,b) => a.qualification_name.localeCompare(b.qualification_name)).map((item) => {
            return {
              value: item.qualification_id || 1,
              label: item.qualification_name || '',
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

.disabled-input {
  background: #F2F2F2 !important;
}
</style>
