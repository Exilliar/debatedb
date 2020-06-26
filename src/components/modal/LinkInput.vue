<template>
  <v-card>
    <v-card-title>Link</v-card-title>
    <v-card-text>
      URL to the source
      <v-text-field outlined v-model="text" :rules="[noWhiteSpace]" />
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import { AccountInputLink } from "@/models/AccountInput";

@Component
export default class LinkInput extends Vue {
  @Prop() input!: AccountInputLink;

  get text() {
    return this.input.textInput;
  }
  set text(t: string) {
    this.input.textInput = t;
  }

  // rules
  noWhiteSpace(value: string) {
    return !value.includes(" ") || "Should not include spaces";
  }
}
</script>
