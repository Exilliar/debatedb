<template>
  <v-container>
    <div v-if="loaded">
      <NotesCard :body="generalNotes" :viewOnEdit="onEdit" />
      <div v-for="argument in argumentData" :key="argumentid(argument)">
        <ViewCard :data="argument" />
      </div>
    </div>
    <div v-else style="text-align: center">
      <v-progress-circular indeterminate color="primary" size="100" />
    </div>
    <div style="text-align: center;">
      <AddButton type="argument" :add="addOnClose" />
    </div>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import ViewCard from "@/components/TheViewCard.vue";
import NotesCard from "@/components/TheNotesCard.vue";
import AddButton from "@/components/TheAddButton.vue";

import ViewCardData from "@/models/ViewCardData";

import argumentData from "@/data/arguments";
import ArgumentsViewdb from "../db/newIdea/ArgumentsView";

@Component({
  components: { ViewCard, NotesCard, AddButton },
})
export default class ArgumentsView extends Vue {
  debateid!: number;
  generalNotes!: string;
  argumentsViewdb!: ArgumentsViewdb;
  argumentData!: ViewCardData[];
  loaded = false;

  async mounted() {
    if (this.$route.params.id) this.debateid = +this.$route.params.id;
    else this.debateid = 0; // Temporary workaround for use in development, eventually will cause the user to be redirected to the debatesView

    this.argumentsViewdb = new ArgumentsViewdb(this.debateid);

    await this.argumentsViewdb.refreshData();

    this.generalNotes = this.argumentsViewdb.data.debate.generalNotes;

    this.getArgumentData();

    this.loaded = true;
  }

  get args() {
    return this.argumentsViewdb.data.arguments;
  }

  getArgumentData() {
    this.argumentData = this.argumentsViewdb.data.arguments.map((a) => {
      return {
        id: a.id.toString(),
        title: a.title,
        description: a.description,
        routeTo: "Argument",
      };
    });
  }

  async addOnClose(title: string, description: string) {
    this.loaded = false;

    await this.argumentsViewdb.addArgument(title, description);

    this.getArgumentData();

    this.loaded = true;
  }

  async onEdit(text: string) {
    await this.argumentsViewdb.updateGeneralNotes(text);
  }

  argumentid(argument: ViewCardData) {
    return argument.id;
  }
}
</script>
