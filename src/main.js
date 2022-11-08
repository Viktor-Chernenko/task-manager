import { createApp } from "vue";
import App from "./App.vue";
import bootstrap from "@/plugins/bootstrap";

const app = createApp(App);
app.config.unwrapInjectedRef = true;

app.provide(bootstrap);
app.mount("#app");
