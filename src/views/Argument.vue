<template>
  <v-container>
    <div v-if="loaded">
      <InfoCard
        :info="info"
        :title="title"
        type="argument"
        :viewOnEdit="updateInfo"
      />
      <v-row>
        <v-col cols="6">
          <NotesCard :body="generalNotes" :viewOnEdit="updateNotes" />
        </v-col>
        <v-col cols="6">
          <div v-for="source in sources" :key="source.key">
            <SourceCard :source="source" :addQuoteFunc="addQuote" />
          </div>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-progress-circular indeterminate color="primary" size="100" />
    </div>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import InfoCard from "@/components/TheInfoCard.vue";
import NotesCard from "@/components/TheNotesCard.vue";
import SourceCard from "@/components/ArgumentSourceCard.vue";

import ArgumentViewdb, { Source } from "../db/newIdea/ArgumentView";
import InfoTbl from "../db/newIdea/elements/infoTbl";

@Component({
  components: { InfoCard, NotesCard, SourceCard },
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
  generalNotes = "";
  sources: Source[] = new Array<Source>();

  async mounted() {
    if (this.$route.params.id) this.id = +this.$route.params.id;
    else this.id = 0; // just a hack for while development is happening. Eventually this else will cause a redirect to the debatesView

    this.argViewdb = new ArgumentViewdb(this.id);
    await this.argViewdb.refreshData();

    this.refreshInfo();
    this.refreshNotes();
    this.refreshSources();

    this.loaded = true;
  }

  async addQuote(quote: string, additional: string, sourceid: number) {
    await this.argViewdb.addQuote(quote, additional, sourceid);
    this.refreshSources();
  }

  async updateInfo(description: string, current: string, counter: string) {
    await this.argViewdb.updateInfo(description, current, counter);
    this.refreshInfo();
  }
  async updateNotes(text: string) {
    await this.argViewdb.updateGeneralNotes(text);
    this.refreshNotes();
  }

  refreshInfo() {
    this.info = this.argViewdb.argument.info;
  }
  refreshNotes() {
    this.generalNotes = this.argViewdb.argument.generalNotes;
  }
  refreshSources() {
    this.sources = this.argViewdb.sources;
  }

  get title() {
    return this.argViewdb.argument.title;
  }
}
</script>
