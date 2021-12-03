<template>
  <div
    :class="[
      { 'bg-dark': home, 'weather-forecast': !home },
      'navbar navbar-expand-sm navbar-light',
    ]"
    id="nav"
  >
    <router-link to="/" class="navbar-brand text-white">Weather</router-link>
    <search-input
      className="small"
      v-if="!home"
      :onSubmit="handleSearchInput"
    />
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
  </div>
  <div :class="[{ home: home }, 'py-5', 'content']">
    <router-view v-if="!loading" />
    <img
      v-else
      src="@/assets/loading-icon.gif"
      alt="loading image"
      class="loading-image"
    />
  </div>
  <footer class="">
    <p class="bg-dark text-white p-4">
      <span class="copyright" v-if="home">Copyright &copy; 2021</span>
      <span class="powered-by ml-4" v-else
        >Powered by
        <img src="@/assets/aw-logo.jpg" alt="accurate weather logo" width="120"
      /></span>
    </p>
  </footer>
</template>
<script>
import { mapGetters } from "vuex";
import SearchInput from "./components/SearchInput.vue";
export default {
  components: {
    SearchInput,
  },
  data() {
    return {
      home: true,
    };
  },
  computed: {
    ...mapGetters(["loading", "currentForecast", "city", "dailyForecasts"]),
  },
  watch: {
    $route(to) {
      this.home = to.path === "/" ? true : false;
    },
  },
  methods: {
    handleSearchInput(data) {
      this.$store.dispatch("getForecasts", { input: data }).then(() => {
        if (this.dailyForecasts.length) {
          this.$router.push({ name: "WeatherForcast" });
        } else {
          this.$router.push("/weather-forcast");
        }
      });
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}

#nav {
  padding: 15px;

  @media screen and (min-width: 1028px) {
    padding-left: 90px;
  }

  &.weather-forecast {
    background: url("assets/navbar.jpg") no-repeat center;
    background-size: cover;
  }

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  .small {
    @media screen and (min-width: 718px) {
      margin-left: 40px;
    }

    @media screen and (min-width: 816px) {
      margin-left: 80px;
    }

    @media screen and (min-width: 900px) {
      margin-left: 100px;
    }

    @media screen and (min-width: 1028px) {
      margin-left: 120px;
    }
  }
}

.content {
  background: #004466;

  &.home {
    background: url("assets/background.jpg") no-repeat center;
    background-size: cover;
  }

  .loading-image {
    padding: 125px 0 225px 0;
  }
}
</style>
