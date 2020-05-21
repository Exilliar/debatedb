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
  debateData = debateData;
}
</script>
