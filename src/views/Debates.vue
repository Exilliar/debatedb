<template>
  <v-container>
    <div v-for="debate in debateData" :key="debate.id">
      <ViewCard :data="debate" />
    </div>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import debateData from "@/data/debates";

import ViewCard from "@/components/TheViewCard.vue";

import ViewCardData from "@/models/ViewCardData";

@Component({
  components: { ViewCard },
})
export default class DebatesView extends Vue {
  viewCardData: ViewCardData = {
    id: 0,
    title: "Test Title",
    description:
      "this is a description that is really super long to see what happens when the description is really long",
    routeTo: "Arguments",
  };

  debateData = debateData;
}
</script>
