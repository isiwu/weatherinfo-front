<template>
  <nav
    :class="[
      { 'bg-dark': home, 'weather-forecast': !home },
      'navbar navbar-expand-sm navbar-light',
    ]"
    id="nav"
  >
    <router-link to="/" class="navbar-brand text-white">Weather</router-link>
    <search-input className="small" v-if="!home" :onSubmit="dispatchAction" />
  </nav>
  <div v-if="serverError" class="alert alert-danger">
    Server cannot be reached. Try again!
  </div>
  <main :class="[{ home: home }, 'py-5', 'content']">
    <router-view v-if="!loading" />
    <img
      v-else
      src="@/assets/loading-icon.gif"
      alt="loading image"
      class="loading-image"
    />
  </main>
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
    ...mapGetters([
      "loading",
      "currentForecast",
      "city",
      "dailyForecasts",
      "serverError",
    ]),
  },
  created() {
    const input = sessionStorage.getItem("lastSearch"),
      redirectToHome = sessionStorage.getItem("redirectToHome");

    if (input) {
      this.dispatchAction(input);
    } else if (redirectToHome) {
      this.$router.push({ name: "Home" });
    }
  },
  watch: {
    $route(to, from) {
      this.home = to.path === "/" ? true : false;

      if (from.path === "/weather-forecast") {
        sessionStorage.removeItem("lastSearch");
        sessionStorage.setItem("redirectToHome");
      }
    },
  },
  methods: {
    dispatchAction(data) {
      this.$store.dispatch("getForecasts", { input: data }).then(() => {
        if (this.dailyForecasts.length) {
          this.$router.push({ name: "WeatherForecast" });
        } else {
          this.$router.push({ name: "Home" });
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
    margin: 0 4px;

    @media screen and (min-width: 577px) and (max-width: 632px) {
      width: 400px;
    }

    @media screen and (min-width: 633px) {
      width: 500px;
    }

    @media screen and (min-width: 718px) {
      margin-left: 40px;
    }

    @media screen and (min-width: 816px) {
      margin-left: 80px;
    }

    @media screen and (min-width: 900px) {
      margin-left: 120px;
    }

    @media screen and (min-width: 1028px) {
      margin-left: 235px;
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
