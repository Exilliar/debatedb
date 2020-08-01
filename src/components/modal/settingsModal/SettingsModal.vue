<template>
  <modal
    name="SettingsModal"
    :adaptive="true"
    height="auto"
    :scrollable="true"
    @before-open="beforeOpen"
  >
    <div class="text-center pa-5">
      <Button text="delete all" color="error" :onClick="deleteElement" />

      <h2 class="pt-5">{{ additionalTitle }}</h2>
      <div class="pt-2" v-for="item in additionalItems" :key="item.id">
        <AdditionalDelete :item="item" :deleteMethod="additionalDeleteMethod" />
      </div>
    </div>
  </modal>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import Button from "@/components/Button.vue";
import AdditionalDelete from "./AdditionalDelete.vue";

import SettingsModalInput, { Additional } from "@/models/SettingsModalInput";
import DeleteMethod from "@/models/DeleteMethod";

@Component({
  components: { Button, AdditionalDelete },
})
export default class SettingsModal extends Vue {
  id!: number;
  deleteMethod!: DeleteMethod;
  additional: Additional = {} as Additional;

  async deleteElement(id?: number) {
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
    if (params.additional) this.additional = params.additional;
    else this.additional = {} as Additional;
  }

  get additionalTitle() {
    return this.additional.title;
  }
  get additionalItems() {
    return this.additional.items;
  }
  get additionalDeleteMethod() {
    return this.additional.deleteMethod;
  }
}
</script>
