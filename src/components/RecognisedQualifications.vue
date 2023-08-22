<template>
  <v-container v-if="isLoading" class="text-center loading-page">
    <v-progress-circular :size="50" color="#fa2964" indeterminate />
  </v-container>
  <v-container v-if="!isLoading" class="banner-mobile mt-16 pt-16">
    <h5 class="recognised-title font-weight-black text-center py-2 mt-16 mb-10">
      List of Qualifications recognised in {{ countryRecognised }}
    </h5>
    <div class="regu-info" style="white-space: normal">
      <v-row>
        <v-col cols="3" class="regu-info-title font-weight-bold"
          >Profession</v-col
        >
        <v-col cols="8">
          <p
            style="font-size: 14px; font-weight: 600"
            class="text-blue-darken-4"
          >
            {{
              skillRecognised != '---Select Skills---'
                ? `${skillRecognised}`
                : '-'
            }}
          </p></v-col
        >
        <v-col cols="3" class="regu-info-title font-weight-bold"
          >Regulator</v-col
        >
        <v-col cols="8">
          <div class="">
            <p
              style="font-size: 14px; font-weight: 600"
              class="text-blue-darken-4"
            >
              {{ reguInfo.name }}
            </p>
          </div>
          <div class="">
            <p style="font-size: 12px; font-weight: 600" class="text-grey">
              {{
                reguInfo.city != '-' && reguInfo.town != '-'
                  ? reguInfo.town + ', ' + reguInfo.city
                  : reguInfo.city != '-'
                  ? reguInfo.city
                  : reguInfo.town != '-'
                  ? reguInfo.town
                  : '-'
              }}
            </p>
            <!-- <p style="font-size: 12px; font-weight: 600" class="text-grey">
              Marine Parade, Singapore
            </p> -->
          </div>
          <div style="font-size: 12px; font-weight: 600" class="">
            <!-- <a
              class="text-decoration-none"
              href="https://www.healthprofessional.go.id"
              >https://www.healthprofessional.go.id</a
            > -->
            <a class="text-decoration-none" :href="reguInfo.website">{{
              reguInfo.website
            }}</a>
          </div>
        </v-col>
      </v-row>
      <div class="d-flex mt-4">
        <div style="width: 43%">
          <span
            style="font-size: 12px; line-height: 8px !important"
            class="text-grey"
            >Which Country did you obtain your Physioterapist
            Qualifications</span
          >
        </div>
        <div style="57%" class="text-center d-flex justify-center mx-auto">
          <v-menu height="400" max-height="400">
            <template #activator="{ props }">
              <v-btn
                style="font-size: 12px; color: #8c8c8c; font-weight: 600"
                v-bind="props"
                variant="text"
              >
                {{ selectedCountry }}
                <v-icon right dark> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="selectedCountry = 'Show All'">
                <v-list-item-title>Show All</v-list-item-title>
              </v-list-item>
              <v-list-item
                v-for="(item, index) in country"
                :key="index"
                :value="index"
                @click="selectedCountry = item.title"
              >
                <!-- @click="changeItemSelected(item)" -->
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
      <v-sheet class="py-2 mt-4" width="100%">
        <v-row>
          <v-col cols="12">
            <v-table style="font-size: 12px" class="country-table">
              <thead>
                <tr>
                  <th class="text-left font-weight-bold text-black">Country</th>
                  <th class="text-left font-weight-bold text-black">
                    Body Granting / Qualifications
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in filteredQual"
                  :key="index"
                  class="font-weight-bold"
                >
                  <td
                    style="border-bottom: none !important"
                    class="d-flex align-start text-red-darken-4 mt-2"
                  >
                    {{ item.countryGroup }}
                  </td>
                  <td style="border-bottom: none !important">
                    <template
                      v-for="(list, indexList) in item.list"
                      :key="indexList"
                    >
                      <div class="d-flex flex-column">
                        <p class="text-red-darken-4 my-2">
                          {{ list.partner_name }}
                        </p>
                        <div
                          v-for="(qual, indexQual) in list.qualifications"
                          :key="indexQual"
                        >
                          <p class="">{{ qual.qualification_name }}</p>
                        </div>
                      </div>
                    </template>
                  </td>
                </tr>
                <!-- <tr v-if="isLoading">
                  <td :colspan="6" class="text-center">
                    <v-progress-circular
                      indeterminate
                      color="indigo-accent-2"
                    ></v-progress-circular>
                  </td>
                </tr> -->
              </tbody>
            </v-table>
          </v-col>
        </v-row>
      </v-sheet>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import app from '@/util/eventBus';
