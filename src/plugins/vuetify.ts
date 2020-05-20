import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#3f51b5",
        secondary: "#4caf50",
        accent: "#ff5722",
        error: "#f44336",
        warning: "#ff9800",
        info: "#2196f3",
        success: "#4caf50",
      },
    },
  },
});
