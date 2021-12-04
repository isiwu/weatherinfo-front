<template>
  <div class="home">
    <h1 class="title">Weather Info</h1>
    <search-input :onSubmit="handleSearchInput" />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchInput from "@/components/SearchInput.vue";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    SearchInput,
  },
  computed: {
    ...mapGetters(["currentForecast", "dailyForecasts"]),
  },
  methods: {
    handleSearchInput(input) {
      this.$store.dispatch("getForecasts", { input }).then(() => {
        if (this.dailyForecasts.length) {
          this.$router.push({ name: "WeatherForecast" });
        } else {
          this.$router.push(this.$route.path);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  padding: 75px 0 245px 0;
  .title {
    width: 40%;
    margin: 0 auto;
    color: #fff;
  }
}
</style>
