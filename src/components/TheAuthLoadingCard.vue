<template>
  <v-card>
    <v-card-title class="justify-center">Loading</v-card-title>
    <v-card-text class="text-center">
      <div class="pa-2">Loggin in. This shouldn't take long...</div>
      <div class="pa-2">
        If this takes longer than 15 seconds press
      </div>
      <Button text="here" :onClick="login" />
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import Button from "./Button.vue";

@Component({
  components: { Button },
})
export default class AuthLoadingCard extends Vue {
  login() {
    this.$auth.loginWithRedirect();
  }
}
</script>
