<template>
  <v-app>
    <div v-if="!loading">
      <Header :version="version" />
      <v-content>
        <InputModal />
        <router-view />
      </v-content>
    </div>
    <div
      v-else
      style="height: 100vh"
      class="d-flex justify-center align-center"
    >
      <AuthLoadingCard />
    </div>
  </v-app>
</template>
<script lang="ts">
import TableBase from "./db/liveClassData/TableBase";
import DebateDatadb from "./db/liveClassData/debate";

import { Vue, Component } from "vue-property-decorator";

import AuthLoadingCard from "./components/TheAuthLoadingCard.vue";
import Header from "./components/TheHeader.vue";
import InputModal from "./components/modal/InputModal.vue";

import Account from "./auth/models/Account";
import DebateTbl from "./db/elements/debateTbl";

@Component({
  components: { Header, InputModal, AuthLoadingCard },
})
export default class App extends Vue {
  version = "0.0.1";

  get loading() {
    return this.$auth.loading;
  }

  mounted() {
    // const updateDebate: DebateTbl = {
    //   id: 0,
    //   title: ""
    // }

    const addDebate = {
      title: "test",
      description: "this is a test",
      generalNotes: "test test",
      infoId: 0,
      accountId: 0,
    };

    const updateDebate = {
      id: 17,
      title: "changed title",
      description: "this is a test",
      generalNotes: "test test",
      infoId: 0,
      accountId: 0,
    };

    const debateTbl = new DebateDatadb();

    debateTbl.update(updateDebate).then((res) => {
      // debateTbl.delete(18).then((res) => {
      // debateTbl.add(addDebate).then((res) => {
      debateTbl.getAll(0).then((res) => {
        console.log("all:", res);
      });

      debateTbl.getSingle(0).then((res: DebateTbl) => {
        console.log("single:", res);
      });
    });

    // const tableBase = new TableBase("debate");

    // tableBase.getAll().then((res) => {
    //   console.log("debates:", res);
    // });

    // tableBase.getSingle(0).then((res) => {
    //   console.log("debate:", res);
    // });
  }
}
</script>
