import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import "prismjs";
import { router } from "./router";
import { store } from "./store";
// import "prismjs/themes/prism-funky.css";
// import "prismjs/themes/prism-solarizedlight.css";
import "prismjs/themes/prism-tomorrow.css";

createApp(App).use(router).use(store).mount("#app");
