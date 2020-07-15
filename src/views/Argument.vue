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
          <NotesCard :body="generalnotes" :viewOnEdit="updateNotes" />
        </v-col>
        <v-col cols="6">
          <Empty title="Sources" :data="sources">
            <div v-for="source in sources" :key="getSourceid(source)">
              <SourceCard
                :source="source"
                :addQuoteFunc="addQuote"
                :editFunc="updateSource"
                :deleteMethod="deleteSource"
              />
            </div>
          </Empty>
          <div class="text-center">
            <AddSource :addSourceFunc="addSource" />
          </div>
        </v-col>
      </v-row>
    </Loading>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import InfoCard from "@/components/TheInfoCard.vue";
import NotesCard from "@/components/TheNotesCard.vue";
import SourceCard from "@/components/argument/SourceCard.vue";
import AddSource from "@/components/argument/AddSource.vue";
import Loading from "@/components/TheLoadingCard.vue";
import Empty from "@/components/TheEmptyCard.vue";

import ArgumentViewdb, { Source } from "@/db/ArgumentView";
import InfoTbl from "@/db/elements/infoTbl";
import QuoteTbl from "@/db/elements/quoteTbl";

@Component({
  components: { InfoCard, NotesCard, SourceCard, AddSource, Loading, Empty },
})
export default class ArgumentView extends Vue {
  argumentViewdb!: ArgumentViewdb;
  id!: number;
  info: InfoTbl = { id: -1, description: "", current: "", counter: "" };
  loaded = false;
  generalnotes = "";
  sources: Source[] = new Array<Source>();
  sourceless = false;

  async mounted() {
    if (this.$route.params.id) {
      this.id = +this.$route.params.id;
      localStorage.setItem("argumentid", this.$route.params.id);
    } else {
      const localid = localStorage.getItem("argumentid");
      if (localid && localid !== "") {
        this.id = +localid;
      } else {
        this.$router.push("/arguments");
      }
    }

    this.argumentViewdb = new ArgumentViewdb(this.id);
    await this.argumentViewdb.refreshData();

    this.refreshInfo();
    this.refreshNotes();
    this.refreshSources();
    this.refreshSourceless();

    this.loaded = true;
  }

  async addQuote(quote: string, additional: string, sourceid: number) {
    await this.argumentViewdb.addQuote(quote, additional, sourceid);
    this.refreshSources();
  }
  async addSource(title: string, link: string, notes: string) {
    await this.argumentViewdb.addSource(title, link, notes);
    this.refreshSources();
    this.refreshSourceless();
  }

  async updateInfo(description: string, current: string, counter: string) {
    await this.argumentViewdb.updateInfo(description, current, counter);
    this.refreshInfo();
  }
  async updateNotes(text: string) {
    await this.argumentViewdb.updateGeneralNotes(text);
    this.refreshNotes();
  }
  async updateSource(
    link: string,
    quotes: QuoteTbl[],
    notes: string,
    sourceid: number
  ) {
    await this.argumentViewdb.updateSource(link, quotes, notes, sourceid);
    this.refreshSources();
  }

  refreshInfo() {
    this.info = this.argumentViewdb.argument.info;
  }
  refreshNotes() {
    this.generalnotes = this.argumentViewdb.argument.generalnotes;
  }
  refreshSources() {
    this.sources = this.argumentViewdb.sources;
  }
  refreshSourceless() {
    this.sourceless = this.argumentViewdb.sources.length === 0;
  }

  get title() {
    return this.loaded ? this.argumentViewdb.argument.title : "";
  }
  getSourceid(source: Source) {
    return source.id;
  }
  get deleteSource() {
    return this.argumentViewdb.deleteSource.bind(this.argumentViewdb);
  }
}
</script>
