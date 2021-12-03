<template>
  <div class="weather-today jumbotron p-0">
    <div class="title p-3">
      <h3>Weather Today in {{ city }}</h3>
    </div>
    <div class="d-flex justify-content-between flex-wrap">
      <div class="table-item table-item-1">
        <table class="table">
          <tr>
            <td class="text-left">Temperature</td>
            <td class="text-right">
              {{ fahrenheitToCelsius(currentForecast.Temperature.Value) }}&deg;C
            </td>
          </tr>
          <tr>
            <td class="text-left">Relative Humidity</td>
            <td class="text-right">{{ currentForecast.RelativeHumidity }}%</td>
          </tr>
          <tr>
            <td class="text-left">Visibility</td>
            <td class="text-right">
              {{ mileToKilometre(currentForecast.Visibility.Value) }}km
            </td>
          </tr>
        </table>
      </div>
      <div class="table-item">
        <table class="table">
          <tr>
            <td class="text-left">Wind Speed</td>
            <td class="text-right">
              {{ mileToKilometre(currentForecast.Wind.Speed.Value) }}km/h
            </td>
          </tr>
          <tr>
            <td class="text-left">Wind Direction</td>
            <td class="text-right">
              {{ currentForecast.Wind.Direction.Localized }}
            </td>
          </tr>
          <tr>
            <td class="text-left">Dew Point</td>
            <td class="text-right">
              {{ fahrenheitToCelsius(currentForecast.DewPoint.Value) }}&deg;C
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "WeatherToday",
  props: {
    currentForecast: Object,
    city: String,
  },
  methods: {
    fahrenheitToCelsius(fahren) {
      const celsius = ((fahren - 32) * 5) / 9;
      return parseInt(celsius);
    },
    mileToKilometre(mile) {
      const kilometre = mile * 1.609344;
      return parseInt(kilometre);
    },
  },
};
</script>
<style lang="scss" scoped>
.weather-today {
  border-radius: 15px;
  width: 45%;
  margin: 0 auto;
  background: #fff;

  .table-item {
    flex: 40%;
    margin-left: 40px;

    &.table-item-1 {
      margin-left: 0px;
    }
  }
}
</style>
