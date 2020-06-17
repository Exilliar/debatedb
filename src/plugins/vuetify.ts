import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#003c85",
        secondary: "#0e6b2f",
        accent: "#61368a",
        error: "#ff0000",
        warning: "#ff9800",
        info: "#2196f3",
        success: "#4caf50",
      },
    },
  },
});
