<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-chip style="font-size: 1.5em" v-on="on" pill outlined>
          <v-avatar left>
            <img v-if="picture" :src="picture" />
            <v-icon v-else>mdi-account-circle</v-icon>
          </v-avatar>
          {{ accountname }}
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
export default class AccountMenu extends Vue {
  get accountname() {
    return this.$auth.account.name;
  }
  get picture() {
    return this.$auth.account.picture;
  }

  logout() {
    this.$auth.logout({
      returnTo: window.location.origin,
    });
  }
}
</script>
