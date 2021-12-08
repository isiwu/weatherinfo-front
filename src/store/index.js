import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    currentForecast: {},
    dailyForecasts: [],
    city: "",
    country: "",
    loading: false,
    serverError: false,
  },
  mutations: {
    UPDATE_FORECASTS(state, payload) {
      for (const forecast in payload) {
        if (Object.hasOwnProperty.call(payload, forecast)) {
          state[forecast] = payload[forecast];
        }
      }
    },
    UPDATE_SEARCH_INPUT(state, payload) {
      state.city = payload;
    },
    LOADING_PENDING(state) {
      state.loading = true;
    },
    LOADING_COMPLETE(state) {
      state.loading = false;
    },
    UPDATE_SERVER_ERROR(state) {
      state.serverError = true;
    },
  },
  actions: {
    getForecasts({ commit }, payload) {
      console.log(payload);
      console.log(process.env.NODE_ENV);
      commit("LOADING_PENDING");
      return axios
        .get("/api/location/key", {
          params: { location: payload.input },
          withCredentials: true,
          baseURL: "https://weatherinfo-backend.herokuapp.com/",
        })
        .then((response) => {
          commit("UPDATE_FORECASTS", response.data);
          commit("UPDATE_SEARCH_INPUT", payload.input);
          commit("LOADING_COMPLETE");
        })
        .catch(() => {
          commit("UPDATE_SERVER_ERROR");
          commit("LOADING_COMPLETE");
        });
    },
  },
  getters: {
    currentForecast: (state) => state.currentForecast,
    dailyForecasts: (state) => state.dailyForecasts,
    city: (state) => {
      let inputWords = state.city.split(" ");
      inputWords = inputWords.map(
        (word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`
      );

      return inputWords.join(" ");
    },
    country: (state) => state.country,
    loading: (state) => state.loading,
    serverError: (state) => state.serverError,
  },
  modules: {},
});
