<template>
  <v-container>
    This is the arguments view
    <ViewCard :data="viewCardData" />
  </v-container>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import ViewCard from "@/components/TheViewCard.vue";

import ViewCardData from "@/models/ViewCardData";

@Component({
  components: { ViewCard },
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
