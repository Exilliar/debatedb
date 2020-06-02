<template>
  <v-container>
    <v-card>
      <v-card-title class="justify-center">
        {{ title }}
      </v-card-title>
      <v-card-text>
        <vue-markdown :source="description" />
        <vue-markdown :source="current" />
        <vue-markdown :source="counter" />
      </v-card-text>
      <v-card-actions>
        <Button text="edit" :onClick="edit" />
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import VueMarkdown from "vue-markdown";

import Button from "./Button.vue";

import { UserInputText } from "@/models/UserInput";
import ModalInput from "@/models/ModalInput";

import InfoTbl from "@/db/elements/infoTbl";

@Component({
  components: { Button, VueMarkdown },
})
export default class InfoCard extends Vue {
  @Prop() info!: InfoTbl;
  @Prop() title!: string;
  @Prop() viewOnEdit!: (
    description: string,
    current: string,
    counter: string
  ) => any;
  @Prop() type!: "debate" | "argument";

  edit() {
    const inputDescription = this.info.description;
    const inputCurrent = this.info.current;
    const inputCounter = this.info.counter;

    const modalDescription: UserInputText = {
      id: 0,
      title: "Description",
      description:
        "The longer description of the " +
        this.type +
        ". Note, this will not change the smaller description",
      textInput: inputDescription,
      type: "text",
      markdown: true,
    };

    const modalCurrent: UserInputText = {
      id: 1,
      title: "Current " + this.type,
      description: "The current best version of the " + this.type,
      textInput: inputCurrent,
      type: "text",
      markdown: true,
    };

    const modalCounter: UserInputText = {
      id: 2,
      title: "Current counter",
      description: "The current counter, this should be as strong as possible",
      textInput: inputCounter,
      type: "text",
      markdown: true,
    };

    const inputs = [modalDescription, modalCurrent, modalCounter];

    this.$modal.show("InputModal", {
      title: this.type + " info",
      inputs: inputs,
      onClose: this.onClose,
    });
  }

  onClose(inputs: UserInputText[]) {
    const desc = inputs[0].textInput;
    const cur = inputs[1].textInput;
    const coun = inputs[2].textInput;

    this.viewOnEdit(desc, cur, coun);
  }

  get description() {
    return "### Description\n" + this.info.description;
  }
  get current() {
    return "### Current\n" + this.info.current;
  }
  get counter() {
    return "### Counter\n" + this.info.counter;
  }
}
</script>
