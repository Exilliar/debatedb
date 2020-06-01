<template>
  <v-container>
    <div v-if="check">
      <slot />
    </div>
    <div v-else class="text-center">
      <v-progress-circular indeterminate color="primary" size="100" />
    </div>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Loading extends Vue {
  @Prop() check!: boolean;
}
</script>
