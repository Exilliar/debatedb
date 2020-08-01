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
import { Additional, SettingsModalShow } from "../models/SettingsModalInput";

@Component({
  components: { Button },
})
export default class SettingsButton extends Vue {
  @Prop() deleteMethod!: DeleteMethod;
  @Prop() id!: number;
  @Prop() additional!: Additional;

  openSettings() {
    let params: SettingsModalShow;

    if (this.additional) {
      params = {
        id: this.id,
        deleteMethod: this.deleteMethod,
        additional: this.additional,
      };
    } else {
      params = {
        id: this.id,
        deleteMethod: this.deleteMethod,
      };
    }

    this.$modal.show("SettingsModal", params);
  }
}
</script>
