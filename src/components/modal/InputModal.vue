<template>
  <modal
    name="InputModal"
    @before-open="beforeOpen"
    @before-close="beforeClose"
    :adaptive="true"
    height="auto"
    :scrollable="true"
  >
    <v-container>
      <v-toolbar flat>
        <v-spacer />
        <v-toolbar-title>
          {{ title }}
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <div v-for="input in inputs" :key="getId(input)">
        <div class="mb-2">
          <div v-if="checkType(input)">
            <TextInput :input="input" />
          </div>
          <div v-else>
            <LinkInput :input="input" />
          </div>
        </div>
      </div>
      <v-row>
        <Button
          class="ml-2"
          text="Markdown cheat sheet"
          :onClick="openCheatSheet"
        />
        <v-spacer />
        <Button class="mr-2" text="Submit" :onClick="submitClose" />
        <Button class="mr-2" text="Cancel" :onClick="close" color="error" />
      </v-row>
    </v-container>
  </modal>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import Button from "@/components/Button.vue";
import TextInput from "./TextInput.vue";
import LinkInput from "./LinkInput.vue";

import ModalInput from "@/models/ModalInput";
import UserInput, { UserInputText } from "@/models/UserInput";

@Component({
  components: {
    Button,
    TextInput,
    LinkInput,
  },
})
export default class InputModal extends Vue {
  title = "";
  inputs = new Array<UserInput>();
  onClose!: ((inputs: UserInput[]) => any) | undefined;
  saveText!: string[];
  cancel = true;

  beforeOpen({ params }: ModalInput) {
    this.title = params.title;
    this.inputs = params.inputs;
    this.onClose = params.onClose;
    this.cancel = true;

    this.saveText = this.inputs.map((i) => i.textInput);
  }

  resetText() {
    for (let i = 0; i < this.saveText.length; i++) {
      this.inputs[i].textInput = this.saveText[i];
    }
  }

  async submitClose() {
    this.cancel = false;

    if (this.onClose) await this.onClose(this.inputs);

    this.close();
  }

  close() {
    this.$modal.hide("InputModal");
  }

  beforeClose(event: any) {
    if (this.cancel === true && !this.checkDiff()) {
      if (confirm("Are you sure you want to exit without saving?")) {
        this.resetText();
      } else event.cancel();
    }
  }

  // Check if any changes have been made to the text since opening
  checkDiff() {
    for (let i = 0; i < this.saveText.length; i++) {
      if (this.saveText[i] !== this.inputs[i].textInput) return false;
    }

    return true;
  }

  getId(input: UserInput) {
    return input.id;
  }
  checkType(input: UserInput) {
    return input.type === "text";
  }

  openCheatSheet() {
    window.open(
      "https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet",
      "_blank"
    );
  }
}
</script>
