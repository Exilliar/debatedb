<template>
  <modal name="InputModal" @before-open="beforeOpen">
    <v-container>
      <v-toolbar flat>
        <v-spacer />
        <v-toolbar-title> {{ title }}</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <div v-for="input in inputs" :key="input.title">
        {{ input.title }}
      </div>
    </v-container>
    <Button text="ignore" />
  </modal>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import ModalInput from "@/models/ModalInput";
import UserInput from "@/models/UserInput";

import Button from "./TheButton.vue";

@Component({
  components: { Button },
})
export default class InputModal extends Vue {
  title = "";
  inputs = new Array<UserInput>();
  beforeOpen({ params }: ModalInput) {
    this.title = params.title;
    this.inputs = params.inputs;
    console.log(params);
    console.log(this.inputs[0].markdown);
  }
}
</script>
