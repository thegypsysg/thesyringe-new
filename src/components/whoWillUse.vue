<template>
  <v-container>
    <div class="sec-title mt-4">
      <h2><span>WHO WILL </span>USE</h2>
      <p>Everyone in Healthcare</p>
    </div>
    <v-row
      class="mb-8 d-flex justify-center"
      :class="{ 'flex-column': isSmall }"
    >
      <v-col :cols="!isSmall ? 3 : 12" v-for="(card, i) in cardItems" :key="i">
        <v-lazy :options="{ threshold: 0.5 }" min-height="400">
          <v-card class="mx-auto card-item" height="400" elevation="0">
            <v-img
              :src="card.img"
              height="100%"
              width="100%"
              class="card-image"
              cover
            >
              <template #placeholder> <div class="skeleton" /> </template
            ></v-img>
            <v-card-title class="card-title px-8">
              <h3 class="mb-4">{{ card.title }}</h3>
              <v-btn
                v-if="card.btnText == 'Signup / Register'"
                @click="loginGypsy"
                variant="flat"
                :color="card.btnColor"
                >{{ card.btnText }}</v-btn
              >
              <v-btn
                v-if="card.btnText == 'Open free acount'"
                @click="openFreeAccount"
                variant="flat"
                :color="card.btnColor"
                >{{ card.btnText }}</v-btn
              >
              <v-btn
                v-else
                @click="sendInquiry"
                variant="flat"
                :color="card.btnColor"
                >{{ card.btnText }}</v-btn
              >
            </v-card-title>
          </v-card>
        </v-lazy>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cardItems: [
        {
          img: require('@/assets/use-1.jpg'),
          title: 'Job Seekers',
          btnText: 'Signup / Register',
          btnColor: '#0596D5',
        },
        {
          img: require('@/assets/use-2.jpg'),
          title: 'Employers',
          btnText: 'Open free acount',
          btnColor: '#C82333',
        },
        {
          img: require('@/assets/use-3.jpg'),
          title: 'Agencies',
          btnText: 'Send Inquiry',
          btnColor: '#218838',
        },
      ],
      screenWidth: window.innerWidth,
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
    handleResize() {
      this.screenWidth = window.innerWidth;
    },
    previousSlideCategory() {
      this.activeIndexCategory--;
    },
    nextSlideCategory() {
      this.activeIndexCategory++;
    },
    loginGypsy() {
      this.$router.push('/sign-in');
      //const externalURL = `https://www.the-gypsy.sg/sign-in?app_id=${this.$appId}`;
      //window.location.href = externalURL;
      //axios
      //  .post(`/gypsy-login/google`, {
      //    app_id: 5,
      //  })
      //  .then((response) => {
      //    console.log(response);
      //    //if (response) {
      //    //  window.location.assign(response.data.target_url);
      //    //} else {
      //    //  window.location.href = "/sign-in";
      //    //}
      //    //console.log(response.data.target_url);
      //  })
      //  .catch((error) => {
      //    console.log(error);
      //    //window.location.href = "/sign-in";
      //  });
    },
    openFreeAccount() {
      window.location.href = `https://api.whatsapp.com/send?phone=+6589102000&text=The Syringe - New Employer Enquiry`;
    },
    sendInquiry() {
      window.location.href = `https://api.whatsapp.com/send?phone=+6589102000&text=The Syringe - New Employment Agency  Enquiry`;
    },
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  gap: 20px;
  width: 100%;
}

.card-item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-radius: 0;
  flex-grow: 1;
  width: 100%;
}

.card-image {
  position: absolute;
  transition: all 0.3s;
  top: 0;
  left: 0;
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
  transform: scale(1);
}

.card-item:hover .card-image {
  transform: scale(1.2);
}

.card-title {
  position: absolute;
  bottom: 5%;
  left: 100%;
  transform: translateX(-100%);
  color: white;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  text-align: left;
  width: 100%;
}

.card-tag {
  background: #fa2964;
  color: #ffffff;
  position: absolute;
  top: 10px;
  left: 0;
  padding: 5px 15px;
  font-size: 11px;
}

.skeleton {
  width: 100%;
  height: 100%;
  border-radius: 0;

  background: linear-gradient(-90deg, #f2f2f2 0%, #e1e1e1 50%, #f2f2f2 100%);
  background-size: 400% 400%;
  animation: skeleton 1.6s ease infinite;
}

@keyframes skeleton {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}

@media (max-width: 1279px) {
  .card-container {
    flex-wrap: wrap;
  }
}
</style>
