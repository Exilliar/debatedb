<template>
  <v-container>
    <v-card>
      <v-card-title>General Notes</v-card-title>
      <v-card-text>
        <vue-markdown>
          {{ body }}
        </vue-markdown>
      </v-card-text>
      <v-card-actions><Button text="Edit" :onClick="edit"/></v-card-actions>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import Button from "./TheButton.vue";
import VueMarkdown from "vue-markdown";

@Component({
  components: { Button, VueMarkdown },
})
export default class NotesCard extends Vue {
  @Prop() body!: string;

  edit() {
    console.log("one day something will be here");
  }
}
</script>
