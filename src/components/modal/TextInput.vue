<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      {{ description }}
      <br />
      This input
      <span v-if="markdown"><b>does</b></span>
      <span v-else><b>does not</b></span>
      support markdown

      <v-textarea outlined auto-grow v-model="textInput" />
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { UserInputText } from "../../models/UserInput";

@Component
export default class TextInput extends Vue {
  @Prop() input!: UserInputText;

  get title() {
    return this.input.title;
  }
  get description() {
    return this.input.description;
  }
  get markdown() {
    return this.input.markdown;
  }
  get textInput() {
    return this.input.textInput;
  }
  set textInput(t: string) {
    this.input.textInput = t;
  }
}
</script>
