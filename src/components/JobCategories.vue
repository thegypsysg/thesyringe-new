<template>
  <v-container>
    <div class="sec-title mt-4">
      <h2><span>JOB </span>Categories</h2>
      <p>What Job are you looking for ?</p>
    </div>
    <div class="job-categories d-flex align-center mb-8">
      <div class="job-categories-title">
        <h1>Go beyond your imagination</h1>
        <div class="line-divider my-3" />
        <p>Discover your ideal experience with us</p>
      </div>
      <v-lazy :options="{ threshold: 0.5 }" min-height="270">
        <v-card class="job-categories-item" elevation="0">
          <v-img
            min-width="270"
            min-height="370"
            cover
            class="job-categories-item-img"
            src="@/assets/nurse.png"
            transition="fade-transition"
          >
            <template #placeholder>
              <div class="skeleton" />
            </template>
          </v-img>
          <span class="job-categories-info">Nursing</span>
          <div class="job-categories-link" />
        </v-card>
      </v-lazy>
      <v-lazy :options="{ threshold: 0.5 }" min-height="130">
        <v-card class="job-categories-item" elevation="0">
          <v-img
            min-width="270"
            min-height="370"
            cover
            class="job-categories-item-img"
            src="@/assets/doctor-jobs.jpg"
            transition="fade-transition"
          >
            <template #placeholder>
              <!-- <v-row align="center" class="fill-height ma-0" justify="center">
                <v-skeleton-loader />
              </v-row> -->
              <div class="skeleton" />
            </template>
          </v-img>
          <span class="job-categories-info">Medical / Doctors</span>
          <div class="job-categories-link" />
        </v-card>
      </v-lazy>
      <v-lazy :options="{ threshold: 0.5 }" min-height="130">
        <v-card class="job-categories-item" elevation="0">
          <v-img
            min-width="270"
            min-height="370"
            cover
            class="job-categories-item-img"
            src="@/assets/imaging.jpg"
            transition="fade-transition"
          >
            <template #placeholder>
              <!-- <v-row align="center" class="fill-height ma-0" justify="center">
                <v-skeleton-loader type="image" />
              </v-row> -->
              <div class="skeleton" />
            </template>
          </v-img>
          <div class="job-categories-info">Alied Health</div>
          <div class="job-categories-link" />
        </v-card>
      </v-lazy>
    </div>
    <div class="w-100 d-flex justify-center mb-4">
      <a href="#" class="btn btn-outline-light"
        >View All <i class="fa fa-circle-arrow-right"></i
      ></a>
    </div>
  </v-container>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'JobCategories',
};
</script>

<style scoped>
.job-categories {
  gap: 20px;
}
.job-categories-title {
  max-width: 300px;
}

@media screen and (max-width: 1170px) {
  .job-categories-title {
    max-width: 200px;
  }
}

.job-categories-title h1 {
  font-weight: 500;
  width: 250px;
}
.job-categories-title p {
  color: #5f5f5f;
}

.line-divider {
  height: 1px;
  width: 150px;
  background: rgb(107, 107, 107);
}

.job-categories-item {
  position: relative;
  overflow: hidden;
  border-radius: 5px !important;
}
.job-categories-item-img {
  transition: all 0.3s;
  transform: scale(1);
  object-fit: cover !important;
  object-position: center !important;
  width: 100% !important;
  height: auto !important;
}

.job-categories-item:hover .job-categories-item-img {
  transform: scale(1.2);
}

.job-categories-info {
  position: absolute;
  bottom: 20px;
  color: white;
  z-index: 100;
  font-size: 20px;
  font-weight: 300;
  text-align: center;
  width: 100%;
}

.job-categories-item:hover .job-categories-info {
  font-weight: 500;
}

.job-categories-link {
  background: rgba(0, 0, 0, 0.429);
  -webkit-transition: all 0.4s;
  transition: all 0.4s;
  height: 70px;
  width: 100%;
  position: absolute;
  bottom: -100px;
}

.job-categories-item:hover .job-categories-link {
  bottom: 0;
}

.skeleton {
  width: 100%;
  height: 100%;
  border-radius: 20px;
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
</style>
