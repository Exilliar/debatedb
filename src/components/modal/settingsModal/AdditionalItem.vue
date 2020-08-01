<template>
  <Button
    :text="'delete quote: ' + item.title"
    color="error"
    :onClick="deleteElement"
  />
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import Button from "@/components/Button.vue";
import DeleteMethod from "../../../models/DeleteMethod";

interface Item {
  title: string;
  id: number;
}

@Component({
  components: { Button },
})
export default class AdditionalItem extends Vue {
  @Prop() item!: Item;
  @Prop() deleteMethod!: DeleteMethod;

  async deleteElement() {
    if (
      confirm("Are you sure you want to delete? This action is irreversible")
    ) {
      await this.deleteMethod(this.item.id);

      location.reload(); // This is a bit of a hack, but works for now
    }
  }
}
</script>
