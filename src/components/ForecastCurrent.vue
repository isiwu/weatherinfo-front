<template>
  <div :class="[{ small: small }, 'weather-info py-2 px-4 mb-3 jumbotron']">
    <div class="title d-flex justify-content-between pt-3 pb-1">
      <h3 class="city">{{ city }}, {{ country }} Weather</h3>
      <p class="date">{{ weeks[day] }} {{ date }}</p>
    </div>
    <div class="d-flex flex-wrap justify-content-center">
      <div class="icon pr-lg-5">
        <div>
          <img
            :src="`${publicPath}weather-icon-${currentForecast.WeatherIcon}.png`"
            width="150"
            alt="weather icon"
          />
        </div>
        <div class="description font-weight-bold">
          {{ currentForecast.IconPhrase }}
        </div>
        <p class="">
          Feel
          <span class="font-weight-bold">{{
            currentForecast.RealFeelTemperature.Phrase
          }}</span>
        </p>
      </div>
      <div class="pt-5">
        <div class="temperature p-1 font-weight-bolder">
          {{ fahrenheitToCelsius(currentForecast.Temperature.Value) }}&deg;C
        </div>
        <p class="">
          RealFeelTemperature
          <span class="font-weight-bold">
            {{
              fahrenheitToCelsius(currentForecast.RealFeelTemperature.Value)
            }}&deg;C</span
          >
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    small: String,
    currentForecast: Object,
    city: String,
    country: String,
  },
  data() {
    return {
      weeks: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
      day: "",
      date: "",
      publicPath: process.env.BASE_URL,
    };
  },
  created() {
    this.day = this.getDay();
    this.date = this.getDate();
  },
  watch: {
    currentForecast() {
      this.day = this.getDay();
      this.date = this.getDate();
    },
  },
  methods: {
    getDay() {
      return new Date(this.dateOnly()).getDay();
    },
    getDate() {
      return new Date(this.dateOnly()).toLocaleDateString();
    },
    dateOnly() {
      const indexOfT = this.currentForecast.DateTime.indexOf("T");
      return this.currentForecast.DateTime.slice(0, indexOfT);
    },
    fahrenheitToCelsius(fah) {
      const celsius = ((fah - 32) * 5) / 9;
      return parseInt(celsius);
    },
  },
};
</script>
<style lang="scss" scoped>
.weather-info {
  width: 45%;
  margin: 0px auto;
  border-radius: 20px;
  background: #fff;
  &.small {
    width: 30%;
    margin: 20px;
  }
  .icon {
    font-size: 6rem;
  }
}
</style>
