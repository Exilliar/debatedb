<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>
      <div class="d-flex justify-md-space-around align-center">
        <span style="font-size: 1.2em" class="pr-1">DebateDB |</span>
        v{{ version }}
      </div>
    </v-toolbar-title>

    <v-spacer />

    <AccountMenu />
  </v-app-bar>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import store from "@/store";

import AccountMenu from "./TheHeaderAccountMenu.vue";

import Account from "@/auth/models/Account";

@Component({
  components: { AccountMenu },
})
export default class Header extends Vue {
  @Prop() version!: string;
}
</script>
