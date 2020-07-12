<template>
  <modal
    name="SettingsModal"
    @before-open="beforeOpen"
    @before-close="beforeClose"
    :adaptive="true"
    height="auto"
    :scrollable="true"
  >
    <p>Modal working!</p>
  </modal>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class SettingsModal extends Vue {
  beforeOpen() {
    console.log("before open");
  }
  beforeClose() {
    console.log("before close");
  }
}
</script>
