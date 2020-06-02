<template>
  <AddButton :onClick="addViewCard" />
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import AddButton from "./AddButton.vue";

import UserInput, { UserInputText } from "@/models/UserInput";
import ViewCardData from "@/models/ViewCardData";

@Component({
  components: { AddButton },
})
export default class AddViewCardButton extends Vue {
  @Prop() type!: "debate" | "argument";
  @Prop() add!: (title: string, description: string) => any;

  title: UserInputText = {
    id: 0,
    title: "Title",
    description: "Title of the new " + this.type,
    markdown: false,
    type: "text",
    textInput: "",
  };
  description: UserInputText = {
    id: 1,
    title: "Description",
    description: "More info on the new " + this.type,
    markdown: false,
    type: "text",
    textInput: "",
  };

  addViewCard() {
    this.$modal.show("InputModal", {
      title: "New " + this.type,
      inputs: [this.title, this.description],
      onClose: this.onClose,
    });
  }

  onClose(inputs: UserInputText[]) {
    const title = inputs[0].textInput;
    const description = inputs[1].textInput;

    this.add(title, description);
  }
}
</script>
