<template>
  <div>
    <div v-if="currentStep === 1">
      <InputEmail @nextStep="nextStep" />
    </div>
    <div v-else-if="currentStep === 2">
      <EmailVerification @nextStep="nextStep" @backStep="backStep" />
    </div>
    <div v-else-if="currentStep === 3">
      <PersonalDetails @nextStep="nextStep" @backStep="backStep" />
    </div>
    <div v-else-if="currentStep === 4">
      <AdditionalSecurity @nextStep="nextStep" @backStep="backStep" />
    </div>
    <div v-else-if="currentStep === 5">
      <WhereAreYou @nextStep="nextStep" @backStep="backStep" />
    </div>
    <div v-else-if="currentStep === 6">
      <AdditionalInformation @nextStep="nextStep" @backStep="backStep" />
    </div>
    <div v-else-if="currentStep === 7">
      <SelectSkills @nextStep="nextStep" @backStep="backStep" />
    </div>
    <div v-else-if="currentStep === 8">
      <SpecialisedPage @nextStep="nextStep" @backStep="backStep" />
    </div>
    <!--<div v-else-if="currentStep === 3">
      <Step3Component @nextStep="nextStep" />
    </div> -->
  </div>
</template>

<script>
import InputEmail from '@/components/SignUp/InputEmail.vue';
import EmailVerification from '@/components/SignUp/EmailVerification.vue';
import PersonalDetails from '@/components/SignUp/PersonalDetails.vue';
import AdditionalSecurity from '@/components/SignUp/AdditionalSecurity.vue';
import WhereAreYou from '@/components/SignUp/WhereAreYou.vue';
import AdditionalInformation from '@/components/SignUp/AdditionalInformation.vue';
import SelectSkills from '@/components/SignUp/SelectSkills.vue';
import SpecialisedPage from '@/components/SignUp/SpecialisedPage.vue';

export default {
  components: {
    InputEmail,
    EmailVerification,
    PersonalDetails,
    AdditionalSecurity,
    WhereAreYou,
    AdditionalInformation,
    SelectSkills,
    SpecialisedPage,
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