import axios from '@/util/axios';
import _ from 'lodash';

export default {
  data() {
    return {
      isLoading: false,
      reguInfo: {},
      qualInfo: [],
      country: [],
      selectedCountry: '---Select Country---',
    };
  },
  computed: {
    ...mapState(['countryRecognised']),
    ...mapState(['idCountryRecognised']),
    ...mapState(['skillRecognised']),
    ...mapState(['idSkillRecognised']),
    filteredQual() {
      if (
        this.selectedCountry == '---Select Country---' ||
        this.selectedCountry == 'Show All' ||
        this.selectedCountry == ''
      ) {
        return this.qualInfo;
      }
      const searchTextLower = this.selectedCountry.toLowerCase();
      return this.qualInfo.filter((item) =>
        item.countryGroup.toLowerCase().includes(searchTextLower)
      );
    },
  },
  mounted() {
    this.checkRecognised();
    this.getCountry();
    this.getRegulatorInfo();
    this.getQualificationInfo();
    app.config.globalProperties.$eventBus.$on(
      'getRegulatorInfo',
      this.getRegulatorInfo
    );
    app.config.globalProperties.$eventBus.$on(
      'getQualificationInfo',
      this.getQualificationInfo
    );
  },
  beforeUnmount() {
    app.config.globalProperties.$eventBus.$off(
      'getRegulatorInfo',
      this.getRegulatorInfo
    );
    app.config.globalProperties.$eventBus.$off(
      'getQualificationInfo',
      this.getQualificationInfo
    );
  },
  methods: {
    checkRecognised() {
      app.config.globalProperties.$eventBus.$emit(
        'getRegistrableCountrySkills'
      );
    },
    getRegulatorInfo() {
      this.isLoading = true;
      axios
        .get(
          `/registrable-country/get-regulator-info/country/${this.idCountryRecognised}/skill/${this.idSkillRecognised}`
        )
        .then((response) => {
          const data = response.data.data;
          console.log(data);
          this.reguInfo = {
            city: data?.city_name || '',
            name: data?.partner_name || '-',
            town: data?.town_name || '',
            address: `${data?.town_name}, ${data?.city_name}`,
            website: data?.website || '-',
          };
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getQualificationInfo() {
      this.isLoading = true;
      axios
        .get(
          `/courses/qualifications-info/skill/${this.idSkillRecognised}/country/${this.idCountryRecognised}`
        )
        .then((response) => {
          const data = response.data.data;
          const groupedByCountry = _.groupBy(data, 'country_name');

          this.qualInfo = _.map(groupedByCountry, (list, countryGroup) => {
            return {
              countryGroup,
              list,
            };
          });
          console.log(this.qualInfo);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getCountry() {
      this.isLoading = true;
      axios
        .get(`/country`)
        .then((response) => {
          const data = response.data.data;
          // console.log(data);
          this.country = data.map((country) => {
            return {
              id: country.country_id,
              title: country.country_name,
              oneCity: country.one_city == 'Y' ? true : false,
              path: '#',
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
  },
};
</script>

<style lang="scss" scoped>
.recognised-title {
  border: 1px solid black;
}

.regu-info-title::after {
  content: ':';
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
