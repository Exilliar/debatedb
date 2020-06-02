<template>
  <v-container>
    <Loading :check="loaded">
      <Empty title="Debates" :data="debateData">
        <div v-for="debate in debateData" :key="debateid(debate)">
          <ViewCard :data="debate" />
        </div>
      </Empty>
    </Loading>
    <div style="text-align: center;">
      <AddViewCardButton type="debate" :add="addOnClose" />
    </div>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import ViewCard from "@/components/TheViewCard.vue";
import AddViewCardButton from "@/components/AddViewCardButton.vue";
import Loading from "@/components/TheLoadingCard.vue";
import Empty from "@/components/TheEmptyCard.vue";

import ViewCardData from "@/models/ViewCardData";
import { UserInputText } from "@/models/UserInput";

import DebatesViewdb from "@/db/DebatesView";

@Component({
  components: { ViewCard, AddViewCardButton, Loading, Empty },
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
