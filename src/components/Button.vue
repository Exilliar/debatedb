<template>
  <v-btn :color="bColor" @click="onClick()" dark>{{ text }}</v-btn>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Button extends Vue {
  @Prop() text!: string;
  @Prop() onClick!: () => any;
  @Prop() color!: string;

  get bColor() {
    return this.color ? this.color : "secondary";
  }
}
</script>
