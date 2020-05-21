<template>
  <v-container>
    <NotesCard
      body="some notes should go here. They will probably be quite long, and written in mark down"
    />
    <ViewCard :data="viewCardData" />
  </v-container>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import ViewCard from "@/components/TheViewCard.vue";
import NotesCard from "@/components/TheNotesCard.vue";

import ViewCardData from "@/models/ViewCardData";

@Component({
  components: { ViewCard, NotesCard },
})
export default class ArgumentsView extends Vue {
  viewCardData: ViewCardData = {
    id: "0",
    title: "Test argument",
    description: "This is just a test, actual data will be different",
    routeTo: "Argument",
  };

  mounted() {
    console.log(this.$route.params.id);
  }
}
</script>
