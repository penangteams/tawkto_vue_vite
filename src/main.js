/** @format */

import { createApp } from "vue";
import "./style.css";
import "./index.css";
import App from "./App.vue";
import router from "./router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import VueSplide from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css/sea-green";

import {
  faSearch,
  faChevronRight,
  faPlay,
  faComment,
  faDesktop,
  faLink,
  faGem,
  faCode,
  faShoppingCart,
  faCircle,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faPlay,
  faChevronRight,
  faComment,
  faDesktop,
  faLink,
  faGem,
  faCode,
  faSearch,
  faShoppingCart,
  faCircle,
  faStickyNote
);

createApp(App)
  .use(router)
  .use(VueSplide)
  .component("ficon", FontAwesomeIcon)
  .mount("#app");
