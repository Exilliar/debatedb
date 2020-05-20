<template>
  <v-container>
    This is the hello world component
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {}
</script>
