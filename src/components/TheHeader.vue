<template>
  <v-app-bar app color="primary" dark hide-on-scroll>
    <v-toolbar-title>
      <div class="d-flex justify-md-space-around align-center">
        <span style="font-size: 1.2em" class="pr-1">DebateDB |</span>
        v{{ version }}
      </div>
    </v-toolbar-title>

    <v-spacer />

    <UserMenu />
  </v-app-bar>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import store from "@/store";

import UserMenu from "./TheHeaderUserMenu.vue";

import User from "@/auth/models/User";

@Component({
  components: { UserMenu },
})
export default class Header extends Vue {
  @Prop() version!: string;
}
</script>
