<template>
  <v-btn color="secondary" fab dark @click="onClick">
    <v-icon dark>mdi-plus</v-icon>
  </v-btn>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class AddButton extends Vue {
  @Prop() onClick!: () => any;
}
</script>
