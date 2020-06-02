<template>
  <v-btn color="secondary" fab dark @click="add">
    <v-icon dark>mdi-plus</v-icon>
  </v-btn>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import UserInput, { UserInputLink, UserInputText } from "@/models/UserInput";

@Component
export default class AddSource extends Vue {
  @Prop() addSourceFunc!: (title: string, link: string, notes: string) => any;

  add() {
    const addTitle = "";
    const addLink = "";
    const addNotes = "";

    const addModalTitle: UserInputText = {
      id: 0,
      title: "Title",
      description: "Title of the source",
      textInput: addTitle,
      type: "text",
      markdown: false,
    };
    const addModalLink: UserInputLink = {
      id: 1,
      textInput: addLink,
      type: "link",
    };
    const addModalNotes: UserInputText = {
      id: 2,
      title: "Notes",
      description: "Some notes about the source",
      textInput: addNotes,
      type: "text",
      markdown: true,
    };

    const inputs: UserInput[] = [addModalTitle, addModalLink, addModalNotes];

    this.$modal.show("InputModal", {
      title: "Source",
      inputs: inputs,
      onClose: this.onClose,
    });
  }

  onClose(inputs: UserInput[]) {
    const title = inputs[0].textInput;
    const link = inputs[1].textInput;
    const notes = inputs[2].textInput;

    this.addSourceFunc(title, link, notes);
  }
}
</script>
