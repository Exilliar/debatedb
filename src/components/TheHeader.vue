<template>
  <v-app-bar app color="primary" dark hide-on-scroll>
    <v-toolbar-title>
      <div class="d-flex justify-md-space-around align-center">
        <span style="font-size: 1.2em" class="pr-1">DebateDB |</span>
        v{{ version }}
      </div>
    </v-toolbar-title>

    <v-spacer />

    <span v-if="isAuthenticated">
      <Button text="Log out" :onClick="logout" />
    </span>

    <v-spacer />

    <span style="font-size: 1.5em">{{ username }}</span>
  </v-app-bar>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import store from "@/store";

import Button from "@/components/Button.vue";

import User from "@/auth/models/User";

@Component({
  components: { Button },
})
export default class Header extends Vue {
  @Prop() version!: string;

  get isAuthenticated() {
    return this.$auth.isAuthenticated;
  }
  get username() {
    return this.$auth.user.name;
  }

  logout() {
    this.$auth.logout({
      returnTo: window.location.origin,
    });
  }
}
</script>
