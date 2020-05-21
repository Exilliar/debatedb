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
          markdown: true,
          title: "input 1",
        },
        {
          markdown: true,
          title: "input 2",
        },
        {
          markdown: true,
          title: "input 3",
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
