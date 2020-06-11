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

import { UserInputLink } from "@/models/UserInput";

@Component
export default class LinkInput extends Vue {
  @Prop() input!: UserInputLink;

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
