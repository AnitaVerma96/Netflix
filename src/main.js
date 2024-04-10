import App from "./App.vue";
import { createApp } from "vue";
import Routes from "./routes";
import store from "./store/index";
import { createRouter, createWebHistory } from "vue-router";

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: Routes,
});
export default router;
const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
