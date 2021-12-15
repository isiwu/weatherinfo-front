<template>
  <div>
    <input
      type="text"
      name="search-input"
      :class="[{ small: className }, 'search-input']"
      v-model="input"
      @keyup.enter="handleSearchSubmit"
      placeholder="search city or location in nigeria"
    />
  </div>
</template>
<script>
export default {
  name: "SearchInput",
  props: {
    className: String,
    onSubmit: Function,
  },
  data() {
    return {
      input: "",
    };
  },
  methods: {
    handleSearchSubmit() {
      const redirectToHome = sessionStorage.getItem("redirectToHome");

      sessionStorage.setItem("lastSearch", this.input);
      if (redirectToHome) {
        sessionStorage.removeItem("redirectToHome");
      }
      this.onSubmit(this.input);
    },
  },
};
</script>
<style lang="scss" scoped>
.search-input {
  background: #fff url("../assets/search.png") no-repeat 8px 6px;
  width: 40%;
  margin: 3px auto;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 43px;
  border-radius: 25px;
  border: none;

  &:focus {
    outline: none;
  }
}
</style>
