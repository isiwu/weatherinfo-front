import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import WeatherForcast from "../views/WeatherForcast.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/weather-forcast",
    name: "WeatherForcast",
    component: WeatherForcast,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
