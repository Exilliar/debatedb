<template>
  <v-container>
    <v-card>
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-text>
        <p>Description: {{ description }}</p>
        <p>Current: {{ current }}</p>
        <p>Counter: {{ counter }}</p>
      </v-card-text>
      <v-card-actions>
        <Button text="edit" :onClick="edit" />
      </v-card-actions>
    </v-card>
    {{ info }}
  </v-container>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import Button from "./TheButton.vue";
import InfoTbl from "../db/newIdea/elements/infoTbl";
import { UserInputText } from "../models/UserInput";
import ModalInput from "../models/ModalInput";

@Component({
  components: { Button },
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
    this.$modal.show("InputModal", {
      title: this.modalData.params.title,
      inputs: this.modalData.params.inputs,
      onClose: this.onClose,
    });
  }

  inputDescription = this.info.description;
  inputCurrent = this.info.current;
  inputCounter = this.info.counter;

  modalDescription: UserInputText = {
    id: 0,
    title: "Description",
    description:
      "The longer description of the " +
      this.type +
      ". Note, this will not change the smaller description",
    textInput: this.inputDescription,
    type: "text",
    markdown: true,
  };

  modalCurrent: UserInputText = {
    id: 1,
    title: "Current " + this.type,
    description: "The current best version of the " + this.type,
    textInput: this.inputCurrent,
    type: "text",
    markdown: true,
  };

  modalCounter: UserInputText = {
    id: 2,
    title: "Current counter",
    description: "The current counter, this should be as strong as possible",
    textInput: this.inputCounter,
    type: "text",
    markdown: true,
  };

  modalData: ModalInput = {
    params: {
      title: this.type + " info",
      inputs: [this.modalDescription, this.modalCurrent, this.modalCounter],
    },
  };

  onClose(inputs: UserInputText[]) {
    const desc = inputs[0].textInput;
    const cur = inputs[1].textInput;
    const coun = inputs[2].textInput;

    this.viewOnEdit(desc, cur, coun);
  }

  get description() {
    return this.info.description;
  }
  get current() {
    return this.info.current;
  }
  get counter() {
    return this.info.counter;
  }
}
</script>