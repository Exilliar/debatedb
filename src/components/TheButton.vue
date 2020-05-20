<template>
  <v-btn color="secondary">{{ text }}</v-btn>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Button extends Vue {
  @Prop() text!: string;
}
</script>
