<template>
  <v-container>
    <Loading :check="loaded">
      <InfoCard
        :title="debateTitle"
        :info="info"
        type="debate"
        :viewOnEdit="updateInfo"
      />
      <NotesCard :body="generalNotes" :viewOnEdit="updateNotes" />
      <div v-for="argument in argumentData" :key="argumentid(argument)">
        <ViewCard :data="argument" />
      </div>
    </Loading>
    <div style="text-align: center;">
      <AddButton type="argument" :add="addArgument" />
    </div>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import ViewCard from "@/components/TheViewCard.vue";
import NotesCard from "@/components/TheNotesCard.vue";
import AddButton from "@/components/TheAddButton.vue";
import InfoCard from "@/components/TheInfoCard.vue";
import Loading from "@/components/Loading.vue";

import ViewCardData from "@/models/ViewCardData";

import ArgumentsViewdb, { Argument } from "../db/newIdea/ArgumentsView";
import InfoTbl from "../db/newIdea/elements/infoTbl";

@Component({
  components: { ViewCard, NotesCard, AddButton, InfoCard, Loading },
})
export default class ArgumentsView extends Vue {
  debateid!: number;
  argumentsViewdb!: ArgumentsViewdb;
  argumentData = new Array<ViewCardData>();
  loaded = false;
  // Both of the below have to be inisialised to be empty so that they will rerender when changed
  info: InfoTbl = {
    id: -1,
    description: "",
    current: "",
    counter: "",
  };
  generalNotes = "";

  async mounted() {
    if (this.$route.params.id) this.debateid = +this.$route.params.id;
    else this.debateid = 0; // Temporary workaround for use in development, eventually will cause the user to be redirected to the debatesView

    this.argumentsViewdb = new ArgumentsViewdb(this.debateid);
    await this.argumentsViewdb.refreshData();

    this.getArgumentData();
    this.refreshNotes();
    this.refreshInfo();

    this.loaded = true;
  }

  async addArgument(title: string, description: string) {
    this.loaded = false;

    await this.argumentsViewdb.addArgument(title, description);
    this.getArgumentData();

    this.loaded = true;
  }
  async updateInfo(description: string, current: string, counter: string) {
    await this.argumentsViewdb.updateInfo(description, current, counter);
    this.refreshInfo();
  }
  async updateNotes(text: string) {
    await this.argumentsViewdb.updateGeneralNotes(text);
    this.refreshNotes();
  }

  refreshInfo() {
    this.info = this.argumentsViewdb.data.debate.info;
  }
  refreshNotes() {
    this.generalNotes = this.argumentsViewdb.data.debate.generalNotes;
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
  argumentid(argument: ViewCardData) {
    return argument.id;
  }
  get args() {
    return this.loaded
      ? this.argumentsViewdb.data.arguments
      : new Array<Argument>();
  }
  get debateTitle() {
    return this.loaded ? this.argumentsViewdb.data.debate.title : "";
  }
}
</script>
