<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-chip style="font-size: 1.5em" v-on="on" pill outlined>
          <v-avatar left>
            <img v-if="picture" :src="picture" />
            <v-icon v-else>mdi-account-circle</v-icon>
          </v-avatar>
          {{ username }}
        </v-chip>
      </template>
      <v-list>
        <v-list-item @click="logout">
          <v-list-item-title>Log out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class UserMenu extends Vue {
  get username() {
    return this.$auth.user.name;
  }
  get picture() {
    return this.$auth.user.picture;
  }

  logout() {
    this.$auth.logout({
      returnTo: window.location.origin,
    });
  }
}
</script>
