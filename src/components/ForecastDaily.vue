<template>
  <div class="daily-forecast pt-4">
    <h2 class="title pb-2 text-left">Daily Forecasts</h2>
    <div class="d-flex flex-wrap justify-content-between">
      <template v-for="(forecast, index) in dailyForecasts" :key="index">
        <forecast-day :forecast="forecast" :index="index" />
      </template>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ForecastDay from "./ForecastDay.vue";
export default {
  name: "WeatherDaily",
  components: { ForecastDay },
  computed: {
    ...mapGetters(["dailyForecasts"]),
  },
};
</script>
<style lang="scss" scoped>
.daily-forecast {
  width: 85%;
  margin: 0 auto;
  margin-top: 15px;
  border-radius: 15px;
  background: #fff;

  .title {
    padding-left: 40px;
  }

  .day-forecast {
    flex: auto;
    //margin-left: 10px;
    padding: 0 10px;
    border-left: 2px solid #000;

    @media screen and (max-width: 600px) {
      flex: 100%;
      max-width: 100%;
    }

    &:first-child {
      border-left: 0px;
      border-bottom-left-radius: 10px;
    }

    &:last-child {
      border-bottom-right-radius: 10px;
    }
  }
}
</style>
