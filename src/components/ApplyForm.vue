<template>
  <div>
    <div v-if="currentStep === 1">
      <SelectQualifications @nextStep="nextStep" @backStep="backStep" />
    </div>
    <div v-else-if="currentStep === 2">
      <WhereAreYou @nextStep="nextStep" @backStep="backStep" />
    </div>
    <div v-else-if="currentStep === 3">
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
import WhereAreYou from '@/components/ApplyJob/WhereAreYou.vue';
import AdditionalInformation from '@/components/SignUp/AdditionalInformation.vue';
// import AdditionalSecurity from '@/components/SignUp/AdditionalSecurity.vue';
import SelectQualifications from '@/components/ApplyJob/SelectQualifications.vue';
import ResultRegister from './SignUp/ResultRegister.vue';

export default {
  components: {
    WhereAreYou,
    AdditionalInformation,
    SelectQualifications,
    ResultRegister
},
  data() {
    return {
      currentStep: 1,
    };
  },
  //mounted() {
  //  const applicantData = JSON.parse(localStorage.getItem('applicant_data'));
  //  console.log(applicantData);
  //  if(applicantData.sgm_id == null) {
  //    this.currentStep = 1;
  //  } else if(applicantData.sgm_id != null && applicantData.main_skills_id == null) {
  //    this.currentStep = 2;
  //  } else if (applicantData.sgm_id != null && applicantData.main_skills_id != null && (applicantData.current_country == null || applicantData.current_city == null)) {
  //    this.currentStep = 3;
  //  } else if (applicantData.sgm_id != null && applicantData.main_skills_id != null && applicantData.current_country != null && applicantData.current_city != null && (applicantData.born_country == null || applicantData.nationality == null)) {
  //    this.currentStep = 4;
  //  }
  //},
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
