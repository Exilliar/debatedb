<template>
  <v-app>
    <div v-if="!loading">
      <Header :version="version" />
      {{ $store.state.user }}
      <v-content>
        <InputModal />
        <router-view />
      </v-content>
    </div>
    <div v-else>
      <p>Loading</p>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import store from "./store";

import Header from "./components/TheHeader.vue";

import InputModal from "./components/modal/InputModal.vue";

import User from "./models/User";

@Component({
  components: {
    Header,
    InputModal,
  },
})
export default class App extends Vue {
  version = "0.0.1";

  get loading() {
    return this.$auth.loading;
  }

  mounted() {
    console.log("this.store:", this.$store.state.user);
  }
}
</script>
