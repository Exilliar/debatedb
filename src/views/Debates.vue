<template>
  <v-container>
    <Loading :check="loaded">
      <div v-for="debate in debateData" :key="debateid(debate)">
        <ViewCard :data="debate" />
      </div>
    </Loading>
    <div style="text-align: center;">
      <AddButton type="debate" :add="addOnClose" />
    </div>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import ViewCard from "@/components/TheViewCard.vue";
import AddButton from "@/components/TheAddButton.vue";
import Loading from "@/components/Loading.vue";

import ViewCardData from "@/models/ViewCardData";

import DebatesViewdb from "../db/newIdea/DebatesView";
import { UserInputText } from "../models/UserInput";

@Component({
  components: { ViewCard, AddButton, Loading },
})
export default class DebatesView extends Vue {
  debateData = new Array<ViewCardData>();
  debatesViewdb!: DebatesViewdb;
  loaded = false;

  getDebateData() {
    this.debateData = this.debatesViewdb.data.map((d) => {
      return {
        id: d.id.toString(),
        title: d.title,
        description: d.description,
        routeTo: "Arguments",
      };
    });
  }

  async mounted() {
    this.debatesViewdb = new DebatesViewdb();
    await this.debatesViewdb.refreshData();
    this.getDebateData();
    this.loaded = true;
  }

  async addOnClose(title: string, description: string) {
    this.loaded = false;

    await this.debatesViewdb.add(title, description);

    this.getDebateData();

    this.loaded = true;
  }

  debateid(debate: ViewCardData) {
    return debate.id;
  }
}
</script>
