<template>
  <div class="day-forecast">
    <div class="title d-flex justify-content-between">
      <div class="day">
        <h4 :class="[{ 'text-success': index === 0 }, 'display-5']">
          {{ weeks[day] }}
        </h4>
      </div>
      <div class="date">
        <p :class="{ 'text-success': index === 0 }">{{ date }}</p>
      </div>
    </div>
    <p class="icon">
      <img
        v-if="index > 0"
        :src="`${publicPath}weather-icon-${forecast.Day.Icon}.png`"
        alt="weather icon"
        width="120"
      />
      <img
        v-else
        :src="`${publicPath}weather-icon-${currentForecast.WeatherIcon}.png`"
        width="120"
        alt="weather icon"
      />
    </p>
    <div class="temperature">
      <p v-if="index > 0" class="maximum p-0 mb-0">
        {{ fahrenheitToCelsius(forecast.Temperature.Maximum.Value) }}&deg;C
      </p>
      <p v-if="index === 0" class="maximum p-0 mb-0">
        {{ fahrenheitToCelsius(currentForecast.Temperature.Value) }}&deg;C
      </p>
      <p class="minimum p-0 mb-0">
        {{ fahrenheitToCelsius(forecast.Temperature.Minimum.Value) }}&deg;C
      </p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "WeatherDay",
  props: {
    forecast: Object,
    index: Number,
  },
  data() {
    return {
      weeks: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
      publicPath: process.env.BASE_URL,
    };
  },
  computed: {
    day() {
      return new Date(this.dateOnly()).getDay();
    },
    date() {
      return new Date(this.dateOnly()).toLocaleDateString();
    },
    ...mapGetters(["currentForecast"]),
  },
  created() {
    console.log(this.forecast);
  },
  methods: {
    fahrenheitToCelsius(fah) {
      const celsius = ((fah - 32) * 5) / 9;
      return parseInt(celsius);
    },
    dateOnly() {
      const indexOfT = this.forecast.Date.indexOf("T");
      return this.forecast.Date.slice(0, indexOfT);
    },
  },
};
</script>
<style lang="scss" scoped>
.day-forecast {
  //border-radius: 10px;

  .temperature .maximum {
    font-size: 1.5rem;
  }
}
</style>
