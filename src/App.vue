<template>
  <v-app>
    <Header :version="version" :user="user" />
    <v-content>
      <Button text="showModal" :onClick="show" />
      <InputModal />
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import Header from "./components/TheHeader.vue";
import Button from "./components/TheButton.vue";

import InputModal from "./components/InputModal.vue";

import User from "./models/User";
import ModalInput from "./models/ModalInput";

@Component({
  components: {
    Header,
    Button,
    InputModal,
  },
})
export default class App extends Vue {
  user: User = {
    name: "userName",
  };
  version = "0.0.1";

  modalData: ModalInput = {
    params: {
      title: "This is some test data",
      inputs: [
        {
          id: 0,
          markdown: true,
          title: "Input 1",
          description: "Some more info on the input",
          textInput: "",
        },
        {
          id: 1,
          markdown: false,
          title: "Input 2",
          description: "Some more info on the input",
          textInput: "",
        },
        {
          id: 2,
          markdown: true,
          title: "Input 3",
          description: "Some more info on the input",
          textInput: "",
        },
        {
          id: 3,
          markdown: true,
          title: "Input 4",
          description: "Some more info on the input",
          textInput: "",
        },
        {
          id: 4,
          markdown: true,
          title: "Input 5",
          description: "Some more info on the input",
          textInput: "",
        },
      ],
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
