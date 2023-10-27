<template>
  <div>
    <div v-if="currentStep === 1">
      <SelectSkills @nextStep="nextStep" @backStep="backStep" />
    </div>
    <div v-else-if="currentStep === 2">
      <SpecialisedPage @nextStep="nextStep" @backStep="backStep" />
    </div>
    <div v-else-if="currentStep === 3">
      <WhereAreYou @nextStep="nextStep" @backStep="backStep" />
    </div>
    <div v-else-if="currentStep === 4">
      <AdditionalInformation @nextStep="nextStep" @backStep="backStep" />
    </div>
    <!-- <div v-else-if="currentStep === 5">
      <AdditionalSecurity @nextStep="nextStep" @backStep="backStep" />
    </div> -->
    <div v-else-if="currentStep === 5">
      <ResultRegister @nextStep="nextStep" @backStep="backStep" />
    </div>
  </div>
</template>

<script>
import WhereAreYou from '@/components/SignUp/WhereAreYou.vue';
import AdditionalInformation from '@/components/SignUp/AdditionalInformation.vue';
// import AdditionalSecurity from '@/components/SignUp/AdditionalSecurity.vue';
import SelectSkills from '@/components/SignUp/SelectSkills.vue';
import SpecialisedPage from '@/components/SignUp/SpecialisedPage.vue';
import ResultRegister from './SignUp/ResultRegister.vue';
import app from '@/util/eventBus';

export default {
  components: {
    WhereAreYou,
    AdditionalInformation,
    SelectSkills,
    SpecialisedPage,
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
