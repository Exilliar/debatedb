<template>
  <v-container>
    <Loading :check="loaded">
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
          <div v-if="!sourceless">
            <div v-for="source in sources" :key="source.key">
              <SourceCard
                :source="source"
                :addQuoteFunc="addQuote"
                :editFunc="updateSource"
              />
            </div>
          </div>
          <div v-else class="text-center">
            <h1>Sources</h1>
            <p>Currently empty</p>
          </div>
          <div class="text-center">
            <AddSource :addSourceFunc="addSource" />
          </div>
        </v-col>
      </v-row>
    </Loading>
    <!-- <div v-else>
      <v-progress-circular indeterminate color="primary" size="100" />
    </div> -->
  </v-container>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import InfoCard from "@/components/TheInfoCard.vue";
import NotesCard from "@/components/TheNotesCard.vue";
import SourceCard from "@/components/argument/SourceCard.vue";
import AddSource from "@/components/argument/AddSource.vue";
import Loading from "@/components/Loading.vue";

import ArgumentViewdb, { Source } from "../db/newIdea/ArgumentView";
import InfoTbl from "../db/newIdea/elements/infoTbl";
import QuoteTbl from "../db/newIdea/elements/quoteTbl";

@Component({
  components: { InfoCard, NotesCard, SourceCard, AddSource, Loading },
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
  sourceless = false;

  async mounted() {
    if (this.$route.params.id) this.id = +this.$route.params.id;
    else this.id = 0; // just a hack for while development is happening. Eventually this else will cause a redirect to the debatesView

    this.argViewdb = new ArgumentViewdb(this.id);
    await this.argViewdb.refreshData();

    this.refreshInfo();
    this.refreshNotes();
    this.refreshSources();
    this.refreshSourceless();

    this.loaded = true;
  }

  async addQuote(quote: string, additional: string, sourceid: number) {
    await this.argViewdb.addQuote(quote, additional, sourceid);
    this.refreshSources();
  }
  async addSource(title: string, link: string, notes: string) {
    await this.argViewdb.addSource(title, link, notes);
    this.refreshSources();
    this.refreshSourceless();
  }

  async updateInfo(description: string, current: string, counter: string) {
    await this.argViewdb.updateInfo(description, current, counter);
    this.refreshInfo();
  }
  async updateNotes(text: string) {
    await this.argViewdb.updateGeneralNotes(text);
    this.refreshNotes();
  }
  async updateSource(
    link: string,
    quotes: QuoteTbl[],
    notes: string,
    sourceid: number
  ) {
    await this.argViewdb.updateSource(link, quotes, notes, sourceid);
    this.refreshSources();
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
  refreshSourceless() {
    this.sourceless = this.argViewdb.sources.length === 0;
  }

  get title() {
    return this.loaded ? this.argViewdb.argument.title : "";
  }
}
</script>
