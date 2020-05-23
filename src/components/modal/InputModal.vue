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
        <v-toolbar-title> {{ title }}</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <div v-for="input in inputs" :key="input.id">
        <div class="mb-2">
          <div v-if="input.type === 'text'">
            <TextInput :input="input" />
          </div>
          <div v-else>
            <LinkInput :input="input" />
          </div>
        </div>
      </div>
      <v-row>
        <v-spacer />
        <Button class="mr-2" text="Submit" :onClick="submitClose" />
        <Button
          class="mr-2"
          text="Cancel"
          :onClick="cancelClose"
          color="error"
        />
      </v-row>
    </v-container>
  </modal>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import ModalInput from "@/models/ModalInput";
import UserInput, { UserInputText } from "@/models/UserInput";

import Button from "./../TheButton.vue";
import TextInput from "./TextInput.vue";
import LinkInput from "./LinkInput.vue";

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
  saveText = new Array<string>();
  cancel = true;

  beforeOpen({ params }: ModalInput) {
    // need to make it create new instances of the objects, so that the text doesn't start updating as the user is typing
    params = Object.create(params);
    this.title = params.title;
    this.inputs = params.inputs.map((i) => Object.create(i));
    console.log(typeof this.inputs[0]);
    this.cancel = true;

    this.saveText = this.inputs.map((i) => i.textInput);
  }

  resetText() {
    for (let i = 0; i < this.saveText.length; i++) {
      this.inputs[i].textInput = this.saveText[i];
    }
  }

  submitClose() {
    this.cancel = false;
    this.close();
  }
  cancelClose() {
    if (this.cancel === true && !this.checkDiff()) {
      if (confirm("Are you sure you want to exit without saving?")) {
        this.resetText();
        this.close();
      }
    } else this.close();
  }

  close() {
    if (this.cancel === true) {
      this.resetText();
    }
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
  checkDiff(): boolean {
    for (let i = 0; i < this.saveText.length; i++) {
      if (this.saveText[i] !== this.inputs[i].textInput) return false;
    }

    return true;
  }
}
</script>
