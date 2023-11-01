<template>
  <div>
    <div v-if="currentStep === 1">
      <SelectStatus @nextStep="nextStep" @backStep="backStep" />
    </div>
    <div v-else-if="currentStep === 2">
      <EmployerData @nextStep="nextStep" @backStep="backStep" />
    </div>
    <div v-else-if="currentStep === 3">
      <AdditionalInformation @nextStep="nextStep" @backStep="backStep" />
    </div>
    <!-- <div v-else-if="currentStep === 4">
      <PersonalDetails @nextStep="nextStep" @backStep="backStep" />
    </div> -->
    <div v-else-if="currentStep === 4">
      <ResultRegister @nextStep="nextStep" @backStep="backStep" />
    </div>
  </div>
</template>

<script>
import EmployerData from '@/components/Check/EmployerData.vue';
import AdditionalInformation from '@/components/Check/AdditionalInformation.vue';
// import PersonalDetails from '@/components/Check/PersonalDetails.vue';
import SelectStatus from '@/components/Check/SelectStatus.vue';
// import SpecialisedPage from '@/components/Check/SpecialisedPage.vue';
import ResultRegister from './Check/ResultRegister.vue';
import app from '@/util/eventBus';

export default {
  components: {
    EmployerData,
    AdditionalInformation,
    SelectStatus,
    // PersonalDetails,
    ResultRegister
},
  data() {
    return {
      currentStep: 1,
    };
  },
  mounted() {
    const applicantData = JSON.parse(localStorage.getItem('applicant_data'));
    console.log(applicantData);
    if(applicantData.sgm_id == null) {
      this.currentStep = 1;
    } else if(applicantData.sgm_id != null && applicantData.main_skills_id == null) {
      this.currentStep = 2;
    } else if (applicantData.sgm_id != null && applicantData.main_skills_id != null && (applicantData.current_country == null || applicantData.current_city == null)) {
      this.currentStep = 3;
    } else if (applicantData.sgm_id != null && applicantData.main_skills_id != null && applicantData.current_country != null && applicantData.current_city != null && (applicantData.born_country == null || applicantData.nationality == null)) {
      this.currentStep = 4;
    }
  },
  unmounted() {
    app.config.globalProperties.$eventBus.$emit('getTrendingCardData2');
  },
  methods: {
    nextStep() {
      this.currentStep++;
    },
    backStep() {
      this.currentStep--;
    },
  },
};
</script>
