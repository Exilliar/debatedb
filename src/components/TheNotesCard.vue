<template>
  <v-container>
    <v-card>
      <v-card-title>General Notes</v-card-title>
      <v-card-text>
        <vue-markdown :source="body"> </vue-markdown>
      </v-card-text>
      <v-card-actions>
        <Button text="Edit" :onClick="edit" />
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import VueMarkdown from "vue-markdown";

import Button from "./Button.vue";

import InputModalInput from "@/models/InputModalInput";
import { UserInputText } from "@/models/UserInput";

@Component({
  components: { Button, VueMarkdown },
})
export default class NotesCard extends Vue {
  @Prop() body!: string;
  @Prop() viewOnEdit!: (text: string) => any;

  edit() {
    const input: UserInputText = {
      id: 0,
      title: "Notes",
      description: "General notes, does not need to be full sentences",
      markdown: true,
      textInput: this.text,
      type: "text",
    };

    const inputs = [input];

    this.$modal.show("InputModal", {
      title: "General Notes",
      inputs: inputs,
      onClose: this.onEdit,
    });
  }

  get text() {
    return this.body;
  }

  onEdit(inputs: UserInputText[]) {
    const text = inputs[0].textInput;

    this.viewOnEdit(text);
  }
}
</script>
