import { createApp } from "vue";
import "../src/assets/css/index.css";
import Kaffe from "./Kaffe.vue";
import VeeValidations from "./utils/validation.js";
import { ApolloClients } from "@vue/apollo-composable";
import { apolloClient } from "./utils/apollo.config.js";
import router from "./routes/routes.js";
import store from "./store/store";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const app = createApp(Kaffe).provide(ApolloClients, { default: apolloClient });
app.use(router);
app.use(store);
app.use(VeeValidations);
// app.use(VueToast);
app.mount("#app");
