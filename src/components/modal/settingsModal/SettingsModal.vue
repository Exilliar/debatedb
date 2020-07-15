<template>
  <modal
    name="SettingsModal"
    :adaptive="true"
    height="auto"
    :scrollable="true"
    @before-open="beforeOpen"
  >
    <div class="d-flex justify-center pa-5">
      <Button text="delete" color="error" :onClick="deleteView" />
    </div>
  </modal>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import Button from "@/components/Button.vue";

import SettingsModalInput from "@/models/SettingsModalInput";
import DeleteMethod from "../../../models/DeleteMethod";

@Component({
  components: { Button },
})
export default class SettingsModal extends Vue {
  id!: number;
  deleteMethod!: DeleteMethod;

  async deleteView() {
    if (
      confirm("Are you sure you want to delete? This action is irreversible")
    ) {
      await this.deleteMethod(this.id);

      location.reload(); // This is a bit of a hack, but works for now
    }
  }

  beforeOpen({ params }: SettingsModalInput) {
    this.id = params.id;
    this.deleteMethod = params.deleteMethod;
  }
}
</script>
