<template>
  <modal
    name="SettingsModal"
    @before-open="beforeOpen"
    @before-close="beforeClose"
    :adaptive="true"
    height="auto"
    :scrollable="true"
  >
    <v-container>
      <div class="text-center">
        <Button text="delete" color="error" :onClick="del" />
      </div>
      <v-row>
        <v-spacer />
        <Button class="mr-2" text="Submit" :onClick="submitClose" />
        <Button class="mr-2" text="Cancel" :onClick="close" color="error" />
      </v-row>
    </v-container>
  </modal>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import Button from "@/components/Button.vue";

import SettingsModalInput from "@/models/SettingsModalInput";
import BaseViewClass from "../../db/BaseViewClass";

@Component({
  components: { Button },
})
export default class SettingsModal extends Vue {
  viewClass!: BaseViewClass;
  viewId!: number;

  beforeOpen({ params }: SettingsModalInput) {
    this.viewClass = params.viewClass;
    this.viewId = params.viewId;
  }
  beforeClose() {
    console.log("before close");
  }

  submitClose() {
    console.log("this will do something someday");
  }
  close() {
    this.$modal.hide("SettingsModal");
  }

  async del() {
    if (confirm("This action cannot be undone. Are you sure?")) {
      await this.viewClass.deleteViewCard(this.viewId);

      alert("Deleted");

      this.close();
    }
  }
}
</script>
