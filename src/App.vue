<template>
  <v-app>
    <Header :version="version" :user="user" />
    <v-content>
      <router-view />
      <Button text="example" />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import Header from "./components/TheHeader.vue";
import Button from "./components/TheButton.vue";

import User from "./models/User";

@Component({
  components: {
    Header,
    Button,
  },
})
export default class App extends Vue {
  user: User = {
    name: "userName",
  };
  version = "0.0.1";
}
</script>
