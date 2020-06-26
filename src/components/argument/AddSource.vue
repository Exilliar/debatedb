<template>
  <AddButton :onClick="add" />
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import AddButton from "@/components/AddButton.vue";

import AccountInput, {
  AccountInputLink,
  AccountInputText,
} from "@/models/AccountInput";

@Component({
  components: { AddButton },
})
export default class AddSource extends Vue {
  @Prop() addSourceFunc!: (title: string, link: string, notes: string) => any;

  add() {
    const addTitle = "";
    const addLink = "";
    const addNotes = "";

    const addModalTitle: AccountInputText = {
      id: 0,
      title: "Title",
      description: "Title of the source",
      textInput: addTitle,
      type: "text",
      markdown: false,
    };
    const addModalLink: AccountInputLink = {
      id: 1,
      textInput: addLink,
      type: "link",
    };
    const addModalNotes: AccountInputText = {
      id: 2,
      title: "Notes",
      description: "Some notes about the source",
      textInput: addNotes,
      type: "text",
      markdown: true,
    };

    const inputs: AccountInput[] = [addModalTitle, addModalLink, addModalNotes];

    this.$modal.show("InputModal", {
      title: "Source",
      inputs: inputs,
      onClose: this.onClose,
    });
  }

  onClose(inputs: AccountInput[]) {
    const title = inputs[0].textInput;
    const link = inputs[1].textInput;
    const notes = inputs[2].textInput;

    this.addSourceFunc(title, link, notes);
  }
}
</script>
