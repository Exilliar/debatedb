<template>
  <v-btn color="secondary" fab dark @click="addViewCard">
    <v-icon dark>mdi-plus</v-icon>
  </v-btn>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import UserInput, { UserInputText } from "../models/UserInput";
import ViewCardData from "../models/ViewCardData";

@Component
export default class AddButton extends Vue {
  @Prop() type!: "debate" | "argument";
  @Prop() data!: ViewCardData[];
  @Prop() onClose!: (inputs: UserInputText[]) => any;

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

  // onClose() {
  //   const id = this.data[this.data.length - 1].id + 1;
  //   this.data.push({
  //     id: id,
  //     title: this.title.textInput,
  //     description: this.description.textInput,
  //     routeTo: this.type === "debate" ? "Arguments" : "Argument",
  //   });

  //   this.title.textInput = "";
  //   this.description.textInput = "";
  // }
}
</script>
