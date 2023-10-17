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

export default {
  components: {
    WhereAreYou,
    AdditionalInformation,
    // AdditionalSecurity,
    SelectSkills,
    SpecialisedPage,
    ResultRegister
},
  data() {
    return {
      currentStep: 1,
    };
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
