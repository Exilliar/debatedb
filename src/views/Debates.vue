<template>
  <v-container>
    <div v-if="loaded">
      <div v-for="debate in debateData" :key="debateid(debate)">
        <ViewCard :data="debate" />
      </div>
    </div>
    <div v-else style="text-align: center">
      <v-progress-circular indeterminate color="primary" size="100" />
    </div>
    <div style="text-align: center;">
      <AddButton type="debate" :onClose="addOnClose" />
    </div>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import ViewCard from "@/components/TheViewCard.vue";
import AddButton from "@/components/TheAddButton.vue";

import ViewCardData from "@/models/ViewCardData";

import DebatesViewdb from "../db/newIdea/DebatesView";
import { UserInputText } from "../models/UserInput";

@Component({
  components: { ViewCard, AddButton },
})
export default class DebatesView extends Vue {
  debateData!: ViewCardData[];
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
    this.loaded = true;
    this.getDebateData();
  }

  async addOnClose(inputs: UserInputText[]) {
    this.loaded = false;

    // Here we know that inputs will only contain a "title" and "description" fields.
    // No other values inside inputs matter
    const title = inputs[0].textInput;
    const description = inputs[1].textInput;

    await this.debatesViewdb.add(title, description);

    this.loaded = true;

    this.getDebateData();
  }

  debateid(debate: ViewCardData) {
    return debate.id;
  }
}
</script>
