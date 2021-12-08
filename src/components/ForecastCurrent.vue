<template>
  <div :class="[{ small: small }, 'weather-info py-2 px-lg-4 mb-3 jumbotron']">
    <div class="title d-flex justify-content-between pt-3 pb-1">
      <h3 class="city">{{ city }} Weather</h3>
      <p class="date">{{ weeks[day] }} {{ date }}</p>
    </div>
    <div class="d-flex flex-wrap justify-content-center">
      <div class="icon">
        <div>
          <img
            :src="`${publicPath}weather-icon-${currentForecast.WeatherIcon}.png`"
            width="150"
            alt="weather icon"
          />
        </div>
        <div class="description font-weight-bold">
          <p>{{ currentForecast.IconPhrase }}</p>
        </div>
      </div>
      <div class="temperature">
        <div class="pb-1 font-weight-bold">
          {{ fahrenheitToCelsius(currentForecast.Temperature.Value) }}&deg;C
        </div>
        <p class="">
          FeelLike
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

  @media screen and (max-width: 730px) {
    padding: 0px 20px;
  }
  &.small {
    width: 30%;
    margin: 20px;
  }
  .icon {
    @media screen and (min-width: 768px) {
      padding-right: 40px;
    }
  }
  .temperature {
    @media screen and (min-width: 716px) {
      padding-top: 45px;
    }
  }
}
</style>
