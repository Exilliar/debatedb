<template>
  <div v-if="isEmpty" class="text-center">
    <h1>{{ title }}</h1>
    <p>
      Currently empty. Press the add button below to add new
      {{ title.toLowerCase() }}
    </p>
  </div>
  <div v-else>
    <slot />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Empty extends Vue {
  @Prop() data!: Array<any>;
  @Prop() title!: string;

  get isEmpty() {
    return this.data.length === 0;
  }
}
</script>
