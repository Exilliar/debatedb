<template>
  <Button
    class="mr-2"
    text="Settings"
    color="primary"
    :onClick="openSettings"
  />
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import Button from "./Button.vue";
import DeleteMethod from "../models/DeleteMethod";

@Component({
  components: { Button },
})
export default class SettingsButton extends Vue {
  @Prop() deleteMethod!: DeleteMethod;
  @Prop() id!: number;

  openSettings() {
    this.$modal.show("SettingsModal", {
      id: this.id,
      deleteMethod: this.deleteMethod,
    });
  }
}
</script>
