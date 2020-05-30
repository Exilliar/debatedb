<template>
  <v-container>
    <div v-if="loaded">
      <InfoCard
        :info="info"
        :title="title"
        type="argument"
        :viewOnEdit="updateInfo"
      />
    </div>
    <div v-else>
      <v-progress-circular indeterminate color="primary" size="100" />
    </div>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import InfoCard from "@/components/TheInfoCard.vue";

import ArgumentViewdb from "../db/newIdea/ArgumentView";
import InfoTbl from "../db/newIdea/elements/infoTbl";

@Component({
  components: { InfoCard },
})
export default class ArgumentView extends Vue {
  argViewdb!: ArgumentViewdb;
  id!: number;
  info: InfoTbl = {
    id: -1,
    description: "",
    current: "",
    counter: "",
  };
  loaded = false;

  async mounted() {
    if (this.$route.params.id) this.id = +this.$route.params.id;
    else this.id = 0; // just a hack for while development is happening. Eventually this else will cause a redirect to the debatesView

    this.argViewdb = new ArgumentViewdb(this.id);
    await this.argViewdb.refreshData();

    this.refreshInfo();

    this.loaded = true;
  }

  async updateInfo(description: string, current: string, counter: string) {
    await this.argViewdb.updateInfo(description, current, counter);
    this.refreshInfo();
  }

  refreshInfo() {
    this.info = this.argViewdb.argument.info;
  }

  get title() {
    return this.argViewdb.argument.title;
  }
}
</script>
