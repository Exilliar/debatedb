<template>
  <v-container>
    This is the hello world component
    <v-btn color="secondary">button example</v-btn>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {}
</script>
