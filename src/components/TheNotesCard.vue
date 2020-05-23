<template>
  <v-container>
    <v-card>
      <v-card-title>General Notes</v-card-title>
      <v-card-text>
        <vue-markdown :source="text"> </vue-markdown>
      </v-card-text>
      <v-card-actions>
        <Button text="Edit" :onClick="edit" />
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import Button from "./TheButton.vue";
import VueMarkdown from "vue-markdown";
import ModalInput from "../models/ModalInput";
import { UserInputText } from "../models/UserInput";

@Component({
  components: { Button, VueMarkdown },
})
export default class NotesCard extends Vue {
  @Prop() body!: string;

  input: UserInputText = {
    id: 0,
    title: "Notes",
    description: "",
    markdown: true,
    textInput: this.body,
    type: "text",
  };

  modalData: ModalInput = {
    params: {
      title: "General Notes",
      inputs: [this.input],
    },
  };

  edit() {
    this.$modal.show("InputModal", {
      title: this.modalData.params.title,
      inputs: this.modalData.params.inputs,
    });
  }

  get text() {
    return this.input.textInput;
  }
}
</script>
