<template>
  <modal
    name="InputModal"
    @before-open="beforeOpen"
    :adaptive="true"
    height="auto"
    :scrollable="true"
  >
    <v-container>
      <v-toolbar flat>
        <v-spacer />
        <v-toolbar-title> {{ title }}</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <div v-for="input in inputs" :key="input.id">
        <v-card class="mb-2">
          <v-card-title>{{ input.title }}</v-card-title>
          <v-card-text>
            {{ input.description }}
            <br />
            This input
            <span v-if="input.markdown"><b>does</b></span>
            <span v-else><b>does not</b></span>
            support markdown

            <v-textarea outlined auto-grow v-model="input.textInput">
            </v-textarea>
          </v-card-text>
        </v-card>
      </div>
      <Button text="Submit" />
      <Button text="Cancel" :onClick="resetText" color="error" />
    </v-container>
  </modal>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import ModalInput from "@/models/ModalInput";
import UserInput from "@/models/UserInput";

import Button from "./TheButton.vue";

@Component({
  components: { Button },
})
export default class InputModal extends Vue {
  title = "";
  inputs = new Array<UserInput>();
  saveText = new Array<string>();

  beforeOpen({ params }: ModalInput) {
    // need to make it create new instances of the objects, so that the text doesn't start updating as the user is typing
    params = Object.create(params);
    this.title = params.title;
    this.inputs = params.inputs.map((i) => Object.create(i));

    this.saveText = this.inputs.map((i) => i.textInput);
  }

  resetText() {
    for (let i = 0; i < this.saveText.length; i++) {
      this.inputs[i].textInput = this.saveText[i];
    }
  }
}
</script>
