import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { loadComponents } from "./config/vant";
loadComponents(Vue);

import "./styles/index.less";
import "./icons";
import "./filters/index";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
