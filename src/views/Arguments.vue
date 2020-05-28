<template>
  <v-container>
    <NotesCard :body="noteText" />
    <div v-for="argument in argumentData" :key="argument.id">
      <ViewCard :data="argument" />
    </div>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import ViewCard from "@/components/TheViewCard.vue";
import NotesCard from "@/components/TheNotesCard.vue";

import ViewCardData from "@/models/ViewCardData";

import argumentData from "@/data/arguments";
// import Debates from "../dummy-db/interface/debate";
// import Arguments from "../dummy-db/interface/argument";

@Component({
  components: { ViewCard, NotesCard },
})
export default class ArgumentsView extends Vue {
  argumentData = argumentData;

  // @Prop() arguments!: Arguments;
  // @Prop() debates!: Debates;

  noteText =
    "some notes should go here. They will probably be quite long, and written in mark down so that there can be\n - bullet points";

  mounted() {
    console.log(this.$route.params);
  }
}
</script>
