<template>
  <v-app>
    <TheHeader :version="version" :user="user" />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import TheHeader from "./components/TheHeader.vue";
import User from "./models/User";

@Component({
  components: {
    TheHeader,
  },
})
export default class App extends Vue {
  user: User = {
    name: "userName",
  };
  version = "0.0.1";
}
</script>
