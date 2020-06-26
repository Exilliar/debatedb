<template>
  <v-app>
    <div v-if="!loading">
      <Header :version="version" />
      <v-content>
        <InputModal />
        <router-view />
      </v-content>
    </div>
    <div
      v-else
      style="height: 100vh"
      class="d-flex justify-center align-center"
    >
      <AuthLoadingCard />
    </div>
  </v-app>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import AuthLoadingCard from "./components/TheAuthLoadingCard.vue";
import Header from "./components/TheHeader.vue";
import InputModal from "./components/modal/InputModal.vue";

import Account from "./auth/models/Account";
import DebateTbl from "./db/elements/debateTbl";

@Component({
  components: { Header, InputModal, AuthLoadingCard },
})
export default class App extends Vue {
  version = "0.0.1";

  get loading() {
    return this.$auth.loading;
  }
}
</script>
