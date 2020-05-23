<template>
  <v-card>
    <v-card-title>{{ input.title }}</v-card-title>
    <v-card-text>
      {{ input.description }}
      <br />
      This input
      <span v-if="input.markdown"><b>does</b></span>
      <span v-else><b>does not</b></span>
      support markdown

      <v-textarea outlined auto-grow v-model="input.textInput" />
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import UserInput from "../../models/UserInput";

@Component
export default class TextInput extends Vue {
  @Prop() input!: UserInput;
}
</script>
