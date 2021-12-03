<template>
  <div class="weather-forcast">
    <section>
      <forecast-current
        :city="city"
        :country="country"
        :currentForecast="currentForecast"
      />
    </section>
    <section>
      <weather-today :city="city" :currentForecast="currentForecast" />
    </section>
    <section>
      <forecast-daily />
    </section>
  </div>
</template>
<script>
import ForecastCurrent from "@/components/ForecastCurrent.vue";
import ForecastDaily from "@/components/ForecastDaily.vue";
import { mapGetters } from "vuex";
import WeatherToday from "@/components/WeatherToday.vue";
export default {
  name: "WeatherForecast",
  components: {
    ForecastCurrent,
    ForecastDaily,
    WeatherToday,
  },
  computed: {
    ...mapGetters(["currentForecast", "todayForecast", "city", "country"]),
  },
};
</script>
<style lang="scss" scoped>
.weather-day {
  width: 60%;
  margin: 0 auto;
}
</style>
