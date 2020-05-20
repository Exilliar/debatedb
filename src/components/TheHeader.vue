<template>
  <v-app-bar app color="primary" dark hide-on-scroll>
    <v-toolbar-title>
      <div class="d-flex justify-md-space-around align-center">
        <span style="font-size: 1.2em" class="pr-1">DebateDB |</span>v{{
          version
        }}
      </div>
    </v-toolbar-title>

    <v-spacer />

    <span style="font-size: 1.5em">{{ userName }}</span>
  </v-app-bar>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import User from "@/models/User";

@Component
export default class Header extends Vue {
  @Prop() version!: string;
  @Prop() user!: User;

  get userName() {
    return this.user.name;
  }
}
</script>
