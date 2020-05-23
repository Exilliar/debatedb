<template>
  <v-container>
    <NotesCard :body="noteText" />
    <div v-for="argument in argumentData" :key="argument.id">
      <ViewCard :data="argument" />
    </div>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import ViewCard from "@/components/TheViewCard.vue";
import NotesCard from "@/components/TheNotesCard.vue";

import ViewCardData from "@/models/ViewCardData";

import argumentData from "@/data/arguments";

@Component({
  components: { ViewCard, NotesCard },
})
export default class ArgumentsView extends Vue {
  argumentData = argumentData;

  noteText =
    "some notes should go here. They will probably be quite long, and written in mark down so that there can be\n - bullet points";
}
</script>
