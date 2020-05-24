<template>
  <v-app>
    <Header :version="version" :user="user" />
    <v-content>
      <Button text="showModal" :onClick="show" />
      <AddButton type="debate" :data="debateData" />
      <AddButton type="argument" :data="argumentData" />
      <InputModal />
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import debateData from "./data/debates";
import argumentData from "./data/arguments";

import Header from "./components/TheHeader.vue";
import Button from "./components/TheButton.vue";
import AddButton from "./components/TheAddButton.vue";

import InputModal from "./components/modal/InputModal.vue";

import User from "./models/User";
import ModalInput from "./models/ModalInput";
import UserInput, { UserInputText, UserInputLink } from "./models/UserInput";

@Component({
  components: {
    Header,
    Button,
    InputModal,
    AddButton,
  },
})
export default class App extends Vue {
  user: User = {
    name: "userName",
  };
  version = "0.0.1";
  debateData = debateData;
  argumentData = argumentData;

  input0: UserInputText = {
    id: 0,
    markdown: true,
    title: "Input 1",
    description: "Some more info on the input",
    textInput: "",
    type: "text",
  };
  input1: UserInputLink = {
    id: 1,
    textInput: "",
    type: "link",
  };

  modalData: ModalInput = {
    params: {
      title: "This is some test data",
      inputs: [this.input0, this.input1],
    },
  };

  show() {
    this.$modal.show("InputModal", {
      title: this.modalData.params.title,
      inputs: this.modalData.params.inputs,
    });
  }
}
</script>
